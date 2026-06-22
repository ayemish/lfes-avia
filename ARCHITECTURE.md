# LFES Avia — Architecture (Phase 1 / Milestone 1)

This document captures the foundational architecture decided in Milestone 1:
the tech stack, folder structure, user roles, route protection model, and the
database schema. It is intended to let any developer continue the build without
reverse-engineering decisions.

---

## 1. Tech stack

| Layer      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack), React 19                  |
| Language   | TypeScript (strict)                                           |
| Styling    | Tailwind CSS v4 + shadcn/ui (Radix primitives, owned in-repo) |
| Backend    | Supabase — PostgreSQL, Auth, Row Level Security               |
| AI (M3)    | OpenAI (AI Concierge v1)                                      |
| Bot (M3)   | Telegram bot via webhook route handler                        |
| Deployment | Vercel (frontend) + Supabase (hosted DB)                      |

Rationale: the stack is the one specified in the scope, chosen for an API-first,
RLS-secured foundation that future mobile apps and integrations can build on
without a rebuild.

---

## 2. Folder structure

```
src/
  app/
    (public)/                Public marketing + marketplace
      layout.tsx             Header + footer shell
      page.tsx               Landing page
      listings/              Browse + [id] detail
      companies/             Directory + [id] profile
    (auth)/                  login / signup (centered shell)
    (app)/                   Authenticated user area (sidebar shell)
      layout.tsx             requireProfile() guard
      dashboard/ requests/ saved/ messages/ profile/
    admin/                   Admin CRM area (sidebar shell)
      layout.tsx             requireRole(['admin','staff']) guard
      page.tsx (dashboard) requests/ listings/ companies/ users/ categories/
    api/
      health/                Health + integration status
  components/
    ui/                      shadcn primitives (button, card, input, label, badge)
    layout/                  site header/footer, dashboard shell + nav, sign-out
  lib/
    constants.ts             SITE config + enums (source of truth, mirrors DB)
    navigation.ts            Nav definitions per area
    utils.ts                 cn() class helper
    auth.ts                  Server-side auth/role guards
    supabase/
      client.ts              Browser client (anon key)
      server.ts              Server client (cookies, anon key)
      admin.ts               Service-role client (server-only, bypasses RLS)
      middleware.ts          Session refresh + route guards (used by proxy)
  types/
    database.ts              Hand-authored row types (until `supabase gen types`)
  proxy.ts                   Next.js 16 proxy (formerly middleware) entry
supabase/
  migrations/0001_init.sql   Extensions, enums, tables, indexes, triggers
  migrations/0002_auth_and_rls.sql  new-user trigger, role helpers, RLS policies
  seed.sql                   Seed aviation categories
```

### Route groups

Parenthesized folders (`(public)`, `(auth)`, `(app)`) group routes without
adding URL segments. They each have their own `layout.tsx`, so the three areas
have distinct shells (public header/footer, centered auth, sidebar dashboard).
`admin/` is a real path segment so all admin URLs live under `/admin`.

---

## 3. User roles & access control

Roles (DB enum `user_role`, mirrored in `src/lib/constants.ts`):

| Role    | Description                                                        |
| ------- | ------------------------------------------------------------------ |
| `admin` | Full access: manage users, listings, requests, categories, config. |
| `staff` | Operational admin access (CRM, listings, requests). No role mgmt.  |
| `user`  | Standard marketplace user (default on signup).                     |

Access is enforced at **two layers**:

1. **Edge (`proxy.ts` → `lib/supabase/middleware.ts`)** — refreshes the session
   on every request and redirects:
   - unauthenticated users away from `/dashboard`, `/requests`, `/saved`,
     `/messages`, `/profile`, and `/admin/**` → `/login?redirectTo=…`
   - authenticated non-staff away from `/admin/**` → `/dashboard`
2. **Server (`lib/auth.ts`)** — layouts call `requireProfile()` /
   `requireRole(['admin','staff'])` as a defense-in-depth check and to load the
   profile for the UI.
3. **Database (RLS)** — the ultimate authority. Even if a route check is missed,
   Postgres RLS policies (migration 0002) constrain every query by `auth.uid()`
   and role helpers (`is_staff()`, `is_admin()`).

Role helpers are `SECURITY DEFINER` SQL functions so policies can read the
caller's role from `profiles` without triggering recursive RLS.

---

## 4. Data model

