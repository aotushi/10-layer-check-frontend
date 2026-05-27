<script setup lang="ts">
import { proofSignals } from '@/content/layerModelPage'
</script>

<template>
  <section class="proof-hint">
    <div class="page-inner proof-hint__grid">
      <article v-for="signal in proofSignals" :key="signal.evidenceRef" class="proof-hint__row">
        <div>
          <span>{{ signal.layer }}</span>
          <strong :class="`proof-hint__status proof-hint__status--${signal.tone}`">
            {{ signal.status }}
          </strong>
        </div>
        <p>{{ signal.signal }}</p>
        <code>{{ signal.evidenceRef }}</code>
        <small>{{ signal.boundary }}</small>
      </article>
    </div>
  </section>
</template>

<style scoped>
.proof-hint {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas-muted);
  padding: 32px var(--page-gutter);
}

.proof-hint__grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.proof-hint__row {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 18px;
}

.proof-hint__row div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.proof-hint__row span,
.proof-hint__row code,
.proof-hint__row small {
  color: var(--ink-secondary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
}

.proof-hint__status {
  border: 1px solid currentColor;
  padding: 3px 6px;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 10px;
}

.proof-hint__status--success {
  background: color-mix(in srgb, var(--success) 10%, var(--canvas));
  color: var(--success);
}

.proof-hint__status--warning {
  background: color-mix(in srgb, var(--warning) 10%, var(--canvas));
  color: var(--warning);
}

.proof-hint__status--danger {
  background: color-mix(in srgb, var(--danger) 10%, var(--canvas));
  color: var(--danger);
}

.proof-hint__row p {
  min-height: 66px;
  margin: 16px 0;
  color: var(--ink);
  font-size: 14px;
  line-height: 1.55;
}

.proof-hint__row code {
  display: block;
  margin-bottom: 10px;
  color: var(--primary);
}

.proof-hint__row small {
  display: block;
  line-height: 1.4;
}

@media (max-width: 820px) {
  .proof-hint__grid {
    grid-template-columns: 1fr;
  }

  .proof-hint__row p {
    min-height: 0;
  }
}

@media (max-width: 560px) {
  .proof-hint {
    padding-block: 22px;
  }

  .proof-hint__grid {
    gap: 8px;
  }

  .proof-hint__row {
    padding: 12px;
  }

  .proof-hint__row p {
    margin: 10px 0 8px;
    font-size: 13px;
    line-height: 1.45;
  }

  .proof-hint__row code {
    margin-bottom: 0;
  }

  .proof-hint__row small {
    display: none;
  }

  .proof-hint__row p {
    display: none;
  }
}
</style>
