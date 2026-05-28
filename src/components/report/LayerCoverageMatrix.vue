<script setup lang="ts">
import type { LayerCoverageItem } from '@/content/reportDetailPage'

defineProps<{
  items: LayerCoverageItem[]
}>()
</script>

<template>
  <section id="layer-coverage" class="layer-coverage" aria-labelledby="coverage-title">
    <div class="layer-coverage__heading">
      <p>Layer coverage</p>
      <h2 id="coverage-title">10-layer distribution</h2>
    </div>

    <div class="layer-coverage__grid">
      <article
        v-for="item in items"
        :key="item.layer"
        class="layer-card"
        :class="`layer-card--${item.tone}`"
      >
        <div class="layer-card__top">
          <span>{{ item.layer }}</span>
          <strong>{{ item.status }}</strong>
        </div>
        <h3>{{ item.name }}</h3>
        <p>{{ item.signalCount }} related signals</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.layer-coverage {
  min-width: 0;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 22px;
}

.layer-coverage__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
}

.layer-coverage__heading p {
  margin: 0;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.layer-coverage__heading h2 {
  margin: 0;
  color: var(--ink);
  font-size: 22px;
  line-height: 1.2;
}

.layer-coverage__grid {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  min-width: 0;
}

.layer-card {
  min-width: 0;
  min-height: 104px;
  border: 1px solid var(--border-hairline);
  border-top: 3px solid var(--border-strong);
  background: var(--canvas-soft);
  padding: 11px;
}

.layer-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.layer-card__top span {
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
  font-weight: 800;
}

.layer-card__top strong {
  color: var(--ink-muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.layer-card h3 {
  margin: 14px 0 0;
  color: var(--ink);
  font-size: 14px;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.layer-card p {
  margin: 7px 0 0;
  color: var(--ink-secondary);
  font-size: 11px;
  line-height: 1.35;
}

.layer-card--success {
  border-top-color: var(--success);
}

.layer-card--warning {
  border-top-color: var(--warning);
}

.layer-card--danger {
  border-top-color: var(--danger);
}

.layer-card--info {
  border-top-color: var(--primary);
}

@media (max-width: 980px) {
  .layer-coverage__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .layer-coverage {
    padding: 16px;
  }

  .layer-coverage__heading {
    display: block;
  }

  .layer-coverage__heading h2 {
    margin-top: 6px;
    font-size: 20px;
  }

  .layer-coverage__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .layer-card {
    min-height: 92px;
  }
}
</style>
