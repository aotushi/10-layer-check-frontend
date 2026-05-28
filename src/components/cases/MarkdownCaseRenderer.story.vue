<script setup lang="ts">
import markdownSource from '@/content/cases/overreacted-public-report.md?raw'
import { parseCaseMarkdown } from '@/utils/caseMarkdown'

import MarkdownCaseRenderer from './MarkdownCaseRenderer.vue'

const parsed = parseCaseMarkdown(markdownSource)
</script>

<template>
  <Story title="MarkdownCaseRenderer" group="cases">
    <Variant title="Overreacted sample report">
      <div style="padding: 24px; background: var(--canvas-muted)">
        <MarkdownCaseRenderer :nodes="parsed.nodes" />
      </div>
    </Variant>
  </Story>
</template>
