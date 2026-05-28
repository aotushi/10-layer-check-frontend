<script setup lang="ts">
import { computed, onMounted, shallowRef } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import CaseDetailPage from '@/components/cases/CaseDetailPage.vue'
import { findCaseStudy } from '@/content/cases'
import { parseCaseMarkdown } from '@/utils/caseMarkdown'

const route = useRoute()
const caseStudy = computed(() => findCaseStudy(route.params.slug))
const markdown = shallowRef('')
const loading = shallowRef(true)

const parsedMarkdown = computed(() => parseCaseMarkdown(markdown.value))

onMounted(async () => {
  if (!caseStudy.value) {
    loading.value = false
    return
  }

  markdown.value = await caseStudy.value.loadMarkdown()
  loading.value = false
})
</script>

<template>
  <CaseDetailPage
    v-if="caseStudy"
    :case-study="caseStudy"
    :nodes="parsedMarkdown.nodes"
    :toc="parsedMarkdown.toc"
    :loading="loading"
  />

  <main v-else class="case-missing">
    <h1>Case study not found.</h1>
    <p>The requested proof artifact is not registered in the local case metadata.</p>
    <RouterLink class="case-missing__action" to="/">Back to Home</RouterLink>
  </main>
</template>

<style scoped>
.case-missing {
  min-height: 100vh;
  background: var(--canvas);
  padding: 80px var(--page-gutter);
}

.case-missing h1 {
  margin: 0 0 16px;
  color: var(--ink);
  font-size: clamp(40px, 7vw, 72px);
}

.case-missing p {
  max-width: 560px;
  color: var(--ink-secondary);
  font-size: 18px;
  line-height: 1.6;
}

.case-missing__action {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0 18px;
  font-size: 13px;
  font-weight: 800;
}

.case-missing__action:hover {
  background: var(--soft-primary);
}
</style>
