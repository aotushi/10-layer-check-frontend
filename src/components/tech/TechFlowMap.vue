<script setup lang="ts">
import { workflowDiagramNodes } from '@/content/techPage'

const mainPath = workflowDiagramNodes.filter((node) => node.kind !== 'operations')
const engineNode = workflowDiagramNodes.find((node) => node.kind === 'engine')
const operationsNode = workflowDiagramNodes.find((node) => node.kind === 'operations')

const mapNodes = [
  {
    id: 'domain-input',
    className: 'architecture-node--input',
    lane: 'Client',
    title: 'Domain input',
    body: 'Public URL enters the app shell.',
    tags: ['validate', 'route'],
  },
  {
    id: 'scan-api',
    className: 'architecture-node--api',
    lane: 'Edge API',
    title: 'Worker API',
    body: 'Creates scan job and selects the probe plan.',
    tags: ['job id', 'limits'],
  },
  {
    id: 'evidence-store',
    className: 'architecture-node--data',
    lane: 'Data',
    title: 'D1 / KV',
    body: 'Persists facts before any report prose exists.',
    tags: ['findings', 'cache'],
  },
  {
    id: 'ai-report',
    className: 'architecture-node--ai',
    lane: 'AI',
    title: 'Workers AI',
    body: 'Explains evidence and missing-data boundaries.',
    tags: ['summary', 'guardrails'],
  },
  {
    id: 'review-artifact',
    className: 'architecture-node--report',
    lane: 'Report',
    title: 'Report UI',
    body: 'Turns the scan into a reusable artifact.',
    tags: ['history', 'SEO-safe'],
  },
] as const

const supportTargets = ['Vue shell', 'Worker API', 'Probe engine', 'Report UI'] as const
</script>

<template>
  <section class="workflow-section">
    <div class="page-inner">
      <div class="workflow-section__header">
        <p>Business workflow</p>
        <h2>Public scan request to evidence-backed report artifact</h2>
      </div>

      <div class="architecture-map" aria-label="Architecture workflow diagram">
        <div class="architecture-map__bands" aria-hidden="true">
          <span>Frontend</span>
          <span>Edge orchestration</span>
          <span>10-layer core</span>
          <span>Data + AI</span>
          <span>Report surface</span>
        </div>

        <svg
          class="architecture-map__wires"
          viewBox="0 0 1120 620"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id="arrow-primary"
              markerHeight="10"
              markerWidth="10"
              orient="auto"
              refX="8"
              refY="5"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--primary)" />
            </marker>
            <marker
              id="arrow-support"
              markerHeight="10"
              markerWidth="10"
              orient="auto"
              refX="8"
              refY="5"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--ink-muted)" />
            </marker>
          </defs>

          <path
            class="wire wire--primary"
            d="M142 258 H308 C330 258 330 238 352 238 H474"
            marker-end="url(#arrow-primary)"
          />
          <path
            class="wire wire--primary"
            d="M760 236 H850 C875 236 875 186 900 186"
            marker-end="url(#arrow-primary)"
          />
          <path class="wire wire--primary" d="M975 244 V342" marker-end="url(#arrow-primary)" />
          <path
            class="wire wire--primary"
            d="M902 406 H785 C755 406 755 462 718 462"
            marker-end="url(#arrow-primary)"
          />

          <path
            class="wire wire--support"
            d="M255 512 C255 450 218 414 218 338"
            marker-end="url(#arrow-support)"
          />
          <path
            class="wire wire--support"
            d="M430 512 C430 450 444 398 500 360"
            marker-end="url(#arrow-support)"
          />
          <path
            class="wire wire--support"
            d="M660 512 C690 462 716 430 732 360"
            marker-end="url(#arrow-support)"
          />
          <path
            class="wire wire--support"
            d="M820 512 C825 480 795 462 740 462"
            marker-end="url(#arrow-support)"
          />
        </svg>

        <article
          v-for="node in mapNodes"
          :key="node.id"
          class="architecture-node"
          :class="node.className"
        >
          <span>{{ node.lane }}</span>
          <h3>{{ node.title }}</h3>
          <p>{{ node.body }}</p>
          <div>
            <small v-for="tag in node.tags" :key="tag">{{ tag }}</small>
          </div>
        </article>

        <article class="architecture-engine">
          <span>10-layer core</span>
          <h3>{{ engineNode?.stage }}</h3>
          <p>{{ engineNode?.summary }}</p>

          <div class="architecture-engine__groups">
            <section v-for="group in engineNode?.probeGroups" :key="group.title">
              <h4>{{ group.title }}</h4>
              <div>
                <small v-for="layer in group.layers" :key="layer">{{ layer }}</small>
              </div>
            </section>
          </div>
        </article>

        <aside class="operations-plane">
          <div>
            <span>Operations plane</span>
            <h3>{{ operationsNode?.stage }}</h3>
            <p>{{ operationsNode?.summary }}</p>
          </div>
          <div class="operations-plane__targets">
            <small v-for="target in supportTargets" :key="target">{{ target }}</small>
          </div>
          <div class="operations-plane__tools">
            <strong v-for="item in operationsNode?.operations" :key="item">{{ item }}</strong>
          </div>
        </aside>

        <div class="architecture-map__legend" aria-hidden="true">
          <span>solid: request path</span>
          <span>dashed: quality support</span>
        </div>
      </div>

      <div class="architecture-mobile" aria-label="Mobile architecture workflow">
        <section class="mobile-panel">
          <p>Main path</p>
          <ol>
            <li v-for="node in mainPath" :key="node.id">
              <span>{{ node.layer }}</span>
              <strong>{{ node.stage }}</strong>
            </li>
          </ol>
        </section>

        <section class="mobile-panel mobile-panel--core">
          <p>10-layer probe groups</p>
          <div>
            <article v-for="group in engineNode?.probeGroups" :key="group.title">
              <strong>{{ group.title }}</strong>
              <span>{{ group.layers.join(' / ') }}</span>
            </article>
          </div>
        </section>

        <section class="mobile-panel mobile-panel--ops">
          <p>Operations support</p>
          <div>
            <article v-for="item in operationsNode?.operations" :key="item">
              <strong>{{ item }}</strong>
            </article>
          </div>
        </section>
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
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.workflow-section__header h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.25;
}

