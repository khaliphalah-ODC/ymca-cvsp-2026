# YMCA Complaint & Suggestion System

Public QR intake and Supabase Auth-protected admin dashboard for Montserrado County YMCA.

## Setup

1. Install dependencies:

```sh
npm install
```

2. Create `frontend/.env` from `.env.example`:

```sh
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-public-publishable-key
VITE_PUBLIC_APP_URL=http://localhost:5173
```

3. In the Supabase SQL editor, run:

```sh
supabase/schema.sql
```

4. In Supabase Auth, create a staff/admin user with email and password.

5. Add that Auth user to `staff` and `admin_profiles` from the Supabase SQL editor:

```sql
insert into public.staff (auth_user_id, full_name, email, role, program_area)
values ('AUTH-USER-ID-HERE', 'YMCA Admin', 'admin@example.com', 'Administrator', 'General')
returning id;

insert into public.admin_profiles (user_id, staff_id, full_name, role)
values ('AUTH-USER-ID-HERE', 'STAFF-ID-FROM-ABOVE', 'YMCA Admin', 'admin');
```

6. Start development:

```sh
npm run dev
```

## Admin Access

Open:

```text
http://localhost:5173/admin/login
```

After sign-in, the app redirects to:

```text
http://localhost:5173/admin/dashboard
```

Protected admin pages:

- `/admin/dashboard`
- `/admin/submissions`
- `/admin/submissions/:id`
- `/admin/qr-codes`
- `/admin/cases`
- `/admin/settings`

## QR Submission Test

1. Sign in at `/admin/login`.
2. Open `/admin/qr-codes`.
3. Copy or scan a generated QR link such as:

```text
http://localhost:5173/submit?location=Front%20Desk
```

4. Submit a complaint or suggestion.
5. Confirm the ticket appears in `/admin/dashboard` and `/admin/submissions`.

## Minimal Test Plan

- Create a Supabase project.
- Run `supabase/schema.sql`.
- Enable email/password Auth.
- Create an admin user in Supabase Auth.
- Insert matching records into `staff` and `admin_profiles`.
- Visit `/admin/login`, sign in, and verify dashboard data loads.
- Open `/submit?location=Computer%20Lab`, submit a report, and verify it appears in the dashboard.
- Open a submission detail page and update status/internal note.

## Deployment

Set these environment variables in Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_PUBLIC_APP_URL`

Then deploy the `frontend` folder.

For Netlify, set the same environment variables in Site configuration. Use the real deployed URL for `VITE_PUBLIC_APP_URL`, for example:

```text
VITE_PUBLIC_APP_URL=https://your-site-name.netlify.app
```

The project includes `public/_redirects` so QR links like `/submit?location=Front%20Desk` open correctly on Netlify.

## Notes

Public users can submit through QR links but cannot read records. Only authenticated staff users listed in `admin_profiles` can read or update submissions.
