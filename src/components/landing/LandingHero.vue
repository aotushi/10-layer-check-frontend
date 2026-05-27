<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterLink } from 'vue-router'

import { modelHeroStats } from '@/content/layerModelPage'

import LayerPreviewGrid from './LayerPreviewGrid.vue'

const targetDomain = shallowRef('overreacted.io')
</script>

<template>
  <section class="landing-hero page-section">
    <div class="page-inner landing-hero__grid">
      <div class="landing-hero__copy">
        <p class="landing-hero__eyebrow">10-layer diagnostic model</p>
        <h1>Why a single website check misses operational context</h1>
        <p class="landing-hero__lead">
          The model separates DNS, routing, transport, headers, edge behavior, payload shape, and
          browser-observable state so each finding can point back to inspectable public evidence.
        </p>
        <form class="landing-hero__form" @submit.prevent>
          <input v-model="targetDomain" aria-label="Target domain" type="text" />
          <button type="submit">Scan 10 layers</button>
        </form>
        <RouterLink class="landing-hero__secondary" to="/">Back to Home</RouterLink>
      </div>

      <aside class="landing-hero__panel" aria-label="Layer model visual">
        <div class="landing-hero__panel-header">
          <span>Model coverage</span>
          <code>PUBLIC-EVIDENCE</code>
        </div>
        <div class="landing-hero__stats">
          <div v-for="stat in modelHeroStats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
        <LayerPreviewGrid />
      </aside>
    </div>
  </section>
</template>

<style scoped>
.landing-hero {
  background: var(--canvas);
  padding-block: clamp(44px, 6vw, 72px);
}

.landing-hero__grid {
  display: grid;
  align-items: center;
  gap: clamp(32px, 5vw, 64px);
  grid-template-columns: minmax(280px, 0.95fr) minmax(360px, 1.05fr);
}

.landing-hero__eyebrow {
  margin: 0 0 18px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.landing-hero h1 {
  max-width: 640px;
  margin: 0;
  color: var(--ink);
  font-size: clamp(34px, 4.6vw, 48px);
  font-weight: 700;
  line-height: 1.14;
}

.landing-hero__lead {
  max-width: 620px;
  margin: 22px 0 0;
  color: var(--ink-secondary);
  font-size: 17px;
  line-height: 1.65;
}

.landing-hero__form {
  display: flex;
  max-width: 520px;
  margin-top: 30px;
}

.landing-hero__form input {
  width: min(100%, 300px);
  min-height: 44px;
  border: 1px solid var(--border-strong);
  border-right: 0;
  border-radius: var(--radius-control) 0 0 var(--radius-control);
  background: var(--canvas);
  color: var(--ink);
  padding: 0 16px;
}

.landing-hero__form button {
  min-height: 44px;
  border: 1px solid var(--primary);
  border-radius: 0 var(--radius-control) var(--radius-control) 0;
  background: var(--primary);
  color: var(--ink-inverse);
  padding: 0 22px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.landing-hero__secondary {
  display: inline-block;
  margin-top: 16px;
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
}

.landing-hero__secondary:hover {
  text-decoration: underline;
}

.landing-hero__panel {
  border: 1px solid var(--border-hairline);
  border-radius: var(--radius-panel);
  background: var(--canvas-muted);
  padding: 20px;
}

.landing-hero__panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--border-hairline);
  padding-bottom: 16px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.landing-hero__panel-header code {
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  padding: 4px 8px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 400;
}

.landing-hero__stats {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 18px 0;
}

.landing-hero__stats div {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 12px;
}

.landing-hero__stats strong {
  display: block;
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 20px;
  line-height: 1.1;
}

.landing-hero__stats span {
  display: block;
  margin-top: 8px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .landing-hero__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .landing-hero {
    padding-block: 28px;
  }

  .landing-hero__form {
    display: grid;
    gap: 10px;
    margin-top: 22px;
  }

  .landing-hero__form input,
  .landing-hero__form button {
    width: 100%;
    border-radius: var(--radius-control);
  }

  .landing-hero__form input {
    border-right: 1px solid var(--border-strong);
  }

  .landing-hero__stats {
    gap: 6px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .landing-hero__stats div {
    padding: 9px 7px;
  }

  .landing-hero__stats strong {
    font-size: 15px;
  }

  .landing-hero__stats span {
    font-size: 9px;
    letter-spacing: 0.02em;
  }

  .landing-hero__lead {
    margin-top: 16px;
    font-size: 15px;
    line-height: 1.55;
  }

  .landing-hero__panel {
    padding: 14px;
  }

  .landing-hero__panel-header {
    padding-bottom: 10px;
  }

  .landing-hero__secondary {
    display: none;
  }

  .landing-hero__panel :deep(.layer-preview-grid) {
    display: none;
  }
}
</style>
