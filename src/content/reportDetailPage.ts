export type ReportTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export type ReportMeta = {
  targetDomain: string
  reportId: string
  status: string
  generatedAt: string
  sourceLabel: string
}

export type SummaryCount = {
  label: string
  value: string
  detail: string
  tone: ReportTone
}

export type PriorityFinding = {
  id: string
  severity: string
  tone: ReportTone
  layer: string
  title: string
  reason: string
  evidenceRefs: string[]
  boundaryNote: string
}

export type LayerCoverageItem = {
  layer: string
  name: string
  status: string
  signalCount: number
  tone: ReportTone
}

export type EvidenceTable = {
  title: string
  columns: string[]
  rows: string[][]
}

export type ReportSection = {
  id: string
  title: string
  summary: string
  body: string[]
  evidenceRefs: string[]
  boundaryNote: string
  table?: EvidenceTable
}

export type MissingDataGroup = {
  category: string
  count: number
  tone: ReportTone
  examples: string[]
  nextAction: string
}

export type ReportDetail = {
  meta: ReportMeta
  trustBoundaries: string[]
  summaryCounts: SummaryCount[]
  priorityFindings: PriorityFinding[]
  layerCoverage: LayerCoverageItem[]
  sections: ReportSection[]
  missingDataGroups: MissingDataGroup[]
}

