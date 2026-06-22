-- ===========================================================================
-- LFES Avia — Phase 1 initial schema
-- Migration 0001: extensions, enums, core tables, indexes, triggers
--
-- Design notes:
--  * `profiles` extends Supabase `auth.users` (1:1). Auth identity lives in
--    auth.users; app-level user data lives here.
--  * `listings` is a unified table for both general listings and commercial
--    "deals", distinguished by `kind`. This keeps Phase 1 lean while leaving
--    room for asset-specific child tables (aircraft, engines, ...) in Phase 2.
--  * All user-facing tables use uuid PKs and created_at/updated_at timestamps.
--  * RLS is enabled in migration 0002.
-- ===========================================================================

create extension if not exists "pgcrypto";      -- gen_random_uuid()
create extension if not exists "pg_trgm";        -- fuzzy text search on listings

-- ---------------------------------------------------------------------------
-- Helper: keep updated_at fresh on row updates
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Enums (keep in sync with src/lib/constants.ts)
-- ---------------------------------------------------------------------------
create type public.user_role      as enum ('admin', 'staff', 'user');
create type public.request_type   as enum ('deal', 'document', 'concierge');
create type public.request_status as enum (
  'new', 'reviewing', 'contacted', 'in_progress', 'waiting_user', 'closed'
);
create type public.urgency_level  as enum ('low', 'medium', 'high', 'urgent');
create type public.listing_kind   as enum ('listing', 'deal');
create type public.listing_status as enum ('draft', 'active', 'reserved', 'closed', 'archived');
create type public.source_channel as enum ('web', 'bot', 'admin', 'ai');
create type public.category_kind  as enum ('aviation', 'listing', 'request');

-- ---------------------------------------------------------------------------
-- profiles — extends auth.users (1:1)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  email         text,
  role          public.user_role not null default 'user',
  company_id    uuid,                       -- FK added after companies table
  phone         text,
  telegram_id   text unique,                -- links a Telegram user to a profile
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
comment on table public.profiles is 'Application-level user data, 1:1 with auth.users.';

