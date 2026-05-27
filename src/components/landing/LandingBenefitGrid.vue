<script setup lang="ts">
import { layeredBenefits } from '@/content/layerModelPage'
</script>

<template>
  <section class="landing-section landing-section--canvas">
    <div class="page-inner">
      <h2 class="landing-section__title landing-section__title--center">
        Benefits of layered diagnosis
      </h2>
      <div class="benefit-grid benefit-grid--desktop">
        <article v-for="item in layeredBenefits" :key="item.title" class="benefit-card">
          <h3>{{ item.title }}</h3>
          <dl>
            <div>
              <dt>Single-check limitation</dt>
              <dd>{{ item.limitation }}</dd>
            </div>
            <div>
              <dt>Layered benefit</dt>
              <dd>{{ item.benefit }}</dd>
            </div>
            <div>
              <dt>Example evidence</dt>
              <dd>{{ item.evidence }}</dd>
            </div>
          </dl>
        </article>
      </div>
      <div class="benefit-accordion" aria-label="Mobile layered diagnosis benefits">
        <details v-for="item in layeredBenefits" :key="item.title" class="benefit-accordion__item">
          <summary>
            <strong>{{ item.title }}</strong>
            <span>{{ item.benefit }}</span>
          </summary>
          <dl>
            <div>
              <dt>Single-check limitation</dt>
              <dd>{{ item.limitation }}</dd>
            </div>
            <div>
              <dt>Example evidence</dt>
              <dd>{{ item.evidence }}</dd>
            </div>
          </dl>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landing-section {
  border-bottom: 1px solid var(--border-hairline);
  padding: var(--section-y) var(--page-gutter);
}

.landing-section--canvas {
  background: var(--canvas);
}

.landing-section__title {
  margin: 0 0 42px;
  color: var(--ink);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
}

.landing-section__title--center {
  text-align: center;
}

.benefit-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.benefit-accordion {
  display: none;
}

.benefit-card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 24px;
}

.benefit-card h3 {
  margin: 0 0 20px;
  color: var(--ink);
  font-size: 18px;
}

.benefit-card dl,
.benefit-card dd {
  margin: 0;
}

.benefit-card div + div {
  margin-top: 18px;
  border-top: 1px solid var(--border-hairline);
  padding-top: 18px;
}

.benefit-card dt {
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.benefit-card dd {
  margin-top: 8px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 820px) {
  .benefit-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .landing-section__title {
    margin-bottom: 22px;
  }

  .benefit-grid--desktop {
    display: none;
  }

  .benefit-accordion {
    display: grid;
    gap: 10px;
  }

  .benefit-accordion__item {
    border: 1px solid var(--border-hairline);
    background: var(--canvas-soft);
  }

  .benefit-accordion__item summary {
    cursor: pointer;
    padding: 14px;
    list-style: none;
  }

  .benefit-accordion__item summary::-webkit-details-marker {
    display: none;
  }

  .benefit-accordion__item strong {
    display: block;
    color: var(--ink);
    font-size: 15px;
    line-height: 1.3;
  }

  .benefit-accordion__item summary span {
    display: block;
    margin-top: 7px;
    color: var(--ink-secondary);
    font-size: 13px;
    line-height: 1.5;
  }

  .benefit-accordion__item dl,
  .benefit-accordion__item dd {
    margin: 0;
  }

  .benefit-accordion__item dl {
    border-top: 1px solid var(--border-hairline);
    padding: 12px 14px;
  }

  .benefit-accordion__item dl div + div {
    margin-top: 12px;
  }

  .benefit-accordion__item dt {
    color: var(--primary);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .benefit-accordion__item dd {
    margin-top: 5px;
    color: var(--ink-secondary);
    font-size: 13px;
    line-height: 1.5;
  }
}
</style>
