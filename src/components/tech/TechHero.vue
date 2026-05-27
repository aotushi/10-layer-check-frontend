<script setup lang="ts">
import { architectureStats, topologyGroups } from '@/content/techPage'
</script>

<template>
  <section class="tech-hero">
    <div class="page-inner tech-hero__grid">
      <div class="tech-hero__copy">
        <p class="tech-hero__eyebrow">System architecture</p>
        <h1>Technical architecture for the 10-layer diagnostic system</h1>
        <p class="tech-hero__lead">
          The product is built as an edge-hosted Vue application, Worker API, bounded scan engine,
          D1/KV data plane, and evidence-constrained report layer. This page maps the system from
          user workflow to deployment and quality gates.
        </p>

        <dl class="tech-hero__stats" aria-label="Architecture summary">
          <div v-for="[label, value] in architectureStats" :key="label">
            <dt>{{ label }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>

        <div class="tech-hero__actions">
          <RouterLink class="tech-hero__primary" to="/">Run scan</RouterLink>
          <RouterLink class="tech-hero__secondary" to="/10-layer-model">
            View 10-layer model
          </RouterLink>
        </div>
      </div>

      <aside class="topology-board" aria-label="System topology">
        <div class="topology-board__header">
          <span>Architecture atlas</span>
          <code>pages -> worker -> data -> report</code>
        </div>
        <div class="topology-board__grid">
          <article v-for="group in topologyGroups" :key="group.title" class="topology-node">
            <small>{{ group.zone }}</small>
            <h2>{{ group.title }}</h2>
            <p class="topology-node__tech">{{ group.tech }}</p>
            <p>{{ group.responsibility }}</p>
          </article>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.tech-hero {
  border-bottom: 1px solid var(--border-dark);
  background: var(--canvas-dark);
  padding: clamp(42px, 6vw, 72px) var(--page-gutter);
}

.tech-hero__grid {
  display: grid;
  align-items: start;
  gap: clamp(32px, 5vw, 58px);
  grid-template-columns: minmax(280px, 0.86fr) minmax(420px, 1.14fr);
}

.tech-hero__eyebrow {
  margin: 0 0 14px;
  color: #8dbdff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.tech-hero h1 {
  max-width: 720px;
  margin: 0;
  color: var(--ink-inverse);
  font-size: clamp(34px, 4.6vw, 54px);
  line-height: 1.08;
}

.tech-hero__lead {
  max-width: 680px;
  margin: 20px 0 0;
  color: #cbd5e1;
  font-size: 16px;
  line-height: 1.65;
}

.tech-hero__stats {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 600px;
  margin: 26px 0 0;
}

.tech-hero__stats div {
  border: 1px solid var(--border-dark);
  background: var(--canvas-dark-soft);
  padding: 12px;
}

.tech-hero__stats dt {
  color: #93c5fd;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tech-hero__stats dd {
  margin: 5px 0 0;
  color: var(--ink-inverse);
  font-size: 14px;
  font-weight: 700;
}

.tech-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.tech-hero__primary,
.tech-hero__secondary {
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

.tech-hero__primary {
  background: var(--primary);
  color: var(--ink-inverse);
}

.tech-hero__secondary {
  color: #dbeafe;
}

.topology-board {
  border: 1px solid var(--border-dark);
  background: #0f1b31;
  padding: 16px;
}

.topology-board__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--border-dark);
  padding-bottom: 14px;
  color: #dbeafe;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.topology-board__header code {
  border: 1px solid var(--border-dark);
  padding: 4px 8px;
  color: #93c5fd;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}

.topology-board__grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 14px;
}

.topology-node {
  border: 1px solid var(--border-dark);
  background: var(--canvas-dark);
  padding: 12px;
}

.topology-node small {
  color: #60a5fa;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.topology-node h2 {
  margin: 8px 0 0;
  color: var(--ink-inverse);
  font-size: 16px;
}

.topology-node p {
  margin: 8px 0 0;
  color: #cbd5e1;
  font-size: 12px;
  line-height: 1.45;
}

.topology-node__tech {
  color: #93c5fd;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
}

@media (max-width: 900px) {
  .tech-hero__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .tech-hero {
    padding-block: 24px;
  }

  .tech-hero h1 {
    font-size: 30px;
  }

  .tech-hero__lead {
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.45;
  }

  .tech-hero__stats {
    gap: 6px;
    margin-top: 16px;
  }

  .tech-hero__stats div {
    padding: 9px;
  }

  .tech-hero__actions {
    display: grid;
    gap: 10px;
    margin-top: 18px;
  }

  .topology-board {
    padding: 10px;
  }

  .topology-board__header {
    display: grid;
    gap: 8px;
  }

  .topology-board__grid {
    gap: 8px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 10px;
  }

  .topology-node {
    padding: 8px;
  }

  .topology-node h2 {
    font-size: 13px;
  }

  .topology-node p {
    margin-top: 5px;
    font-size: 10px;
  }

  .topology-node p:not(.topology-node__tech) {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>
