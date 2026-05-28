<script setup lang="ts">
import type { CaseMetric } from '@/content/cases'
import type { CaseTocItem } from '@/utils/caseMarkdown'

defineProps<{
  metrics: CaseMetric[]
  boundaries: string[]
  toc: CaseTocItem[]
}>()
</script>

<template>
  <aside class="case-rail" aria-label="Case study navigation and boundaries">
    <section class="case-rail__panel">
      <h2>Report facts</h2>
      <dl class="case-rail__metrics">
        <div v-for="metric in metrics" :key="metric.label">
          <dt>{{ metric.label }}</dt>
          <dd>{{ metric.value }}</dd>
        </div>
      </dl>
    </section>

    <section class="case-rail__panel">
      <h2>Contents</h2>
      <nav class="case-rail__toc" aria-label="Case report contents">
        <a
          v-for="item in toc"
          :key="item.id"
          :class="`case-rail__toc-link case-rail__toc-link--depth-${item.depth}`"
          :href="`#${item.id}`"
        >
          {{ item.text }}
        </a>
      </nav>
    </section>

    <section class="case-rail__panel case-rail__panel--boundary">
      <h2>Evidence boundaries</h2>
      <ul>
        <li v-for="boundary in boundaries" :key="boundary">{{ boundary }}</li>
      </ul>
    </section>
  </aside>
</template>

<style scoped>
.case-rail {
  position: sticky;
  top: 88px;
  display: grid;
  gap: 14px;
  align-self: start;
}

.case-rail__panel {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 18px;
}

.case-rail__panel h2 {
  margin: 0 0 14px;
  color: var(--ink);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.case-rail__metrics {
  display: grid;
  gap: 12px;
  margin: 0;
}

.case-rail__metrics div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  border-top: 1px solid var(--border-hairline);
  padding-top: 12px;
}

.case-rail__metrics div:first-child {
  border-top: 0;
  padding-top: 0;
}

.case-rail__metrics dt {
  color: var(--ink-muted);
  font-size: 12px;
  font-weight: 700;
}

.case-rail__metrics dd {
  margin: 0;
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 17px;
  font-weight: 800;
}

.case-rail__toc {
  display: grid;
  gap: 8px;
}

.case-rail__toc-link {
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.35;
}

.case-rail__toc-link:hover {
  color: var(--primary);
}

.case-rail__toc-link--depth-3 {
  padding-left: 12px;
  color: var(--ink-muted);
  font-size: 12px;
}

.case-rail__panel--boundary {
  background: color-mix(in srgb, var(--soft-primary) 44%, var(--canvas));
}

.case-rail__panel ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.case-rail__panel li {
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.45;
}

@media (max-width: 960px) {
  .case-rail {
    position: static;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .case-rail__panel--boundary {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .case-rail {
    grid-template-columns: 1fr;
  }

  .case-rail__panel {
    padding: 14px;
  }

  .case-rail__toc {
    max-height: 180px;
    overflow: auto;
  }
}
</style>
