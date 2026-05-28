<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

import { ApiRequestError } from '@/api/client'
import type { ScanHistoryItem } from '@/api/types'
import AppButton from '@/components/base/AppButton.vue'
import ProductShell, { type ProductShellNavItem } from '@/components/shell/ProductShell.vue'
import {
  sampleHistoryPage,
  type HistoryPageContent,
  type HistoryRecord,
  type HistoryStatus,
  type HistoryTableState,
  type HistoryTone,
} from '@/content/historyPage'
import { useScanHistoryQuery } from '@/queries/history'
import { useAuthStore } from '@/stores/auth'

import HistorySummaryStrip from './HistorySummaryStrip.vue'
import HistoryTable from './HistoryTable.vue'

const props = withDefaults(
  defineProps<{
    dataMode?: 'live' | 'sample'
  }>(),
  {
    dataMode: 'live',
  },
)

const router = useRouter()
const auth = useAuthStore()
const historyQuery = useScanHistoryQuery()
const historyNavItems: ProductShellNavItem[] = [
  { to: '/dashboard/history', label: 'History', current: true },
  { to: '/dashboard/reports/sample-overreacted', label: 'Sample report' },
  { to: '/', label: 'New scan' },
]

const isSampleMode = computed(() => props.dataMode === 'sample')
const liveRecords = computed(() => mapHistoryRecords(historyQuery.data.value?.history ?? []))
const records = computed(() => (isSampleMode.value ? sampleHistoryPage.records : liveRecords.value))
const summary = computed(() =>
  isSampleMode.value ? sampleHistoryPage.summary : createHistorySummary(records.value),
)
const sessionValue = computed(() =>
  isSampleMode.value ? sampleHistoryPage.userEmail : auth.userEmail || 'Not signed in',
)
const tableState = computed<HistoryTableState>(() => {
  if (isSampleMode.value) {
    return 'populated'
  }

  if (!auth.isAuthenticated) {
    return 'empty'
  }

  if (historyQuery.isLoading.value || historyQuery.isPending.value) {
    return 'loading'
  }

  if (historyQuery.error.value) {
    return 'error'
  }

  return records.value.length > 0 ? 'populated' : 'empty'
})
const tableErrorMessage = computed(() => toHistoryErrorMessage(historyQuery.error.value))
const emptyState = computed(() => {
  if (!auth.isAuthenticated && !isSampleMode.value) {
    return {
      title: 'Login required',
      description: 'Sign in before loading saved diagnostic runs for this browser session.',
      actionLabel: 'Login',
      actionHref: '/login',
    }
  }

  return {
    title: 'No scan history yet',
    description: 'Run a public domain scan while signed in. Saved reports will appear here.',
    actionLabel: 'Run first scan',
    actionHref: '/',
  }
})

function refreshHistory(): void {
  if (isSampleMode.value || !auth.isAuthenticated) {
    return
  }

  void historyQuery.refetch()
}

function handleLogout(): void {
  auth.logout()
  void router.push({ name: 'login' })
}

function mapHistoryRecords(items: ScanHistoryItem[]): HistoryRecord[] {
  return items.map((item) => {
    const status = normalizeStatus(item.status)
    return {
      id: item.id,
      target: item.target,
      status,
      statusLabel: statusLabels[status],
      tone: statusTones[status],
      createdAt: item.created_at,
      createdAtLabel: formatUtc(item.created_at),
      layerCoverage: status === 'completed' ? 'Job ready' : 'Pending',
      riskSignals: 0,
      evidenceRecords: 0,
      reportPath: item.job_id ? `/dashboard/reports/${item.job_id}` : undefined,
      summary: createHistorySummaryText(item, status),
    }
  })
}

function createHistorySummary(records: HistoryRecord[]): HistoryPageContent['summary'] {
  const completed = records.filter((record) => record.status === 'completed').length
  const needsReview = records.filter(
    (record) => record.status === 'partial' || record.status === 'failed',
  ).length
  const latest = records[0]?.createdAtLabel ?? 'None'

  return [
    {
      label: 'Total scans',
      value: String(records.length),
      detail: 'Saved user diagnostic runs.',
      tone: 'info',
    },
    {
      label: 'Completed',
      value: String(completed),
      detail: 'Reports ready for review.',
      tone: 'success',
    },
    {
      label: 'Needs review',
      value: String(needsReview),
      detail: 'Partial or failed jobs kept visible.',
      tone: needsReview > 0 ? 'warning' : 'neutral',
    },
    {
      label: 'Latest scan',
      value: latest,
      detail: 'Most recent saved run.',
      tone: 'neutral',
    },
  ]
}

function normalizeStatus(value: string): HistoryStatus {
  if (value === 'completed' || value === 'partial' || value === 'failed' || value === 'running') {
    return value
  }

  if (value === 'created' || value === 'running_sync' || value === 'async_pending') {
    return 'running'
  }

  if (value === 'cancelled') {
    return 'failed'
  }

  return 'partial'
}

function createHistorySummaryText(item: ScanHistoryItem, status: HistoryStatus): string {
  if (status === 'completed') {
    return 'Persisted scan job is ready for report review.'
  }

  if (status === 'running') {
    return 'Scan job is still collecting or normalizing public evidence.'
  }

  if (status === 'failed') {
    return 'Scan job stopped before a complete report was produced.'
  }

  return `Scan job status is ${item.status}; review missing evidence before acting.`
}

function formatUtc(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return `${date.toISOString().slice(0, 16).replace('T', ' ')} UTC`
}

function toHistoryErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    if (error.status === 401) {
      return 'Login again before loading saved scan history.'
    }

    if (error.status === 0) {
      return error.message
    }

    return `History API returned ${error.status}: ${error.message}`
  }

  return error instanceof Error ? error.message : 'History request failed.'
}

const statusLabels: Record<HistoryStatus, string> = {
  completed: 'Complete',
  partial: 'Partial',
  failed: 'Failed',
  running: 'Running',
}

const statusTones: Record<HistoryStatus, HistoryTone> = {
  completed: 'success',
  partial: 'warning',
  failed: 'danger',
  running: 'info',
}
</script>

<template>
  <ProductShell
    navigation-label="History workspace navigation"
    :nav-items="historyNavItems"
    session-label="Signed in as"
    :session-value="sessionValue"
  >
    <template #session-actions>
      <button v-if="auth.isAuthenticated" type="button" @click="handleLogout">Logout</button>
      <RouterLink v-else to="/login">Login</RouterLink>
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
          <AppButton variant="ghost" :disabled="tableState === 'loading'" @click="refreshHistory">
            Refresh
          </AppButton>
          <RouterLink class="history-page__primary-action" to="/">New scan</RouterLink>
        </div>
      </header>

      <HistorySummaryStrip :items="summary" />
      <HistoryTable
        :rows="records"
        :state="tableState"
        :error-message="tableErrorMessage"
        :empty-title="emptyState.title"
        :empty-description="emptyState.description"
        :empty-action-label="emptyState.actionLabel"
        :empty-action-href="emptyState.actionHref"
        @retry="refreshHistory"
      />
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
