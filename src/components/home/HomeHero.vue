<script setup lang="ts">
import { shallowRef } from 'vue'

import { useScanSubmit } from '@/composables/useScanSubmit'
import { heroReportItems } from '@/content/homePage'

const targetDomain = shallowRef('overreacted.io')
const { canSubmit, errorMessage, isSubmitting, submitScan } = useScanSubmit()
</script>

<template>
  <section class="home-hero page-section">
    <div class="page-inner home-hero__grid">
      <div class="home-hero__copy">
        <h1 class="home-hero__title">
          Scan a public website and receive a structured 10-layer diagnostic report
        </h1>
        <p class="home-hero__lead">
          Execute an engineering-grade public reconnaissance scan. Discover exposed surface
          architecture, assess TLS configuration, and detect anomalous headers.
        </p>
        <form class="scan-form" @submit.prevent="submitScan(targetDomain)">
          <input
            v-model="targetDomain"
            aria-label="Target domain"
            class="scan-form__input"
            type="text"
            autocomplete="url"
            :disabled="isSubmitting"
          />
          <button class="scan-form__button" type="submit" :disabled="!canSubmit">
            {{ isSubmitting ? 'Starting' : 'Run scan' }}
          </button>
        </form>
        <p v-if="errorMessage" class="scan-form__message" role="status">
          {{ errorMessage }}
        </p>
      </div>

      <aside class="report-preview" aria-label="Diagnostic report preview">
        <div class="report-preview__header">
          <span>Diagnostic report preview</span>
          <code>ID: RPT-OVERREACTED-01</code>
        </div>

        <div class="report-preview__metrics">
          <div class="report-preview__metric">
            <span>Records captured</span>
            <strong>55</strong>
          </div>
          <div class="report-preview__metric report-preview__metric--warning">
            <span>High/medium risk items</span>
            <strong>6</strong>
          </div>
        </div>

        <div class="report-preview__rows">
          <div v-for="item in heroReportItems" :key="item.label" class="report-preview__row">
            <span class="report-preview__row-icon">{{ item.label.slice(0, 2) }}</span>
            <span>{{ item.label }}</span>
            <strong :class="['status-badge', `status-badge--${item.tone}`]">
              {{ item.status }}
            </strong>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  padding-block: clamp(42px, 6vw, 72px);
}

.home-hero__grid {
  display: grid;
  align-items: center;
  gap: clamp(28px, 4vw, 56px);
  grid-template-columns: minmax(280px, 1fr) minmax(360px, 1fr);
}

.home-hero__title {
  max-width: 620px;
  margin: 0;
  color: var(--ink);
  font-size: clamp(32px, 4vw, 42px);
  font-weight: 700;
  line-height: 1.14;
}

.home-hero__lead {
  max-width: 560px;
  margin: 20px 0 0;
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 1.6;
}

.scan-form {
  display: flex;
  max-width: 500px;
  margin-top: 28px;
}

.scan-form__input {
  width: min(100%, 292px);
  min-height: 42px;
  border: 1px solid var(--border-strong);
  border-right: 0;
  border-radius: var(--radius-control) 0 0 var(--radius-control);
  background: var(--canvas);
  color: var(--ink);
  padding: 0 16px;
}

.scan-form__input:focus {
  border-color: var(--primary);
  outline: 1px solid var(--primary);
  outline-offset: -1px;
}

.scan-form__button {
  min-height: 42px;
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

.scan-form__button:hover {
  background: var(--primary-hover);
}

.scan-form__button:disabled,
.scan-form__input:disabled {
  cursor: wait;
  opacity: 0.72;
}

.scan-form__message {
  max-width: 500px;
  margin: 12px 0 0;
  border-left: 3px solid var(--danger);
  background: color-mix(in srgb, var(--danger) 6%, var(--canvas));
  color: var(--danger);
  padding: 9px 12px;
  font-size: 13px;
  line-height: 1.4;
}

.report-preview {
  min-height: 356px;
  border: 1px solid var(--border-hairline);
  border-radius: var(--radius-panel);
  background: var(--canvas-muted);
  padding: 20px;
}

.report-preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-bottom: 1px solid var(--border-hairline);
  padding-bottom: 16px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.report-preview__header code {
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  padding: 4px 8px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 400;
  text-transform: none;
}

.report-preview__metrics {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 20px;
}

.report-preview__metric {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 14px;
}

.report-preview__metric span {
  display: block;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.report-preview__metric strong {
  display: block;
  margin-top: 7px;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 28px;
  line-height: 1;
}

.report-preview__metric--warning span,
.report-preview__metric--warning strong {
  color: var(--warning);
}

.report-preview__rows {
  display: grid;
  gap: 10px;
  margin-top: 20px;
}

.report-preview__row {
  display: grid;
  align-items: center;
  gap: 10px;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 10px;
  font-size: 13px;
}

.report-preview__row-icon {
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
}

.status-badge {
  border: 1px solid currentColor;
  padding: 3px 6px;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
}

.status-badge--success {
  background: color-mix(in srgb, var(--success) 10%, var(--canvas));
  color: var(--success);
}

.status-badge--warning {
  background: color-mix(in srgb, var(--warning) 10%, var(--canvas));
  color: var(--warning);
}

.status-badge--danger {
  background: color-mix(in srgb, var(--danger) 10%, var(--canvas));
  color: var(--danger);
}

@media (max-width: 700px) {
  .home-hero__grid {
    grid-template-columns: 1fr;
  }

  .report-preview {
    min-height: 0;
  }
}

@media (max-width: 560px) {
  .home-hero {
    padding-block: 24px;
  }

  .home-hero__grid {
    gap: 20px;
  }

  .home-hero__title {
    font-size: 26px;
    line-height: 1.14;
  }

  .home-hero__lead {
    margin-top: 12px;
    font-size: 13px;
    line-height: 1.45;
  }

  .scan-form {
    display: grid;
    gap: 10px;
    margin-top: 18px;
  }

  .scan-form__input,
  .scan-form__button {
    width: 100%;
    border-radius: var(--radius-control);
  }

  .scan-form__input {
    border-right: 1px solid var(--border-strong);
  }

  .report-preview {
    padding: 12px;
  }

  .report-preview__header {
    padding-bottom: 10px;
    font-size: 10px;
  }

  .report-preview__header code {
    display: none;
  }

  .report-preview__metrics {
    gap: 8px;
    margin-top: 10px;
  }

  .report-preview__metric {
    padding: 10px;
  }

  .report-preview__metric span {
    font-size: 9px;
    letter-spacing: 0;
  }

  .report-preview__metric strong {
    margin-top: 4px;
    font-size: 20px;
  }

  .report-preview__rows {
    gap: 6px;
    margin-top: 10px;
  }

  .report-preview__row {
    gap: 8px;
    padding: 7px 8px;
    font-size: 12px;
  }

  .report-preview__row:nth-child(n + 3) {
    display: none;
  }
}
</style>
