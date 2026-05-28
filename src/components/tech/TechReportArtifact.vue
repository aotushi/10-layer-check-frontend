<script setup lang="ts">
import { reportArtifactFlow, reportArtifactSections } from '@/content/techPage'
</script>

<template>
  <section class="artifact-section">
    <div class="page-inner">
      <div class="artifact-section__header">
        <p>Report artifact anatomy</p>
        <h2>How evidence becomes a readable technical report</h2>
        <span>
          The report is assembled from normalized evidence references and missing-data notes before
          any AI-written explanation is shown to the user.
        </span>
      </div>

      <div class="artifact-layout">
        <div class="artifact-flow" aria-label="Evidence to report assembly path">
          <article v-for="item in reportArtifactFlow" :key="item.title" class="artifact-step">
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
            <div>
              <small v-for="chip in item.chips" :key="chip">{{ chip }}</small>
            </div>
          </article>
        </div>

        <div class="artifact-sections" aria-label="Report sections">
          <article v-for="section in reportArtifactSections" :key="section.id" class="report-card">
            <code>{{ section.id }}</code>
            <h3>{{ section.title }}</h3>
            <p>{{ section.body }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.artifact-section {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas-muted);
  padding: var(--section-y) var(--page-gutter);
}

.artifact-section__header {
  max-width: 820px;
  margin: 0 auto 26px;
  text-align: center;
}

.artifact-section__header p,
.artifact-section__header h2,
.artifact-section__header span {
  margin: 0;
}

.artifact-section__header p {
  color: var(--primary);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.artifact-section__header h2 {
  margin-top: 8px;
  color: var(--ink);
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.16;
}

.artifact-section__header span {
  display: block;
  margin-top: 12px;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.58;
}

.artifact-layout {
  display: grid;
  gap: 18px;
  grid-template-columns: minmax(270px, 0.34fr) minmax(0, 1fr);
}

.artifact-flow {
  display: grid;
  gap: 10px;
}

.artifact-step {
  position: relative;
  display: grid;
  gap: 9px;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  padding: 14px;
}

.artifact-step:not(:last-child)::after {
  position: absolute;
  bottom: -11px;
  left: 24px;
  width: 1px;
  height: 10px;
  background: var(--primary);
  content: '';
}

.artifact-step h3,
.artifact-step p {
  margin: 0;
}

.artifact-step h3 {
  color: var(--ink);
  font-size: 16px;
}

.artifact-step p {
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.45;
}

.artifact-step div {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.artifact-step small {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 4px 6px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
}

.artifact-sections {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.report-card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 14px;
}

.report-card code {
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
}

.report-card h3 {
  margin: 8px 0 0;
  color: var(--ink);
  font-size: 16px;
}

.report-card p {
  margin: 8px 0 0;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .artifact-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .artifact-sections {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .artifact-section {
    padding-block: 26px;
  }

  .artifact-section__header {
    margin-bottom: 16px;
    text-align: left;
  }

  .artifact-section__header span {
    margin-top: 9px;
    font-size: 13px;
    line-height: 1.45;
  }

  .artifact-layout,
  .artifact-flow,
  .artifact-sections {
    gap: 8px;
  }

  .artifact-sections {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .artifact-step,
  .report-card {
    padding: 10px;
  }

  .artifact-step h3,
  .report-card h3 {
    font-size: 14px;
  }

  .artifact-step p,
  .report-card p {
    font-size: 12px;
  }

  .report-card code {
    display: block;
    overflow: hidden;
    font-size: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .report-card p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
