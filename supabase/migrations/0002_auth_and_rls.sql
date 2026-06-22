-- ===========================================================================
-- LFES Avia — Phase 1
-- Migration 0002: auth bootstrap trigger, role helpers, Row Level Security
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Auto-create a profile row when a new auth user signs up.
-- Reads full_name from the signup metadata (raw_user_meta_data).
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Role helpers — SECURITY DEFINER so they can read profiles inside policies
-- without causing recursive RLS evaluation.
-- ---------------------------------------------------------------------------
create or replace function public.current_role_name()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'staff')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Enable RLS on all app tables
-- ---------------------------------------------------------------------------
alter table public.profiles         enable row level security;
alter table public.companies        enable row level security;
alter table public.categories       enable row level security;
alter table public.listings         enable row level security;
alter table public.requests         enable row level security;
alter table public.saved_items      enable row level security;
alter table public.conversations    enable row level security;
alter table public.messages         enable row level security;
alter table public.notifications    enable row level security;
alter table public.ai_logs          enable row level security;
alter table public.bot_interactions enable row level security;
alter table public.admin_notes      enable row level security;
alter table public.activity_log     enable row level security;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create policy "profiles: self or staff can read"
  on public.profiles for select
  using (id = auth.uid() or public.is_staff());

create policy "profiles: self can update"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles: staff can update any"
  on public.profiles for update
  using (public.is_staff());

-- ---------------------------------------------------------------------------
-- companies — public read of active; staff write
-- ---------------------------------------------------------------------------
create policy "companies: public read active"
  on public.companies for select
  using (is_active or public.is_staff());

create policy "companies: staff write"
  on public.companies for all
  using (public.is_staff())
  with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- categories — public read of active; admin write
-- ---------------------------------------------------------------------------
create policy "categories: public read active"
  on public.categories for select
  using (is_active or public.is_staff());

create policy "categories: admin write"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- listings — public read of active/reserved; staff write
-- ---------------------------------------------------------------------------
create policy "listings: public read published"
  on public.listings for select
  using (status in ('active', 'reserved', 'closed') or public.is_staff());

create policy "listings: staff write"
  on public.listings for all
  using (public.is_staff())
  with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- requests — owner reads/creates own; staff manage all
-- ---------------------------------------------------------------------------
create policy "requests: owner or staff read"
  on public.requests for select
  using (user_id = auth.uid() or public.is_staff());

create policy "requests: user create own"
  on public.requests for insert
  with check (user_id = auth.uid());

create policy "requests: owner update own"
  on public.requests for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "requests: staff manage all"
  on public.requests for all
  using (public.is_staff())
  with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- saved_items — strictly per-user
-- ---------------------------------------------------------------------------
create policy "saved_items: owner manage"
  on public.saved_items for all
  using (user_id = auth.uid() or public.is_staff())
  with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- conversations + messages — participant or staff
-- ---------------------------------------------------------------------------
create policy "conversations: participant or staff read"
  on public.conversations for select
  using (user_id = auth.uid() or public.is_staff());

create policy "conversations: user create own"
  on public.conversations for insert
  with check (user_id = auth.uid() or public.is_staff());

create policy "conversations: staff manage"
  on public.conversations for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "messages: participant or staff read"
  on public.messages for select
  using (
    public.is_staff()
    or exists (
      select 1 from public.conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  );

create policy "messages: participant or staff send"
  on public.messages for insert
  with check (
    public.is_staff()
    or exists (
      select 1 from public.conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- notifications — recipient reads/updates; staff manage
-- ---------------------------------------------------------------------------
create policy "notifications: owner read"
  on public.notifications for select
  using (user_id = auth.uid() or public.is_staff());

create policy "notifications: owner update (mark read)"
  on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "notifications: staff manage"
  on public.notifications for all
  using (public.is_staff())
  with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- ai_logs — owner reads own; staff read all (writes via service role)
-- ---------------------------------------------------------------------------
create policy "ai_logs: owner or staff read"
  on public.ai_logs for select
  using (user_id = auth.uid() or public.is_staff());

-- ---------------------------------------------------------------------------
-- Staff-only tables: bot_interactions, admin_notes, activity_log
-- (writes from server/webhooks use the service role, which bypasses RLS)
-- ---------------------------------------------------------------------------
create policy "bot_interactions: staff read"
  on public.bot_interactions for select using (public.is_staff());

create policy "admin_notes: staff manage"
  on public.admin_notes for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "activity_log: staff read"
  on public.activity_log for select using (public.is_staff());
