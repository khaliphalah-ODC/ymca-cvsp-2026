# YMCA Complaint & Suggestion System

Public QR intake and protected admin dashboard for Montserrado County YMCA.

## Setup

1. Install dependencies:

```sh
npm install
```

2. Create `frontend/.env` from `.env.example`.

3. In Supabase, run:

```sh
supabase/schema.sql
```

4. Create an admin user in Supabase Auth, then add their user id to `admin_profiles`.

5. Start development:

```sh
npm run dev
```

## Deployment

Set these environment variables in Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_PUBLIC_APP_URL`

Then deploy the `frontend` folder.

## Notes

Public submissions are anonymous by default and only admins listed in `admin_profiles` can read or update submissions. Ticket references are generated in the database to avoid collisions.
