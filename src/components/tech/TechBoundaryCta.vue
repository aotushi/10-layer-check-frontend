<script setup lang="ts">
import { trustBoundaries } from '@/content/techPage'
</script>

<template>
  <section class="tech-cta">
    <div class="page-inner tech-cta__inner">
      <div class="tech-cta__copy">
        <p>Bounded trust</p>
        <h2>Inspect the architecture through a real scan report</h2>
      </div>

      <div class="tech-cta__aside">
        <div class="trust-strip" aria-label="Technical trust boundaries">
          <span v-for="item in trustBoundaries" :key="item">{{ item }}</span>
        </div>
        <div class="tech-cta__actions">
          <RouterLink class="tech-cta__primary" to="/">Run scan</RouterLink>
          <RouterLink class="tech-cta__secondary" to="/10-layer-model">
            View 10-layer model
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-cta {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 48px var(--page-gutter);
}

.tech-cta__inner {
  display: grid;
  align-items: center;
  gap: 28px 44px;
  grid-template-columns: minmax(280px, 0.9fr) minmax(360px, 0.7fr);
}

.tech-cta p,
.tech-cta h2 {
  margin: 0;
}

.tech-cta p {
  color: var(--primary);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.tech-cta h2 {
  max-width: 720px;
  margin-top: 10px;
  color: var(--ink);
  font-size: clamp(28px, 3.2vw, 38px);
  line-height: 1.16;
}

.tech-cta__aside {
  display: grid;
  gap: 14px;
}

.trust-strip {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.trust-strip span {
  display: flex;
  min-height: 34px;
  align-items: center;
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 7px 10px;
  color: var(--ink-secondary);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.25;
}

.trust-strip span:last-child {
  grid-column: 1 / -1;
}

.tech-cta__actions {
  display: flex;
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
  .tech-cta__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .tech-cta {
    padding-block: 26px;
  }

  .tech-cta__inner {
    gap: 16px;
  }

  .tech-cta h2 {
    margin-top: 8px;
    font-size: 24px;
  }

  .tech-cta__aside {
    gap: 12px;
  }

  .trust-strip {
    gap: 6px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .trust-strip span {
    padding: 6px 7px;
    font-size: 11px;
  }

  .trust-strip span:last-child {
    grid-column: 1 / -1;
  }

  .tech-cta__actions {
    display: grid;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 360px) {
  .trust-strip {
    grid-template-columns: 1fr;
  }

  .trust-strip span:last-child {
    grid-column: auto;
  }
}
</style>
