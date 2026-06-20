-- YMCA Complaint & Suggestion System
-- Target schema for the parent / child / caregiver program-participant model.
-- Run this in the Supabase SQL editor before connecting the frontend.
--
-- If you already ran an older schema that only had public.submissions,
-- use a fresh Supabase project while developing, or create a separate data
-- migration before running this in production.

create extension if not exists pgcrypto;

create sequence if not exists public.submission_ticket_seq start 1;

create table if not exists public.staff (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  role text not null,
  program_area text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  staff_id uuid references public.staff(id) on delete set null,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'reviewer')),
  created_at timestamptz not null default now()
);

create table if not exists public.parents (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  phone text,
  email text,
  number_of_children_in_program integer not null check (number_of_children_in_program > 0),
  program_name text not null,
  child_context text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  age_group text,
  program_group text,
  program_name text not null,
  follow_up_preference boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caregivers (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  phone text,
  email text,
  program_name text not null,
  supervision_role text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  ticket_ref text not null unique,
  submitted_by_type text not null check (submitted_by_type in ('parent', 'child', 'caregiver')),
  is_anonymous boolean not null default false,
  parent_id uuid references public.parents(id) on delete restrict,
  child_id uuid references public.children(id) on delete restrict,
  caregiver_id uuid references public.caregivers(id) on delete restrict,
  assigned_staff_id uuid references public.staff(id) on delete set null,
  type text not null check (type in ('complaint', 'suggestion')),
  category text not null check (category in ('safety', 'staff', 'facilities', 'program', 'other')),
  urgency text not null default 'medium' check (urgency in ('low', 'medium', 'high', 'critical')),
  message text not null check (char_length(trim(message)) >= 10),
  location text not null default 'unknown',
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved')),
  admin_note text,
  reviewed_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint submissions_one_submitter_check check (
    (submitted_by_type = 'parent' and parent_id is not null and child_id is null and caregiver_id is null)
    or
    (submitted_by_type = 'child' and child_id is not null and parent_id is null and caregiver_id is null)
    or
    (submitted_by_type = 'caregiver' and caregiver_id is not null and parent_id is null and child_id is null)
  )
);

create index if not exists staff_auth_user_id_idx on public.staff(auth_user_id);
create index if not exists staff_program_area_idx on public.staff(program_area);
create index if not exists parents_program_name_idx on public.parents(program_name);
create index if not exists children_program_name_idx on public.children(program_name);
create index if not exists caregivers_program_name_idx on public.caregivers(program_name);
create index if not exists submissions_ticket_ref_idx on public.submissions(ticket_ref);
create index if not exists submissions_submitter_type_idx on public.submissions(submitted_by_type);
create index if not exists submissions_status_idx on public.submissions(status);
create index if not exists submissions_category_idx on public.submissions(category);
create index if not exists submissions_urgency_idx on public.submissions(urgency);
create index if not exists submissions_created_at_idx on public.submissions(created_at desc);
create index if not exists submissions_assigned_staff_idx on public.submissions(assigned_staff_id);

create or replace function public.set_submission_ticket_ref()
returns trigger
language plpgsql
as $$
begin
  if new.ticket_ref is null or new.ticket_ref = '' then
    new.ticket_ref := 'YMCA-' || lpad(nextval('public.submission_ticket_seq')::text, 5, '0');
  end if;
  return new;
end;
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.touch_submission_timestamps()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();

  if new.status = 'in_progress' and old.status = 'open' and new.reviewed_at is null then
    new.reviewed_at := now();
  end if;

  if new.status = 'resolved' and old.status <> 'resolved' and new.resolved_at is null then
    new.resolved_at := now();
  end if;

  return new;
end;
$$;

drop trigger if exists staff_touch_before_update on public.staff;
create trigger staff_touch_before_update
before update on public.staff
for each row execute function public.touch_updated_at();

drop trigger if exists parents_touch_before_update on public.parents;
create trigger parents_touch_before_update
before update on public.parents
for each row execute function public.touch_updated_at();

drop trigger if exists children_touch_before_update on public.children;
create trigger children_touch_before_update
before update on public.children
for each row execute function public.touch_updated_at();

drop trigger if exists caregivers_touch_before_update on public.caregivers;
create trigger caregivers_touch_before_update
before update on public.caregivers
for each row execute function public.touch_updated_at();

drop trigger if exists submissions_ticket_ref_before_insert on public.submissions;
create trigger submissions_ticket_ref_before_insert
before insert on public.submissions
for each row execute function public.set_submission_ticket_ref();

drop trigger if exists submissions_touch_before_update on public.submissions;
create trigger submissions_touch_before_update
before update on public.submissions
for each row execute function public.touch_submission_timestamps();

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

create or replace function public.submit_program_feedback(
  p_submitted_by_type text,
  p_is_anonymous boolean,
  p_parent jsonb default '{}'::jsonb,
  p_child jsonb default '{}'::jsonb,
  p_caregiver jsonb default '{}'::jsonb,
  p_type text default 'complaint',
  p_category text default 'other',
  p_urgency text default 'medium',
  p_message text default '',
  p_location text default 'unknown'
)
returns table(ticket_ref text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_parent_id uuid;
  v_child_id uuid;
  v_caregiver_id uuid;
  v_ticket_ref text;
begin
  if p_submitted_by_type not in ('parent', 'child', 'caregiver') then
    raise exception 'Invalid submitter type';
  end if;

  if char_length(trim(p_message)) < 10 then
    raise exception 'Message must be at least 10 characters';
  end if;

  if p_submitted_by_type = 'parent' then
    insert into public.parents (
      full_name,
      phone,
      email,
      number_of_children_in_program,
      program_name,
      child_context
    )
    values (
      nullif(p_parent ->> 'full_name', ''),
      nullif(p_parent ->> 'phone', ''),
      nullif(p_parent ->> 'email', ''),
      coalesce(nullif(p_parent ->> 'number_of_children_in_program', '')::integer, 1),
      coalesce(nullif(p_parent ->> 'program_name', ''), 'Unknown Program'),
      nullif(p_parent ->> 'child_context', '')
    )
    returning id into v_parent_id;
  elsif p_submitted_by_type = 'child' then
    insert into public.children (
      full_name,
      age_group,
      program_group,
      program_name,
      follow_up_preference
    )
    values (
      nullif(p_child ->> 'full_name', ''),
      nullif(p_child ->> 'age_group', ''),
      nullif(p_child ->> 'program_group', ''),
      coalesce(nullif(p_child ->> 'program_name', ''), 'Unknown Program'),
      coalesce((p_child ->> 'follow_up_preference')::boolean, false)
    )
    returning id into v_child_id;
  elsif p_submitted_by_type = 'caregiver' then
    insert into public.caregivers (
      full_name,
      phone,
      email,
      program_name,
      supervision_role
    )
    values (
      nullif(p_caregiver ->> 'full_name', ''),
      nullif(p_caregiver ->> 'phone', ''),
      nullif(p_caregiver ->> 'email', ''),
      coalesce(nullif(p_caregiver ->> 'program_name', ''), 'Unknown Program'),
      coalesce(nullif(p_caregiver ->> 'supervision_role', ''), 'Program Caregiver')
    )
    returning id into v_caregiver_id;
  end if;

  insert into public.submissions (
    submitted_by_type,
    is_anonymous,
    parent_id,
    child_id,
    caregiver_id,
    type,
    category,
    urgency,
    message,
    location
  )
  values (
    p_submitted_by_type,
    p_is_anonymous,
    v_parent_id,
    v_child_id,
    v_caregiver_id,
    p_type,
    p_category,
    p_urgency,
    p_message,
    coalesce(nullif(p_location, ''), 'unknown')
  )
  returning submissions.ticket_ref into v_ticket_ref;

  return query select v_ticket_ref;
end;
$$;

grant execute on function public.submit_program_feedback(text, boolean, jsonb, jsonb, jsonb, text, text, text, text, text) to anon, authenticated;

alter table public.staff enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.parents enable row level security;
alter table public.children enable row level security;
alter table public.caregivers enable row level security;
alter table public.submissions enable row level security;

drop policy if exists "Public can create parent context" on public.parents;
create policy "Public can create parent context"
on public.parents for insert
to anon
with check (true);

drop policy if exists "Public can create child context" on public.children;
create policy "Public can create child context"
on public.children for insert
to anon
with check (true);

drop policy if exists "Public can create caregiver context" on public.caregivers;
create policy "Public can create caregiver context"
on public.caregivers for insert
to anon
with check (true);

drop policy if exists "Public can submit feedback" on public.submissions;
create policy "Public can submit feedback"
on public.submissions for insert
to anon
with check (
  status = 'open'
  and assigned_staff_id is null
  and admin_note is null
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

-- After creating an admin/staff user in Supabase Auth, run this with their user id:
--
-- insert into public.staff (auth_user_id, full_name, email, role, program_area)
-- values ('00000000-0000-0000-0000-000000000000', 'YMCA Admin', 'admin@example.com', 'Administrator', 'General')
-- returning id;
--
-- insert into public.admin_profiles (user_id, staff_id, full_name, role)
-- values ('00000000-0000-0000-0000-000000000000', 'STAFF-ID-FROM-ABOVE', 'YMCA Admin', 'admin');
