<script setup lang="ts">
import { shallowRef } from 'vue'

import { faqs } from '@/content/homePage'

const finalDomain = shallowRef('example.com')
</script>

<template>
  <section class="faq-section">
    <div class="page-inner faq-section__inner">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">
        <details v-for="item in faqs" :key="item.question" class="faq-item">
          <summary>
            <span>{{ item.question }}</span>
            <span aria-hidden="true">+</span>
          </summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>

  <section class="final-cta">
    <div class="page-inner final-cta__inner">
      <h2>Run your diagnostic now</h2>
      <p>
        Input your primary domain to generate an immediate, engineering-grade evaluation of your
        external perimeter.
      </p>
      <form class="final-cta__form" @submit.prevent>
        <input v-model="finalDomain" aria-label="Target domain" type="text" />
        <button type="submit">Scan domain</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.faq-section,
.final-cta {
  border-bottom: 1px solid var(--border-hairline);
  padding: var(--home-section-y, var(--section-y)) var(--page-gutter);
}

.faq-section {
  background: var(--canvas);
}

.faq-section__inner {
  max-width: 820px;
}

.faq-section h2,
.final-cta h2 {
  margin: 0 0 32px;
  color: var(--ink);
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-item {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  padding: 16px 18px;
  color: var(--ink);
  font-size: 14px;
  font-weight: 700;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item p {
  margin: 0;
  border-top: 1px solid var(--border-hairline);
  padding: 16px 18px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.65;
}

.final-cta {
  background: var(--canvas-muted);
}

.final-cta__inner {
  text-align: center;
}

.final-cta h2 {
  margin-bottom: 16px;
  font-size: clamp(32px, 5vw, 42px);
}

.final-cta p {
  max-width: 620px;
  margin: 0 auto 30px;
  color: var(--ink-secondary);
  font-size: 18px;
  line-height: 1.65;
}

.final-cta__form {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.final-cta__form input {
  width: min(100%, 320px);
  min-height: 48px;
  border: 1px solid var(--border-strong);
  border-right: 0;
  border-radius: var(--radius-control) 0 0 var(--radius-control);
  background: var(--canvas);
  padding: 0 16px;
}

.final-cta__form button {
  min-height: 48px;
  border: 1px solid var(--primary);
  border-radius: 0 var(--radius-control) var(--radius-control) 0;
  background: var(--primary);
  color: var(--ink-inverse);
  padding: 0 28px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

@media (max-width: 560px) {
  .faq-section,
  .final-cta {
    padding-block: var(--home-section-y, 28px);
  }

  .faq-section h2,
  .final-cta h2 {
    margin-bottom: 16px;
    font-size: 20px;
  }

  .faq-list {
    gap: 8px;
  }

  .faq-item summary {
    padding: 11px 12px;
    font-size: 12px;
  }

  .final-cta h2 {
    margin-bottom: 10px;
  }

  .final-cta p {
    margin-bottom: 16px;
    font-size: 12px;
    line-height: 1.45;
  }

  .final-cta__form {
    display: grid;
    gap: 10px;
  }

  .final-cta__form input,
  .final-cta__form button {
    width: 100%;
    border-radius: var(--radius-control);
  }

  .final-cta__form input {
    border-right: 1px solid var(--border-strong);
  }
}
</style>
