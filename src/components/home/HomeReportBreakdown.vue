<script setup lang="ts">
import { breakdownRows, proofMetrics } from '@/content/homePage'
</script>

<template>
  <section class="report-breakdown">
    <div class="page-inner">
      <p class="report-breakdown__kicker">Comprehensive diagnostic breakdown for overreacted.io</p>
      <div class="report-table-shell">
        <table class="report-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Status</th>
              <th>Finding summary</th>
              <th class="report-table__right">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in breakdownRows" :key="row.layer">
              <td class="report-table__mono">{{ row.layer }}</td>
              <td>
                <span :class="['status-badge', `status-badge--${row.tone}`]">
                  {{ row.status }}
                </span>
              </td>
              <td>{{ row.summary }}</td>
              <td class="report-table__right">
                <button type="button">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="proof-strip" aria-label="Diagnostic proof metrics">
    <div class="page-inner proof-strip__grid">
      <div v-for="metric in proofMetrics" :key="metric.label" class="proof-strip__item">
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.report-breakdown {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas-muted);
  padding: 40px var(--page-gutter);
}

.report-breakdown__kicker {
  margin: 0 0 22px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-align: center;
  text-transform: uppercase;
}

.report-table-shell {
  overflow-x: auto;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  padding: 4px;
}

.report-table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  text-align: left;
}

.report-table th {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas);
  color: var(--ink-secondary);
  padding: 12px 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.report-table td {
  border-bottom: 1px solid var(--border-hairline);
  padding: 12px 14px;
  color: var(--ink-secondary);
  font-size: 13px;
}

.report-table tr:last-child td {
  border-bottom: 0;
}

.report-table__right {
  text-align: right;
}

.report-table__mono {
  color: var(--ink);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
}

.report-table button {
  border: 0;
  background: transparent;
  color: var(--primary);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.status-badge {
  border: 1px solid currentColor;
  padding: 2px 6px;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
}

.status-badge--success {
  background: color-mix(in srgb, var(--success) 10%, var(--canvas));
  color: var(--success);
}

.status-badge--warning {
  background: color-mix(in srgb, var(--warning) 10%, var(--canvas));
  color: var(--warning);
}

.status-badge--danger {
  background: color-mix(in srgb, var(--danger) 10%, var(--canvas));
  color: var(--danger);
}

.proof-strip {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--surface-container, #ecedf7);
  padding: 22px var(--page-gutter);
}

.proof-strip__grid {
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  text-align: center;
}

.proof-strip__item strong {
  display: block;
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: clamp(20px, 2.5vw, 28px);
  line-height: 1.1;
}

.proof-strip__item span {
  display: block;
  margin-top: 7px;
  color: var(--ink-secondary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .proof-strip__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .report-breakdown {
    padding: 24px var(--page-gutter);
  }

  .report-breakdown__kicker {
    margin-bottom: 14px;
    font-size: 10px;
    line-height: 1.35;
  }

  .report-table-shell {
    overflow-x: visible;
    padding: 0;
  }

  .report-table,
  .report-table tbody,
  .report-table tr,
  .report-table td {
    display: block;
    width: 100%;
    min-width: 0;
  }

  .report-table thead {
    display: none;
  }

  .report-table tr {
    display: grid;
    align-items: center;
    gap: 8px;
    grid-template-columns: 62px 48px minmax(0, 1fr);
    border-bottom: 1px solid var(--border-hairline);
    padding: 9px 10px;
  }

  .report-table tr:nth-child(n + 4) {
    display: none;
  }

  .report-table tr:last-child {
    border-bottom: 0;
  }

  .report-table td {
    border-bottom: 0;
    padding: 0;
    font-size: 12px;
    line-height: 1.35;
  }

  .report-table td:last-child {
    display: none;
  }

  .report-table__right {
    text-align: left;
  }

  .proof-strip {
    padding: 14px var(--page-gutter);
  }

  .proof-strip__grid {
    gap: 8px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .proof-strip__item strong {
    font-size: 14px;
  }

  .proof-strip__item span {
    margin-top: 4px;
    font-size: 9px;
    letter-spacing: 0;
  }
}
</style>
