-- Tighten project row-level policies and revoke direct API execution of the
-- Supabase automatic RLS DDL event trigger (the trigger itself remains installed).

revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

grant usage on schema private to anon, authenticated;
grant execute on function private.is_admin() to anon, authenticated;

drop policy if exists "Published projects are public" on public.projects;
drop policy if exists "Admins read all projects" on public.projects;
drop policy if exists "Admins manage projects" on public.projects;

create policy "Published projects and admin project access"
on public.projects for select to anon, authenticated
using (
  status = 'published'
  or (select private.is_admin())
);

create policy "Admins insert projects"
on public.projects for insert to authenticated
with check ((select private.is_admin()));

create policy "Admins update projects"
on public.projects for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins delete projects"
on public.projects for delete to authenticated
using ((select private.is_admin()));

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;
