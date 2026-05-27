<script setup lang="ts">
import { shallowRef } from 'vue'

import { modelFaqs, technicalTrustNotes } from '@/content/layerModelPage'

const targetDomain = shallowRef('example.com')
</script>

<template>
  <section class="model-faq">
    <div class="page-inner">
      <h2>Model questions</h2>
      <div class="model-faq__grid">
        <details v-for="item in modelFaqs" :key="item.question" class="model-faq__item">
          <summary>
            <span>{{ item.question }}</span>
            <span aria-hidden="true">+</span>
          </summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>

  <section class="trust-note">
    <div class="page-inner trust-note__grid">
      <article v-for="note in technicalTrustNotes" :key="note.title" class="trust-note__item">
        <h3>{{ note.title }}</h3>
        <p>{{ note.body }}</p>
      </article>
    </div>
  </section>

  <section class="model-cta">
    <div class="page-inner model-cta__inner">
      <h2>Run a bounded 10-layer diagnostic</h2>
      <p>
        Start with a public domain and review evidence-backed signals without account-first gating.
      </p>
      <form class="model-cta__form" @submit.prevent>
        <input v-model="targetDomain" aria-label="Target domain" type="text" />
        <button type="submit">Scan domain</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.model-faq,
.trust-note,
.model-cta {
  border-bottom: 1px solid var(--border-hairline);
  padding: var(--section-y) var(--page-gutter);
}

.model-faq {
  background: var(--canvas);
}

.model-faq h2,
.model-cta h2 {
  margin: 0 0 32px;
  color: var(--ink);
  font-size: 24px;
  text-align: center;
}

.model-faq__grid {
  display: grid;
  gap: 14px;
  max-width: 860px;
  margin: 0 auto;
}

.model-faq__item {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
}

.model-faq__item summary {
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

.model-faq__item summary::-webkit-details-marker {
  display: none;
}

.model-faq__item p {
  margin: 0;
  border-top: 1px solid var(--border-hairline);
  padding: 16px 18px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.65;
}

.trust-note {
  background: color-mix(in srgb, var(--soft-primary) 34%, var(--canvas));
}

.trust-note__grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.trust-note__item {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 20px;
}

.trust-note__item h3 {
  margin: 0 0 12px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.trust-note__item p {
  margin: 0;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.65;
}

.model-cta {
  background: var(--canvas-muted);
}

.model-cta__inner {
  text-align: center;
}

.model-cta h2 {
  margin-bottom: 16px;
  font-size: clamp(30px, 4vw, 40px);
}

.model-cta p {
  max-width: 620px;
  margin: 0 auto 28px;
  color: var(--ink-secondary);
  font-size: 17px;
  line-height: 1.65;
}

.model-cta__form {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.model-cta__form input {
  width: min(100%, 320px);
  min-height: 46px;
  border: 1px solid var(--border-strong);
  border-right: 0;
  border-radius: var(--radius-control) 0 0 var(--radius-control);
  background: var(--canvas);
  padding: 0 16px;
}

.model-cta__form button {
  min-height: 46px;
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

@media (max-width: 760px) {
  .trust-note__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .trust-note {
    display: none;
  }

  .model-faq h2,
  .model-cta h2 {
    margin-bottom: 20px;
  }

  .model-faq__grid,
  .trust-note__grid {
    gap: 8px;
  }

  .model-faq__item summary {
    padding: 12px 14px;
    font-size: 13px;
  }

  .trust-note__item {
    padding: 12px;
  }

  .trust-note__item h3 {
    margin-bottom: 0;
  }

  .trust-note__item p {
    display: none;
  }

  .model-cta h2 {
    font-size: 28px;
  }

  .model-cta p {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.5;
  }

  .model-cta__form {
    display: grid;
    gap: 12px;
  }

  .model-cta__form input,
  .model-cta__form button {
    width: 100%;
    border-radius: var(--radius-control);
  }

  .model-cta__form input {
    border-right: 1px solid var(--border-strong);
  }
}
</style>
