-- Run this once in the Supabase SQL Editor.
-- It replaces the old "using (true)" policies, which let anyone with the
-- public anon key edit or delete content, with:
--   * the public can read published content (and log analytics events)
--   * only signed-in users (your admin account) can create, edit or delete
--
-- IMPORTANT: in Supabase go to Authentication -> Sign In / Providers and turn
-- OFF "Allow new users to sign up", otherwise anyone could create an account
-- and count as "authenticated".

-- 1. Drop every existing policy on these tables
do $$
declare p record;
begin
  for p in
    select policyname, tablename from pg_policies
    where schemaname = 'public'
      and tablename in ('analytics', 'portfolio', 'posts', 'testimonials')
  loop
    execute format('drop policy if exists %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

-- 2. Analytics: visitors can log events, only the admin can read them
alter table analytics enable row level security;
create policy "Public insert" on analytics for insert to anon, authenticated with check (true);
create policy "Admin read"    on analytics for select to authenticated using (true);

-- 3. Portfolio: public read, admin write
alter table portfolio enable row level security;
create policy "Public read" on portfolio for select using (true);
create policy "Admin write" on portfolio for all to authenticated using (true) with check (true);

-- 4. Posts: public sees only published posts, admin sees and edits everything
alter table posts enable row level security;
create policy "Public read published" on posts for select to anon using (published = true);
create policy "Admin all"             on posts for all to authenticated using (true) with check (true);

-- 5. Testimonials: public read, admin write
alter table testimonials enable row level security;
create policy "Public read" on testimonials for select using (true);
create policy "Admin write" on testimonials for all to authenticated using (true) with check (true);

-- 6. Image uploads (storage bucket "images"): only the admin can upload/change/delete.
--    Public viewing still works as long as the bucket is marked Public.
drop policy if exists "Admin upload images" on storage.objects;
drop policy if exists "Admin update images" on storage.objects;
drop policy if exists "Admin delete images" on storage.objects;
create policy "Admin upload images" on storage.objects for insert to authenticated with check (bucket_id = 'images');
create policy "Admin update images" on storage.objects for update to authenticated using (bucket_id = 'images');
create policy "Admin delete images" on storage.objects for delete to authenticated using (bucket_id = 'images');