.architecture-map {
  position: relative;
  min-height: 620px;
  border: 1px solid var(--border-strong);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--soft-primary) 34%, transparent), transparent),
    var(--canvas);
  overflow: hidden;
}

.architecture-map::before {
  position: absolute;
  inset: 64px 34px 86px;
  border: 1px solid color-mix(in srgb, var(--border-hairline) 76%, transparent);
  content: '';
  pointer-events: none;
}

.architecture-map__bands {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 18% 20% 28% 21% 13%;
  pointer-events: none;
}

.architecture-map__bands span {
  border-right: 1px solid color-mix(in srgb, var(--border-hairline) 58%, transparent);
  padding: 22px 16px 0;
  color: color-mix(in srgb, var(--ink-muted) 72%, transparent);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.architecture-map__wires {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.wire {
  fill: none;
  stroke-linecap: square;
  stroke-linejoin: round;
}

.wire--primary {
  stroke: var(--primary);
  stroke-width: 2.25;
}

.wire--support {
  stroke: var(--ink-muted);
  stroke-dasharray: 7 7;
  stroke-width: 1.35;
}

.architecture-node,
.architecture-engine,
.operations-plane {
  position: absolute;
  z-index: 2;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  box-shadow: 0 16px 34px color-mix(in srgb, var(--ink) 7%, transparent);
}

.architecture-node {
  display: grid;
  gap: 8px;
  width: 152px;
  min-height: 138px;
  padding: 14px;
}

.architecture-node--input {
  top: 210px;
  left: 56px;
  width: 142px;
  min-height: 112px;
  border-left: 4px solid var(--primary);
}

.architecture-node--api {
  top: 194px;
  left: 278px;
  width: 166px;
  border-left: 4px solid var(--info);
}

.architecture-node--data {
  top: 128px;
  right: 130px;
  width: 164px;
  border-left: 4px solid var(--success);
}

.architecture-node--ai {
  right: 130px;
  bottom: 138px;
  width: 164px;
  border-left: 4px solid var(--warning);
}

.architecture-node--report {
  right: 32px;
  top: 252px;
  width: 132px;
  min-height: 120px;
  border-left: 4px solid var(--primary-deep);
}

.architecture-node span,
.architecture-engine > span,
.operations-plane span {
  color: var(--primary);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.architecture-node h3,
.architecture-node p,
.architecture-engine h3,
.architecture-engine p,
.architecture-engine h4,
.operations-plane h3,
.operations-plane p {
  margin: 0;
}

.architecture-node h3 {
  color: var(--ink);
  font-size: 17px;
  line-height: 1.16;
}

.architecture-node p {
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.34;
}

.architecture-node div,
.architecture-engine__groups div,
.operations-plane__targets,
.operations-plane__tools {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.architecture-node small,
.architecture-engine small,
.operations-plane small,
.operations-plane strong {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 3px 5px;
  color: var(--ink-secondary);
  font-size: 10px;
  font-weight: 800;
  line-height: 1.1;
}

.architecture-engine {
  top: 88px;
  left: 462px;
  display: grid;
  gap: 10px;
  width: 284px;
  padding: 18px;
  border-color: color-mix(in srgb, var(--primary) 42%, var(--border-strong));
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--soft-primary) 76%, var(--canvas)) 0,
      transparent 136px
    ),
    var(--canvas);
}

.architecture-engine h3 {
  color: var(--ink);
  font-size: 23px;
  line-height: 1.1;
}

.architecture-engine p {
  max-width: 250px;
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.34;
}

.architecture-engine__groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.architecture-engine__groups section {
  border: 1px solid var(--border-hairline);
  background: color-mix(in srgb, var(--canvas-soft) 74%, var(--canvas));
  padding: 9px;
}

.architecture-engine h4 {
  color: var(--ink);
  font-size: 11px;
  line-height: 1.2;
}

.architecture-engine__groups div {
  margin-top: 8px;
}

.operations-plane {
  left: 160px;
  right: 238px;
  bottom: 42px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 10px 18px;
  border-style: dashed;
  padding: 16px;
  background: color-mix(in srgb, var(--canvas-muted) 62%, var(--canvas));
  box-shadow: none;
}

.operations-plane h3 {
  color: var(--ink);
  font-size: 17px;
  line-height: 1.15;
}

.operations-plane p {
  margin-top: 6px;
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.34;
}

.operations-plane__targets {
  align-content: start;
  justify-content: flex-end;
}

.operations-plane__tools {
  grid-column: 1 / -1;
  border-top: 1px solid var(--border-hairline);
  padding-top: 10px;
}

.operations-plane strong {
  color: var(--ink);
}

.architecture-map__legend {
  position: absolute;
  right: 22px;
  bottom: 18px;
  z-index: 3;
  display: flex;
  gap: 8px;
}

.architecture-map__legend span {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 6px 8px;
  color: var(--ink-secondary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.architecture-mobile {
  display: none;
}

@media (max-width: 920px) {
  .architecture-map {
    display: none;
  }

  .architecture-mobile {
    display: grid;
    gap: 14px;
  }

  .mobile-panel {
    border: 1px solid var(--border-strong);
    background: var(--canvas);
    padding: 14px;
  }

  .mobile-panel p {
    margin: 0 0 12px;
    color: var(--primary);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .mobile-panel ol {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .mobile-panel li {
    display: grid;
    gap: 4px;
    border-left: 3px solid var(--primary);
    background: var(--canvas-soft);
    padding: 9px 10px;
  }

  .mobile-panel li span {
    color: var(--ink-muted);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .mobile-panel li strong {
    color: var(--ink);
    font-size: 14px;
  }

  .mobile-panel--core > div,
  .mobile-panel--ops > div {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .mobile-panel article {
    border: 1px solid var(--border-hairline);
    background: var(--canvas-soft);
    padding: 9px;
  }

  .mobile-panel article strong {
    display: block;
    color: var(--ink);
    font-size: 12px;
    line-height: 1.2;
  }

  .mobile-panel article span {
    display: block;
    margin-top: 6px;
    color: var(--ink-secondary);
    font-size: 11px;
    line-height: 1.35;
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
}
</style>
