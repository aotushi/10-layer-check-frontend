# Site 10-Layer Check Pages Frontend

Standalone Vue 3 frontend for Cloudflare Pages.

Backend Worker repository:

- `../03-web-app-shell`

Primary UI contract:

- `../docs/plans/ui-language/`
- `../docs/plans/ui-language/references/stitch_stitch_home_page_checklist/`

## Commands

- `npm run dev` starts Vite locally.
- `npm run typecheck` runs Vue and TypeScript checks.
- `npm run lint` runs ESLint.
- `npm run test:stories` builds Histoire stories.
- `npm run build` creates the Pages artifact in `dist/`.
- `npm run deploy:pages` deploys `dist/` to Cloudflare Pages.

## Page Status

| Page              | Route                    | Status   | Notes                                                                                                                                                                                |
| ----------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tech architecture | `/tech`                  | complete | Implemented as Hero, workflow pipeline, system architecture map, report artifact anatomy, and bounded trust CTA. Local checks passed: format, lint, build, and Histoire story build. |
| Report detail     | `/dashboard/reports/:id` | complete | Implemented as a product report shell using typed distilled sample data, visible evidence refs, missing data, Histoire story, and Playwright visual baselines.                       |
| Scan history      | `/dashboard/history`     | complete | Implemented as a product workspace with sidebar, compact summary strip, table-first scan history, state stories, long-domain handling, and report reopen action.                     |
| Auth pages        | `/login`, `/register`    | complete | Implemented as focused auth utility pages with minimal header, shared AuthForm, assurance panel, validation/loading/error states, and Histoire stories.                              |
