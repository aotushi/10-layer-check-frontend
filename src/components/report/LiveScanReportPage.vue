<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AppButton from '@/components/base/AppButton.vue'
import ProductShell, { type ProductShellNavItem } from '@/components/shell/ProductShell.vue'
import { useScanJobReport } from '@/composables/useScanJobReport'

const props = defineProps<{
  jobId: string
}>()

const { errorMessage, isLoading, load, report } = useScanJobReport(() => props.jobId)

const liveReportNavItems: ProductShellNavItem[] = [
  { to: '/dashboard/history', label: 'History' },
  { href: '#live-summary', label: 'Live summary' },
  { href: '#live-missing-data', label: 'Missing data' },
]
</script>

<template>
  <ProductShell
    navigation-label="Live report workspace navigation"
    :nav-items="liveReportNavItems"
    session-label="Workspace"
    session-value="Local API session"
  >
    <template #mobilebar>
      <span>{{ report.status }}</span>
    </template>

    <section class="live-report" aria-labelledby="live-report-title">
      <div class="live-report__header">
        <div>
          <p class="live-report__kicker">Live scan artifact</p>
          <h1 id="live-report-title">{{ report.normalizedTarget }}</h1>
          <p>{{ report.executiveSummary }}</p>
        </div>

        <div class="live-report__actions">
          <RouterLink to="/dashboard/history" class="live-report__link">History</RouterLink>
          <RouterLink to="/">
            <AppButton>Run new scan</AppButton>
          </RouterLink>
        </div>
      </div>

      <div v-if="isLoading" class="live-report__notice" role="status">
        Loading local scan artifact.
      </div>

      <div
        v-else-if="errorMessage"
        class="live-report__notice live-report__notice--danger"
        role="status"
      >
        <span>{{ errorMessage }}</span>
        <button type="button" @click="load">Retry</button>
      </div>

      <template v-else>
        <section id="live-summary" class="live-report__summary" aria-label="Live scan summary">
          <div>
            <span>Job status</span>
            <strong>{{ report.status }}</strong>
          </div>
          <div>
            <span>Records</span>
            <strong>{{ report.recordCount }}</strong>
          </div>
          <div>
            <span>Generated</span>
            <strong>{{ report.generatedAt }}</strong>
          </div>
          <div>
            <span>Storage</span>
            <strong>{{ report.storageState }}</strong>
          </div>
        </section>

        <section class="live-report__panel">
          <div class="live-report__panel-heading">
            <p>Artifact identity</p>
            <h2>Backend-generated evidence is loaded from the local Worker</h2>
          </div>
          <dl class="live-report__facts">
            <div>
              <dt>Job id</dt>
              <dd>{{ report.jobId }}</dd>
            </div>
            <div>
              <dt>Target</dt>
              <dd>{{ report.target }}</dd>
            </div>
            <div>
              <dt>Artifact ref</dt>
              <dd>{{ report.artifactRef }}</dd>
            </div>
          </dl>
        </section>

        <section class="live-report__panel">
          <div class="live-report__panel-heading">
            <p>Layer coverage</p>
            <h2>Collected 10-layer output</h2>
          </div>
          <div class="live-report__layers">
            <article v-for="layer in report.layers" :key="layer.id">
              <span>{{ layer.id }}</span>
              <h3>{{ layer.label }}</h3>
              <p>{{ layer.status }}</p>
              <strong>{{ layer.count }} records</strong>
            </article>
          </div>
        </section>

        <section class="live-report__grid">
          <div class="live-report__panel">
            <div class="live-report__panel-heading">
              <p>Review signals</p>
              <h2>Top risks</h2>
            </div>
            <ul class="live-report__list">
              <li v-for="risk in report.risks" :key="risk.id">
                <span>{{ risk.id }}</span>
                <strong>{{ risk.title }}</strong>
                <em>{{ risk.level }}</em>
              </li>
            </ul>
          </div>

          <div id="live-missing-data" class="live-report__panel">
            <div class="live-report__panel-heading">
              <p>Explicit uncertainty</p>
              <h2>Missing data</h2>
            </div>
            <ul class="live-report__list">
              <li v-for="item in report.missingData" :key="item.id">
                <span>{{ item.id }}</span>
                <strong>{{ item.label }}</strong>
                <em>{{ item.category }}</em>
              </li>
            </ul>
          </div>
        </section>
      </template>
    </section>
  </ProductShell>
