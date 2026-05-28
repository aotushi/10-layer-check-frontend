<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { CaseStudy } from '@/content/cases'
import type { CaseMarkdownNode, CaseTocItem } from '@/utils/caseMarkdown'

import CaseStudyRail from './CaseStudyRail.vue'
import MarkdownCaseRenderer from './MarkdownCaseRenderer.vue'

const props = defineProps<{
  caseStudy: CaseStudy
  nodes: CaseMarkdownNode[]
  toc: CaseTocItem[]
  loading?: boolean
}>()

const statusLabel = computed(() => (props.loading ? 'Loading report' : 'Report loaded'))
</script>

<template>
  <main class="case-page">
    <section class="case-hero">
      <div class="case-hero__inner">
        <div class="case-hero__copy">
          <p class="case-hero__eyebrow">{{ caseStudy.eyebrow }}</p>
          <h1>{{ caseStudy.title }}</h1>
          <p>{{ caseStudy.summary }}</p>
          <div class="case-hero__actions">
            <RouterLink class="case-hero__primary" to="/">Run scan</RouterLink>
            <RouterLink class="case-hero__secondary" to="/dashboard/reports/overreacted-sample">
              View report UI
            </RouterLink>
          </div>
        </div>

        <aside class="case-hero__panel" aria-label="Case report status">
          <div class="case-hero__panel-head">
            <span>{{ statusLabel }}</span>
            <strong>{{ caseStudy.target }}</strong>
          </div>
          <dl>
            <div v-for="metric in caseStudy.metrics" :key="metric.label">
              <dt>{{ metric.label }}</dt>
              <dd>{{ metric.value }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <section class="case-proof" aria-label="Key case findings">
      <div class="case-proof__inner">
        <article
          v-for="finding in caseStudy.findings"
          :key="finding.id"
          :class="`case-proof__card case-proof__card--${finding.tone}`"
        >
          <span>{{ finding.id }}</span>
          <strong>{{ finding.layer }}</strong>
          <p>{{ finding.summary }}</p>
        </article>
      </div>
    </section>

    <section class="case-body">
      <div class="case-body__inner">
        <CaseStudyRail :metrics="caseStudy.metrics" :boundaries="caseStudy.boundaries" :toc="toc" />

        <div class="case-body__content">
          <div v-if="loading" class="case-body__loading">Loading Markdown case artifact...</div>
          <MarkdownCaseRenderer v-else :nodes="nodes" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.case-page {
  min-height: 100vh;
  background: var(--canvas-muted);
}

.case-hero {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 76px var(--page-gutter) 58px;
}

.case-hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.8fr);
  gap: 56px;
  max-width: 1180px;
  margin: 0 auto;
}

.case-hero__copy {
  max-width: 680px;
}

.case-hero__eyebrow {
  margin: 0 0 18px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.case-hero h1 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(42px, 5vw, 62px);
  line-height: 1.04;
}

.case-hero__copy > p:not(.case-hero__eyebrow) {
  max-width: 620px;
  margin: 28px 0 0;
  color: var(--ink-secondary);
  font-size: 18px;
  line-height: 1.68;
}

.case-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.case-hero__primary,
.case-hero__secondary {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  border: 1px solid var(--primary);
  padding: 0 20px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.case-hero__primary {
  background: var(--primary);
  color: var(--ink-inverse);
}

.case-hero__secondary {
  background: var(--canvas);
  color: var(--primary);
}

.case-hero__panel {
  align-self: end;
  border: 1px solid var(--border-strong);
  background: var(--canvas-muted);
  padding: 24px;
}

.case-hero__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--border-hairline);
  padding-bottom: 18px;
}

.case-hero__panel-head span {
  color: var(--ink-muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.case-hero__panel-head strong {
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  padding: 8px 10px;
  color: var(--ink);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 13px;
}

.case-hero__panel dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 20px 0 0;
}

.case-hero__panel div {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 14px;
}

.case-hero__panel dt {
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.case-hero__panel dd {
  margin: 8px 0 0;
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 28px;
  font-weight: 800;
}

.case-proof {
  border-bottom: 1px solid var(--border-hairline);
  background: color-mix(in srgb, var(--soft-primary) 34%, var(--canvas));
  padding: 24px var(--page-gutter);
}

.case-proof__inner {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  max-width: 1180px;
  margin: 0 auto;
}

.case-proof__card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 18px;
}

.case-proof__card span {
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
  font-weight: 800;
}

.case-proof__card strong {
  display: block;
  margin-top: 12px;
  color: var(--ink);
  font-size: 14px;
}

.case-proof__card p {
  margin: 8px 0 0;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.case-proof__card--warning {
  border-color: color-mix(in srgb, var(--warning) 34%, var(--border-hairline));
}

.case-proof__card--danger {
  border-color: color-mix(in srgb, var(--danger) 30%, var(--border-hairline));
}

.case-body {
  padding: 34px var(--page-gutter) 54px;
}

.case-body__inner {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 22px;
  max-width: 1180px;
  margin: 0 auto;
}

.case-body__content {
  min-width: 0;
}

.case-body__loading {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 30px;
  color: var(--ink-secondary);
  font-weight: 700;
}

@media (max-width: 960px) {
  .case-hero {
    padding-top: 54px;
  }

  .case-hero__inner,
  .case-body__inner {
    grid-template-columns: 1fr;
  }

  .case-proof__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .case-hero {
    padding-block: 36px 28px;
  }

  .case-hero__inner {
    gap: 24px;
  }

  .case-hero h1 {
    font-size: 36px;
  }

  .case-hero__copy > p:not(.case-hero__eyebrow) {
    margin-top: 18px;
    font-size: 14px;
    line-height: 1.55;
  }

  .case-hero__actions {
    display: grid;
    gap: 10px;
  }

  .case-hero__primary,
  .case-hero__secondary {
    justify-content: center;
  }

  .case-hero__panel {
    padding: 16px;
  }

  .case-hero__panel-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .case-hero__panel dl {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .case-hero__panel div {
    padding: 10px;
  }

  .case-hero__panel dt {
    font-size: 9px;
  }

  .case-hero__panel dd {
    font-size: 20px;
  }

  .case-proof {
    padding-block: 14px;
  }

  .case-proof__card {
    padding: 14px;
  }

  .case-body {
    padding-top: 18px;
  }
}
</style>