-- ---------------------------------------------------------------------------
-- companies — directory base
-- ---------------------------------------------------------------------------
create table public.companies (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text unique,
  description   text,
  website       text,
  email         text,
  phone         text,
  country       text,
  service_type  text,                       -- free-form for Phase 1
  is_verified   boolean not null default false,
  is_active     boolean not null default true,
  created_by    uuid references public.profiles(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
comment on table public.companies is 'Company directory base; verification/trust layers come in Phase 2.';

alter table public.profiles
  add constraint profiles_company_id_fkey
  foreign key (company_id) references public.companies(id) on delete set null;

-- ---------------------------------------------------------------------------
-- categories — aviation / listing / request taxonomy
-- ---------------------------------------------------------------------------
create table public.categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  kind          public.category_kind not null default 'aviation',
  parent_id     uuid references public.categories(id) on delete set null,
  sort_order    int not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
comment on table public.categories is 'Marketplace taxonomy used across listings and requests.';

-- ---------------------------------------------------------------------------
-- listings — unified listings + deals
-- ---------------------------------------------------------------------------
create table public.listings (
  id            uuid primary key default gen_random_uuid(),
  kind          public.listing_kind not null default 'listing',
  title         text not null,
  slug          text unique,
  summary       text,
  description   text,
  category_id   uuid references public.categories(id) on delete set null,
  company_id    uuid references public.companies(id) on delete set null,
  status        public.listing_status not null default 'draft',
  price_amount  numeric(14,2),
  price_currency text default 'USD',
  location      text,
  -- Flexible bag for asset-specific key/value data until Phase 2 asset tables.
  attributes    jsonb not null default '{}'::jsonb,
  is_featured   boolean not null default false,
  created_by    uuid references public.profiles(id) on delete set null,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
comment on table public.listings is 'Listings and deals (distinguished by kind). attributes jsonb holds asset-specific fields for now.';

-- ---------------------------------------------------------------------------
-- requests — structured user requests (CRM core)
-- ---------------------------------------------------------------------------
create table public.requests (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles(id) on delete set null,
  type            public.request_type not null,
  status          public.request_status not null default 'new',
  category_id     uuid references public.categories(id) on delete set null,
  listing_id      uuid references public.listings(id) on delete set null, -- if about a listing
  title           text,
  description     text not null,
  urgency         public.urgency_level not null default 'medium',
  budget          text,                     -- free-form commercial interest
  contact_pref    text,
  -- Snapshot of contact details for bot/anonymous submissions
  contact_name    text,
  contact_email   text,
  contact_phone   text,
  source          public.source_channel not null default 'web',
  ai_summary      text,                     -- AI Concierge generated summary
  assigned_to     uuid references public.profiles(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
comment on table public.requests is 'Structured user requests; the heart of the Phase 1 admin CRM flow.';

-- ---------------------------------------------------------------------------
-- saved_items — user saved/interested listings
-- ---------------------------------------------------------------------------
create table public.saved_items (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  listing_id    uuid not null references public.listings(id) on delete cascade,
  created_at    timestamptz not null default now(),
  unique (user_id, listing_id)
);
comment on table public.saved_items is 'Listings a user saved / expressed interest in.';

-- ---------------------------------------------------------------------------
-- conversations + messages — simple inquiry threads
-- ---------------------------------------------------------------------------
create table public.conversations (
  id            uuid primary key default gen_random_uuid(),
  subject       text,
  user_id       uuid references public.profiles(id) on delete set null,
  listing_id    uuid references public.listings(id) on delete set null,
  request_id    uuid references public.requests(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id       uuid references public.profiles(id) on delete set null,
  is_admin        boolean not null default false,
  body            text not null,
  created_at      timestamptz not null default now()
);
comment on table public.conversations is 'Lightweight inquiry threads (not a secure deal room — Phase 2).';

-- ---------------------------------------------------------------------------
-- notifications — in-app + outbound notification log
-- ---------------------------------------------------------------------------
create table public.notifications (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id) on delete cascade,
  title         text not null,
  body          text,
  type          text,                       -- e.g. request_update, new_listing, admin_alert
  link          text,
  channel       public.source_channel not null default 'web',
  is_read       boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- ai_logs — AI Concierge interaction logs / summaries
-- ---------------------------------------------------------------------------
create table public.ai_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id) on delete set null,
  request_id    uuid references public.requests(id) on delete set null,
  kind          text,                       -- e.g. guided_request, qualification, summary, qa
  prompt        text,
  response      text,
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);
comment on table public.ai_logs is 'AI Concierge prompts/responses and generated summaries for admin review.';

-- ---------------------------------------------------------------------------
-- bot_interactions — Telegram bot activity, synced to platform
-- ---------------------------------------------------------------------------
create table public.bot_interactions (
  id              uuid primary key default gen_random_uuid(),
  telegram_id     text,
  user_id         uuid references public.profiles(id) on delete set null,
  request_id      uuid references public.requests(id) on delete set null,
  direction       text,                     -- 'inbound' | 'outbound'
  payload         jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);
comment on table public.bot_interactions is 'Telegram bot message log, linked back to profiles/requests where known.';

-- ---------------------------------------------------------------------------
-- admin_notes — internal notes attached to any entity (CRM)
-- ---------------------------------------------------------------------------
create table public.admin_notes (
  id            uuid primary key default gen_random_uuid(),
  author_id     uuid references public.profiles(id) on delete set null,
  entity_type   text not null,              -- 'request' | 'user' | 'listing' | 'company'
  entity_id     uuid not null,
  body          text not null,
  created_at    timestamptz not null default now()
);
comment on table public.admin_notes is 'Internal admin/staff notes attached to any entity for CRM follow-up.';

-- ---------------------------------------------------------------------------
-- activity_log — basic audit / analytics trail
-- ---------------------------------------------------------------------------
create table public.activity_log (
  id            uuid primary key default gen_random_uuid(),
  actor_id      uuid references public.profiles(id) on delete set null,
  action        text not null,              -- e.g. request.created, listing.updated
  entity_type   text,
  entity_id     uuid,
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);
comment on table public.activity_log is 'Lightweight audit/activity trail for analytics and admin visibility.';

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index idx_profiles_role         on public.profiles(role);
create index idx_profiles_company      on public.profiles(company_id);
create index idx_categories_kind       on public.categories(kind);
create index idx_listings_status       on public.listings(status);
create index idx_listings_kind         on public.listings(kind);
create index idx_listings_category     on public.listings(category_id);
create index idx_listings_company      on public.listings(company_id);
create index idx_listings_title_trgm   on public.listings using gin (title gin_trgm_ops);
create index idx_requests_status       on public.requests(status);
create index idx_requests_type         on public.requests(type);
create index idx_requests_user         on public.requests(user_id);
create index idx_requests_assigned     on public.requests(assigned_to);
create index idx_saved_user            on public.saved_items(user_id);
create index idx_messages_conversation on public.messages(conversation_id);
create index idx_notifications_user    on public.notifications(user_id, is_read);
create index idx_ai_logs_user          on public.ai_logs(user_id);
create index idx_admin_notes_entity    on public.admin_notes(entity_type, entity_id);
create index idx_activity_entity       on public.activity_log(entity_type, entity_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
create trigger trg_profiles_updated     before update on public.profiles     for each row execute function public.set_updated_at();
create trigger trg_companies_updated    before update on public.companies    for each row execute function public.set_updated_at();
create trigger trg_categories_updated   before update on public.categories   for each row execute function public.set_updated_at();
create trigger trg_listings_updated     before update on public.listings     for each row execute function public.set_updated_at();
create trigger trg_requests_updated     before update on public.requests     for each row execute function public.set_updated_at();
create trigger trg_conversations_updated before update on public.conversations for each row execute function public.set_updated_at();
