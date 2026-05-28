<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { HistoryRecord, HistoryTableState } from '@/content/historyPage'

import HistoryEmptyState from './HistoryEmptyState.vue'

const props = withDefaults(
  defineProps<{
    rows: HistoryRecord[]
    state?: HistoryTableState
    errorMessage?: string
    emptyTitle?: string
    emptyDescription?: string
    emptyActionLabel?: string
    emptyActionHref?: string
  }>(),
  {
    state: 'populated',
    errorMessage: 'History could not be loaded. Retry the query before changing filters.',
    emptyTitle: 'No scan history yet',
    emptyDescription:
      'Start with a public domain scan. Saved reports will appear here when account persistence is connected.',
    emptyActionLabel: 'Run first scan',
    emptyActionHref: '/',
  },
)

const emit = defineEmits<{
  retry: []
}>()

const loadingRows = [1, 2, 3, 4]
const showTable = computed(() => props.state === 'loading' || props.state === 'populated')
</script>

<template>
  <section class="history-table-panel" aria-labelledby="history-table-title">
    <div class="history-table-panel__header">
      <div>
        <p>Saved scans</p>
        <h2 id="history-table-title">Previous diagnostic runs</h2>
      </div>
      <span>{{ rows.length }} records</span>
    </div>

    <div v-if="showTable" class="history-table-scroll">
      <table class="history-table">
        <thead>
          <tr>
            <th scope="col">Target</th>
            <th scope="col">Status</th>
            <th scope="col">Created time</th>
            <th scope="col">Scope</th>
            <th scope="col">Risk</th>
            <th scope="col">Evidence</th>
            <th scope="col">Report action</th>
          </tr>
        </thead>
        <tbody v-if="state === 'loading'">
          <tr v-for="row in loadingRows" :key="row">
            <td colspan="7">
              <span class="history-table__skeleton">Loading saved scan row</span>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="row in rows" :key="row.id">
            <td class="history-table__target">
              <strong :title="row.target">{{ row.target }}</strong>
              <span>{{ row.summary }}</span>
            </td>
            <td>
              <span class="history-table__status" :class="`history-table__status--${row.tone}`">
                {{ row.statusLabel }}
              </span>
            </td>
            <td>
              <time :datetime="row.createdAt">{{ row.createdAtLabel }}</time>
            </td>
            <td class="history-table__mono">{{ row.layerCoverage }}</td>
            <td class="history-table__mono">{{ row.riskSignals }}</td>
            <td class="history-table__mono">{{ row.evidenceRecords }}</td>
            <td>
              <RouterLink
                v-if="row.reportPath"
                class="history-table__report-link"
                :to="row.reportPath"
              >
                Open report
              </RouterLink>
              <span v-else class="history-table__report-link history-table__report-link--disabled">
                Unavailable
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <HistoryEmptyState
      v-else-if="state === 'empty'"
      :title="emptyTitle"
      :description="emptyDescription"
      :action-label="emptyActionLabel"
      :action-href="emptyActionHref"
    />

    <HistoryEmptyState
      v-else
      title="History query failed"
      :description="errorMessage"
      action-label="Retry"
      tone="danger"
      @action="emit('retry')"
    />
  </section>
</template>

<style scoped>
.history-table-panel {
  min-width: 0;
}

.history-table-panel__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.history-table-panel__header p {
  margin: 0 0 6px;
  color: var(--primary);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.history-table-panel__header h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.15;
}

.history-table-panel__header > span {
  color: var(--ink-muted);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
}

.history-table-scroll {
  min-width: 0;
  overflow-x: auto;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
}

.history-table {
  width: 100%;
  min-width: 920px;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  border-bottom: 1px solid var(--border-hairline);
  padding: 14px 16px;
  text-align: left;
  vertical-align: top;
}

.history-table th {
  background: var(--canvas-soft);
  color: var(--ink-secondary);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.history-table td {
  color: var(--ink-secondary);
  font-size: 13px;
}

.history-table tr:last-child td {
  border-bottom: 0;
}

.history-table__target {
  width: 310px;
}

.history-table__target strong {
  display: block;
  color: var(--ink);
  font-size: 14px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.history-table__target span {
  display: block;
  margin-top: 6px;
  color: var(--ink-muted);
  font-size: 12px;
  line-height: 1.45;
}

.history-table__status {
  display: inline-flex;
  min-height: 24px;
  align-items: center;
  border: 1px solid var(--border-strong);
  padding: 0 8px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.history-table__status--success {
  border-color: color-mix(in srgb, var(--success) 45%, white);
  background: color-mix(in srgb, var(--success) 9%, white);
  color: var(--success);
}

.history-table__status--warning {
  border-color: color-mix(in srgb, var(--warning) 45%, white);
  background: color-mix(in srgb, var(--warning) 9%, white);
  color: var(--warning);
}

.history-table__status--danger {
  border-color: color-mix(in srgb, var(--danger) 45%, white);
  background: color-mix(in srgb, var(--danger) 9%, white);
  color: var(--danger);
}

.history-table__status--info {
  border-color: color-mix(in srgb, var(--primary) 45%, white);
  background: var(--soft-primary);
  color: var(--primary);
}

.history-table__mono {
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  white-space: nowrap;
}

.history-table__report-link {
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0 10px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.history-table__report-link:hover {
  background: var(--soft-primary);
}

.history-table__report-link--disabled {
  border-color: var(--border-hairline);
  color: var(--ink-muted);
}

.history-table__skeleton {
  display: block;
  height: 20px;
  width: min(100%, 720px);
  overflow: hidden;
  color: transparent;
  background: linear-gradient(90deg, var(--canvas-soft), var(--canvas-muted), var(--canvas-soft));
}

@media (max-width: 640px) {
  .history-table-panel__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .history-table-panel__header h2 {
    font-size: 22px;
  }

  .history-table {
    min-width: 760px;
  }

  .history-table th,
  .history-table td {
    padding: 11px 10px;
  }

  .history-table__target {
    width: 218px;
  }

  .history-table__status {
    min-height: 22px;
    padding: 0 6px;
    font-size: 10px;
  }
}
</style>
