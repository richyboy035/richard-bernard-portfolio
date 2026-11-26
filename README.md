# Richard Bernard Portfolio

A premium, motion-ready portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Requirements

- Node.js 20.9+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Supabase backend setup

The portfolio uses Supabase for published project content, administrator authentication, project-image storage, and contact-message submissions.

### 1. Create a Supabase project

Create a Supabase project and copy the Project URL and Publishable key from the Connect dialog or Project Settings → API Keys.

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` (server-only; never prefix this with `NEXT_PUBLIC_`)

Add the same variables to the Vercel project environment settings, then redeploy.

### 2. Create the database

In Supabase → SQL Editor, run these files in order:

1. `supabase/migrations/202611250001_initial_schema.sql`
2. `supabase/migrations/20261126115351_tighten_project_policies_and_revoke_auto_enable_rpc.sql`
3. `supabase/seed.sql`

The migration creates the project table, private contact-message table, admin membership table, RLS policies, and public `project-media` storage bucket. The seed adds the five current product concepts as published records.

### 3. Create the administrator

In Supabase → Authentication → Users, create an account for the portfolio administrator. Copy that user's UUID, then run this in SQL Editor (replace the placeholder):

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID');
```

Only users in `public.admin_users` can use the CMS. Public sign-up is not exposed in this app.

### 4. Open the CMS

- Admin sign-in: `/admin/login`
- Dashboard: `/admin`

The CMS can create, edit, publish, unpublish, and delete projects; upload project cover images; and review/update the status of contact messages.

### 5. Contact form

The public contact form submits to `/api/contact`. The route validates fields, includes a hidden honeypot and a basic per-instance request limit, then writes using the server-only Supabase secret key. Contact messages are not readable by anonymous visitors.

The in-memory request limit is a lightweight baseline and can reset between serverless instances. For a public high-volume launch, add a distributed rate limiter and CAPTCHA/Turnstile.

## Project data and fallback

If Supabase is not configured or the public project query is unavailable, the site continues to render the existing local project data. Once the migration and environment variables are in place, published Supabase projects power the public project cards. Draft projects remain private to admins.

## Project structure

- `app/` — Next.js App Router pages and API routes
- `components/` — reusable UI
- `components/admin/` — private CMS interface
- `data/` — local fallback content
- `lib/supabase/` — browser/server clients and database types
- `supabase/` — SQL migration and seed data
- `public/` — static assets and downloadable CV

## Notes

- Never commit `.env.local` or expose the Supabase secret key in browser code.
- Admin access is enforced by Supabase Auth, the `admin_users` allowlist, and database RLS policies.
- Public visitors can read published projects only.