export const sampleReportDetail = {
  meta: {
    targetDomain: 'overreacted.io',
    reportId: 'RPT-OVERREACTED-01',
    status: 'Complete',
    generatedAt: '2026-05-26 03:42 UTC',
    sourceLabel: 'Persisted selected smoke result',
  },
  trustBoundaries: [
    'Public evidence only',
    'No private inventory claim',
    'Risk signals, not exploit proof',
    'Missing data remains explicit',
  ],
  summaryCounts: [
    {
      label: 'Normalized records',
      value: '55',
      detail: 'Evidence rows captured from bounded public checks.',
      tone: 'info',
    },
    {
      label: 'Layer coverage',
      value: '10/10',
      detail: 'All diagnostic layers returned collected or bounded output.',
      tone: 'success',
    },
    {
      label: 'Warning/error layers',
      value: '7',
      detail: 'Layers with risk signal, missing control, or review state.',
      tone: 'warning',
    },
    {
      label: 'High/medium items',
      value: '6',
      detail: 'Prioritized signals requiring technical review.',
      tone: 'danger',
    },
  ],
  priorityFindings: [
    {
      id: 'P1',
      severity: 'High signal',
      tone: 'danger',
      layer: 'L6-L7 HTTP policy',
      title: 'Security headers were not observed in sampled public responses',
      reason:
        'Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, and Permissions-Policy were absent in bounded checks.',
      evidenceRefs: ['E046', 'E050', 'M030'],
      boundaryNote: 'Header absence is a risk signal, not proof of exploitability.',
    },
    {
      id: 'P2',
      severity: 'Medium signal',
      tone: 'warning',
      layer: 'L4-L6 Transport',
      title: 'HTTPS reached, but HSTS was not found',
      reason:
        'The sampled route responded over HTTPS, while the HSTS control was not observed in the response headers.',
      evidenceRefs: ['E004', 'E007', 'E026'],
      boundaryNote: 'This does not prove complete transport policy across every route.',
    },
    {
      id: 'P3',
      severity: 'Medium signal',
      tone: 'warning',
      layer: 'L7 API and browser policy',
      title: 'Wildcard CORS indicators require bounded review',
      reason:
        'Sampled access-control evidence includes wildcard-style origin signals that should be reviewed against intended public APIs.',
      evidenceRefs: ['E044', 'E045', 'E047'],
      boundaryNote: 'CORS evidence is a configuration signal, not a confirmed data exposure.',
    },
  ],
  layerCoverage: [
    { layer: 'L1', name: 'DNS', status: 'Collected', signalCount: 3, tone: 'success' },
    { layer: 'L2', name: 'BGP', status: 'Collected', signalCount: 1, tone: 'success' },
    { layer: 'L3', name: 'Routing', status: 'Collected', signalCount: 1, tone: 'success' },
    { layer: 'L4', name: 'TLS', status: 'Review', signalCount: 2, tone: 'warning' },
    { layer: 'L5', name: 'Certificates', status: 'Review', signalCount: 1, tone: 'warning' },
    { layer: 'L6', name: 'Headers', status: 'Risk signal', signalCount: 4, tone: 'danger' },
    { layer: 'L7', name: 'HTTP policy', status: 'Risk signal', signalCount: 5, tone: 'danger' },
    { layer: 'L8', name: 'Content', status: 'Review', signalCount: 8, tone: 'warning' },
    { layer: 'L9', name: 'Browser runtime', status: 'Observed', signalCount: 3, tone: 'info' },
    { layer: 'L10', name: 'Application', status: 'Observed', signalCount: 4, tone: 'info' },
  ],
  sections: [
    {
      id: 'executive-summary',
      title: 'Executive summary',
      summary:
        'The sample contains 55 normalized records across all 10 layers, with 6 high/medium risk signals and explicit uncertainty markers.',
      body: [
        'The report should be read as a bounded public reconnaissance artifact. It captures browser-observable and network-observable signals for the sampled public route.',
        'Seven layers returned warning or error-class states. The strongest review area is HTTP policy because missing browser security controls and CORS indicators are visible in the sample.',
      ],
      evidenceRefs: ['E001', 'E004', 'E006', 'E009', 'E026', 'E027', 'M001', 'M002', 'M003'],
      boundaryNote:
        'Technical public evidence does not prove business ownership, private inventory, or exploitability.',
    },
    {
      id: 'public-information',
      title: 'Public information architecture',
      summary:
        'The bounded run observed public content surfaces and detail pages without common access barrier signals.',
      body: [
        'The sample includes 8 public content surfaces and 12 bounded public detail pages. Runtime capture loaded the page without common login or paywall barrier indicators.',
        'This section should help a reviewer understand what public routes were visible before interpreting deeper technology or security signals.',
      ],
      evidenceRefs: ['E010', 'E012', 'E014', 'E015', 'E017', 'E020', 'E033', 'M001', 'M004'],
      boundaryNote:
        'A single URL and bounded runtime evidence may miss authenticated, unlinked, or deep crawl paths.',
      table: {
        title: 'Public surface signals',
        columns: ['Surface', 'Observed count', 'Signal', 'Refs'],
        rows: [
          ['Content surfaces', '8', 'Public route/content group observed', 'E012, E014'],
          ['Detail pages', '12', 'Bounded detail pages found in public runtime', 'E015, E017'],
          [
            'Runtime access',
            '1 route',
            'Loaded without common access barrier signal',
            'E010, E020',
          ],
        ],
      },
    },
    {
      id: 'technology-stack',
      title: 'Technology stack',
      summary: 'Technology evidence is candidate-level unless multiple independent signals agree.',
      body: [
        'The report observed one deterministic frontend technology candidate and extracted public asset signals: 7 scripts, 3 stylesheets, and 1 image.',
        'CMS, forum, docs, and status-page indicators are treated as low-confidence public markers unless corroborated by stronger evidence.',
      ],
      evidenceRefs: ['E012', 'E013', 'E023', 'E024', 'E035', 'E036', 'E037', 'M001', 'M003'],
      boundaryNote:
        'Static and heuristic technology evidence should stay candidate-level unless corroborated.',
      table: {
        title: 'Technology candidates',
        columns: ['Candidate', 'Observed signal', 'Confidence', 'Refs'],
        rows: [
          ['Frontend runtime', 'Deterministic public frontend marker', 'High', 'E012, E013'],
          ['Public asset graph', '7 scripts, 3 stylesheets, 1 image', 'Medium', 'E023, E024'],
          [
            'Related app markers',
            'api/blog/community/docs/status hosts',
            'Low',
            'E035, E036, E037',
          ],
        ],
      },
    },
    {
      id: 'deployment-network',
      title: 'Deployment and network surface',
      summary:
        'HTTPS was reachable, CDN/proxy-like headers were observed, and HSTS was not found in the sampled response.',
      body: [
        'The sample identifies Cloudflare-style CDN/proxy indicators and a performance score of 72 with two poor metrics.',
        'Deployment evidence should be interpreted as route-level observation, not as a complete origin topology map.',
      ],
      evidenceRefs: ['E001', 'E002', 'E004', 'E005', 'E007', 'E008', 'E026'],
      boundaryNote:
        'Headers alone do not prove full origin topology, CDN coverage, or internal deployment structure.',
      table: {
        title: 'Network and delivery signals',
        columns: ['Signal', 'Observed value', 'Interpretation', 'Refs'],
        rows: [
          ['HTTPS', 'Reachable', 'Public HTTPS path responded', 'E004'],
          ['HSTS', 'Not found', 'Transport policy review signal', 'E007, E026'],
          ['CDN/proxy', 'cloudflare, proxy_or_cdn', 'Public edge delivery indicator', 'E001, E002'],
          ['Performance', '72 score, 2 poor metrics', 'Optimization review target', 'E005, E008'],
        ],
      },
    },
    {
      id: 'request-rendering',
      title: 'Request and rendering chain',
      summary: 'The browser runtime loaded the sampled route and produced rendered-page evidence.',
      body: [
        'The report separates worker fetch evidence from browser runtime evidence. That split helps distinguish transport response facts from rendered-page facts.',
        'Rendered-page evidence is useful for public content and app markers, but it remains bounded to the sampled route and browser pass.',
      ],
      evidenceRefs: ['E010', 'E011', 'E019', 'E020', 'E021', 'E032', 'M001', 'M004'],
      boundaryNote:
        'One worker fetch plus one browser run does not represent every route, session, locale, or cache state.',
      table: {
        title: 'Rendering evidence',
        columns: ['Runtime step', 'Observed output', 'Refs'],
        rows: [
          ['Worker fetch', 'Initial response and header evidence captured', 'E011, E019'],
          ['Browser runtime', 'Rendered page and client-side surface observed', 'E020, E021'],
          ['Route scope', 'Bounded sample, not a full crawl', 'M001, M004'],
        ],
      },
    },
    {
      id: 'subdomains-surface',
      title: 'Subdomains and attack surface',
      summary:
        'The bounded sample found public host candidates and service fingerprint hints without performing a port scan.',
      body: [
        'Six public host candidates were represented in the report. The primary host returned 200, while api, blog, community, docs, and status-style host candidates returned 404 in the bounded checks.',
        'These results help scope follow-up review without claiming private service inventory.',
      ],
      evidenceRefs: ['E033', 'E034', 'E035', 'M011', 'M012', 'M013', 'M014'],
      boundaryNote:
        'This is not a port scan, brute force run, vulnerability scan, or authenticated asset inventory.',
      table: {
        title: 'Public host candidates',
        columns: ['Host candidate', 'Observed status', 'Meaning', 'Refs'],
        rows: [
          ['overreacted.io', '200', 'Primary public route responded', 'E033, E034'],
          [
            'api/blog/community/docs/status',
            '404',
            'Candidate hosts not confirmed as active public apps',
            'E035',
          ],
          [
            'Service hints',
            '2 bounded HTTPS hints',
            'Fingerprint hints require validation',
            'M011, M014',
          ],
        ],
      },
    },
    {
      id: 'organization-operations',
      title: 'Organization and operations signals',
      summary:
        'Public snippets and historical archive evidence can support context, but not ownership claims.',
      body: [
        'The report includes public content snippets, business/product-detail hints, and Wayback historical archive evidence.',
        'RDAP/WHOIS-lite data was unavailable in the sample, so identity and legal ownership should remain out of scope until verified.',
      ],
      evidenceRefs: ['E018', 'E028', 'E039', 'E040', 'E041', 'E042', 'E043', 'M001', 'M004'],
      boundaryNote:
        'Public evidence does not prove current operator, legal ownership, business model, or internal operations.',
      table: {
        title: 'Operations context signals',
        columns: ['Signal group', 'Observation', 'Boundary', 'Refs'],
        rows: [
          [
            'Public snippets',
            'Business and product text signals observed',
            'Context only',
            'E039, E040',
          ],
          [
            'Historical archive',
            'Wayback-derived historical evidence exists',
            'May be stale',
            'E041, E042',
          ],
          ['Ownership data', 'RDAP/WHOIS-lite unavailable', 'Do not infer operator', 'M001, M004'],
        ],
      },
    },
    {
      id: 'security-posture',
      title: 'Security posture',
      summary:
        'The strongest review items are missing browser security headers and wildcard-style CORS indicators.',
      body: [
        'No Set-Cookie header was observed on bounded public checks. Missing control signals include CSP, HSTS, X-Frame-Options, and Permissions-Policy.',
        'CORS evidence includes wildcard indicators. The UI should present this as configuration risk language, not as confirmed exploitability.',
      ],
      evidenceRefs: [
        'E044',
        'E045',
        'E046',
        'E047',
        'E048',
        'E050',
        'M030',
        'M031',
        'M032',
        'M033',
      ],
      boundaryNote:
        'Missing controls and CORS evidence are risk signals. They are not confirmed exploit paths.',
      table: {
        title: 'Security control signals',
        columns: ['Control', 'Observed state', 'Signal', 'Refs'],
        rows: [
          ['Set-Cookie', 'Not observed', 'No sampled cookie to assess', 'E046'],
          [
            'Security headers',
            'CSP/HSTS/XFO/Permissions-Policy not found',
            'Review required',
            'E050, M030',
          ],
          ['CORS', 'Wildcard-style indicators', 'Configuration risk signal', 'E044, E045, E047'],
        ],
      },
    },
    {
      id: 'missing-data',
      title: 'Missing data and next steps',
      summary:
        'The report explicitly groups missing data so the reader does not confuse absent evidence with negative evidence.',
      body: [
        'Gap categories include add_provider, requires_permission, manual_review, requires_user_input, and out_of_scope.',
        'Representative missing items include authenticated content, complete docs/blog corpus, deep crawl content, form submission results, and unlinked public pages.',
      ],
      evidenceRefs: [
        'M001',
        'M002',
        'M003',
        'M004',
        'M005',
        'M006',
        'M007',
        'M008',
        'M009',
        'M010',
      ],
      boundaryNote:
        'Missing data must not be presented as collected evidence or as proof that a risk does not exist.',
    },
  ],
  missingDataGroups: [
    {
      category: 'add_provider',
      count: 17,
      tone: 'info',
      examples: ['complete_docs_or_blog_corpus', 'deep_crawl_content', 'unlinked_public_pages'],
      nextAction: 'Add authorized data providers before broadening claims.',
    },
    {
      category: 'requires_permission',
      count: 11,
      tone: 'warning',
      examples: ['authenticated_content', 'form_submission_results', 'private_inventory'],
      nextAction: 'Collect explicit permission before authenticated checks.',
    },
    {
      category: 'requires_user_input',
      count: 3,
      tone: 'warning',
      examples: ['business_model_validation_beyond_public_text', 'operator_confirmation'],
      nextAction: 'Ask the operator to provide authoritative context.',
    },
    {
      category: 'manual_review',
      count: 1,
      tone: 'neutral',
      examples: ['ambiguous_public_business_signal'],
      nextAction: 'Resolve manually before publishing business-language conclusions.',
    },
    {
      category: 'out_of_scope',
      count: 1,
      tone: 'neutral',
      examples: ['exploit_execution'],
      nextAction: 'Keep exploit validation outside this passive public report.',
    },
  ],
} satisfies ReportDetail
