<script setup lang="ts">
import { architectureDecisions, stackMatrix } from '@/content/techPage'
</script>

<template>
  <section class="matrix-section">
    <div class="page-inner">
      <div class="matrix-section__header">
        <p>Technology matrix</p>
        <h2>Frontend, backend, database, AI, SEO, and quality stack</h2>
      </div>

      <div class="stack-matrix" role="table" aria-label="Technology stack matrix">
        <div class="stack-matrix__head" role="row">
          <span>Layer</span>
          <span>Tooling</span>
          <span>Responsibility</span>
          <span>Why it fits</span>
        </div>
        <article
          v-for="[layer, tool, responsibility, reason] in stackMatrix"
          :key="layer"
          class="stack-matrix__row"
          role="row"
        >
          <strong>{{ layer }}</strong>
          <code>{{ tool }}</code>
          <p>{{ responsibility }}</p>
          <p>{{ reason }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="decision-section">
    <div class="page-inner">
      <h2>Architecture decisions</h2>
      <div class="decision-grid">
        <article v-for="item in architectureDecisions" :key="item.decision" class="decision-card">
          <h3>{{ item.decision }}</h3>
          <dl>
            <div>
              <dt>Reason</dt>
              <dd>{{ item.reason }}</dd>
            </div>
            <div>
              <dt>Tradeoff</dt>
              <dd>{{ item.tradeoff }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.matrix-section,
.decision-section {
  border-bottom: 1px solid var(--border-hairline);
  padding: var(--section-y) var(--page-gutter);
}

.matrix-section {
  background: var(--canvas-muted);
}

.decision-section {
  background: var(--canvas);
}

.matrix-section__header {
  max-width: 760px;
  margin: 0 auto 28px;
  text-align: center;
}

.matrix-section__header p {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.matrix-section__header h2,
.decision-section h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.25;
}

.decision-section h2 {
  margin-bottom: 24px;
  text-align: center;
}

.stack-matrix {
  border: 1px solid var(--border-strong);
  background: var(--canvas);
}

.stack-matrix__head,
.stack-matrix__row {
  display: grid;
  grid-template-columns: 150px 190px minmax(0, 1fr) minmax(0, 1.12fr);
}

.stack-matrix__head {
  border-bottom: 1px solid var(--border-strong);
  background: var(--canvas-soft);
}

.stack-matrix__head span,
.stack-matrix__row strong,
.stack-matrix__row code,
.stack-matrix__row p {
  margin: 0;
  border-right: 1px solid var(--border-hairline);
  padding: 12px;
}

.stack-matrix__head span {
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stack-matrix__head span:last-child,
.stack-matrix__row p:last-child {
  border-right: 0;
}

.stack-matrix__row {
  border-bottom: 1px solid var(--border-hairline);
}

.stack-matrix__row:last-child {
  border-bottom: 0;
}

.stack-matrix__row strong {
  color: var(--primary);
  font-size: 13px;
}

.stack-matrix__row code {
  color: var(--ink);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
  white-space: normal;
}

.stack-matrix__row p {
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.45;
}

.decision-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.decision-card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 16px;
}

.decision-card h3 {
  margin: 0 0 12px;
  color: var(--ink);
  font-size: 16px;
}

.decision-card dl,
.decision-card dd {
  margin: 0;
}

.decision-card dl {
  display: grid;
  gap: 10px;
}

.decision-card div {
  border-top: 1px solid var(--border-hairline);
  padding-top: 10px;
}

.decision-card dt {
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.decision-card dd {
  margin-top: 4px;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .stack-matrix__head {
    display: none;
  }

  .stack-matrix__row {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }

  .stack-matrix__row strong,
  .stack-matrix__row code,
  .stack-matrix__row p {
    border: 1px solid var(--border-hairline);
    background: var(--canvas-soft);
    padding: 9px;
  }

  .decision-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .matrix-section,
  .decision-section {
    padding-block: 26px;
  }

  .matrix-section__header {
    margin-bottom: 16px;
    text-align: left;
  }

  .matrix-section__header h2,
  .decision-section h2 {
    font-size: 20px;
  }

  .stack-matrix__row {
    grid-template-columns: minmax(96px, 0.38fr) minmax(0, 1fr);
    padding: 8px;
  }

  .stack-matrix__row code {
    font-size: 11px;
  }

  .stack-matrix__row p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 12px;
  }

  .stack-matrix__row p:last-child {
    display: none;
  }

  .decision-section h2 {
    margin-bottom: 14px;
  }

  .decision-grid {
    gap: 8px;
  }

  .decision-card {
    padding: 10px;
  }

  .decision-card h3 {
    margin-bottom: 8px;
    font-size: 14px;
  }

  .decision-card dl {
    gap: 6px;
  }

  .decision-card div {
    padding-top: 6px;
  }

  .decision-card dd {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 12px;
  }
}
</style>
