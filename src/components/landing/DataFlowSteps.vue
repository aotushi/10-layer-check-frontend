<script setup lang="ts">
import { workflowSteps } from '@/content/layerModelPage'
</script>

<template>
  <section class="landing-section landing-section--muted">
    <div class="page-inner">
      <h2 class="landing-section__title landing-section__title--center">How the model works</h2>
      <div class="data-flow-steps">
        <article v-for="step in workflowSteps" :key="step.id" class="data-flow-step">
          <span>{{ step.id }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landing-section {
  border-bottom: 1px solid var(--border-hairline);
  padding: var(--section-y) var(--page-gutter);
}

.landing-section--muted {
  background: var(--canvas-muted);
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

.data-flow-steps {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.data-flow-step {
  position: relative;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 28px 24px 24px;
}

.data-flow-step span {
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

.data-flow-step h3 {
  margin: 0 0 12px;
  color: var(--ink);
  font-size: 18px;
}

.data-flow-step p {
  margin: 0;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.65;
}

@media (max-width: 700px) {
  .landing-section__title {
    margin-bottom: 22px;
  }

  .data-flow-steps {
    gap: 10px;
    grid-template-columns: 1fr;
  }

  .data-flow-step {
    display: grid;
    gap: 8px 12px;
    grid-template-columns: 32px minmax(0, 1fr);
    padding: 14px;
  }

  .data-flow-step span {
    position: static;
    width: 28px;
    height: 28px;
    grid-row: 1 / span 2;
  }

  .data-flow-step h3 {
    margin: 0;
    font-size: 15px;
  }

  .data-flow-step p {
    font-size: 13px;
    line-height: 1.5;
  }

  .data-flow-step p {
    display: none;
  }
}
</style>
