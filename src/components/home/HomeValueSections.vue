<script setup lang="ts">
import { benefitCards, layerGroups, layerModel, processSteps } from '@/content/homePage'
</script>

<template>
  <section class="value-section value-section--canvas">
    <div class="page-inner">
      <h2 class="section-title section-title--center">
        Precision diagnostics for external perimeters
      </h2>
      <div class="benefit-grid">
        <article v-for="card in benefitCards" :key="card.title" class="benefit-card">
          <span class="benefit-card__mark">{{ card.mark }}</span>
          <h3>{{ card.title }}</h3>
          <p>{{ card.body }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="value-section value-section--muted">
    <div class="page-inner">
      <h2 class="section-title section-title--center">How the diagnostic engine operates</h2>
      <div class="process-grid">
        <article v-for="step in processSteps" :key="step.id" class="process-card">
          <span class="process-card__index">{{ step.id }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="value-section value-section--canvas">
    <div class="page-inner">
      <h2 class="section-title">Target outcomes by layer group</h2>
      <div class="layer-groups">
        <article
          v-for="group in layerGroups"
          :key="group.title"
          class="layer-group"
          :class="{ 'layer-group--wide': group.checks.length > 3 }"
        >
          <h3>{{ group.title }}</h3>
          <ul>
            <li v-for="check in group.checks" :key="check">
              <span class="check-dot" aria-hidden="true" />
              {{ check }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="value-section value-section--soft">
    <div class="page-inner comparison">
      <h2 class="section-title section-title--center">Why analyze across 10 layers?</h2>
      <p>
        Traditional scanners focus on application responses. Engineering-grade reliability requires
        continuous visibility across the public dependency stack, from DNS resolution to DOM
        rendering.
      </p>
      <div class="comparison__panel">
        <div>
          <strong>Standard scanners</strong>
          <span>Only check L7 HTTP responses</span>
        </div>
        <div>
          <strong>10-Layer Check</strong>
          <span>Validates L1 through L10 deterministically</span>
        </div>
      </div>
    </div>
  </section>

  <section class="value-section value-section--canvas">
    <div class="page-inner">
      <h2 class="section-title">The 10-Layer Model</h2>
      <div class="model-grid">
        <article v-for="[id, label] in layerModel" :key="id" class="model-card">
          <strong>{{ id }}</strong>
          <span>{{ label }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.value-section {
  border-bottom: 1px solid var(--border-hairline);
  padding: var(--home-section-y, var(--section-y)) var(--page-gutter);
}

.value-section--canvas {
  background: var(--canvas);
}

.value-section--muted {
  background: var(--canvas-muted);
}

.value-section--soft {
  background: color-mix(in srgb, var(--soft-primary) 34%, var(--canvas));
}

.section-title {
  margin: 0 0 42px;
  color: var(--ink);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
}

.section-title--center {
  text-align: center;
}

.benefit-grid,
.process-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.benefit-card,
.process-card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 26px;
}

.benefit-card__mark {
  display: inline-grid;
  width: 32px;
  height: 32px;
  place-items: center;
  margin-bottom: 20px;
  border: 1px solid var(--border-hairline);
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
}

.benefit-card h3,
.process-card h3,
.layer-group h3 {
  margin: 0 0 12px;
  color: var(--ink);
  font-size: 18px;
  font-weight: 700;
}

.benefit-card p,
.process-card p {
  margin: 0;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.65;
}

.process-card {
  position: relative;
  background: var(--canvas);
}

.process-card__index {
  position: absolute;
  top: -12px;
  left: -12px;
  display: inline-grid;
  width: 28px;
  height: 28px;
  place-items: center;
  background: var(--primary);
  color: var(--ink-inverse);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
  font-weight: 700;
}

.layer-groups {
  display: grid;
  gap: 34px 56px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.layer-group--wide {
  grid-column: 1 / -1;
}

.layer-group h3 {
  border-bottom: 1px solid var(--border-hairline);
  padding-bottom: 12px;
  color: var(--primary);
}

.layer-group ul {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.layer-group--wide ul {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.layer-group li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.check-dot {
  width: 7px;
  height: 7px;
  flex: 0 0 7px;
  margin-top: 7px;
  border: 1px solid var(--success);
}

.comparison {
  text-align: center;
}

.comparison p {
  max-width: 760px;
  margin: -20px auto 34px;
  color: var(--ink-secondary);
  font-size: 18px;
  line-height: 1.65;
}

.comparison__panel {
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(230px, 1fr));
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  text-align: center;
}

.comparison__panel div {
  padding: 24px;
}

.comparison__panel div + div {
  border-left: 1px solid var(--border-hairline);
  background: color-mix(in srgb, var(--primary) 5%, var(--canvas));
}

.comparison__panel strong {
  display: block;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.comparison__panel span {
  display: block;
  margin-top: 10px;
  color: var(--ink-secondary);
  font-size: 14px;
}

.model-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.model-card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 18px 14px;
  text-align: center;
}

.model-card strong {
  display: block;
  color: var(--ink-muted);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 24px;
  font-weight: 400;
}

.model-card span {
  display: block;
  margin-top: 8px;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .benefit-grid,
  .process-grid,
  .layer-groups {
    grid-template-columns: 1fr;
  }

  .layer-group--wide {
    grid-column: auto;
  }

  .layer-group--wide ul {
    grid-template-columns: 1fr;
  }

  .model-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .value-section {
    padding-block: var(--home-section-y, 28px);
  }

  .section-title {
    margin-bottom: 18px;
    font-size: 20px;
  }

  .benefit-grid,
  .process-grid {
    gap: 8px;
  }

  .benefit-card,
  .process-card {
    padding: 12px;
  }

  .benefit-card__mark {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
    font-size: 9px;
  }

  .benefit-card h3,
  .process-card h3,
  .layer-group h3 {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .benefit-card p,
  .process-card p {
    font-size: 12px;
    line-height: 1.4;
  }

  .process-card {
    display: grid;
    align-items: center;
    gap: 8px;
    grid-template-columns: 28px minmax(0, 1fr);
  }

  .process-card__index {
    position: static;
    width: 24px;
    height: 24px;
    font-size: 10px;
  }

  .process-card p {
    display: none;
  }

  .layer-groups {
    gap: 10px;
  }

  .layer-group h3 {
    padding-bottom: 6px;
  }

  .layer-group ul {
    gap: 6px;
  }

  .layer-group li {
    font-size: 12px;
    line-height: 1.35;
  }

  .layer-group li:nth-child(n + 2) {
    display: none;
  }

  .check-dot {
    margin-top: 5px;
  }

  .comparison p {
    display: none;
  }

  .comparison__panel {
    grid-template-columns: 1fr;
  }

  .comparison__panel div {
    padding: 12px;
  }

  .comparison__panel div + div {
    border-top: 1px solid var(--border-hairline);
    border-left: 0;
  }

  .comparison__panel span {
    margin-top: 5px;
    font-size: 12px;
  }

  .model-grid {
    gap: 6px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .model-card {
    display: grid;
    min-height: 38px;
    align-content: center;
    padding: 6px 4px;
  }

  .model-card strong {
    font-size: 11px;
  }

  .model-card span {
    margin-top: 2px;
    font-size: 8px;
    letter-spacing: 0;
  }
}
</style>
