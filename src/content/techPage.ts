export const architectureStats = [
  ['Runtime', 'Cloudflare edge'],
  ['Frontend', 'Vue 3 SPA'],
  ['Storage', 'D1 + KV'],
  ['Reporting', 'Evidence-bound AI'],
] as const

export const runtimeTrace = [
  {
    label: 'Input',
    value: 'Public domain',
  },
  {
    label: 'Edge',
    value: 'Worker scan job',
  },
  {
    label: 'Evidence',
    value: '10-layer probes',
  },
  {
    label: 'Artifact',
    value: 'Report UI',
  },
] as const

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

export const systemArchitectureGroups = [
  {
    zone: 'Public interface',
    title: 'Vue application shell',
    stack: 'Vue 3, Vite, Router, Pinia, pinia-colada',
    items: [
      'Componentized page sections',
      'Request composables and cached server state',
      'Route metadata for public pages',
    ],
  },
  {
    zone: 'API boundary',
    title: 'Cloudflare Worker API',
    stack: 'Workers, typed request handlers, response shaping',
    items: [
      'Validate public domain input',
      'Create bounded scan jobs',
      'Expose timeout and rate-limit states',
    ],
  },
  {
    zone: 'Evidence execution',
    title: '10-layer probe engine',
    stack: 'DNS, BGP, TLS, HTTP, headers, content, runtime probes',
    items: [
      'Run externally observable checks',
      'Normalize findings and missing-data notes',
      'Avoid authenticated crawling or exploit execution',
    ],
  },
  {
    zone: 'Data plane',
    title: 'D1 and KV storage',
    stack: 'D1 records, KV public-observation cache',
    items: [
      'Persist jobs, findings, and report sections',
      'Cache reusable public observations',
      'Keep facts separate from generated prose',
    ],
  },
  {
    zone: 'Interpretation',
    title: 'Workers AI report layer',
    stack: 'Evidence summaries, boundary language, missing-data notes',
    items: [
      'Explain only collected evidence',
      'Preserve uncertainty and missing data',
      'Produce report copy from structured sections',
    ],
  },
  {
    zone: 'Artifact surface',
    title: 'Report UI',
    stack: 'History route, SEO-safe public artifact, evidence references',
    items: [
      'Render readable report sections',
      'Expose evidence-backed technical detail',
      'Keep scan results reusable and shareable',
    ],
  },
] as const

export const reportArtifactFlow = [
  {
    title: 'Evidence packet',
    body: 'Findings, evidence refs, status, and missing-data refs are normalized before any narrative text exists.',
    chips: ['E### refs', 'M### refs', 'status'],
  },
  {
    title: 'Section contract',
    body: 'The report groups evidence into stable topics rather than one raw section per probe layer.',
    chips: ['technology_stack', 'request_chain', 'security_posture'],
  },
  {
    title: 'Narrative assembly',
    body: 'Workers AI explains the supplied facts, cites known refs, and keeps missing data explicit.',
    chips: ['fact-bound', 'no invented claims', 'uncertainty'],
  },
] as const

export const reportArtifactSections = [
  {
    id: 'summary',
    title: 'Summary',
    body: 'High-level result, confidence, and immediate risk signals.',
  },
  {
    id: 'public_information_architecture',
    title: 'Public information architecture',
    body: 'Public routes, content maps, and observable site structure.',
  },
  {
    id: 'technology_stack',
    title: 'Technology stack',
    body: 'Frontend or application technologies only when evidence supports them.',
  },
  {
    id: 'request_rendering_chain',
    title: 'Request rendering chain',
    body: 'How public requests resolve, render, redirect, or fail.',
  },
  {
    id: 'api_protocol_surface',
    title: 'API and protocol surface',
    body: 'CORS, access-control, protocol, and API response signals.',
  },
  {
    id: 'security_posture',
    title: 'Security posture',
    body: 'Headers, cookies, TLS, and browser-observable runtime risks.',
  },
  {
    id: 'missing_data_next_steps',
    title: 'Missing data and next steps',
    body: 'What was not observable and what should be verified with authorization.',
  },
] as const

export const trustBoundaries = [
  'Public evidence only',
  'No private inventory claim',
  'No exploitability confirmation',
  'AI cannot invent findings',
  'Missing data remains explicit',
] as const
