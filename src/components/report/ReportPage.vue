<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { sampleReportDetail } from '@/content/reportDetailPage'

import LayerCoverageMatrix from './LayerCoverageMatrix.vue'
import MissingDataPanel from './MissingDataPanel.vue'
import NarrativeReportSections from './NarrativeReportSections.vue'
import ReportActions from './ReportActions.vue'
import ReportHeader from './ReportHeader.vue'
import ReportPriorityPanel from './ReportPriorityPanel.vue'
import ReportSectionNav from './ReportSectionNav.vue'
import ReportSummaryStrip from './ReportSummaryStrip.vue'

const report = sampleReportDetail
</script>

<template>
  <main class="report-shell">
    <aside class="report-shell__sidebar" aria-label="Report workspace navigation">
      <RouterLink class="report-shell__brand" to="/">10-Layer Check</RouterLink>
      <nav class="report-shell__nav">
        <RouterLink to="/dashboard/history">History</RouterLink>
        <a href="#priority-review">Current report</a>
        <a href="#missing-data-panel">Missing data</a>
      </nav>
      <div class="report-shell__session">
        <span>Workspace</span>
        <strong>Local review session</strong>
      </div>
    </aside>

    <div class="report-shell__workspace">
      <div class="report-shell__mobilebar">
        <RouterLink to="/">10-Layer Check</RouterLink>
        <span>{{ report.meta.status }}</span>
      </div>

      <ReportHeader :meta="report.meta" :boundaries="report.trustBoundaries" />
      <ReportSummaryStrip :items="report.summaryCounts" />
      <ReportPriorityPanel :findings="report.priorityFindings" />

      <section class="report-page">
        <div class="report-page__inner">
          <LayerCoverageMatrix :items="report.layerCoverage" />

          <div class="report-page__reading">
            <ReportSectionNav :sections="report.sections" />
            <NarrativeReportSections :sections="report.sections" />
          </div>

          <MissingDataPanel :groups="report.missingDataGroups" />
          <ReportActions />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.report-shell {
  min-height: 100vh;
  background: var(--canvas-muted);
}

.report-shell__sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 20;
  display: flex;
  width: 228px;
  flex-direction: column;
  border-right: 1px solid var(--border-hairline);
  background: var(--canvas-dark);
  padding: 22px 18px;
}

.report-shell__brand {
  color: var(--ink-inverse);
  font-size: 18px;
  font-weight: 800;
}

.report-shell__nav {
  display: grid;
  gap: 6px;
  margin-top: 34px;
}

.report-shell__nav a {
  border: 1px solid transparent;
  color: #c8d2e3;
  padding: 10px 11px;
  font-size: 13px;
  font-weight: 700;
}

.report-shell__nav a:hover,
.report-shell__nav a.router-link-active {
  border-color: var(--border-dark);
  background: var(--canvas-dark-soft);
  color: var(--ink-inverse);
}

.report-shell__session {
  margin-top: auto;
  border: 1px solid var(--border-dark);
  background: var(--canvas-dark-soft);
  padding: 12px;
}

.report-shell__session span {
  display: block;
  color: #a9b6c8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.report-shell__session strong {
  display: block;
  margin-top: 7px;
  color: var(--ink-inverse);
  font-size: 13px;
  line-height: 1.35;
}

.report-shell__workspace {
  min-width: 0;
  margin-left: 228px;
}

.report-shell__mobilebar {
  display: none;
}

.report-page {
  padding: 28px 32px 36px;
}

.report-page__inner {
  display: grid;
  gap: 18px;
  max-width: 1200px;
  min-width: 0;
  margin: 0 auto;
}

.report-page__reading {
  display: grid;
  gap: 18px;
  grid-template-columns: 220px minmax(0, 1fr);
  min-width: 0;
}

.report-page__inner > * {
  min-width: 0;
}

@media (max-width: 1040px) {
  .report-shell__sidebar {
    display: none;
  }

  .report-shell__workspace {
    margin-left: 0;
  }

  .report-shell__mobilebar {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-hairline);
    background: var(--canvas-dark);
    padding: 0 var(--page-gutter);
  }

  .report-shell__mobilebar a {
    color: var(--ink-inverse);
    font-weight: 800;
  }

  .report-shell__mobilebar span {
    color: #c8d2e3;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}

@media (max-width: 920px) {
  .report-page {
    padding: 22px var(--page-gutter) 30px;
  }

  .report-page__reading {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .report-page {
    padding-top: 16px;
  }

  .report-page__inner {
    gap: 14px;
  }
}
</style>
