<script setup lang="ts">
import type { PriorityFinding } from '@/content/reportDetailPage'

defineProps<{
  findings: PriorityFinding[]
}>()
</script>

<template>
  <section id="priority-review" class="priority-panel" aria-labelledby="priority-title">
    <div class="priority-panel__header">
      <p>Priority review</p>
      <h2 id="priority-title">Risk signals that should be reviewed first</h2>
    </div>

    <div class="priority-panel__list">
      <article
        v-for="finding in findings"
        :key="finding.id"
        class="priority-finding"
        :class="`priority-finding--${finding.tone}`"
      >
        <div class="priority-finding__index">
          <strong>{{ finding.id }}</strong>
          <span>{{ finding.severity }}</span>
        </div>
        <div class="priority-finding__body">
          <span class="priority-finding__layer">{{ finding.layer }}</span>
          <h3>{{ finding.title }}</h3>
          <p>{{ finding.reason }}</p>
          <div class="priority-finding__refs" aria-label="Evidence references">
            <span v-for="ref in finding.evidenceRefs" :key="ref">{{ ref }}</span>
          </div>
        </div>
        <p class="priority-finding__boundary">{{ finding.boundaryNote }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.priority-panel {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 30px 32px;
}

.priority-panel__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
}

.priority-panel__header p {
  margin: 0;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.priority-panel__header h2 {
  max-width: 520px;
  margin: 0;
  color: var(--ink);
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.12;
  text-align: right;
}

.priority-panel__list {
  display: grid;
  gap: 10px;
}

.priority-finding {
  display: grid;
  align-items: stretch;
  gap: 0;
  grid-template-columns: 120px minmax(0, 1fr) 260px;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
}

.priority-finding__index {
  border-right: 1px solid var(--border-hairline);
  padding: 14px;
}

.priority-finding__index strong {
  display: block;
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 16px;
}

.priority-finding__index span {
  display: block;
  margin-top: 10px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 800;
  line-height: 1.35;
  text-transform: uppercase;
}

.priority-finding__body {
  min-width: 0;
  padding: 14px 16px;
}

.priority-finding__layer {
  color: var(--ink-muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.priority-finding h3 {
  margin: 6px 0 0;
  color: var(--ink);
  font-size: 17px;
  line-height: 1.3;
}

.priority-finding p {
  margin: 8px 0 0;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.55;
}

.priority-finding__refs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.priority-finding__refs span {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  color: var(--ink);
  padding: 4px 6px;
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
}

.priority-finding__boundary {
  border-left: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 14px;
}

.priority-finding--danger {
  border-left: 3px solid var(--danger);
}

.priority-finding--warning {
  border-left: 3px solid var(--warning);
}

@media (max-width: 1020px) {
  .priority-finding {
    grid-template-columns: 96px minmax(0, 1fr);
  }

  .priority-finding__boundary {
    grid-column: 1 / -1;
    border-top: 1px solid var(--border-hairline);
    border-left: 0;
  }
}

@media (max-width: 720px) {
  .priority-panel {
    padding: 24px var(--page-gutter);
  }

  .priority-panel__header {
    display: block;
  }

  .priority-panel__header h2 {
    margin-top: 8px;
    text-align: left;
  }
}

@media (max-width: 560px) {
  .priority-finding {
    grid-template-columns: 1fr;
  }

  .priority-finding__index {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-right: 0;
    border-bottom: 1px solid var(--border-hairline);
  }

  .priority-finding__index span {
    margin-top: 0;
  }
}
</style>
