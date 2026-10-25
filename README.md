# AI Web App

An intentionally empty app scaffold based on the deployment simulator's
architecture, without its product code, data, secrets, or paused test scripts.

## Stack

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, Zod,
Supabase JS + SSR clients and Playwright. Node **22.14 or newer within
the Node 22 release line** is required.

## Start coding

From this directory:

```bash
nvm install
nvm use
npm ci
npm run dev
```

If you do not use nvm, install a compatible Node 22 runtime another way.
Alternatively, use a temporary runtime without changing your global Node:

```bash
npx --yes --package=node@22 --package=npm@10 --call 'npm run dev'
```

Open http://localhost:3000. No environment file, AI key, or running database
is needed for the homepage and `/api/health`.

When needed, copy `.env.example` to `.env.local` and fill in only the relevant
values. Never commit `.env.local`. Public environment variables are embedded at
build time, so rebuild after changing them in a deployed app.

## Structure

```text
src/
  app/                 Pages, layouts, styles, and server API routes
    api/health/        Liveness only, not a database/provider readiness check
  components/ui/       Reusable UI components, empty initially
  lib/
    ai/                Server-only AI configuration and future provider adapters
    supabase/          Browser and request-scoped server clients
    env.ts             Public configuration, validated only when requested
    env.server.ts      Server-only AI configuration, validated on demand
  types/database.ts    Empty placeholder for generated Supabase types
supabase/              Local configuration and an empty migrations directory
prompts/               Future versioned prompt templates
tests/
  e2e/                 Homepage and health smoke tests
  evals/               Future synthetic AI evaluation fixtures
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create a production build |
| `npm start` | Serve a production build |
| `npm run typecheck` | Check app, configuration, and test types |
| `npm run lint` | Run ESLint, with warnings treated as failures |
| `npm run check` | Typecheck and lint |
| `npm run test:e2e` | Run browser/API smoke tests on loopback port 3100 |

Before the first browser test, run `npx playwright install chromium`.
Playwright starts and stops its own development server; leave port 3100 free.
The tests do not call Supabase or an AI provider.

## Configuration

| Variable | Visibility | Needed when |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Calling a Supabase client |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public | Calling a Supabase client |
| `OPENAI_API_KEY` | Server-only | Calling the future AI integration |
| `AI_MODEL` | Server-only | Selecting a model for that integration |

A legacy Supabase anon key can be used in the publishable-key variable. Do not
use a secret/service-role key there. Neither privileged database access nor a
live AI SDK is included. See `supabase/README.md` and `src/lib/ai/README.md`.

## What waits for requirements

- Product pages, workflows, API contracts, and database tables.
- Authentication, a session refresh proxy, and authorization.
- RLS policies and tests, added with the first schema migration.
- Provider/model selection, prompts, streaming, and structured output schemas.
- Per-user rate limits, request limits, timeouts, and AI cost budgets.
- Privacy-safe observability, data retention/deletion, and deployment/CI.
- Retrieval, vectors, storage, background jobs, or payments only if needed.

Before a public deployment, complete the relevant security controls rather
than treating this scaffold as a production-ready application. No external
resources have been provisioned.
