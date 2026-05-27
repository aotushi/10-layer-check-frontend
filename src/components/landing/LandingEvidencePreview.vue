<script setup lang="ts">
import { evidencePreview } from '@/content/layerModelPage'
</script>

<template>
  <section class="evidence-preview">
    <div class="page-inner evidence-preview__grid">
      <div>
        <p class="evidence-preview__eyebrow">Sample report evidence</p>
        <h2>Evidence preview for {{ evidencePreview.target }}</h2>
        <p class="evidence-preview__lead">{{ evidencePreview.boundary }}</p>
      </div>

      <aside class="evidence-preview__panel">
        <div class="evidence-preview__summary">
          <div>
            <strong>{{ evidencePreview.collectedLayers }}</strong>
            <span>Collected layers</span>
          </div>
          <div>
            <strong>{{ evidencePreview.warningLayers }}</strong>
            <span>Review signals</span>
          </div>
          <div>
            <strong>{{ evidencePreview.riskItems }}</strong>
            <span>Risk items</span>
          </div>
        </div>

        <div class="evidence-preview__table" role="table" aria-label="Sample evidence rows">
          <div class="evidence-preview__head" role="row">
            <span role="columnheader">Evidence ID</span>
            <span role="columnheader">Layer</span>
            <span role="columnheader">Observed signal</span>
            <span role="columnheader">Status</span>
          </div>
          <div
            v-for="row in evidencePreview.rows"
            :key="row.id"
            class="evidence-preview__row"
            role="row"
          >
            <code role="cell" data-label="Evidence ID">{{ row.id }}</code>
            <span role="cell" data-label="Layer">{{ row.layer }}</span>
            <span role="cell" data-label="Observed signal">{{ row.observed }}</span>
            <strong
              :class="`evidence-preview__status evidence-preview__status--${row.tone}`"
              role="cell"
              data-label="Status"
            >
              {{ row.status }}
            </strong>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.evidence-preview {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas-muted);
  padding: var(--section-y) var(--page-gutter);
}

.evidence-preview__grid {
  display: grid;
  gap: 34px;
  grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.25fr);
}

.evidence-preview__grid > * {
  min-width: 0;
}

.evidence-preview__eyebrow {
  margin: 0 0 12px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.evidence-preview h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.35;
}

.evidence-preview__lead {
  margin: 20px 0 0;
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 1.7;
}

.evidence-preview__panel {
  min-width: 0;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  padding: 18px;
}

.evidence-preview__summary {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: 18px;
}

.evidence-preview__summary div {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 14px;
}

.evidence-preview__summary strong {
  display: block;
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 18px;
}

.evidence-preview__summary span {
  display: block;
  margin-top: 8px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.evidence-preview__table {
  max-width: 100%;
  overflow-x: auto;
}

.evidence-preview__head,
.evidence-preview__row {
  display: grid;
  min-width: 720px;
  grid-template-columns: 130px 90px minmax(260px, 1fr) 80px;
}

.evidence-preview__head {
  background: var(--canvas-soft);
}

.evidence-preview__head span,
.evidence-preview__row span,
.evidence-preview__row code,
.evidence-preview__row strong {
  border-bottom: 1px solid var(--border-hairline);
  padding: 12px;
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.evidence-preview__head span {
  color: var(--ink);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.evidence-preview__row:last-child span,
.evidence-preview__row:last-child code,
.evidence-preview__row:last-child strong {
  border-bottom: 0;
}

.evidence-preview__row code {
  color: var(--primary);
}

.evidence-preview__status--success {
  color: var(--success);
}

.evidence-preview__status--warning {
  color: var(--warning);
}

.evidence-preview__status--danger {
  color: var(--danger);
}

@media (max-width: 820px) {
  .evidence-preview__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .evidence-preview__grid {
    gap: 20px;
  }

  .evidence-preview__lead {
    margin-top: 12px;
    font-size: 13px;
    line-height: 1.5;
  }

  .evidence-preview__panel {
    padding: 12px;
  }

  .evidence-preview__summary {
    gap: 6px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 12px;
  }

  .evidence-preview__summary div {
    padding: 10px 8px;
  }

  .evidence-preview__summary strong {
    font-size: 14px;
  }

  .evidence-preview__summary span {
    font-size: 9px;
    letter-spacing: 0.02em;
  }

  .evidence-preview__table {
    display: grid;
    gap: 10px;
    overflow-x: visible;
  }

  .evidence-preview__head {
    display: none;
  }

  .evidence-preview__row {
    display: grid;
    min-width: 0;
    border: 1px solid var(--border-hairline);
    background: var(--canvas-soft);
    grid-template-columns: 1fr;
  }

  .evidence-preview__row:nth-of-type(n + 3) {
    display: none;
  }

  .evidence-preview__row span,
  .evidence-preview__row code,
  .evidence-preview__row strong {
    border-bottom: 1px solid var(--border-hairline);
    padding: 9px 10px;
    overflow-wrap: anywhere;
  }

  .evidence-preview__row strong {
    border-bottom: 0;
  }

  .evidence-preview__row span::before,
  .evidence-preview__row code::before,
  .evidence-preview__row strong::before {
    content: attr(data-label);
    display: block;
    margin-bottom: 4px;
    color: var(--primary);
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
}
</style>
