-- Final production repair for CVSP feedback/ticketing.
-- Run this once in Supabase SQL Editor to align the live database with the app.

create extension if not exists pgcrypto;

alter table public.staff
add column if not exists auth_user_id uuid unique references auth.users(id) on delete set null,
add column if not exists phone text,
add column if not exists program_area text,
add column if not exists is_active boolean not null default true,
add column if not exists updated_at timestamptz not null default now();

alter table public.admin_profiles
add column if not exists staff_id uuid references public.staff(id) on delete set null,
add column if not exists avatar_url text;

alter table public.submissions
add column if not exists tracking_id text,
add column if not exists resolution_notes text;

update public.submissions
set tracking_id = coalesce(nullif(tracking_id, ''), ticket_ref)
where tracking_id is null or tracking_id = '';

alter table public.submissions
alter column tracking_id set not null;

create unique index if not exists submissions_tracking_id_idx on public.submissions(tracking_id);

alter table public.submissions
drop constraint if exists submissions_status_check;

update public.submissions
set status = case status
  when 'open' then 'Submitted'
  when 'in_progress' then 'In Progress'
  when 'resolved' then 'Resolved'
  else status
end;

alter table public.submissions
alter column status set default 'Submitted';

alter table public.submissions
add constraint submissions_status_check check (
  status in ('Submitted', 'Under Review', 'In Progress', 'Resolved', 'Closed')
);

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

create or replace function public.set_submission_ticket_ref()
returns trigger
language plpgsql
as $$
begin
  if new.ticket_ref is null or new.ticket_ref = '' then
    new.ticket_ref := 'YMCA-' || lpad(nextval('public.submission_ticket_seq')::text, 5, '0');
  end if;

  if new.tracking_id is null or new.tracking_id = '' then
    new.tracking_id := new.ticket_ref;
  end if;

  return new;
end;
$$;

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
    count(*) filter (where status in ('Submitted', 'Under Review', 'In Progress'))::bigint as open_cases,
    count(*) filter (where status = 'In Progress')::bigint as in_progress,
    count(*) filter (where status in ('Resolved', 'Closed'))::bigint as resolved,
    count(*) filter (where urgency = 'critical' and status not in ('Resolved', 'Closed'))::bigint as critical_issues
  from public.submissions
  where public.is_ymca_admin();
$$;

drop function if exists public.get_recent_submissions(integer);

create or replace function public.get_recent_submissions(limit_count integer default 10)
returns table(
  id uuid,
  ticket_ref text,
  tracking_id text,
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
    s.tracking_id,
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

create or replace function public.track_submission(lookup_tracking_id text)
returns table(
  tracking_id text,
  submission_type text,
  status text,
  resolution_notes text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    s.tracking_id,
    s.type as submission_type,
    s.status,
    s.resolution_notes,
    s.created_at,
    s.updated_at
  from public.submissions s
  where upper(s.tracking_id) = upper(trim(lookup_tracking_id))
     or upper(s.ticket_ref) = upper(trim(lookup_tracking_id))
  limit 1;
$$;

grant execute on function public.is_ymca_admin() to authenticated;
grant execute on function public.get_submission_stats() to authenticated;
grant execute on function public.get_recent_submissions(integer) to authenticated;
grant execute on function public.track_submission(text) to anon, authenticated;

drop policy if exists "Public can submit feedback" on public.submissions;
create policy "Public can submit feedback"
on public.submissions for insert
to anon
with check (
  status = 'Submitted'
  and assigned_staff_id is null
  and admin_note is null
  and resolution_notes is null
  and reviewed_at is null
  and resolved_at is null
);

drop policy if exists "Admins can read staff" on public.staff;
create policy "Admins can read staff"
on public.staff for select
to authenticated
using (public.is_ymca_admin());

drop policy if exists "Admins can manage staff" on public.staff;
create policy "Admins can manage staff"
on public.staff for all
to authenticated
using (public.is_ymca_admin())
with check (public.is_ymca_admin());

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

drop policy if exists "Admins can update submissions" on public.submissions;
create policy "Admins can update submissions"
on public.submissions for update
to authenticated
using (public.is_ymca_admin())
with check (public.is_ymca_admin());

select pg_notify('pgrst', 'reload schema');
