<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AppButton from '@/components/base/AppButton.vue'
import type { ReportMeta } from '@/content/reportDetailPage'

defineProps<{
  meta: ReportMeta
  boundaries: string[]
}>()
</script>

<template>
  <section id="top" class="report-header" aria-labelledby="report-title">
    <div class="report-header__identity">
      <p class="report-header__kicker">Report artifact</p>
      <h1 id="report-title">{{ meta.targetDomain }}</h1>
      <div class="report-header__meta" aria-label="Report metadata">
        <span>{{ meta.status }}</span>
        <span>{{ meta.generatedAt }}</span>
        <span>{{ meta.reportId }}</span>
      </div>
    </div>

    <div class="report-header__actions" aria-label="Report actions">
      <RouterLink to="/dashboard/history" class="report-header__link">History</RouterLink>
      <RouterLink to="/">
        <AppButton variant="primary">Run new scan</AppButton>
      </RouterLink>
    </div>

    <div class="report-header__source">
      <span>Source</span>
      <strong>{{ meta.sourceLabel }}</strong>
    </div>

    <ul class="report-header__boundaries" aria-label="Report trust boundaries">
      <li v-for="boundary in boundaries" :key="boundary">{{ boundary }}</li>
    </ul>
  </section>
</template>

<style scoped>
.report-header {
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(0, 1fr) auto;
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 28px 32px 24px;
}

.report-header__identity {
  min-width: 0;
}

.report-header__kicker {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.report-header h1 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1;
  letter-spacing: 0;
}

.report-header__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.report-header__meta span,
.report-header__source,
.report-header__boundaries li {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
}

.report-header__meta span {
  padding: 6px 8px;
  color: var(--ink-secondary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
}

.report-header__actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.report-header__link {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  color: var(--ink);
  padding: 0 16px;
  font-size: 13px;
  font-weight: 700;
}

.report-header__link:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.report-header__source {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  color: var(--ink-secondary);
  font-size: 12px;
}

.report-header__source span {
  color: var(--ink-muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.report-header__source strong {
  overflow: hidden;
  color: var(--ink);
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.report-header__boundaries {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.report-header__boundaries li {
  padding: 7px 9px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
}

@media (max-width: 820px) {
  .report-header {
    grid-template-columns: 1fr;
    padding: 22px var(--page-gutter);
  }

  .report-header__actions {
    flex-wrap: wrap;
  }

  .report-header__source {
    align-items: flex-start;
    flex-direction: column;
  }

  .report-header__source strong {
    white-space: normal;
  }
}

@media (max-width: 520px) {
  .report-header h1 {
    font-size: 32px;
  }

  .report-header__actions > * {
    flex: 1;
  }

  .report-header__link {
    justify-content: center;
  }
}
</style>
