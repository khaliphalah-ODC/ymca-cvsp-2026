-- Make public tracking codes non-sequential and hard to guess.
-- ticket_ref remains the internal/admin case number. tracking_id is the public lookup code.

create extension if not exists pgcrypto with schema extensions;

create or replace function public.generate_tracking_code()
returns text
language plpgsql
set search_path = public
as $$
declare
  v_code text;
begin
  loop
    v_code := 'CVSP-' || upper(substr(encode(extensions.gen_random_bytes(5), 'hex'), 1, 5))
      || '-' || upper(substr(encode(extensions.gen_random_bytes(5), 'hex'), 1, 5));

    exit when not exists (
      select 1
      from public.submissions
      where tracking_id = v_code
    );
  end loop;

  return v_code;
end;
$$;

create or replace function public.set_submission_ticket_ref()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.ticket_ref is null or new.ticket_ref = '' then
    new.ticket_ref := 'YMCA-' || lpad(nextval('public.submission_ticket_seq')::text, 5, '0');
  end if;

  if new.tracking_id is null
    or new.tracking_id = ''
    or new.tracking_id = new.ticket_ref
    or new.tracking_id ~ '^YMCA-[0-9]+$'
  then
    new.tracking_id := public.generate_tracking_code();
  end if;

  return new;
end;
$$;

update public.submissions
set tracking_id = public.generate_tracking_code()
where tracking_id is null
   or tracking_id = ''
   or tracking_id = ticket_ref
   or tracking_id ~ '^YMCA-[0-9]+$';

alter table public.submissions
alter column tracking_id set not null;

create unique index if not exists submissions_tracking_id_idx
on public.submissions(tracking_id);

drop function if exists public.submit_program_feedback(text, boolean, jsonb, jsonb, jsonb, text, text, text, text, text);

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
returns table(ticket_ref text, tracking_id text, submission_id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_parent_id uuid;
  v_child_id uuid;
  v_caregiver_id uuid;
  v_ticket_ref text;
  v_tracking_id text;
  v_submission_id uuid;
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
  returning submissions.ticket_ref, submissions.tracking_id, submissions.id
  into v_ticket_ref, v_tracking_id, v_submission_id;

  return query select v_ticket_ref, v_tracking_id, v_submission_id;
end;
$$;

grant execute on function public.generate_tracking_code() to authenticated;
grant execute on function public.submit_program_feedback(text, boolean, jsonb, jsonb, jsonb, text, text, text, text, text) to anon, authenticated;

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
  limit 1;
$$;

grant execute on function public.track_submission(text) to anon, authenticated;

select pg_notify('pgrst', 'reload schema');
