-- inv8 Studio — Supabase Schema
-- Run this in the Supabase SQL Editor (https://app.supabase.com → SQL Editor)

-- ── INQUIRIES ────────────────────────────────────────────────────
create table if not exists inquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  service     text not null,
  budget      text,
  timeline    text,
  project_details text,
  status      text not null default 'new',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz
);

-- ── CALLS ────────────────────────────────────────────────────────
create table if not exists calls (
  id              uuid primary key default gen_random_uuid(),
  name            text,
  email           text not null,
  company         text,
  selected_date   text not null,
  selected_time   text not null,
  project_details text,
  type            text not null default 'consultation_call',
  status          text not null default 'pending',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz
);

-- ── REFERRALS ────────────────────────────────────────────────────
create table if not exists referrals (
  id                  uuid primary key default gen_random_uuid(),
  your_name           text not null,
  your_email          text not null,
  your_phone          text,
  referral_name       text not null,
  referral_contact    text not null,
  needs_description   text,
  how_heard           text,
  status              text not null default 'new',
  created_at          timestamptz not null default now()
);

-- ── BLOG POSTS ───────────────────────────────────────────────────
create table if not exists blogposts (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique,
  category        text not null default 'Startup Insights',
  category_color  text not null default 'bg-blue-100 text-blue-700',
  excerpt         text,
  content         text,
  cover_image     text,
  author          text not null default 'Leandro Gepilano',
  author_role     text not null default 'Founder, inv8 Studio',
  date            text,
  read_time       text not null default '5 min read',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz
);

-- ── SAMPLE WORKS ─────────────────────────────────────────────────
create table if not exists sampleworks (
  id                      uuid primary key default gen_random_uuid(),
  title                   text not null,
  client_name             text not null,
  short_desc              text,
  description             text,
  platform                text,
  service_id              text,
  challenge_statement     text,
  solution                text,
  duration_weeks          integer default 0,
  features                jsonb default '[]'::jsonb,
  tech_stack              jsonb default '[]'::jsonb,
  image_url               text,
  image_path              text,
  additional_image_urls   jsonb default '[]'::jsonb,
  additional_image_paths  jsonb default '[]'::jsonb,
  status                  text not null default 'Planning',
  date                    text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz
);

-- ── COMMUNITY GALLERY ────────────────────────────────────────────
create table if not exists community_gallery (
  id            uuid primary key default gen_random_uuid(),
  url           text not null,
  storage_path  text not null,
  caption       text default '',
  "order"       integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────────
-- Public read for portfolio/blog/gallery (used by the website)
alter table sampleworks      enable row level security;
alter table blogposts        enable row level security;
alter table community_gallery enable row level security;
alter table inquiries        enable row level security;
alter table calls            enable row level security;
alter table referrals        enable row level security;

-- Anyone can read public content
create policy "public read sampleworks"       on sampleworks       for select using (true);
create policy "public read blogposts"         on blogposts         for select using (true);
create policy "public read community_gallery" on community_gallery for select using (true);

-- Anyone can insert contact/referral data (anon key is safe for writes)
create policy "public insert inquiries"  on inquiries  for insert with check (true);
create policy "public insert calls"      on calls      for insert with check (true);
create policy "public insert referrals"  on referrals  for insert with check (true);

-- Authenticated users (admin) can do everything
create policy "auth all inquiries"        on inquiries        for all using (auth.role() = 'authenticated');
create policy "auth all calls"            on calls            for all using (auth.role() = 'authenticated');
create policy "auth all referrals"        on referrals        for all using (auth.role() = 'authenticated');
create policy "auth all sampleworks"      on sampleworks      for all using (auth.role() = 'authenticated');
create policy "auth all blogposts"        on blogposts        for all using (auth.role() = 'authenticated');
create policy "auth all community_gallery" on community_gallery for all using (auth.role() = 'authenticated');

-- ── STORAGE BUCKETS ──────────────────────────────────────────────
-- Run these separately in Supabase Dashboard → Storage, or via SQL:
-- insert into storage.buckets (id, name, public) values ('sampleworks', 'sampleworks', true);
-- insert into storage.buckets (id, name, public) values ('community-gallery', 'community-gallery', true);
