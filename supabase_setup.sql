-- Run this in your Supabase SQL Editor

-- 1. Analytics (visits + clicks)
create table if not exists analytics (
  id uuid default gen_random_uuid() primary key,
  type text not null,
  label text,
  created_at timestamp with time zone default now()
);

-- 2. Portfolio projects
create table if not exists portfolio (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  live_url text,
  created_at timestamp with time zone default now()
);

-- 3. Blog posts
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  cover_url text,
  published boolean default false,
  created_at timestamp with time zone default now()
);

-- 4. Allow public inserts for analytics (visitors don't need to be logged in)
alter table analytics enable row level security;
create policy "Allow public insert" on analytics for insert with check (true);
create policy "Allow admin read" on analytics for select using (true);

-- 5. Allow public reads for portfolio and posts
alter table portfolio enable row level security;
create policy "Allow public read" on portfolio for select using (true);
create policy "Allow admin all" on portfolio for all using (true);

alter table posts enable row level security;
create policy "Allow public read published" on posts for select using (published = true);
create policy "Allow admin all" on posts for all using (true);
