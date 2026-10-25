# Scaffold notes

## Approved plan

1. Inspect the existing deployment simulator for stack and layout conventions.
2. Create a separate, minimal Next.js/TypeScript/Tailwind app with Supabase and
   server-only AI integration boundaries.
3. Keep browser smoke tests and setup documentation; install
   dependencies and validate without contacting database or AI services.

Follow-up: remove all unit tests and the Vitest dependency, configuration,
test-only stub, and scripts at the user's request. Browser tests remain.

## Assumptions and edge cases

- Destination: `factory/ai-web-app`; leave the simulator unchanged.
- No requirements are known, so do not invent tables or product workflows.
- Missing credentials must not prevent the homepage, health route, or build.
- Invalid configuration fails only when its integration is requested, with
  errors that do not include supplied credential values.
- Browser code receives only Supabase public configuration. AI config is
  protected with `server-only`.
- The current Supabase SDK requires Node 22. Use `.nvmrc`; the system's
  Node 20.10 is not the supported runtime for this project.
- Supabase cookie clients are foundations, not a complete authentication flow.
- Dependency installation is authorized; provisioning databases, making live AI
  calls, or deploying anything is not part of this task.

## Remaining work

- Receive requirements and implement the smallest first feature with a test.
- Select the auth/access model and schema before storing any user data.
- Connect Supabase and an AI provider only when those features need them.

## Dependency compatibility

The reference's App Router architecture is retained, but this scaffold uses
Next.js 16 and React 19. The initial Next.js 15 setup inherited published
PostCSS advisories, so the patched Next.js 16 release is used instead of a
dependency override. ESLint uses the framework's native flat configuration.

Tailwind 4 is used instead of the reference project's Tailwind 3 to avoid the
older selector-parser dependency's advisories. Styling uses the v4 PostCSS
plugin and CSS-first configuration, so no legacy Tailwind config is needed.

ESLint 9 is retained because Next's import, React, and accessibility plugins
declare ESLint 9 support, not ESLint 10. npm emits a deprecation warning for
ESLint 9; upgrade when those plugins support the next major. Do not bypass peer
dependency checks to suppress this compatibility constraint.

## Validation

Validated on 2026-10-25 with a temporary Node 22.23.4 / npm 10.9.9 runtime.
The global Node installation was not changed.

```text
npm ci               passed, reproducible clean installation
npm run typecheck    passed
npm run lint         passed
npm run test:e2e     2 tests passed (Chromium)
npm run build        passed (Next.js 16.4.3)
npm audit            found 0 vulnerabilities
```

Inherited dependency audit failures were corrected.
The final install has no peer-dependency conflicts;
the ESLint 9 deprecation warning described above remains.

Intentionally not run: Supabase/Docker startup, migrations against a real
database, real login flows, live AI requests/evaluations, or deployment.
These require future product requirements and credentials. Network usage was
limited to dependency metadata, installation, and security audits.

Reviewed the final workspace changes: all task files are inside `ai-web-app/`.
Existing workspace instructions and the reference simulator were not modified.

After the unit-test cleanup, dependency installation removed 26 unused
packages. `npm run check`, both browser smoke tests, and the production build
passed again. Confirmed that the package files and README have no remaining
Vitest references, and `tests/` contains only `e2e/` and `evals/`.
