<script setup lang="ts">
import { comparisonRows } from '@/content/layerModelPage'
</script>

<template>
  <section class="comparison-section">
    <div class="page-inner">
      <h2>Why single checks miss context</h2>
      <div
        class="comparison-table comparison-table--desktop"
        role="table"
        aria-label="Single check comparison"
      >
        <div class="comparison-table__head" role="row">
          <span role="columnheader">Single check</span>
          <span role="columnheader">Missing context</span>
          <span role="columnheader">Layer combination</span>
          <span role="columnheader">Decision value</span>
        </div>
        <div
          v-for="row in comparisonRows"
          :key="row.singleCheck"
          class="comparison-table__row"
          role="row"
        >
          <span role="cell">{{ row.singleCheck }}</span>
          <span role="cell">{{ row.missingContext }}</span>
          <span role="cell">{{ row.layerCombination }}</span>
          <span role="cell">{{ row.decisionValue }}</span>
        </div>
      </div>
      <div class="comparison-accordion" aria-label="Mobile single-check comparison">
        <details
          v-for="row in comparisonRows"
          :key="row.singleCheck"
          class="comparison-accordion__item"
        >
          <summary>
            <strong>{{ row.singleCheck }}</strong>
            <span>{{ row.layerCombination }}</span>
          </summary>
          <dl>
            <div>
              <dt>Missing context</dt>
              <dd>{{ row.missingContext }}</dd>
            </div>
            <div>
              <dt>Decision value</dt>
              <dd>{{ row.decisionValue }}</dd>
            </div>
          </dl>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comparison-section {
  border-bottom: 1px solid var(--border-hairline);
  background: color-mix(in srgb, var(--soft-primary) 34%, var(--canvas));
  padding: var(--section-y) var(--page-gutter);
}

.comparison-section h2 {
  margin: 0 0 32px;
  color: var(--ink);
  font-size: 24px;
  text-align: center;
}

.comparison-table {
  overflow-x: auto;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
}

.comparison-accordion {
  display: none;
}

.comparison-table__head,
.comparison-table__row {
  display: grid;
  min-width: 900px;
  grid-template-columns: 1fr 1.1fr 1fr 1.4fr;
}

.comparison-table__head {
  background: var(--canvas-soft);
}

.comparison-table__head span,
.comparison-table__row span {
  border-right: 1px solid var(--border-hairline);
  border-bottom: 1px solid var(--border-hairline);
  padding: 14px;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.55;
}

.comparison-table__head span {
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.comparison-table__row:last-child span {
  border-bottom: 0;
}

.comparison-table span:last-child {
  border-right: 0;
}

@media (max-width: 760px) {
  .comparison-section h2 {
    margin-bottom: 22px;
  }

  .comparison-table--desktop {
    display: none;
  }

  .comparison-accordion {
    display: grid;
    gap: 10px;
  }

  .comparison-accordion__item {
    border: 1px solid var(--border-hairline);
    background: var(--canvas);
  }

  .comparison-accordion__item summary {
    cursor: pointer;
    padding: 14px;
    list-style: none;
  }

  .comparison-accordion__item summary::-webkit-details-marker {
    display: none;
  }

  .comparison-accordion__item strong {
    display: block;
    color: var(--ink);
    font-size: 14px;
    line-height: 1.3;
  }

  .comparison-accordion__item summary span {
    display: block;
    margin-top: 6px;
    color: var(--primary);
    font-size: 12px;
    font-weight: 700;
    line-height: 1.4;
  }

  .comparison-accordion__item dl,
  .comparison-accordion__item dd {
    margin: 0;
  }

  .comparison-accordion__item dl {
    border-top: 1px solid var(--border-hairline);
    padding: 12px 14px;
  }

  .comparison-accordion__item dl div + div {
    margin-top: 12px;
  }

  .comparison-accordion__item dt {
    color: var(--primary);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .comparison-accordion__item dd {
    margin-top: 5px;
    color: var(--ink-secondary);
    font-size: 13px;
    line-height: 1.5;
  }
}
</style>