</template>

<style scoped>
.live-report {
  display: grid;
  gap: 18px;
  width: min(100%, 1180px);
  min-width: 0;
  margin: 0 auto;
  padding: 30px 32px 42px;
}

.live-report__header,
.live-report__panel,
.live-report__summary > div,
.live-report__notice {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
}

.live-report__header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
}

.live-report__kicker,
.live-report__panel-heading p,
.live-report__summary span,
.live-report__facts dt {
  margin: 0;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.live-report h1,
.live-report h2,
.live-report h3,
.live-report p,
.live-report dl {
  margin: 0;
}

.live-report h1 {
  margin-top: 8px;
  color: var(--ink);
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1;
}

.live-report__header p:not(.live-report__kicker) {
  max-width: 720px;
  margin-top: 14px;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.55;
}

.live-report__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
}

.live-report__link,
.live-report__notice button {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  color: var(--ink);
  padding: 0 16px;
  font-size: 13px;
  font-weight: 800;
}

.live-report__summary {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.live-report__summary > div {
  display: grid;
  gap: 8px;
  min-width: 0;
  padding: 18px;
}

.live-report__summary strong {
  overflow: hidden;
  color: var(--ink);
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.live-report__panel {
  padding: 22px;
}

.live-report__panel-heading h2 {
  margin-top: 8px;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.15;
}

.live-report__facts {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.live-report__facts div {
  display: grid;
  gap: 8px;
  grid-template-columns: 120px minmax(0, 1fr);
  border-top: 1px solid var(--border-hairline);
  padding-top: 10px;
}

.live-report__facts dd {
  min-width: 0;
  margin: 0;
  overflow-wrap: anywhere;
  color: var(--ink);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 13px;
}

.live-report__layers {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin-top: 18px;
}

.live-report__layers article {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 14px;
}

.live-report__layers span,
.live-report__list span {
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
  font-weight: 800;
}

.live-report__layers h3 {
  margin-top: 8px;
  color: var(--ink);
  font-size: 14px;
}

.live-report__layers p,
.live-report__layers strong,
.live-report__list em {
  display: block;
  margin-top: 8px;
  color: var(--ink-secondary);
  font-size: 12px;
  font-style: normal;
  line-height: 1.4;
}

.live-report__grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.live-report__list {
  display: grid;
  gap: 10px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.live-report__list li {
  display: grid;
  gap: 6px;
  border-top: 1px solid var(--border-hairline);
  padding-top: 10px;
}

.live-report__list strong {
  color: var(--ink);
  font-size: 14px;
  line-height: 1.35;
}

.live-report__notice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.45;
}

.live-report__notice--danger {
  border-left: 3px solid var(--danger);
  color: var(--danger);
}

@media (max-width: 860px) {
  .live-report {
    padding: 22px var(--page-gutter) 34px;
  }

  .live-report__header,
  .live-report__grid {
    grid-template-columns: 1fr;
  }

  .live-report__header {
    flex-direction: column;
  }

  .live-report__summary,
  .live-report__layers {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .live-report {
    gap: 14px;
    padding-top: 16px;
  }

  .live-report__header,
  .live-report__panel {
    padding: 16px;
  }

  .live-report h1 {
    font-size: 30px;
  }

  .live-report__actions,
  .live-report__notice,
  .live-report__facts div {
    align-items: stretch;
    grid-template-columns: 1fr;
  }

  .live-report__actions,
  .live-report__notice {
    flex-direction: column;
  }

  .live-report__summary,
  .live-report__layers {
    grid-template-columns: 1fr;
  }
}
</style>
