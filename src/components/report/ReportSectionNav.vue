<script setup lang="ts">
import type { ReportSection } from '@/content/reportDetailPage'

defineProps<{
  sections: Pick<ReportSection, 'id' | 'title'>[]
}>()
</script>

<template>
  <nav class="section-nav" aria-label="Report section navigation">
    <p>Report sections</p>
    <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">
      {{ section.title }}
    </a>
  </nav>
</template>

<style scoped>
.section-nav {
  position: sticky;
  top: 76px;
  display: grid;
  gap: 4px;
  align-self: start;
  max-width: 100%;
  min-width: 0;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 12px;
}

.section-nav p {
  margin: 0 0 6px;
  color: var(--ink-muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-nav a {
  border-left: 2px solid transparent;
  color: var(--ink-secondary);
  padding: 7px 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
}

.section-nav a:hover,
.section-nav a:focus-visible {
  border-left-color: var(--primary);
  background: var(--canvas-soft);
  color: var(--primary);
}

@media (max-width: 920px) {
  .section-nav {
    position: static;
    display: flex;
    overflow-x: auto;
    padding: 10px;
  }

  .section-nav p {
    flex: 0 0 auto;
    margin: 0 8px 0 0;
    padding: 7px 0;
  }

  .section-nav a {
    flex: 0 0 auto;
    border-left: 0;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
  }

  .section-nav a:hover,
  .section-nav a:focus-visible {
    border-bottom-color: var(--primary);
  }
}
</style>
