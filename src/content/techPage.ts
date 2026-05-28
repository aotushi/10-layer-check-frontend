export const architectureStats = [
  ['Runtime', 'Cloudflare edge'],
  ['Frontend', 'Vue 3 SPA'],
  ['Storage', 'D1 + KV'],
  ['Reporting', 'Evidence-bound AI'],
] as const

export const topologyGroups = [
  {
    zone: 'Public client',
    title: 'Vue application shell',
    tech: 'Vue 3, Vite, Router, Pinia, pinia-colada',
    responsibility:
      'Renders public pages, scan entry, report surfaces, route-level metadata, and cached server state.',
  },
  {
    zone: 'API edge',
    title: 'Cloudflare Worker API',
    tech: 'Workers, typed request handlers, response shaping',
    responsibility:
      'Validates domain input, creates scan jobs, applies execution boundaries, and returns normalized payloads.',
  },
  {
    zone: 'Diagnostic core',
    title: '10-layer scan engine',
    tech: 'DNS, BGP, TLS, HTTP, header, payload, DOM probes',
    responsibility:
      'Collects externally observable evidence without authenticated crawling or exploit execution.',
  },
  {
    zone: 'Persistence',
    title: 'Report data plane',
    tech: 'D1 records, KV public-observation cache',
    responsibility:
      'Stores scan jobs, findings, evidence references, cacheable observations, and report state.',
  },
  {
    zone: 'Interpretation',
    title: 'Workers AI reporting',
    tech: 'Evidence summaries, boundary language, missing-data notes',
    responsibility:
      'Converts structured evidence into readable explanations without inventing unsupported facts.',
  },
  {
    zone: 'Delivery and quality',
    title: 'Operations rail',
    tech: 'Cloudflare Pages, GitHub Actions, Histoire, Playwright',
    responsibility:
      'Ships the frontend, verifies component states, checks responsive layouts, and keeps deployments repeatable.',
  },
]

export type WorkflowNodeKind =
  | 'entry'
  | 'service'
  | 'engine'
  | 'storage'
  | 'ai'
  | 'report'
  | 'operations'

export type WorkflowProbeGroup = {
  title: string
  layers: string[]
}

export type WorkflowDiagramNode = {
  id: string
  stage: string
  layer: string
  kind: WorkflowNodeKind
  summary: string
  actionLines: string[]
  output: string
  probeGroups?: WorkflowProbeGroup[]
  operations?: string[]
}

export const workflowDiagramNodes = [
  {
    id: 'domain-input',
    stage: 'Domain input',
    layer: 'Vue frontend',
    kind: 'entry',
    summary: 'Public domain enters the app shell.',
    actionLines: ['Validate public domain', 'Keep route context'],
    output: 'Bounded scan request',
  },
  {
    id: 'scan-api',
    stage: 'Scan job',
    layer: 'Worker API',
    kind: 'service',
    summary: 'The edge API turns user intent into a traceable job.',
    actionLines: ['Create traceable job', 'Reject invalid input', 'Choose probe plan'],
    output: 'Traceable scan ID',
  },
  {
    id: 'probe-engine',
    stage: '10-layer probe engine',
    layer: '10-layer engine',
    kind: 'engine',
    summary: 'The core engine fans out into externally observable diagnostic categories.',
    actionLines: ['Run public probes', 'Normalize evidence', 'Mark missing data'],
    output: 'Layered evidence records',
    probeGroups: [
      {
        title: 'Network foundation',
        layers: ['L1 DNS', 'L2 BGP', 'L3 routing'],
      },
      {
        title: 'Transport security',
        layers: ['L4 TLS', 'L5 certificates'],
      },
      {
        title: 'HTTP policy',
        layers: ['L6 headers', 'L7 cookies'],
      },
      {
        title: 'Runtime evidence',
        layers: ['L8 content', 'L9 browser', 'L10 app'],
      },
    ],
  },
  {
    id: 'evidence-store',
    stage: 'Evidence storage',
    layer: 'D1 / KV',
    kind: 'storage',
    summary: 'Observed facts are stored before report prose is generated.',
    actionLines: ['Persist findings in D1', 'Store evidence refs', 'Cache public observations'],
    output: 'Inspectable data plane',
  },
  {
    id: 'ai-report',
    stage: 'AI report',
    layer: 'Workers AI',
    kind: 'ai',
    summary: 'AI explains only the collected evidence and explicit uncertainty.',
    actionLines: ['Summarize evidence', 'Explain missing data', 'Keep boundary language'],
    output: 'Evidence-backed report copy',
  },
  {
    id: 'review-artifact',
    stage: 'Review',
    layer: 'Vue frontend',
    kind: 'report',
    summary: 'The frontend turns the scan result into a reusable public artifact.',
    actionLines: ['Render report route', 'Expose history surfaces', 'Publish SEO-safe pages'],
    output: 'Reusable technical artifact',
  },
  {
    id: 'operations-plane',
    stage: 'Operations plane',
    layer: 'Quality and deployment',
    kind: 'operations',
    summary:
      'The delivery system keeps the architecture repeatable rather than manually inspected.',
    actionLines: [
      'Histoire component review',
      'Playwright visual gates',
      'MSW deterministic mocks',
    ],
    output: 'Controlled delivery rail',
    operations: ['GitHub Actions', 'Cloudflare Pages', 'Worker deploy', 'D1 / KV migrations'],
  },
] satisfies WorkflowDiagramNode[]

