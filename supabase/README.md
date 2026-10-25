# Supabase

No remote project, tables, policies, storage buckets, or seed data have been
created. The app starts without Supabase credentials.

## Connect a hosted project

1. Create or choose a Supabase project yourself.
2. Put its URL and **publishable** key (or legacy anon key) into `.env.local`.
3. Create migrations with the Supabase CLI:
   `npx supabase migration new initial_schema`.
4. Review SQL before applying it to any database.
5. Generate types after creating tables:
   `npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts`.

Those commands are instructions, not actions performed by the scaffold.
The CLI requires a separate installation/download when first used.

## Optional local database

With Docker running, use `npx supabase start` from the app root, then copy the
local URL and public key into `.env.local`. Use `npx supabase gen types typescript
--local > src/types/database.ts` after applying local migrations.
Stop it with `npx supabase stop` when finished. Default local ports can conflict
with other Supabase projects; change `config.toml` if necessary.

## Security and auth

- Enable RLS on every exposed table and add explicit ownership-based policies
  in the same migration. Test both permitted and denied access.
- Browser and server helpers use the public key and respect RLS.
- Never put a secret/service-role key in public configuration. No privileged
  client is included.
- The server helper bridges cookies, but login, logout, callback routes, session
  refresh proxy, and route authorization are intentionally not implemented.
  Complete those before shipping authenticated features.
- In Route Handlers, pass a `Headers` object to `createClient(headers)` and
  include it on the returned response so refresh cache-control headers are
  preserved. The session refresh proxy must also forward the SDK's response
  headers. Never cache authenticated responses publicly.
- Verify identity server-side with `auth.getUser()` or verified claims, not an
  unverified `getSession()` result.
