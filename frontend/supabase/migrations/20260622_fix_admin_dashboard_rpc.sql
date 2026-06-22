-- YMCA admin dashboard RPC/RLS repair.
-- Run this in Supabase SQL editor, or apply it with the Supabase CLI.

create or replace function public.is_ymca_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
  );
$$;

grant execute on function public.is_ymca_admin() to authenticated;

create or replace function public.submitter_program_name(
  p_parent_id uuid,
  p_child_id uuid,
  p_caregiver_id uuid
)
returns text
language sql
stable
set search_path = public
as $$
  select coalesce(
    (select program_name from public.parents where id = p_parent_id),
    (select program_name from public.children where id = p_child_id),
    (select program_name from public.caregivers where id = p_caregiver_id),
    'Unknown Program'
  );
$$;

create or replace function public.submitter_display_name(
  p_is_anonymous boolean,
  p_parent_id uuid,
  p_child_id uuid,
  p_caregiver_id uuid
)
returns text
language sql
stable
set search_path = public
as $$
  select case
    when p_is_anonymous then 'Anonymous'
    else coalesce(
      nullif((select full_name from public.parents where id = p_parent_id), ''),
      nullif((select full_name from public.children where id = p_child_id), ''),
      nullif((select full_name from public.caregivers where id = p_caregiver_id), ''),
      'Anonymous'
    )
  end;
$$;

create or replace function public.get_submission_stats()
returns table(
  total_submissions bigint,
  open_cases bigint,
  in_progress bigint,
  resolved bigint,
  critical_issues bigint
)
language sql
security definer
set search_path = public
as $$
  select
    count(*)::bigint as total_submissions,
    count(*) filter (where status = 'open')::bigint as open_cases,
    count(*) filter (where status = 'in_progress')::bigint as in_progress,
    count(*) filter (where status = 'resolved')::bigint as resolved,
    count(*) filter (where urgency = 'critical' and status <> 'resolved')::bigint as critical_issues
  from public.submissions
  where public.is_ymca_admin();
$$;

drop function if exists public.get_recent_submissions(integer);
drop function if exists public.get_recent_submissions(int);

create or replace function public.get_recent_submissions(limit_count integer default 10)
returns table(
  id uuid,
  ticket_ref text,
  submitter_name text,
  program_name text,
  urgency text,
  status text,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    s.id,
    s.ticket_ref,
    public.submitter_display_name(s.is_anonymous, s.parent_id, s.child_id, s.caregiver_id) as submitter_name,
    public.submitter_program_name(s.parent_id, s.child_id, s.caregiver_id) as program_name,
    s.urgency,
    s.status,
    s.created_at
  from public.submissions s
  where public.is_ymca_admin()
  order by s.created_at desc
  limit greatest(1, least(coalesce(limit_count, 10), 100));
$$;

grant execute on function public.get_submission_stats() to authenticated;
grant execute on function public.get_recent_submissions(integer) to authenticated;

alter table public.admin_profiles enable row level security;
alter table public.parents enable row level security;
alter table public.children enable row level security;
alter table public.caregivers enable row level security;
alter table public.staff enable row level security;
alter table public.submissions enable row level security;

drop policy if exists "Admins can read admin profiles" on public.admin_profiles;
create policy "Admins can read admin profiles"
on public.admin_profiles for select
to authenticated
using (public.is_ymca_admin());

drop policy if exists "Admins can manage admin profiles" on public.admin_profiles;
create policy "Admins can manage admin profiles"
on public.admin_profiles for all
to authenticated
using (public.is_ymca_admin())
with check (public.is_ymca_admin());

drop policy if exists "Admins can read parents" on public.parents;
create policy "Admins can read parents"
on public.parents for select
to authenticated
using (public.is_ymca_admin());

drop policy if exists "Admins can read children" on public.children;
create policy "Admins can read children"
on public.children for select
to authenticated
using (public.is_ymca_admin());

drop policy if exists "Admins can read caregivers" on public.caregivers;
create policy "Admins can read caregivers"
on public.caregivers for select
to authenticated
using (public.is_ymca_admin());

drop policy if exists "Admins can read staff" on public.staff;
create policy "Admins can read staff"
on public.staff for select
to authenticated
using (public.is_ymca_admin());

drop policy if exists "Admins can read submissions" on public.submissions;
create policy "Admins can read submissions"
on public.submissions for select
to authenticated
using (public.is_ymca_admin());

drop policy if exists "Admins can update submissions" on public.submissions;
create policy "Admins can update submissions"
on public.submissions for update
to authenticated
using (public.is_ymca_admin())
with check (public.is_ymca_admin());

-- Replace this UUID if the logged browser user differs from this admin row.
insert into public.admin_profiles (user_id, full_name, role)
values ('9df690fd-7a09-4b59-81c4-e0ad299d70ec', 'Khali Phalah', 'admin')
on conflict (user_id) do update
set full_name = excluded.full_name,
    role = excluded.role;

select pg_notify('pgrst', 'reload schema');
