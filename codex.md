# CODEX.md - YMCA Complaint & Suggestion System

This file is the project source of truth. Keep it accurate as the app changes.

## Project

The YMCA Complaint & Suggestion System lets YMCA program-related parents, children, and caregivers submit complaints or suggestions by scanning a QR code. YMCA staff organize the programs, review submissions, assign follow-up, and resolve issues through a protected dashboard.

Client: Montserrado County YMCA, Monrovia, Liberia.

This is not a general public or visitor complaint box. Submissions are limited to:
- Parents with children in a YMCA program
- Children participating in a YMCA program
- Caregivers supervising children during YMCA program activities

Caregivers are not treated as relatives of the children. In this system, caregivers are program supervisors or helpers who look after children during the program.

## Current Implementation

The application lives in `frontend/`.

Stack:
- Vue 3 and Vite
- `@supabase/supabase-js`
- Supabase Postgres, Auth, and Row Level Security
- Plain responsive CSS
- Vercel-ready environment variables

The current app is being revised toward the target architecture below. When the code and this document disagree, this document is the intended direction.

## User Flows

Public submission flow:
- User scans a QR code.
- URL includes `?location=...`.
- One form asks: `I am a: Parent / Child / Caregiver`.
- The form asks with a Yes/No toggle: `Do you want to submit anonymously?`.
- Default anonymous answer is `No`.
- The form changes fields based on whether the submitter is a parent, child, or caregiver.
- The database generates a unique ticket reference like `YMCA-00001`.
- User receives a confirmation page with the ticket reference.

Admin/staff flow:
- Staff/admin signs in with Supabase Auth.
- Dashboard shows totals, status counts, category picture, recent submissions, filters, and detail view.
- Staff/admin can review submissions, assign responsible staff, update status, and add internal notes.

## Form Requirements

Use one route/form, not three separate pages.

First question:
```text
I am a:
- Parent
- Child
- Caregiver
```

Anonymous toggle:
```text
Do you want to submit anonymously?
- No
- Yes
```

Rules:
- Default is `No`.
- Anonymous mode hides or makes optional identifying fields.
- Anonymous mode still records submitter type and non-identifying program context.
- Public submitter types are only `parent`, `child`, and `caregiver`.
- Staff are not public submitters in this flow.

### Parent Form

Parent form fields:
- Parent name/contact unless anonymous
- Number of children the parent has in the program
- Program name
- Optional child-related context
- Complaint or suggestion type
- Category
- Urgency
- Message
- QR location

### Child Form

Child form fields:
- Child name, optional or controlled by YMCA policy
- Age group or program group
- Program name
- Complaint or suggestion type
- Category
- Urgency
- Message
- Follow-up preference
- QR location

Do not require direct phone or email from children by default unless YMCA leadership approves that policy.

### Caregiver Form

Caregiver form fields:
- Caregiver name/contact unless anonymous
- Program name
- Supervision role
- Complaint or suggestion type
- Category
- Urgency
- Message
- QR location

Do not use `relationship_to_child` for caregivers. Caregivers are program supervisors, not relatives.

## Target Data Model

Run `frontend/supabase/schema.sql` in the Supabase SQL editor after it is updated to match this target model.

### `parents`

Stores parent context.

Fields:
- `id`
- identity/contact fields, nullable when anonymous
- `number_of_children_in_program`
- `program_name`
- optional child-related context
- `created_at`
- `updated_at`

### `children`

Stores child participant context.

Fields:
- `id`
- child identity/context fields, nullable when anonymous or policy requires
- `age_group` or `program_group`
- `program_name`
- no direct contact requirement by default
- `created_at`
- `updated_at`

### `caregivers`

Stores caregiver/program supervisor context.

Fields:
- `id`
- identity/contact fields, nullable when anonymous
- `program_name`
- `supervision_role`
- `created_at`
- `updated_at`

Caregiver records must not use `relationship_to_child`.

### `staff`

Stores internal YMCA staff who organize programs and respond to submissions.

Fields:
- `id`
- full name/contact fields
- `role`
- `program_area`
- `is_active`
- `created_at`
- `updated_at`

Staff are internal users/responders, not public submitters.

### `submissions`

Stores complaint/suggestion tickets.

Fields:
- `id`
- `ticket_ref`
- `submitted_by_type`: `parent | child | caregiver`
- `is_anonymous`
- `parent_id`, nullable
- `child_id`, nullable
- `caregiver_id`, nullable
- `assigned_staff_id`, nullable
- `type`: `complaint | suggestion`
- `category`
- `urgency`
- `message`
- `location`
- `status`
- `admin_note`
- `reviewed_at`
- `resolved_at`
- `created_at`
- `updated_at`

Submission link rule:
- Parent submission must link to `parent_id`.
- Child submission must link to `child_id`.
- Caregiver submission must link to `caregiver_id`.
- Only one of `parent_id`, `child_id`, or `caregiver_id` should be filled per submission.

## Security And Privacy

This system may receive sensitive information about children. Treat privacy and safeguarding as core product requirements.

Rules:
- Public users can submit records but cannot read any records.
- Ticket numbers are generated by the database, not the frontend.
- Admin/staff access is protected by Supabase Auth and RLS.
- Anonymous submissions must not require identifying fields.
- Anonymous submissions must still preserve enough non-identifying program context for follow-up.
- Serious safeguarding concerns should also be escalated directly to YMCA leadership immediately, not handled only through the dashboard.

## Environment

Copy `frontend/.env.example` to `frontend/.env` and fill in:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-public-publishable-key
VITE_PUBLIC_APP_URL=https://your-deployed-site.vercel.app
```

The publishable key is public, but RLS must stay enabled.

Do not put the direct PostgreSQL connection string in frontend code, `.env.example`, GitHub, or browser-exposed environment variables.

## Routes

Target routes:
- `/` or `/submit` - one dynamic public submission form
- `/success/:ticket` - confirmation page
- `/admin` - staff/admin login
- `/admin/dashboard` - dashboard overview
- `/admin/submissions` - filtered submission list
- `/admin/qr-codes` - QR location links

## QR Locations

Current locations:
- main entrance
- front desk
- sports field
- notice board
- youth program room

QR codes should point to the one public form with a location query parameter, for example:

```text
/submit?location=main-entrance
/submit?location=sports-field
/submit?location=youth-program-room
```

## Next Implementation Steps

High-value next steps:
- Update `frontend/supabase/schema.sql` to match the target tables.
- Update the Vue form to use the Parent / Child / Caregiver selector.
- Add the anonymous Yes/No toggle.
- Add parent `number_of_children_in_program`.
- Remove visitor, staff submitter, and prefer-not-to-say submitter options from the app.
- Update admin dashboard filters for submitter type, urgency, category, program, staff assignment, and status.
- Add downloadable QR code images.
- Add CSV export for monthly reporting.
- Add admin/staff activity history.
- Add email/SMS alerts for `safeguarding` and `urgent` submissions.
- Add a visible privacy statement approved by YMCA leadership.
- Add automated tests before wide deployment.

Last updated: June 19, 2026.
