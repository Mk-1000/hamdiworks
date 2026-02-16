# Supabase setup

If you see **404 (Not Found)** in the browser console for `/rest/v1/hero`, etc., the database tables do not exist yet. Create them as follows:

## 1. Create a project

Go to [supabase.com](https://supabase.com) → your project (or create one).

## 2. Create tables and RLS

1. In the Supabase dashboard, open **SQL Editor**.
2. Click **New query**.
3. Copy the **entire** contents of `supabase/migrations/001_schema.sql` from this repo and paste into the editor.
4. Click **Run** (or press Ctrl+Enter). You should see "Success. No rows returned."
5. Run `supabase/migrations/002_storage_bucket.sql` the same way to create the **portfolio** storage bucket and its RLS policies (used for hero and project image uploads).
6. Run `supabase/migrations/003_platform_settings.sql` to create the **platform_settings** table (platform name, favicon, logos, color palette for the central config panel).

## 3. Seed initial content

1. In the SQL Editor, open another **New query**.
2. Copy the **entire** contents of `supabase/seed.sql` and paste into the editor.
3. Click **Run**. You should see "Success" and the seed inserts.

## 4. Create an admin user

1. Go to **Authentication** → **Users**.
2. Click **Add user** → **Create new user**.
3. Enter **Email** and **Password**, then **Create user**.
4. Use this email and password to sign in at your app’s `/admin/login` (e.g. `http://localhost:5173/admin/login`).

## 5. Env vars

Ensure `.env` in the project root has (from **Settings** → **API** in Supabase):

- `VITE_SUPABASE_URL` = Project URL (e.g. `https://xxxxx.supabase.co`)
- `VITE_SUPABASE_ANON_KEY` = anon public key (not the `service_role` key)

Restart the dev server after changing `.env`.
