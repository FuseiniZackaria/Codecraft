-- Run this once in the Supabase SQL Editor.
--
-- This database is shared with another app that lets users sign up, so being
-- signed in is NOT enough to edit CodeCraft content. Only accounts listed in
-- public.admin_users count as admins.
--
-- Result:
--   * the public can read published content (and log analytics events)
--   * only admins can create, edit or delete content, read analytics, or
--     upload/change/delete images
--
-- NOTE: step 3 drops existing policies on the tables analytics, portfolio,
-- posts and testimonials. If your other app also uses a table with one of
-- those names, check its policies before running this.

-- 1. Admin list
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamp with time zone default now()
);
alter table public.admin_users enable row level security;
-- No policies on admin_users: nobody can read or change it through the API.
-- You manage it from the SQL Editor (see step 7).

-- 2. Helper the policies (and the admin login screen) use
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- 3. Drop every existing policy on the CodeCraft tables
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

-- 4. Analytics: anyone can log events, only admins can read them
alter table analytics enable row level security;
create policy "Public insert" on analytics for insert to anon, authenticated with check (true);
create policy "Admin read"    on analytics for select to authenticated using (public.is_admin());

-- 5. Content tables: public read, admin write
alter table portfolio enable row level security;
create policy "Public read" on portfolio for select using (true);
create policy "Admin write" on portfolio for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

alter table posts enable row level security;
create policy "Public read published" on posts for select using (published = true);
create policy "Admin all"             on posts for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

alter table testimonials enable row level security;
create policy "Public read" on testimonials for select using (true);
create policy "Admin write" on testimonials for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 6. Storage bucket "images" (shared with the other app):
--    * anyone can view (via "Allow public reads" / a Public bucket)
--    * any signed-in user can upload
--    * a user can change/delete only the files they uploaded
--    * CodeCraft admins can change/delete any file
--    Visitors who are not signed in cannot upload, change or delete.
--    Also remove the old open rules ("Allow public uploads/updates/deletes" and
--    the "Give anon users access to JPG images..." INSERT/UPDATE/DELETE rules).
drop policy if exists "Allow public uploads" on storage.objects;
drop policy if exists "Allow public updates" on storage.objects;
drop policy if exists "Allow public deletes" on storage.objects;
drop policy if exists "Give anon users access to JPG images in folder 1ffg0oo_1" on storage.objects;
drop policy if exists "Give anon users access to JPG images in folder 1ffg0oo_2" on storage.objects;
drop policy if exists "Give anon users access to JPG images in folder 1ffg0oo_3" on storage.objects;
drop policy if exists "Admin upload images" on storage.objects;
drop policy if exists "Admin update images" on storage.objects;
drop policy if exists "Admin delete images" on storage.objects;
drop policy if exists "Signed-in upload images" on storage.objects;
drop policy if exists "Owner or admin update images" on storage.objects;
drop policy if exists "Owner or admin delete images" on storage.objects;

create policy "Signed-in upload images" on storage.objects for insert to authenticated
  with check (bucket_id = 'images');
create policy "Owner or admin update images" on storage.objects for update to authenticated
  using (bucket_id = 'images' and (owner_id = auth.uid()::text or public.is_admin()));
create policy "Owner or admin delete images" on storage.objects for delete to authenticated
  using (bucket_id = 'images' and (owner_id = auth.uid()::text or public.is_admin()));

-- 7. Make yourself an admin. First create the account in
--    Authentication -> Users -> Add user (or sign up through your other app),
--    then replace the email below and run this line:
--
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL'
-- on conflict do nothing;
