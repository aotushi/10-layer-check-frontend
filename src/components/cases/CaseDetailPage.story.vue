<script setup lang="ts">
import markdownSource from '@/content/cases/overreacted-public-report.md?raw'
import { caseStudies } from '@/content/cases'
import { parseCaseMarkdown } from '@/utils/caseMarkdown'

import CaseDetailPage from './CaseDetailPage.vue'

const caseStudy = caseStudies[0]
const parsed = parseCaseMarkdown(markdownSource)
</script>

<template>
  <Story title="CaseDetailPage" group="cases">
    <Variant title="Desktop case detail">
      <CaseDetailPage :case-study="caseStudy" :nodes="parsed.nodes" :toc="parsed.toc" />
    </Variant>

    <Variant title="Loading case detail">
      <CaseDetailPage :case-study="caseStudy" :nodes="[]" :toc="[]" loading />
    </Variant>
  </Story>
</template>
