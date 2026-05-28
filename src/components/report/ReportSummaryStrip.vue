<script setup lang="ts">
import type { SummaryCount } from '@/content/reportDetailPage'

defineProps<{
  items: SummaryCount[]
}>()
</script>

<template>
  <section class="summary-strip" aria-label="Report summary counts">
    <article
      v-for="item in items"
      :key="item.label"
      class="summary-strip__item"
      :class="`summary-strip__item--${item.tone}`"
    >
      <span>{{ item.label }}</span>
      <strong>{{ item.value }}</strong>
      <p>{{ item.detail }}</p>
    </article>
  </section>
</template>

<style scoped>
.summary-strip {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-bottom: 1px solid var(--border-hairline);
  background: var(--border-hairline);
}

.summary-strip__item {
  min-width: 0;
  border-top: 3px solid var(--border-strong);
  background: var(--canvas);
  padding: 18px 20px;
}

.summary-strip__item span {
  display: block;
  color: var(--ink-muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.summary-strip__item strong {
  display: block;
  margin-top: 9px;
  color: var(--ink);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 28px;
  line-height: 1;
}

.summary-strip__item p {
  margin: 9px 0 0;
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.45;
}

.summary-strip__item--success {
  border-top-color: var(--success);
}

.summary-strip__item--warning {
  border-top-color: var(--warning);
}

.summary-strip__item--danger {
  border-top-color: var(--danger);
}

.summary-strip__item--info {
  border-top-color: var(--primary);
}

@media (max-width: 860px) {
  .summary-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .summary-strip__item {
    padding: 14px;
  }

  .summary-strip__item strong {
    font-size: 22px;
  }

  .summary-strip__item p {
    font-size: 11px;
  }
}
</style>