All tables live in the `public` schema with `uuid` primary keys and
`created_at` / `updated_at` timestamps (auto-maintained via the
`set_updated_at` trigger). Enums are defined in SQL and mirrored in
`src/lib/constants.ts` — **keep these in sync**.

| Table              | Purpose                                                             |
| ------------------ | ------------------------------------------------------------------- |
| `profiles`         | App user data, 1:1 with `auth.users`. Holds `role`, company, TG id. |
| `companies`        | Company directory base (verification flag for Phase 2 trust layer). |
| `categories`       | Aviation/listing/request taxonomy; self-referential `parent_id`.    |
| `listings`         | Unified listings **and** deals (`kind`); `attributes` jsonb bag.    |
| `requests`         | Structured user requests — the CRM core (type/status/urgency/…).    |
| `saved_items`      | User saved/interested listings (unique per user+listing).           |
| `conversations`    | Lightweight inquiry threads (linked to listing/request).            |
| `messages`         | Messages within a conversation.                                     |
| `notifications`    | In-app + outbound notification log.                                 |
| `ai_logs`          | AI Concierge prompts/responses & summaries (M3).                    |
| `bot_interactions` | Telegram bot message log, synced to platform (M3).                  |
| `admin_notes`      | Internal CRM notes attached to any entity (polymorphic).            |
| `activity_log`     | Lightweight audit/analytics trail.                                  |

### Key design decisions

- **Unified `listings` table** with a `kind` enum (`listing` | `deal`) keeps
  Phase 1 lean. Asset-specific fields go in the `attributes` jsonb column for
  now; Phase 2 can add typed child tables (aircraft, engines, components, …)
  that reference `listings` without restructuring.
- **`profiles` extends `auth.users`** (no separate users table). A trigger
  (`handle_new_user`) auto-creates a profile row on signup, copying
  `full_name` from signup metadata.
- **Polymorphic `admin_notes` / `activity_log`** (`entity_type` + `entity_id`)
  avoid a proliferation of note/log tables while supporting the CRM flow.
- **`source_channel` enum** (`web` | `bot` | `admin` | `ai`) tags where a
  request/notification originated, enabling the bot intake automation.
- **Future-ready, not future-built:** the schema leaves room for NDA/LOI
  workflows, verification levels, deal rooms, memberships, etc. (see
  `project-info.md` §11) by isolating Phase-1 concerns and using extensible
  jsonb/polymorphic patterns rather than hard-coding.

### Request lifecycle (CRM)

`new → reviewing → contacted → in_progress → waiting_user → closed`
(`request_status` enum). Admins assign status, owner via `assigned_to`, and
attach `admin_notes`. `ai_summary` is populated by the Concierge in M3.

---

## 5. Environment variables

See `.env.example`. Summary:

| Variable                         | Scope  | Used for                          |
| -------------------------------- | ------ | --------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`       | public | Supabase client                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | public | Supabase client (RLS-constrained) |
| `SUPABASE_SERVICE_ROLE_KEY`      | server | Admin client / webhooks (no RLS)  |
| `NEXT_PUBLIC_SITE_URL`           | public | Auth redirects, emails, bot links |
| `OPENAI_API_KEY`, `OPENAI_MODEL` | server | AI Concierge (M3)                 |
| `TELEGRAM_BOT_TOKEN`, `…_SECRET` | server | Telegram bot + webhook (M3)       |

Never expose `SUPABASE_SERVICE_ROLE_KEY` or any non-`NEXT_PUBLIC_` var to the
browser. `lib/supabase/admin.ts` imports `server-only` to enforce this.

---

## 6. Deployment

- **Frontend:** Vercel, connected to the GitHub repo. Set all env vars from
  `.env.example` in Project Settings → Environment Variables.
- **Database:** Supabase hosted. Apply `supabase/migrations/*` then `seed.sql`.
- **Staging vs production:** use a separate Supabase project (and a Vercel
  Preview environment / separate project) for staging so client testing from
  Week 2 doesn't touch production data. Point each environment's
  `NEXT_PUBLIC_SUPABASE_URL`/keys at the matching Supabase project.
- **Health check:** `GET /api/health` reports which integrations are configured.

---

## 7. What's next (Milestones 2 & 3)

- **M2:** Server Actions + queries to wire requests, listings, companies, saved
  items, and the admin CRM to the database; profile editing; category CRUD.
- **M3:** AI Concierge v1 (`/api/concierge`), Telegram webhook
  (`/api/telegram/webhook`) writing via the service-role client, notification
  and follow-up automations, testing, and handover docs.
