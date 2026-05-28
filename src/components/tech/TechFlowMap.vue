<script setup lang="ts">
import { workflowDiagramNodes } from '@/content/techPage'

const engineNode = workflowDiagramNodes.find((node) => node.kind === 'engine')

const probeGroups = engineNode?.probeGroups ?? []

const operationsRail = [
  {
    title: 'GitHub Actions',
    detail: 'type lint test build',
    label: 'quality gates',
  },
  {
    title: 'Histoire',
    detail: 'base component review',
    label: 'component review',
  },
  {
    title: 'Playwright',
    detail: 'visual regression',
    label: 'responsive coverage',
  },
  {
    title: 'Cloudflare Pages',
    detail: 'frontend deploy',
    label: 'deploy checks',
  },
  {
    title: 'D1 KV migrations',
    detail: 'data plane control',
    label: 'data control',
  },
] as const

const operationPositions = [
  { x: 32, y: 320 },
  { x: 32, y: 408 },
  { x: 32, y: 496 },
  { x: 32, y: 584 },
  { x: 32, y: 672 },
] as const

const probePositions = [
  { x: 874, y: 96 },
  { x: 874, y: 190 },
  { x: 874, y: 284 },
  { x: 874, y: 378 },
] as const
</script>

<template>
  <section class="workflow-section" data-tech-flow-map>
    <div class="page-inner">
      <div class="workflow-section__header">
        <p>Business workflow</p>
        <h2>Public domain to evidence-backed report artifact</h2>
        <span>Thin-line pipeline architecture diagram</span>
      </div>

      <div class="pipeline-shell">
        <svg
          class="pipeline-map"
          viewBox="0 40 1680 700"
          role="img"
          aria-labelledby="pipeline-title pipeline-desc"
        >
          <title id="pipeline-title">10-Layer Check workflow pipeline</title>
          <desc id="pipeline-desc">
            Public domain input moves through the Vue app shell, Cloudflare Worker API, 10-layer
            probe engine, evidence records, D1 and KV storage, Workers AI, and the report UI.
            Operations support uses dashed lines and stays outside the main request path.
          </desc>

          <defs>
            <marker
              id="workflow-arrow-blue"
              markerHeight="10"
              markerWidth="10"
              orient="auto"
              refX="9"
              refY="5"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--primary)" />
            </marker>
            <marker
              id="workflow-arrow-gray"
              markerHeight="10"
              markerWidth="10"
              orient="auto"
              refX="9"
              refY="5"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--ink-muted)" />
            </marker>
            <marker
              id="workflow-arrow-green"
              markerHeight="10"
              markerWidth="10"
              orient="auto"
              refX="9"
              refY="5"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--success)" />
            </marker>
          </defs>

          <rect class="pipeline-map__surface" width="1680" height="760" />

          <rect class="pipeline-node" x="44" y="207" width="106" height="46" />
          <text class="pipeline-text" x="97" y="225" text-anchor="middle">Public user</text>
          <text class="pipeline-text" x="97" y="240" text-anchor="middle">Domain</text>

          <rect class="pipeline-node" x="290" y="214" width="154" height="48" />
          <text class="pipeline-text" x="367" y="232" text-anchor="middle">Vue app shell</text>
          <text class="pipeline-muted" x="367" y="247" text-anchor="middle">
            components + requests
          </text>

          <rect class="pipeline-node" x="478" y="244" width="150" height="58" />
          <text class="pipeline-text" x="553" y="263" text-anchor="middle">
            Cloudflare Worker API
          </text>
          <text class="pipeline-muted" x="553" y="278" text-anchor="middle">create scan job</text>
          <text class="pipeline-muted" x="553" y="292" text-anchor="middle">apply limits</text>

          <rect class="pipeline-node" x="660" y="254" width="142" height="34" />
          <text class="pipeline-text" x="731" y="275" text-anchor="middle">
            10-layer probe engine
          </text>

          <rect class="pipeline-group" x="852" y="74" width="166" height="328" />
          <text class="pipeline-group-title" x="935" y="58" text-anchor="middle">
            10-layer probe groups
          </text>

          <g
            v-for="(group, index) in probeGroups"
            :key="group.title"
            :transform="`translate(${probePositions[index]?.x ?? 874} ${probePositions[index]?.y ?? 96})`"
          >
            <rect class="pipeline-node" width="122" :height="index === 3 ? 66 : 58" />
            <text class="pipeline-text" x="61" y="19" text-anchor="middle">{{ group.title }}</text>
            <text class="pipeline-muted" x="61" y="34" text-anchor="middle">
              {{ group.layers.slice(0, 2).join(' / ') }}
            </text>
            <text class="pipeline-muted" x="61" y="48" text-anchor="middle">
              {{ group.layers.slice(2).join(' / ') }}
            </text>
          </g>

          <rect
            class="pipeline-node pipeline-node--green"
            x="1048"
            y="265"
            width="132"
            height="48"
          />
          <text class="pipeline-text" x="1114" y="283" text-anchor="middle">Evidence records</text>
          <text class="pipeline-muted" x="1114" y="298" text-anchor="middle">
            normalized findings
          </text>

          <rect
            class="pipeline-node pipeline-node--green"
            x="1214"
            y="342"
            width="134"
            height="48"
          />
          <text class="pipeline-text" x="1281" y="360" text-anchor="middle">D1 + KV</text>
          <text class="pipeline-muted" x="1281" y="375" text-anchor="middle">
            jobs findings cache
          </text>

          <rect
            class="pipeline-node pipeline-node--orange"
            x="1378"
            y="331"
            width="136"
            height="58"
          />
          <text class="pipeline-text" x="1446" y="350" text-anchor="middle">Workers AI</text>
          <text class="pipeline-muted" x="1446" y="365" text-anchor="middle">
            summarize evidence
          </text>
          <text class="pipeline-muted" x="1446" y="379" text-anchor="middle">mark unknowns</text>

          <rect class="pipeline-node" x="1545" y="362" width="108" height="58" />
          <text class="pipeline-text" x="1599" y="381" text-anchor="middle">Report UI</text>
          <text class="pipeline-muted" x="1599" y="396" text-anchor="middle">history route</text>
          <text class="pipeline-muted" x="1599" y="410" text-anchor="middle">
            SEO-safe artifact
          </text>

          <path class="pipeline-line" d="M150 230 C206 230 228 238 290 238" />
          <path class="pipeline-line" d="M444 238 C462 238 462 273 478 273" />
          <path class="pipeline-line" d="M628 273 H660" />

          <path class="pipeline-line" d="M802 271 C834 271 838 125 874 125" />
          <path class="pipeline-line" d="M802 271 C836 271 838 219 874 219" />
          <path class="pipeline-line" d="M802 271 C836 271 838 313 874 313" />
          <path class="pipeline-line" d="M802 271 C836 271 838 411 874 411" />

          <path
            class="pipeline-line pipeline-line--green"
            d="M996 125 C1030 125 1028 273 1048 279"
          />
          <path
            class="pipeline-line pipeline-line--green"
            d="M996 219 C1030 219 1028 282 1048 284"
          />
          <path
            class="pipeline-line pipeline-line--green"
            d="M996 313 C1028 313 1030 294 1048 294"
          />
          <path
            class="pipeline-line pipeline-line--green"
            d="M996 411 C1030 411 1028 309 1048 300"
          />
          <path
            class="pipeline-line pipeline-line--green"
            d="M1180 289 C1204 289 1202 366 1214 366"
          />
          <path class="pipeline-line pipeline-line--green" d="M1348 366 H1378" />
          <path class="pipeline-line" d="M1514 360 C1534 360 1530 391 1545 391" />

          <text class="pipeline-rail-title" x="76" y="300" text-anchor="middle">
            Operations support rail
          </text>

          <g
            v-for="(item, index) in operationsRail"
            :key="item.title"
            :transform="`translate(${operationPositions[index].x} ${operationPositions[index].y})`"
          >
            <rect class="pipeline-node pipeline-node--support" width="138" height="46" />
            <text class="pipeline-text" x="69" y="18" text-anchor="middle">{{ item.title }}</text>
            <text class="pipeline-muted" x="69" y="33" text-anchor="middle">{{ item.detail }}</text>
          </g>

          <path
            class="pipeline-line pipeline-line--support"
            d="M170 343 C226 326 236 263 290 248"
          />
          <text class="pipeline-line-label" x="256" y="314">quality gates</text>

          <path
            class="pipeline-line pipeline-line--support"
            d="M170 431 C214 400 242 274 290 250"
          />
          <text class="pipeline-line-label" x="214" y="380">component review</text>

          <path
            class="pipeline-line pipeline-line--support"
            d="M170 519 C430 520 1266 516 1545 414"
          />
          <text class="pipeline-line-label" x="820" y="506">responsive coverage</text>

          <path
            class="pipeline-line pipeline-line--support"
            d="M170 607 C306 566 398 466 478 300"
          />
          <text class="pipeline-line-label" x="294" y="556">deploy checks</text>

          <path
            class="pipeline-line pipeline-line--support"
            d="M170 695 C474 695 1110 694 1248 390"
          />
          <text class="pipeline-line-label" x="772" y="682">data control</text>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.workflow-section {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: clamp(42px, 6vw, 72px) var(--page-gutter);
}

