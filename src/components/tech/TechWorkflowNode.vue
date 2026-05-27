<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'
import { computed } from 'vue'

import type { WorkflowDiagramNode } from '@/content/techPage'

type WorkflowNodeData = WorkflowDiagramNode & {
  indexLabel: string
  layout: 'desktop' | 'compact'
  sourcePosition: Position
  targetPosition: Position
}

const props = defineProps<NodeProps<WorkflowNodeData>>()

const nodeClasses = computed(() => [
  `workflow-node-card--${props.data.kind}`,
  `workflow-node-card--${props.data.layout}`,
])
const targetPosition = computed(() => props.data.targetPosition)
const sourcePosition = computed(() => props.data.sourcePosition)
</script>

<template>
  <article class="workflow-node-card" :class="nodeClasses">
    <Handle class="workflow-node-card__handle" type="target" :position="targetPosition" />
    <Handle class="workflow-node-card__handle" type="source" :position="sourcePosition" />
    <Handle
      id="support-target"
      class="workflow-node-card__support-handle"
      type="target"
      :position="Position.Bottom"
    />
    <Handle
      id="support-source"
      class="workflow-node-card__support-handle"
      type="source"
      :position="Position.Top"
    />

    <div class="workflow-node-card__topline">
      <span>{{ data.indexLabel }}</span>
      <small>{{ data.layer }}</small>
    </div>

    <div class="workflow-node-card__body">
      <h3>{{ data.stage }}</h3>
      <p>{{ data.summary }}</p>
    </div>

    <div v-if="data.probeGroups?.length" class="workflow-node-card__probe-groups">
      <section v-for="group in data.probeGroups" :key="group.title">
        <h4>{{ group.title }}</h4>
        <div>
          <span v-for="layer in group.layers" :key="layer">{{ layer }}</span>
        </div>
      </section>
    </div>

    <div v-else-if="data.operations?.length" class="workflow-node-card__ops-grid">
      <span v-for="item in data.operations" :key="item">{{ item }}</span>
    </div>

    <ul v-else>
      <li v-for="line in data.actionLines" :key="line">{{ line }}</li>
    </ul>

    <strong>{{ data.output }}</strong>
  </article>
</template>

<style scoped>
.workflow-node-card {
  display: grid;
  gap: 8px;
  width: 216px;
  border: 1px solid var(--border-strong);
  background: color-mix(in srgb, var(--canvas) 96%, var(--primary) 4%);
  padding: 12px;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary) 7%, transparent);
}

.workflow-node-card--entry {
  width: 168px;
  padding: 11px;
}

.workflow-node-card--service {
  width: 214px;
}

.workflow-node-card--engine {
  width: 340px;
  border-color: color-mix(in srgb, var(--primary) 48%, var(--border-strong));
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--soft-primary) 70%, var(--canvas)) 0,
      transparent 86px
    ),
    var(--canvas);
  padding: 14px;
}

.workflow-node-card--storage,
.workflow-node-card--ai,
.workflow-node-card--report {
  width: 216px;
}

.workflow-node-card--operations {
  width: 500px;
  border-style: dashed;
  background: color-mix(in srgb, var(--canvas-muted) 72%, var(--canvas));
}

.workflow-node-card__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.workflow-node-card__topline span {
  display: inline-flex;
  min-width: 30px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary);
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  font-weight: 800;
}

.workflow-node-card--operations .workflow-node-card__topline span {
  min-width: 38px;
  border-color: var(--ink-muted);
  color: var(--ink-secondary);
}

.workflow-node-card small {
  color: var(--primary);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-align: right;
  text-transform: uppercase;
}

.workflow-node-card__body {
  display: grid;
  gap: 5px;
}

.workflow-node-card h3,
.workflow-node-card p,
.workflow-node-card h4 {
  margin: 0;
}

.workflow-node-card h3 {
  color: var(--ink);
  font-size: 16px;
  line-height: 1.22;
}

.workflow-node-card--engine h3 {
  font-size: 20px;
}

.workflow-node-card p {
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.35;
}

.workflow-node-card ul {
  display: grid;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.workflow-node-card li {
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.32;
}

.workflow-node-card li::before {
  color: var(--primary);
  content: '-> ';
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
}

.workflow-node-card__probe-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.workflow-node-card__probe-groups section {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 8px;
}

.workflow-node-card__probe-groups h4 {
  color: var(--ink);
  font-size: 11px;
  line-height: 1.25;
}

.workflow-node-card__probe-groups div,
.workflow-node-card__ops-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 7px;
}

.workflow-node-card__probe-groups span,
.workflow-node-card__ops-grid span {
  border: 1px solid color-mix(in srgb, var(--primary) 26%, var(--border-hairline));
  background: var(--canvas);
  padding: 3px 5px;
  color: var(--ink-secondary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 10px;
  line-height: 1.2;
}

.workflow-node-card__ops-grid span {
  border-color: var(--border-hairline);
  font-family: var(--font-sans);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.workflow-node-card strong {
  border-top: 1px solid var(--border-hairline);
  padding-top: 8px;
  color: var(--ink);
  font-size: 12px;
  line-height: 1.35;
}

.workflow-node-card__handle {
  width: 8px;
  height: 8px;
  border: 1px solid var(--primary);
  background: var(--canvas);
}

.workflow-node-card__support-handle {
  width: 8px;
  height: 8px;
  border: 1px solid var(--ink-muted);
  background: var(--canvas);
  opacity: 0;
}

@media (max-width: 560px) {
  .workflow-node-card--compact {
    width: 252px;
    gap: 6px;
    padding: 9px;
  }

  .workflow-node-card--compact.workflow-node-card--engine,
  .workflow-node-card--compact.workflow-node-card--operations {
    width: 284px;
  }

  .workflow-node-card--compact .workflow-node-card__topline span {
    min-width: 24px;
    height: 24px;
  }

  .workflow-node-card--compact h3 {
    font-size: 14px;
  }

  .workflow-node-card--compact.workflow-node-card--engine h3 {
    font-size: 16px;
  }

  .workflow-node-card--compact p,
  .workflow-node-card--compact li {
    font-size: 11px;
    line-height: 1.24;
  }

  .workflow-node-card--compact .workflow-node-card__probe-groups {
    gap: 6px;
  }

  .workflow-node-card--compact .workflow-node-card__probe-groups section {
    padding: 6px;
  }

  .workflow-node-card--compact .workflow-node-card__probe-groups span,
  .workflow-node-card--compact .workflow-node-card__ops-grid span {
    font-size: 9px;
  }

  .workflow-node-card--compact strong {
    padding-top: 6px;
    font-size: 11px;
  }

  .workflow-node-card--compact:not(.workflow-node-card--engine) li:nth-child(n + 3) {
    display: none;
  }
}
</style>
