<script setup lang="ts">
import type { EvidenceTable } from '@/content/reportDetailPage'

defineProps<{
  table: EvidenceTable
}>()
</script>

<template>
  <div class="evidence-table" role="region" :aria-label="table.title" tabindex="0">
    <p class="evidence-table__title">{{ table.title }}</p>
    <table>
      <thead>
        <tr>
          <th v-for="column in table.columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.evidence-table {
  overflow-x: auto;
  max-width: 100%;
  min-width: 0;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
}

.evidence-table:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.evidence-table__title {
  margin: 0;
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  color: var(--ink);
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.evidence-table table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  text-align: left;
}

.evidence-table th {
  border-bottom: 1px solid var(--border-hairline);
  color: var(--ink-muted);
  padding: 10px 12px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.evidence-table td {
  border-bottom: 1px solid var(--border-hairline);
  color: var(--ink-secondary);
  padding: 11px 12px;
  font-size: 12px;
  line-height: 1.45;
  vertical-align: top;
}

.evidence-table tr:last-child td {
  border-bottom: 0;
}

.evidence-table td:first-child {
  color: var(--ink);
  font-weight: 700;
}
</style>
