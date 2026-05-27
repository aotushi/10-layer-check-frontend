# 04-pages-frontend

This is the standalone Cloudflare Pages frontend for Site 10-Layer Check.

- Use Vue 3, Vite, TypeScript, and Composition API with `<script setup>`.
- Keep the backend in `../03-web-app-shell` separate from this repo.
- Use `../docs/plans/ui-language/` as the local UI contract.
- Treat `../docs/plans/ui-language/references/stitch_stitch_home_page_checklist/` as the primary Home design reference.
- Do not paste Stitch `code.html` directly into production components; translate it into Vue components and project tokens.
- Do not run remote database mutations, including any `wrangler d1 --remote` command, without explicit user approval.
