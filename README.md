# Site 10-Layer Check Pages Frontend

Standalone Vue 3 frontend for Cloudflare Pages.

Backend Worker repository:

- `../03-web-app-shell`

Primary UI contract:

- `../docs/plans/ui-language/`
- `../docs/plans/ui-language/references/stitch_stitch_home_page_checklist/`

## Commands

- `npm run dev` starts Vite locally.
- `npm run format` checks Prettier formatting.
- `npm run format:write` writes Prettier formatting.
- `npm run typecheck` runs Vue and TypeScript checks.
- `npm run lint` runs ESLint.
- `npm run test:stories` builds Histoire stories.
- `npm run test:visual` runs Playwright screenshot regression tests.
- `npm run build` creates the Pages artifact in `dist/`.
- `npm run quality:push` runs the local pre-push gate.
- `npm run deploy:pages` deploys `dist/` to Cloudflare Pages.

## Quality Gates

Local hooks:

- `pre-commit` runs `lint-staged` on staged files.
- `pre-push` runs `npm run quality:push`.

Gate responsibilities:

- `pre-commit`: fast staged-file formatting and lint fixes.
- `pre-push`: `typecheck`, production `build`, and Histoire story build.
- GitHub Actions: complete clean-environment gate: `format`, `lint`, `typecheck`, `test:stories`, `build`, and `test:visual`.
- Cloudflare Pages deployment should happen only after the remote CI gate is green.

Playwright visual tests intentionally stay out of `pre-commit`; run them locally after UI changes and in CI before deployment.

## Page Status

| Page              | Route                    | Status   | Notes                                                                                                                                                                                |
| ----------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tech architecture | `/tech`                  | complete | Implemented as Hero, workflow pipeline, system architecture map, report artifact anatomy, and bounded trust CTA. Local checks passed: format, lint, build, and Histoire story build. |
| Report detail     | `/dashboard/reports/:id` | complete | Implemented as a product report shell using typed distilled sample data, visible evidence refs, missing data, Histoire story, and Playwright visual baselines.                       |
| Scan history      | `/dashboard/history`     | complete | Implemented as a product workspace with sidebar, compact summary strip, table-first scan history, state stories, long-domain handling, and report reopen action.                     |
| Auth pages        | `/login`, `/register`    | complete | Implemented as focused auth utility pages with minimal header, shared AuthForm, assurance panel, validation/loading/error states, and Histoire stories.                              |
| Case study detail | `/cases/:slug`           | complete | Implemented as a public proof page with lazy-loaded Markdown report content, table of contents, evidence boundaries, Histoire stories, and Playwright visual baselines.              |
