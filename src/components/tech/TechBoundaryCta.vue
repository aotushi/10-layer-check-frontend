<script setup lang="ts">
import { dataBoundaries, qualityRails } from '@/content/techPage'
</script>

<template>
  <section class="ops-section">
    <div class="page-inner ops-section__grid">
      <div class="ops-panel">
        <p class="ops-panel__eyebrow">Operations rail</p>
        <h2>Quality gates from component review to deployment</h2>
        <div class="quality-grid">
          <article v-for="[name, body] in qualityRails" :key="name" class="quality-card">
            <h3>{{ name }}</h3>
            <p>{{ body }}</p>
          </article>
        </div>
      </div>

      <aside class="boundary-panel" aria-label="Architecture boundaries">
        <h2>Technical boundaries</h2>
        <article v-for="item in dataBoundaries" :key="item.title" class="boundary-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </article>
      </aside>
    </div>
  </section>

  <section class="tech-cta">
    <div class="page-inner tech-cta__inner">
      <h2>Inspect the architecture through a real scan report</h2>
      <p>
        Run a public-domain scan, then trace how frontend state, Worker orchestration, evidence
        storage, and report generation appear in the final artifact.
      </p>
      <div class="tech-cta__actions">
        <RouterLink class="tech-cta__primary" to="/">Run scan</RouterLink>
        <RouterLink class="tech-cta__secondary" to="/10-layer-model">
          View 10-layer model
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ops-section,
.tech-cta {
  border-bottom: 1px solid var(--border-hairline);
  padding: var(--section-y) var(--page-gutter);
}

.ops-section {
  background: var(--canvas-muted);
}

.ops-section__grid {
  display: grid;
  gap: 22px;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.42fr);
}

.ops-panel,
.boundary-panel {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 20px;
}

.ops-panel__eyebrow {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ops-panel h2,
.boundary-panel h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.25;
}

.quality-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 18px;
}

.quality-card,
.boundary-card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 12px;
}

.quality-card h3,
.boundary-card h3 {
  margin: 0;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.quality-card p,
.boundary-card p {
  margin: 8px 0 0;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.45;
}

.boundary-panel {
  display: grid;
  align-content: start;
  gap: 10px;
}

.tech-cta {
  background: var(--canvas);
}

.tech-cta__inner {
  text-align: center;
}

.tech-cta h2 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(28px, 3.8vw, 40px);
}

.tech-cta p {
  max-width: 720px;
  margin: 14px auto 24px;
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 1.6;
}

.tech-cta__actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.tech-cta__primary,
.tech-cta__secondary {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary);
  border-radius: var(--radius-control);
  padding: 0 18px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.tech-cta__primary {
  background: var(--primary);
  color: var(--ink-inverse);
}

.tech-cta__secondary {
  background: var(--canvas);
  color: var(--primary);
}

@media (max-width: 900px) {
  .ops-section__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .quality-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .ops-section,
  .tech-cta {
    padding-block: 26px;
  }

  .ops-section__grid {
    gap: 10px;
  }

  .ops-panel,
  .boundary-panel {
    padding: 10px;
  }

  .ops-panel h2,
  .boundary-panel h2 {
    font-size: 20px;
  }

  .quality-grid {
    gap: 8px;
    margin-top: 12px;
  }

  .quality-card,
  .boundary-card {
    padding: 10px;
  }

  .quality-card p,
  .boundary-card p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 12px;
  }

  .tech-cta h2 {
    font-size: 22px;
  }

  .tech-cta p {
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 1.45;
  }

  .tech-cta__actions {
    display: grid;
  }
}
</style>