.workflow-section__header {
  display: grid;
  gap: 8px;
  max-width: 760px;
  margin: 0 auto 24px;
  text-align: center;
}

.workflow-section__header p,
.workflow-section__header h2,
.workflow-section__header span {
  margin: 0;
}

.workflow-section__header p {
  color: var(--primary);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.workflow-section__header h2 {
  color: var(--ink);
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 500;
  line-height: 1.18;
}

.workflow-section__header span {
  color: var(--ink-muted);
  font-size: 13px;
}

.pipeline-shell {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  overflow-x: auto;
  overscroll-behavior-x: contain;
}

.pipeline-map {
  display: block;
  width: 100%;
  min-width: 0;
  height: auto;
}

.pipeline-map__surface {
  fill: var(--canvas);
}

.pipeline-node {
  fill: color-mix(in srgb, var(--canvas-soft) 58%, var(--canvas));
  stroke: var(--primary);
  stroke-width: 1.6;
}

.pipeline-node--green {
  fill: color-mix(in srgb, var(--success) 7%, var(--canvas));
  stroke: var(--success);
}

.pipeline-node--orange {
  fill: color-mix(in srgb, var(--warning) 9%, var(--canvas));
  stroke: var(--warning);
}

.pipeline-node--support {
  fill: var(--canvas);
  stroke: var(--border-strong);
  stroke-dasharray: 4 4;
}

.pipeline-group {
  fill: transparent;
  stroke: color-mix(in srgb, var(--border-hairline) 72%, transparent);
  stroke-width: 1.2;
}

.pipeline-group-title,
.pipeline-rail-title {
  fill: var(--ink-secondary);
  font-size: 11px;
  font-weight: 500;
}

.pipeline-text {
  fill: var(--ink);
  font-size: 11px;
  font-weight: 500;
}

.pipeline-muted {
  fill: var(--ink-muted);
  font-size: 10px;
  font-weight: 400;
}

.pipeline-line {
  fill: none;
  stroke: var(--primary);
  stroke-width: 1.25;
  marker-end: url(#workflow-arrow-blue);
}

.pipeline-line--green {
  stroke: var(--success);
  marker-end: url(#workflow-arrow-green);
}

.pipeline-line--support {
  stroke: var(--ink-muted);
  stroke-dasharray: 3 3;
  stroke-width: 1;
  marker-end: url(#workflow-arrow-gray);
}

.pipeline-line-label {
  fill: var(--ink-muted);
  font-size: 10px;
  font-weight: 400;
}

@media (max-width: 920px) {
  .workflow-section {
    padding-block: 28px;
  }

  .workflow-section__header {
    margin-bottom: 16px;
    text-align: left;
  }

  .pipeline-shell {
    margin-inline: calc(var(--page-gutter) * -1);
    border-right: 0;
    border-left: 0;
  }

  .pipeline-map {
    min-width: 980px;
  }
}
</style>
