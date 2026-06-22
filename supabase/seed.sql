-- ===========================================================================
-- LFES Avia — seed data (run after migrations, e.g. `supabase db reset`)
-- Safe to re-run: uses ON CONFLICT to upsert by slug.
-- ===========================================================================

insert into public.categories (slug, name, kind, sort_order) values
  ('aircraft',    'Aircraft',          'aviation', 10),
  ('helicopters', 'Helicopters',       'aviation', 20),
  ('engines',     'Engines',           'aviation', 30),
  ('components',  'Components & Parts', 'aviation', 40),
  ('services',    'MRO & Services',    'aviation', 50),
  ('documents',   'Documents & Records','aviation', 60),
  ('inspections', 'Inspections',       'aviation', 70),
  ('leasing',     'Leasing & ACMI',    'aviation', 80)
on conflict (slug) do update
  set name = excluded.name,
      kind = excluded.kind,
      sort_order = excluded.sort_order;

-- ---------------------------------------------------------------------------
-- To promote a user to admin after they sign up, run (replace the email):
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'you@example.com');
-- ---------------------------------------------------------------------------
