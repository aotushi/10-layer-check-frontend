import '@/styles/main.css'

import type { App } from 'vue'

import { router } from '@/router'

export function setupVue3({ app }: { app: App }) {
  app.use(router)
}
