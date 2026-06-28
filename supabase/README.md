# Supabase setup — Nudo Journal

## Current state (June 2026)

- **Project ref**: `kgcfynzmvjzhxkrfttrk`
- **Site URL**: `https://www.nudo-lab.com`
- **Redirect allowlist**: `/auth/callback` on prod (www + apex) and localhost
- **Email delivery**: Resend SMTP via `smtp.resend.com:465`. Sender `Nudo Lab <noreply@nudo-lab.com>`. Region `ap-northeast-1` (Tokyo). Resend domain ID `7a395564-8300-4bf4-b68f-c6829811a997`.
- **Rate limit**: `rate_limit_email_sent = 100/hr` (raised from default 2/hr via Management API)
- **Custom mailer templates** stored in the Supabase Auth config — branded "For every first brews" confirmation + "Open your Nudo Journal" magic link. PATCHed via the Management API.

## Database schema

Table list (`supabase/migrations/0001_journal.sql`):

| Table | Purpose | RLS |
|---|---|---|
| `profiles` | extends `auth.users` with `display_name`, `timezone` | `auth.uid() = id` |
| `beans` | bean inventory: name, roaster, origin, process, roast_date, notes, photo_url | `auth.uid() = user_id` on every op |
| `brews` | brew log with method, dose, yield, time, grind, temp, rating, would-brew-again | `auth.uid() = user_id` on every op |

Auto-profile trigger fires on `auth.users` insert. Indexes on `(user_id, brewed_at desc)` and `(user_id, bean_id, brewed_at desc)` — the second one drives the "last brew of this bean" pre-fill that powers BrewForm's "what's different?" mustard callout.

## One-time, before building locally

1. **Pull the env vars**. From the Vercel dashboard or:
   ```bash
   vercel env pull .env.local
   ```
   The required vars are `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Copy `.env.example` if you need a template.

2. **The migration is already applied** to the live project. If you bootstrap a new project from scratch, open the SQL editor in the dashboard and paste `supabase/migrations/0001_journal.sql`, then Run.

## Cross-device magic links — important gotcha

The verify endpoints for clicking email links are at:

- `/verify/signup` — confirmation flow (hardcodes `verifyOtp({ type: 'signup' })`)
- `/verify/magic`  — returning-user magic link (hardcodes `type: 'magiclink'`)

They MUST live **outside the `/auth/*` namespace**. Supabase's mailer template engine silently rewrites query params on any URL path starting with `/auth/` — it strips your `type=signup` value and injects an empty `type=`. Confirmed by isolation testing: `/SENTINEL-PATH?token_hash=…&type=signup` survives untouched; `/auth/callback?…&type=signup` becomes `…&type=`.

So the email-template URLs look like:
```
{{ .SiteURL }}/verify/signup?token_hash={{ .TokenHash }}&amp;next=/account
{{ .SiteURL }}/verify/magic?token_hash={{ .TokenHash }}&amp;next=/account
```

No `type` query param (it's encoded in the path). Supabase doesn't touch the URL.

The existing `/auth/callback` is kept ONLY for the PKCE same-device `?code=…` flow. New flows should not use it.

## Editing the email templates

Free-tier projects using Supabase's default mailer can't customise templates. Custom SMTP unlocks template editing automatically — that's why we use Resend.

To edit templates, PATCH the Auth config via Management API. See `scripts/apply_templates_*.py` in scratchpad (or write a fresh script). Pattern:

```python
PATCH https://api.supabase.com/v1/projects/{ref}/config/auth
Body: {
  "mailer_subjects_confirmation": "...",
  "mailer_templates_confirmation_content": "<html>...</html>",
  "mailer_subjects_magic_link": "...",
  "mailer_templates_magic_link_content": "<html>...</html>"
}
```

**Propagation delay**: PATCH takes ~2-3 minutes before new emails reflect the change. Test immediately after a PATCH and you'll see the previous template — wait, then retry.

**Don't break these constraints**:
- Keep `{{ .TokenHash }}` in the URL
- Keep brand tokens (`#0D330E`, `#A3481A`, `#FDF8DE`, `#F1DAAE`, `#1A1A1A`)
- Keep the `日々` (hibi) kanji in the eyebrow with `lang="ja"`
- Keep the URL outside `/auth/*`
- Don't reintroduce "shipped from Singapore" in the footer (founder explicitly cut it 2026-06-28)

## Regenerating types

After any schema change, regenerate the TypeScript types:

```bash
supabase gen types typescript --project-id kgcfynzmvjzhxkrfttrk > types/database.ts
```

If you don't have the CLI installed, the hand-written `types/database.ts` keeps working as long as the schema matches.
