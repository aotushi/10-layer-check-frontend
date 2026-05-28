<script setup lang="ts">
import { architectureStats, runtimeTrace } from '@/content/techPage'
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

      <aside class="runtime-board" aria-label="Runtime trace preview">
        <div class="runtime-board__header">
          <span>Runtime trace</span>
          <code>pages -> worker -> data -> report</code>
        </div>
        <ol class="runtime-board__steps">
          <li v-for="item in runtimeTrace" :key="item.label">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </li>
        </ol>
        <div class="runtime-board__notes">
          <span>facts before prose</span>
          <span>public evidence only</span>
          <span>missing data explicit</span>
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

.runtime-board {
  border: 1px solid var(--border-dark);
  background: #0f1b31;
  padding: 16px;
}

.runtime-board__header {
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

.runtime-board__header code {
  border: 1px solid var(--border-dark);
  padding: 4px 8px;
  color: #93c5fd;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}

.runtime-board__steps {
  display: grid;
  gap: 0;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.runtime-board__steps li {
  position: relative;
  display: grid;
  gap: 4px;
  grid-template-columns: 96px minmax(0, 1fr);
  border-top: 1px solid var(--border-dark);
  padding: 13px 0 13px 22px;
}

.runtime-board__steps li::before {
  position: absolute;
  top: 19px;
  left: 0;
  width: 8px;
  height: 8px;
  border: 1px solid #60a5fa;
  background: var(--canvas-dark);
  content: '';
}

.runtime-board__steps li:not(:last-child)::after {
  position: absolute;
  top: 27px;
  bottom: -19px;
  left: 4px;
  width: 1px;
  background: var(--border-dark);
  content: '';
}

.runtime-board__steps span {
  color: #93c5fd;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.runtime-board__steps strong {
  color: var(--ink-inverse);
  font-size: 16px;
  font-weight: 700;
}

.runtime-board__notes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.runtime-board__notes span {
  border: 1px solid var(--border-dark);
  background: var(--canvas-dark);
  padding: 6px 8px;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 700;
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

  .runtime-board {
    padding: 10px;
  }

  .runtime-board__header {
    display: grid;
    gap: 8px;
  }

  .runtime-board__steps {
    margin-top: 10px;
  }

  .runtime-board__steps li {
    grid-template-columns: 74px minmax(0, 1fr);
    padding: 9px 0 9px 18px;
  }

  .runtime-board__steps li::before {
    top: 14px;
  }

  .runtime-board__steps li:not(:last-child)::after {
    top: 22px;
    bottom: -14px;
  }

  .runtime-board__steps span,
  .runtime-board__notes span {
    font-size: 10px;
  }

  .runtime-board__steps strong {
    font-size: 13px;
  }

  .runtime-board__notes {
    gap: 6px;
    margin-top: 8px;
  }
}
</style>
