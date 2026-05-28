<script setup lang="ts">
import type { HistorySummaryItem } from '@/content/historyPage'

defineProps<{
  items: HistorySummaryItem[]
}>()
</script>

<template>
  <section class="history-summary" aria-label="History summary">
    <article
      v-for="item in items"
      :key="item.label"
      class="history-summary__item"
      :class="`history-summary__item--${item.tone}`"
    >
      <span>{{ item.label }}</span>
      <strong>{{ item.value }}</strong>
      <p>{{ item.detail }}</p>
    </article>
  </section>
</template>

<style scoped>
.history-summary {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid var(--border-hairline);
  background: var(--border-hairline);
}

.history-summary__item {
  min-width: 0;
  border-top: 3px solid var(--border-strong);
  background: var(--canvas);
  padding: 16px 18px;
}

.history-summary__item span {
  display: block;
  color: var(--ink-muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.history-summary__item strong {
  display: block;
  margin-top: 9px;
  color: var(--ink);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 28px;
  line-height: 1;
}

.history-summary__item p {
  margin: 8px 0 0;
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.45;
}

.history-summary__item--success {
  border-top-color: var(--success);
}

.history-summary__item--warning {
  border-top-color: var(--warning);
}

.history-summary__item--danger {
  border-top-color: var(--danger);
}

.history-summary__item--info {
  border-top-color: var(--primary);
}

@media (max-width: 820px) {
  .history-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .history-summary__item {
    padding: 13px;
  }

  .history-summary__item strong {
    font-size: 23px;
  }

  .history-summary__item p {
    font-size: 11px;
  }
}
</style>
