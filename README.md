# LFES Avia — Phase 1

The lean launch version of the LFES Avia platform: an aviation marketplace and
business-development ecosystem with an admin CRM, AI Concierge, and Telegram bot
intake.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui · Supabase (Postgres + Auth)**.

> Scope reference: see [`project-info.md`](./project-info.md).
> Architecture & data model: see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#   then fill in your Supabase (and later OpenAI / Telegram) values

# 3. Run the dev server
npm run dev
# open http://localhost:3000
```

The app runs without real Supabase credentials (auth-gated areas will simply
redirect to `/login`), but you need a Supabase project to sign up / log in.

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the **Project URL** and **anon key** into `.env.local`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), and the
   **service role key** into `SUPABASE_SERVICE_ROLE_KEY` (server-only).
3. Apply the schema. Either:
   - **Supabase SQL Editor** — paste and run, in order:
     `supabase/migrations/0001_init.sql`, then `0002_auth_and_rls.sql`, then
     `supabase/seed.sql`; **or**
   - **Supabase CLI** — `supabase link --project-ref <ref>` then
     `supabase db push` (and run `seed.sql`).
4. Sign up in the app, then promote yourself to admin (see the note at the
   bottom of `supabase/seed.sql`).

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack) |
| `npm run build` | Production build                 |
| `npm run start` | Run the production build         |
| `npm run lint`  | Lint with ESLint                 |

## Project layout (high level)

```
src/
  app/
    (public)/      Marketing + marketplace (landing, listings, companies)
    (auth)/        Login / signup
    (app)/         Authenticated user area (dashboard, requests, saved, …)
    admin/         Admin CRM area (role-guarded)
    api/           Route handlers (health; bot/AI webhooks in M3)
  components/      ui/ (shadcn) + layout/ shells
  lib/             constants, supabase clients, auth helpers, navigation
  types/           database row types
supabase/
  migrations/      SQL schema (0001 tables, 0002 auth + RLS)
  seed.sql         Seed categories
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full breakdown, roles, and
data model.

## Deployment (Vercel)

Connect the GitHub repo to Vercel and set the environment variables from
`.env.example` in the Vercel project settings. See the Deployment section of
`ARCHITECTURE.md` for staging vs. production guidance.

## Milestone status

- **Milestone 1 (this scaffold):** project setup, architecture, DB schema,
  auth/roles, route structure, base UI — **done**.
- **Milestone 2:** wire marketplace, requests, and admin CRM to the database.
- **Milestone 3:** AI Concierge v1, Telegram bot, automations, handover.
