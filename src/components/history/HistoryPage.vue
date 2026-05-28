<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AppButton from '@/components/base/AppButton.vue'
import ProductShell, { type ProductShellNavItem } from '@/components/shell/ProductShell.vue'
import { sampleHistoryPage } from '@/content/historyPage'

import HistorySummaryStrip from './HistorySummaryStrip.vue'
import HistoryTable from './HistoryTable.vue'

const page = sampleHistoryPage
const historyNavItems: ProductShellNavItem[] = [
  { to: '/dashboard/history', label: 'History', current: true },
  { to: '/dashboard/reports/sample-overreacted', label: 'Sample report' },
  { to: '/', label: 'New scan' },
]
</script>

<template>
  <ProductShell
    navigation-label="History workspace navigation"
    :nav-items="historyNavItems"
    session-label="Signed in as"
    :session-value="page.userEmail"
  >
    <template #session-actions>
      <button type="button">Logout</button>
    </template>

    <template #mobilebar>
      <RouterLink to="/">New scan</RouterLink>
    </template>

    <section class="history-page" aria-labelledby="history-title">
      <header class="history-page__header">
        <div>
          <p class="history-page__kicker">Workspace</p>
          <h1 id="history-title">Scan history</h1>
          <p class="history-page__description">
            Reopen saved diagnostic runs, inspect report availability, and keep partial or failed
            scans explicit.
          </p>
        </div>
        <div class="history-page__actions">
          <AppButton variant="ghost">Refresh</AppButton>
          <RouterLink class="history-page__primary-action" to="/">New scan</RouterLink>
        </div>
      </header>

      <HistorySummaryStrip :items="page.summary" />
      <HistoryTable :rows="page.records" />
    </section>
  </ProductShell>
</template>

<style scoped>
.history-page {
  display: grid;
  gap: 18px;
  width: min(100%, 1180px);
  min-width: 0;
  margin: 0 auto;
  padding: 30px 32px 42px;
}

.history-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 24px;
}

.history-page__kicker {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.history-page h1 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1;
}

.history-page__description {
  max-width: 660px;
  margin: 14px 0 0;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.55;
}

.history-page__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
}

.history-page__primary-action {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: var(--ink-inverse);
  padding: 0 18px;
  font-size: 13px;
  font-weight: 800;
}

.history-page__primary-action:hover {
  background: var(--primary-hover);
}

@media (max-width: 720px) {
  .history-page {
    gap: 14px;
    padding: 18px var(--page-gutter) 30px;
  }

  .history-page__header {
    flex-direction: column;
    padding: 18px;
  }

  .history-page__actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .history-page__actions > * {
    flex: 1 1 150px;
  }

  .history-page__primary-action {
    min-height: 40px;
  }
}

@media (max-width: 480px) {
  .history-page h1 {
    font-size: 32px;
  }

  .history-page__description {
    font-size: 13px;
  }
}
</style>
