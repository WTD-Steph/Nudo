# Supabase setup — Nudo Journal V1

## One-time, before building the journal locally

1. **Create the project** at <https://supabase.com/dashboard/projects/new>.
   - Suggested name: `nudo-lab-prod`
   - Region: closest to your fulfilment (Singapore) for latency to APAC traffic
2. **Run the migration**.
   - Easiest path: open the SQL editor in the dashboard and paste the contents
     of `supabase/migrations/0001_journal.sql`, then Run.
   - CLI path (if you have it set up):
     ```
     supabase link --project-ref <ref>
     supabase db push
     ```
3. **Grab the API credentials** from Project Settings → API:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Local dev** — copy `.env.example` to `.env.local` and paste the two
   values in.
5. **Vercel** — add the same two env vars to Project Settings →
   Environment Variables (Production + Preview).
6. **Auth → URL Configuration** in the dashboard:
   - Site URL: `https://www.nudo-lab.com`
   - Redirect URLs: add `http://localhost:3000/auth/callback`,
     `https://www.nudo-lab.com/auth/callback`,
     and (later) any Vercel preview pattern you want allowed.

## Email delivery

For V1 we use Supabase's built-in SMTP. It works but throttles hard
(2 emails/hour on free tier). Once you hand over a Resend API key
we'll switch — until then, this is fine for the MVP.

## Regenerating types

After any schema change, regenerate the TypeScript types:

```
supabase gen types typescript --project-id <ref> > types/database.ts
```

If you don't have the CLI installed, the hand-written `types/database.ts`
will keep working as long as the schema matches.
