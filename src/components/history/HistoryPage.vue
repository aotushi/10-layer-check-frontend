<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AppButton from '@/components/base/AppButton.vue'
import { sampleHistoryPage } from '@/content/historyPage'

import HistorySummaryStrip from './HistorySummaryStrip.vue'
import HistoryTable from './HistoryTable.vue'

const page = sampleHistoryPage
</script>

<template>
  <main class="history-shell">
    <aside class="history-shell__sidebar" aria-label="History workspace navigation">
      <RouterLink class="history-shell__brand" to="/">10-Layer Check</RouterLink>
      <nav class="history-shell__nav">
        <RouterLink to="/dashboard/history" aria-current="page">History</RouterLink>
        <RouterLink to="/dashboard/reports/sample-overreacted">Sample report</RouterLink>
        <RouterLink to="/">New scan</RouterLink>
      </nav>
      <div class="history-shell__session">
        <span>Signed in as</span>
        <strong>{{ page.userEmail }}</strong>
        <button type="button">Logout</button>
      </div>
    </aside>

    <div class="history-shell__workspace">
      <div class="history-shell__mobilebar">
        <RouterLink to="/">10-Layer Check</RouterLink>
        <RouterLink to="/">New scan</RouterLink>
      </div>

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
    </div>
  </main>
</template>

<style scoped>
.history-shell {
  min-height: 100vh;
  background: var(--canvas-muted);
}

.history-shell__sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 20;
  display: flex;
  width: 228px;
  flex-direction: column;
  border-right: 1px solid var(--border-hairline);
  background: var(--canvas-dark);
  padding: 22px 18px;
}

.history-shell__brand {
  color: var(--ink-inverse);
  font-size: 18px;
  font-weight: 800;
}

.history-shell__nav {
  display: grid;
  gap: 6px;
  margin-top: 34px;
}

.history-shell__nav a {
  border: 1px solid transparent;
  color: #c8d2e3;
  padding: 10px 11px;
  font-size: 13px;
  font-weight: 700;
}

.history-shell__nav a:hover,
.history-shell__nav a.router-link-active,
.history-shell__nav a[aria-current='page'] {
  border-color: var(--border-dark);
  background: var(--canvas-dark-soft);
  color: var(--ink-inverse);
}

.history-shell__session {
  display: grid;
  gap: 8px;
  margin-top: auto;
  border: 1px solid var(--border-dark);
  background: var(--canvas-dark-soft);
  padding: 12px;
}

.history-shell__session span {
  color: #a9b6c8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.history-shell__session strong {
  color: var(--ink-inverse);
  font-size: 13px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.history-shell__session button {
  min-height: 34px;
  border: 1px solid var(--border-dark);
  background: transparent;
  color: #c8d2e3;
  font-size: 12px;
  font-weight: 800;
}

.history-shell__workspace {
  min-width: 0;
  margin-left: 228px;
}

.history-shell__mobilebar {
  display: none;
}

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

@media (max-width: 1040px) {
  .history-shell__sidebar {
    display: none;
  }

  .history-shell__workspace {
    margin-left: 0;
  }

  .history-shell__mobilebar {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-hairline);
    background: var(--canvas-dark);
    padding: 0 var(--page-gutter);
  }

  .history-shell__mobilebar a {
    color: var(--ink-inverse);
    font-size: 13px;
    font-weight: 800;
  }
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
