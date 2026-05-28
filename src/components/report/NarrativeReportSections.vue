<script setup lang="ts">
import type { ReportSection } from '@/content/reportDetailPage'

import ReportEvidenceTable from './ReportEvidenceTable.vue'

defineProps<{
  sections: ReportSection[]
}>()
</script>

<template>
  <div class="narrative-sections">
    <article
      v-for="section in sections"
      :id="section.id"
      :key="section.id"
      class="narrative-section"
    >
      <div class="narrative-section__heading">
        <span>{{ section.id }}</span>
        <h2>{{ section.title }}</h2>
        <p>{{ section.summary }}</p>
      </div>

      <div class="narrative-section__body">
        <p v-for="paragraph in section.body" :key="paragraph">{{ paragraph }}</p>
      </div>

      <div class="narrative-section__refs" aria-label="Evidence references">
        <span v-for="ref in section.evidenceRefs" :key="ref">{{ ref }}</span>
      </div>

      <ReportEvidenceTable v-if="section.table" :table="section.table" />

      <p class="narrative-section__boundary">
        <strong>Boundary:</strong>
        {{ section.boundaryNote }}
      </p>
    </article>
  </div>
</template>

<style scoped>
.narrative-sections {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.narrative-section {
  scroll-margin-top: 84px;
  min-width: 0;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 22px;
}

.narrative-section__heading {
  max-width: 760px;
}

.narrative-section__heading span {
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.narrative-section h2 {
  margin: 8px 0 0;
  color: var(--ink);
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.15;
}

.narrative-section__heading p {
  margin: 10px 0 0;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.55;
}

.narrative-section__body {
  max-width: 760px;
  margin-top: 18px;
}

.narrative-section__body p {
  margin: 0;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.68;
}

.narrative-section__body p + p {
  margin-top: 10px;
}

.narrative-section__refs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 18px 0;
}

.narrative-section__refs span {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  color: var(--ink);
  padding: 4px 6px;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
}

.narrative-section__boundary {
  margin: 16px 0 0;
  border-left: 3px solid var(--warning);
  background: var(--canvas-soft);
  color: var(--ink-secondary);
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.55;
}

.narrative-section__boundary strong {
  color: var(--ink);
}

@media (max-width: 620px) {
  .narrative-section {
    padding: 16px;
  }

  .narrative-section__body p,
  .narrative-section__heading p {
    font-size: 14px;
  }
}
</style>
