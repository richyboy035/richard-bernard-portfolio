-- Richard Bernard portfolio backend
-- Apply this migration in Supabase SQL Editor before configuring the app.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  type text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  visual text not null default 'pocket',
  featured boolean not null default false,
  live_url text,
  prototype_url text,
  behance_url text,
  category text not null default 'Product Design',
  role text not null default 'Product Designer',
  year text not null default '',
  overview text not null default '',
  challenge text not null default '',
  approach text not null default '',
  solution text not null default '',
  highlights text[] not null default '{}',
  key_decision text not null default '',
  outcome text not null default '',
  technologies text[] not null default '{}',
  cover_image text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant select on public.admin_users to authenticated;
grant select, update on public.contact_messages to authenticated;

drop policy if exists "Admins can read their admin membership" on public.admin_users;
create policy "Admins can read their admin membership"
on public.admin_users for select to authenticated
using (user_id = (select auth.uid()) or public.is_admin());

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
on public.projects for select to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
on public.projects for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins read contact messages" on public.contact_messages;
create policy "Admins read contact messages"
on public.contact_messages for select to authenticated
using (public.is_admin());

drop policy if exists "Admins update contact messages" on public.contact_messages;
create policy "Admins update contact messages"
on public.contact_messages for update to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Public image delivery; uploads and changes remain admin-only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-media',
  'project-media',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Project media is public" on storage.objects;
create policy "Project media is public"
on storage.objects for select to anon, authenticated
using (bucket_id = 'project-media');

drop policy if exists "Admins upload project media" on storage.objects;
create policy "Admins upload project media"
on storage.objects for insert to authenticated
with check (bucket_id = 'project-media' and public.is_admin());

drop policy if exists "Admins update project media" on storage.objects;
create policy "Admins update project media"
on storage.objects for update to authenticated
using (bucket_id = 'project-media' and public.is_admin())
with check (bucket_id = 'project-media' and public.is_admin());

drop policy if exists "Admins delete project media" on storage.objects;
create policy "Admins delete project media"
on storage.objects for delete to authenticated
using (bucket_id = 'project-media' and public.is_admin());

-- Contact inserts use the server-only Supabase secret key.
-- Do not grant anonymous insert or select access to contact_messages.
