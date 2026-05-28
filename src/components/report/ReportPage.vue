<script setup lang="ts">
import ProductShell, { type ProductShellNavItem } from '@/components/shell/ProductShell.vue'
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
const reportNavItems: ProductShellNavItem[] = [
  { to: '/dashboard/history', label: 'History' },
  { href: '#priority-review', label: 'Current report' },
  { href: '#missing-data-panel', label: 'Missing data' },
]
</script>

<template>
  <ProductShell
    navigation-label="Report workspace navigation"
    :nav-items="reportNavItems"
    session-label="Workspace"
    session-value="Local review session"
  >
    <template #mobilebar>
      <span>{{ report.meta.status }}</span>
    </template>

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
  </ProductShell>
</template>

<style scoped>
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
