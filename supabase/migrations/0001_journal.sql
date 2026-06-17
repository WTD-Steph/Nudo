-- Nudo Journal — V1 schema.
-- Run with `supabase db push`, or paste into the SQL editor on supabase.com.
-- All tables are user-owned and protected by RLS: auth.uid() = user_id.

-- ───────────────────────────────────────────────────────────────────────────
-- profiles  (extends auth.users)
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text,
  timezone      text not null default 'Asia/Tokyo',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "profiles: insert own"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "profiles: update own"
  on public.profiles for update
  using ( auth.uid() = id );

-- Auto-create a profile row on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────────────────────────────────────────────────────────────────────
-- beans  (the user's bean library)
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.beans (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  name         text not null,
  roaster      text,
  origin       text,
  process      text,
  roast_date   date,
  bag_notes    text,
  my_notes     text,
  photo_url    text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  archived_at  timestamptz
);

create index if not exists beans_user_idx
  on public.beans (user_id, archived_at, created_at desc);

alter table public.beans enable row level security;

create policy "beans: read own"
  on public.beans for select
  using ( auth.uid() = user_id );

create policy "beans: insert own"
  on public.beans for insert
  with check ( auth.uid() = user_id );

create policy "beans: update own"
  on public.beans for update
  using ( auth.uid() = user_id );

create policy "beans: delete own"
  on public.beans for delete
  using ( auth.uid() = user_id );

-- ───────────────────────────────────────────────────────────────────────────
-- brews  (the log)
-- ───────────────────────────────────────────────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_type where typname = 'brew_method') then
    create type public.brew_method as enum (
      'espresso',
      'pour-over',
      'aeropress',
      'french-press',
      'moka-pot',
      'drip-bag'
    );
  end if;
end $$;

create table if not exists public.brews (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  bean_id            uuid references public.beans(id) on delete set null,
  brewed_at          timestamptz not null default now(),
  method             public.brew_method not null,
  dose_g             numeric(6,2),
  yield_g            numeric(6,2),
  time_s             integer,
  grind_clicks       text,
  water_temp_c       integer,
  gear_used          text,
  notes              text,
  variable_changed   text,
  rating             smallint check (rating between 1 and 5),
  would_brew_again   boolean,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists brews_user_time_idx
  on public.brews (user_id, brewed_at desc);

create index if not exists brews_user_bean_time_idx
  on public.brews (user_id, bean_id, brewed_at desc);

alter table public.brews enable row level security;

create policy "brews: read own"
  on public.brews for select
  using ( auth.uid() = user_id );

create policy "brews: insert own"
  on public.brews for insert
  with check ( auth.uid() = user_id );

create policy "brews: update own"
  on public.brews for update
  using ( auth.uid() = user_id );

create policy "brews: delete own"
  on public.brews for delete
  using ( auth.uid() = user_id );

-- ───────────────────────────────────────────────────────────────────────────
-- updated_at trigger (reusable)
-- ───────────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists beans_set_updated_at on public.beans;
create trigger beans_set_updated_at
  before update on public.beans
  for each row execute function public.set_updated_at();

drop trigger if exists brews_set_updated_at on public.brews;
create trigger brews_set_updated_at
  before update on public.brews
  for each row execute function public.set_updated_at();

-- ───────────────────────────────────────────────────────────────────────────
-- Storage bucket for bean photos (uncomment if you want it now; safe later).
-- insert into storage.buckets (id, name, public)
--   values ('bean-photos', 'bean-photos', true)
--   on conflict (id) do nothing;
-- ───────────────────────────────────────────────────────────────────────────