export const systemDomains = [
  {
    title: 'Frontend engineering',
    subtitle: 'Public app, routing, state, and presentation quality',
    items: [
      'Vue 3 SFCs with route-level composition surfaces',
      'Vite build for Cloudflare Pages deployment',
      'Pinia and pinia-colada for app and server-state boundaries',
      'Semantic HTML, route metadata, Open Graph, sitemap, and Web Vitals budget',
    ],
  },
  {
    title: 'Backend and scan orchestration',
    subtitle: 'API edge, job lifecycle, and diagnostic execution',
    items: [
      'Cloudflare Worker handlers for validation and response shaping',
      'Scan job lifecycle from accepted request to persisted report',
      '10-layer probe plan with explicit public-observation boundaries',
      'Error, timeout, rate-limit, and missing-data paths exposed to the report',
    ],
  },
  {
    title: 'Data and reporting',
    subtitle: 'Storage model, evidence refs, and AI interpretation',
    items: [
      'D1 stores jobs, findings, report sections, and evidence metadata',
      'KV stores cacheable public observations and short-lived status material',
      'Workers AI summarizes structured evidence without adding unsupported claims',
      'Report payloads separate observed facts, warnings, failures, and unknowns',
    ],
  },
  {
    title: 'Operations and quality',
    subtitle: 'Deployment, observability, and regression protection',
    items: [
      'Cloudflare Pages ships the frontend while Workers host the API boundary',
      'GitHub Actions runs typecheck, lint, unit, stories, visual tests, and build',
      'Histoire reviews base/page components before page assembly',
      'Playwright verifies desktop, tablet, mobile, screenshots, and overflow gates',
    ],
  },
]

export const stackMatrix = [
  [
    'UI runtime',
    'Vue 3 + Vite',
    'Route composition and componentized public surfaces',
    'Fast Pages build, typed SFC workflow, stable SPA shell',
  ],
  [
    'State layer',
    'Pinia + pinia-colada',
    'Separates app state from server scan/report state',
    'Keeps report fetching cacheable and inspectable',
  ],
  [
    'Frontend SEO',
    'Semantic HTML + route metadata',
    'Makes public pages and case/report surfaces discoverable',
    'Supports title, description, canonical, Open Graph, sitemap, robots',
  ],
  [
    'API runtime',
    'Cloudflare Workers',
    'Runs validation, scan orchestration, and response shaping at the edge',
    'Fits short-lived public diagnostic requests',
  ],
  [
    'Database',
    'D1',
    'Persists scan jobs, findings, report sections, and evidence metadata',
    'SQL-shaped records remain queryable for history and reports',
  ],
  [
    'Cache',
    'KV',
    'Stores reusable public observations and temporary status material',
    'Reduces repeated public lookups without becoming source of truth',
  ],
  [
    'AI interpretation',
    'Workers AI',
    'Writes evidence-backed report explanations',
    'Prompt boundary can require citations to collected facts',
  ],
  [
    'Quality system',
    'Histoire + Playwright',
    'Reviews components and locks responsive screenshots',
    'Catches UI drift before deployment',
  ],
] as const

export const architectureDecisions = [
  {
    decision: 'Public evidence boundary',
    reason: 'The product evaluates externally observable website behavior.',
    tradeoff: 'It does not claim private topology, ownership, or exploitability.',
  },
  {
    decision: 'Report data before report prose',
    reason: 'Findings, evidence refs, and missing-data notes are normalized first.',
    tradeoff: 'AI output is constrained, so reports favor traceability over drama.',
  },
  {
    decision: 'Component-first UI review',
    reason: 'Histoire makes base and page sections inspectable before full-page assembly.',
    tradeoff: 'Design work has an extra gate, but fewer page-level regressions escape.',
  },
]

export const qualityRails = [
  ['Type safety', 'vue-tsc verifies route, component, and content contracts.'],
  ['Code quality', 'ESLint and Prettier keep the implementation consistent.'],
  ['Component review', 'Histoire documents base, home, model, and tech sections.'],
  ['Visual regression', 'Playwright locks desktop, tablet, and mobile screenshots.'],
  ['Network determinism', 'MSW supplies stable mocked responses for tests.'],
  ['Deployment', 'Cloudflare Pages and Workers keep frontend and API boundaries separate.'],
] as const

export const dataBoundaries = [
  {
    title: 'No private inventory claim',
    body: 'The system does not infer private origin topology, ownership, or hidden assets from public signals.',
  },
  {
    title: 'Evidence-backed AI',
    body: 'Workers AI can explain collected evidence, missing data, and risk language, but not invent findings.',
  },
  {
    title: 'SEO as engineering quality',
    body: 'Public pages should expose semantic structure, metadata, canonical URLs, sitemap entries, and fast Web Vitals.',
  },
]
