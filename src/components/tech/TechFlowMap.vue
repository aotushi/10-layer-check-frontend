<script setup lang="ts">
import { MarkerType, Position, VueFlow, type Edge, type Node } from '@vue-flow/core'
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'

import {
  workflowDiagramEdges,
  workflowDiagramNodes,
  type WorkflowDiagramEdge,
} from '@/content/techPage'

import TechWorkflowNode from './TechWorkflowNode.vue'

type WorkflowLayout = 'desktop' | 'compact'

type WorkflowAnchor = {
  x: number
  y: number
  sourcePosition: Position
  targetPosition: Position
}

const compactMediaQuery = '(max-width: 900px)'
const isCompact = shallowRef(
  typeof window !== 'undefined' ? window.matchMedia(compactMediaQuery).matches : false,
)

let mediaQueryList: MediaQueryList | undefined

function syncCompactLayout(event?: MediaQueryListEvent) {
  isCompact.value = event ? event.matches : Boolean(mediaQueryList?.matches)
}

onMounted(() => {
  mediaQueryList = window.matchMedia(compactMediaQuery)
  syncCompactLayout()
  mediaQueryList.addEventListener('change', syncCompactLayout)
})

onBeforeUnmount(() => mediaQueryList?.removeEventListener('change', syncCompactLayout))

const activeLayout = computed<WorkflowLayout>(() => (isCompact.value ? 'compact' : 'desktop'))

const desktopAnchors: Record<string, WorkflowAnchor> = {
  'domain-input': {
    x: 0,
    y: 132,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  'scan-api': {
    x: 218,
    y: 114,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  'probe-engine': {
    x: 470,
    y: 42,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  'evidence-store': {
    x: 842,
    y: 108,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Left,
  },
  'ai-report': {
    x: 842,
    y: 318,
    sourcePosition: Position.Left,
    targetPosition: Position.Top,
  },
  'review-artifact': {
    x: 570,
    y: 350,
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
  'operations-plane': {
    x: 0,
    y: 360,
    sourcePosition: Position.Top,
    targetPosition: Position.Left,
  },
}

const compactAnchors: Record<string, WorkflowAnchor> = {
  'domain-input': {
    x: 20,
    y: 0,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  'scan-api': {
    x: 20,
    y: 118,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  'probe-engine': {
    x: 0,
    y: 250,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  'evidence-store': {
    x: 20,
    y: 510,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  'ai-report': {
    x: 20,
    y: 638,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  'review-artifact': {
    x: 20,
    y: 766,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  'operations-plane': {
    x: 0,
    y: 904,
    sourcePosition: Position.Top,
    targetPosition: Position.Left,
  },
}

function getWorkflowAnchor(id: string): WorkflowAnchor {
  const anchors = activeLayout.value === 'compact' ? compactAnchors : desktopAnchors
  return anchors[id]
}

function buildWorkflowEdge(edge: WorkflowDiagramEdge): Edge {
  const supportEdge = edge.kind === 'support'

  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: supportEdge ? 'support-source' : undefined,
    targetHandle: supportEdge ? 'support-target' : undefined,
    type: 'smoothstep',
    animated: !supportEdge,
    selectable: false,
    class: supportEdge ? 'workflow-edge--support' : 'workflow-edge--primary',
    markerEnd: MarkerType.ArrowClosed,
    style: {
      stroke: supportEdge ? 'var(--ink-muted)' : 'var(--primary)',
      strokeWidth: supportEdge ? 1.1 : 1.8,
      strokeDasharray: supportEdge ? '5 5' : undefined,
    },
  }
}

const flowNodes = computed<Node[]>(() =>
  workflowDiagramNodes.map((node, index) => {
    const anchor = getWorkflowAnchor(node.id)
    const isOperationsNode = node.kind === 'operations'

    return {
      id: node.id,
      type: 'workflow',
      position: {
        x: anchor.x,
        y: anchor.y,
      },
      targetPosition: anchor.targetPosition,
      sourcePosition: anchor.sourcePosition,
      data: {
        ...node,
        indexLabel: isOperationsNode ? 'OPS' : String(index + 1).padStart(2, '0'),
        layout: activeLayout.value,
        sourcePosition: anchor.sourcePosition,
        targetPosition: anchor.targetPosition,
      },
      draggable: false,
      selectable: false,
      zIndex: isOperationsNode ? 1 : 2,
    }
  }),
)

const flowEdges = computed<Edge[]>(() => workflowDiagramEdges.map(buildWorkflowEdge))
</script>

<template>
  <section class="workflow-section">
    <div class="page-inner">
      <div class="workflow-section__header">
        <p>Business workflow</p>
        <h2>Runtime path, 10-layer probe groups, and operations support</h2>
      </div>

      <div class="workflow-canvas" aria-label="Business workflow flow canvas">
        <VueFlow
          :nodes="flowNodes"
          :edges="flowEdges"
          :nodes-draggable="false"
          :nodes-connectable="false"
          :elements-selectable="false"
          :pan-on-drag="false"
          :zoom-on-scroll="false"
          :zoom-on-pinch="false"
          :zoom-on-double-click="false"
          :prevent-scrolling="false"
          :fit-view-options="{ padding: isCompact ? 0.08 : 0.1 }"
          fit-view-on-init
          :min-zoom="isCompact ? 0.82 : 0.64"
          :max-zoom="1"
        >
          <template #node-workflow="nodeProps">
            <TechWorkflowNode v-bind="nodeProps" />
          </template>
        </VueFlow>

        <div class="workflow-canvas__legend" aria-hidden="true">
          <span>primary request path</span>
          <span>operations support</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.workflow-section {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas-muted);
  padding: var(--section-y) var(--page-gutter);
}

.workflow-section__header {
  max-width: 780px;
  margin: 0 auto 28px;
  text-align: center;
}

.workflow-section__header p {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.workflow-section__header h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.25;
}

.workflow-canvas {
  position: relative;
  height: 560px;
  border: 1px solid var(--border-strong);
  background:
    linear-gradient(var(--border-hairline) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-hairline) 1px, transparent 1px), var(--canvas);
  background-size: 28px 28px;
  overflow: hidden;
}

.workflow-canvas :deep(.vue-flow) {
  width: 100%;
  height: 100%;
}

.workflow-canvas :deep(.vue-flow__node) {
  border-radius: 0;
}

.workflow-canvas :deep(.vue-flow__node.selected) {
  box-shadow: none;
}

.workflow-canvas :deep(.vue-flow__edge.animated path) {
  stroke-dasharray: 7;
  animation-duration: 0.9s;
}

.workflow-canvas :deep(.workflow-edge--primary .vue-flow__edge-path) {
  stroke: var(--primary);
}

.workflow-canvas :deep(.workflow-edge--support .vue-flow__edge-path) {
  stroke: var(--ink-muted);
}

.workflow-canvas :deep(.vue-flow__attribution) {
  display: none;
}

.workflow-canvas__legend {
  position: absolute;
  right: 14px;
  bottom: 12px;
  display: flex;
  gap: 8px;
  pointer-events: none;
}

.workflow-canvas__legend span {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 5px 8px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .workflow-canvas {
    height: 1060px;
  }
}

@media (max-width: 560px) {
  .workflow-section {
    padding-block: 26px;
  }

  .workflow-section__header {
    margin-bottom: 16px;
    text-align: left;
  }

  .workflow-section__header h2 {
    font-size: 20px;
  }

  .workflow-canvas {
    height: 1040px;
    background-size: 22px 22px;
  }

  .workflow-canvas__legend {
    display: none;
  }
}
</style>
