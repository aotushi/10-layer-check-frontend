<script setup lang="ts">
import { layerDetails } from '@/content/layerModelPage'

import LandingLayerCard from './LandingLayerCard.vue'
</script>

<template>
  <section class="layer-list-section">
    <div class="page-inner">
      <div class="layer-list-section__header">
        <div>
          <p>Layer documentation</p>
          <h2>The 10-layer model list</h2>
        </div>
        <span>
          Each layer includes what it detects, why it matters, and example public evidence.
        </span>
      </div>
      <div class="layer-list layer-list--desktop">
        <LandingLayerCard v-for="layer in layerDetails" :key="layer.id" :layer="layer" />
      </div>
      <div class="layer-accordion" aria-label="Compact mobile 10-layer list">
        <details v-for="layer in layerDetails" :key="layer.id" class="layer-accordion__item">
          <summary>
            <span>{{ layer.id }}</span>
            <div>
              <strong>{{ layer.name }}</strong>
              <small>{{ layer.group }}</small>
            </div>
          </summary>
          <dl>
            <div>
              <dt>Detects</dt>
              <dd>{{ layer.detects }}</dd>
            </div>
            <div>
              <dt>Why it matters</dt>
              <dd>{{ layer.matters }}</dd>
            </div>
            <div>
              <dt>Example evidence</dt>
              <dd>{{ layer.evidence }}</dd>
            </div>
          </dl>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layer-list-section {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: var(--section-y) var(--page-gutter);
}

.layer-list-section__header {
  display: grid;
  align-items: end;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  margin-bottom: 34px;
}

.layer-list-section__header p {
  margin: 0 0 10px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.layer-list-section__header h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
}

.layer-list-section__header span {
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.65;
}

.layer-list {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.layer-accordion {
  display: none;
}

@media (max-width: 820px) {
  .layer-list-section__header,
  .layer-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .layer-list--desktop {
    display: none;
  }

  .layer-accordion {
    display: grid;
    gap: 10px;
  }

  .layer-accordion__item {
    border: 1px solid var(--border-hairline);
    background: var(--canvas-soft);
  }

  .layer-accordion__item summary {
    display: grid;
    align-items: center;
    gap: 12px;
    grid-template-columns: 38px minmax(0, 1fr);
    cursor: pointer;
    padding: 12px;
    list-style: none;
  }

  .layer-accordion__item summary::-webkit-details-marker {
    display: none;
  }

  .layer-accordion__item summary > span {
    display: inline-grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 1px solid var(--border-strong);
    background: var(--canvas);
    color: var(--primary);
    font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
    font-size: 12px;
    font-weight: 700;
  }

  .layer-accordion__item strong {
    display: block;
    color: var(--ink);
    font-size: 15px;
    line-height: 1.25;
  }

  .layer-accordion__item small {
    display: block;
    margin-top: 4px;
    color: var(--ink-muted);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .layer-accordion__item dl,
  .layer-accordion__item dd {
    margin: 0;
  }

  .layer-accordion__item dl {
    border-top: 1px solid var(--border-hairline);
    padding: 12px;
  }

  .layer-accordion__item dl div + div {
    margin-top: 12px;
  }

  .layer-accordion__item dt {
    color: var(--primary);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .layer-accordion__item dd {
    margin-top: 5px;
    color: var(--ink-secondary);
    font-size: 13px;
    line-height: 1.55;
  }
}

@media (max-width: 560px) {
  .layer-list-section__header {
    gap: 10px;
    margin-bottom: 20px;
  }

  .layer-list-section__header p {
    margin-bottom: 6px;
  }

  .layer-list-section__header span {
    font-size: 13px;
    line-height: 1.5;
  }

  .layer-accordion {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .layer-accordion__item:has(dl) {
    min-width: 0;
  }

  .layer-accordion__item[open] {
    grid-column: 1 / -1;
  }

  .layer-accordion__item summary {
    gap: 8px;
    grid-template-columns: 30px minmax(0, 1fr);
    min-height: 54px;
    padding: 9px;
  }

  .layer-accordion__item summary > span {
    width: 30px;
    height: 30px;
    font-size: 11px;
  }

  .layer-accordion__item strong {
    font-size: 13px;
  }

  .layer-accordion__item small {
    display: none;
  }

  .layer-accordion__item[open] small {
    display: block;
  }

  .layer-accordion__item dl {
    padding: 10px;
  }

  .layer-accordion__item dl div + div {
    margin-top: 9px;
  }

  .layer-accordion__item dd {
    font-size: 12px;
    line-height: 1.45;
  }
}
</style>
