<script setup lang="ts">
import type { MissingDataGroup } from '@/content/reportDetailPage'

defineProps<{
  groups: MissingDataGroup[]
}>()
</script>

<template>
  <section id="missing-data-panel" class="missing-data" aria-labelledby="missing-data-title">
    <div class="missing-data__heading">
      <p>Missing data</p>
      <h2 id="missing-data-title">Explicit gaps before the next review pass</h2>
    </div>

    <div class="missing-data__grid">
      <article
        v-for="group in groups"
        :key="group.category"
        class="missing-card"
        :class="`missing-card--${group.tone}`"
      >
        <div class="missing-card__top">
          <h3>{{ group.category }}</h3>
          <strong>{{ group.count }}</strong>
        </div>
        <ul>
          <li v-for="example in group.examples" :key="example">{{ example }}</li>
        </ul>
        <p>{{ group.nextAction }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.missing-data {
  min-width: 0;
  border: 1px solid var(--border-hairline);
  background: var(--canvas-dark);
  padding: 24px;
}

.missing-data__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;
}

.missing-data__heading p {
  margin: 0;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.missing-data__heading h2 {
  max-width: 560px;
  margin: 0;
  color: var(--ink-inverse);
  font-size: clamp(22px, 3vw, 30px);
  line-height: 1.15;
  text-align: right;
}

.missing-data__grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.missing-card {
  border: 1px solid var(--border-dark);
  border-top: 3px solid var(--border-strong);
  background: var(--canvas-dark-soft);
  padding: 14px;
}

.missing-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.missing-card h3 {
  margin: 0;
  color: var(--ink-inverse);
  font-size: 12px;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.missing-card strong {
  color: var(--ink-inverse);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 18px;
}

.missing-card ul {
  display: grid;
  gap: 6px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.missing-card li {
  border: 1px solid var(--border-dark);
  color: #c8d2e3;
  padding: 5px 6px;
  font-size: 11px;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.missing-card p {
  margin: 14px 0 0;
  color: #dbe5f4;
  font-size: 12px;
  line-height: 1.5;
}

.missing-card--info {
  border-top-color: var(--primary);
}

.missing-card--warning {
  border-top-color: var(--warning);
}

.missing-card--neutral {
  border-top-color: var(--border-strong);
}

@media (max-width: 1120px) {
  .missing-data__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .missing-data {
    padding: 18px;
  }

  .missing-data__heading {
    display: block;
  }

  .missing-data__heading h2 {
    margin-top: 8px;
    text-align: left;
  }

  .missing-data__grid {
    grid-template-columns: 1fr;
  }
}
</style>
