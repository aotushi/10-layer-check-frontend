export type LayerTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface LayerDetail {
  id: string
  name: string
  group: string
  detects: string
  matters: string
  evidence: string
}

export interface ProofSignal {
  layer: string
  status: string
  tone: LayerTone
  evidenceRef: string
  signal: string
  boundary: string
}

export const modelHeroStats = [
  { value: '10', label: 'Evidence layers' },
  { value: '55', label: 'Sample records' },
  { value: 'Read-only', label: 'Collection mode' },
]

export const layerDetails: LayerDetail[] = [
  {
    id: 'L1',
    name: 'DNS resolution',
    group: 'Network foundation',
    detects:
      'Authoritative nameservers, A/AAAA records, CNAME chains, TXT/MX records, and TTL behavior.',
    matters:
      'DNS is the first public dependency. A working application can still have fragile or inconsistent resolution.',
    evidence: 'A and AAAA records, CNAME target, authoritative NS set, observed TTL.',
  },
  {
    id: 'L2',
    name: 'Routing identity',
    group: 'Network foundation',
    detects:
      'Public ASN, CDN or edge provider signals, geographic routing hints, and reachable edge networks.',
    matters:
      'Routing context explains whether traffic terminates at the expected edge or an unexpected public provider.',
    evidence: 'ASN 13335 observed, edge IP allocation, CDN affiliation signal.',
  },
  {
    id: 'L3',
    name: 'TCP reachability',
    group: 'Network foundation',
    detects:
      'Public port reachability, connection latency, timeout behavior, and redirect entry points.',
    matters:
      'Transport reachability separates unavailable services from application-level responses and policy failures.',
    evidence: 'TCP connect result, timeout threshold, first reachable endpoint.',
  },
  {
    id: 'L4',
    name: 'TLS handshake',
    group: 'Transport security',
    detects:
      'TLS protocol version, cipher negotiation, certificate chain availability, and handshake timing.',
    matters:
      'A site can render correctly while still exposing weak transport policy or avoidable compatibility drift.',
    evidence: 'TLS 1.2 negotiated, TLS 1.3 unavailable, cipher suite observed.',
  },
  {
    id: 'L5',
    name: 'Certificate integrity',
    group: 'Transport security',
    detects:
      'SAN coverage, issuer chain, expiry window, hostname match, and certificate transparency hints.',
    matters:
      'Certificate evidence helps distinguish reachable HTTPS from reliable identity and renewal posture.',
    evidence: 'SAN match, issuer chain, notBefore/notAfter timestamps.',
  },
  {
    id: 'L6',
    name: 'Protocol negotiation',
    group: 'Transport security',
    detects:
      'ALPN outcome, HTTP/2 availability, compression policy, and transport feature negotiation.',
    matters:
      'Protocol negotiation affects browser behavior, performance, and edge compatibility under real traffic.',
    evidence: 'ALPN h2 accepted, HTTP/2 response, compression header state.',
  },
  {
    id: 'L7',
    name: 'HTTP headers',
    group: 'Application delivery',
    detects:
      'Security headers, cache controls, server banners, redirect policy, and content type handling.',
    matters:
      'Headers reveal the application boundary that browsers enforce even when the page itself appears healthy.',
    evidence: 'Missing strict-transport-security and x-content-type-options headers.',
  },
  {
    id: 'L8',
    name: 'WAF and CDN behavior',
    group: 'Application delivery',
    detects:
      'Edge cache status, challenge behavior, WAF/CDN markers, and public response normalization.',
    matters:
      'Edge behavior explains whether findings belong to the origin, CDN configuration, or public delivery layer.',
    evidence: 'cf-cache-status HIT, server cloudflare, edge response header set.',
  },
  {
    id: 'L9',
    name: 'Payload and resource shape',
    group: 'Application delivery',
    detects:
      'Document size, asset references, redirect depth, MIME consistency, and cacheable resource patterns.',
    matters:
      'Payload shape connects transport and header findings to what the browser actually receives.',
    evidence: 'HTML content length, linked script/style count, MIME type.',
  },
  {
    id: 'L10',
    name: 'DOM and client boundary',
    group: 'Application delivery',
    detects:
      'Rendered DOM structure, client-side redirects, basic script boundary signals, and visible document state.',
    matters:
      'Client-side state shows whether network evidence leads to a coherent page without claiming exploitability.',
    evidence: 'Rendered title, DOM node count, client-side redirect observation.',
  },
]

export const proofSignals: ProofSignal[] = [
  {
    layer: 'L1 DNS',
    status: 'OK',
    tone: 'success',
    evidenceRef: 'EV-DNS-001',
    signal: 'A and AAAA records resolved with stable TTL behavior.',
    boundary: 'Public resolver evidence only.',
  },
  {
    layer: 'L4 TLS',
    status: 'WARN',
    tone: 'warning',
    evidenceRef: 'EV-TLS-004',
    signal: 'TLS 1.2 negotiated; TLS 1.3 not observed in the sample.',
    boundary: 'Policy review signal, not exploit confirmation.',
  },
  {
    layer: 'L7 HTTP',
    status: 'FAIL',
    tone: 'danger',
    evidenceRef: 'EV-HTTP-007',
    signal: 'strict-transport-security header missing from observed response.',
    boundary: 'Risk signal from one public response path.',
  },
]

export const workflowSteps = [
  {
    id: '01',
    title: 'Enter domain',
    body: 'The target is normalized into a public hostname and checked against bounded scan rules.',
  },
  {
    id: '02',
    title: 'Collect layer evidence',
    body: 'Each layer contributes inspectable DNS, transport, header, payload, or browser-observable records.',
  },
  {
    id: '03',
    title: 'Review report',
    body: 'Signals are grouped into a structured report with evidence refs and missing-data disclosures.',
  },
]

export const layeredBenefits = [
  {
    title: 'Find configuration drift',
    limitation: 'A single HTTP check can pass while DNS, TLS, or certificate signals drift.',
    benefit:
      'Layered diagnosis shows which public dependency changed and where review should start.',
    evidence: 'DNS TTL, TLS version, certificate SAN, HTTP header state.',
  },
  {
    title: 'Separate edge from origin',
    limitation: 'Header-only reviews often blur CDN, WAF, and application responsibilities.',
    benefit:
      'Cross-layer evidence makes the edge path visible without claiming private origin inventory.',
    evidence: 'ASN/CDN signal, cache status, server header, response path.',
  },
  {
    title: 'Explain missing signals',
    limitation: 'Shallow scans often treat missing data as failure or hide it entirely.',
    benefit: 'The report marks unavailable evidence separately from observed warnings or failures.',
    evidence: 'Timeout, blocked public response, no collected DOM state.',
  },
]

export const comparisonRows = [
  {
    singleCheck: 'HTTP status returns 200',
    missingContext: 'DNS or routing changed beneath the application.',
    layerCombination: 'L1 DNS + L2 routing + L7 HTTP',
    decisionValue: 'Confirm whether the public entry path still matches the intended architecture.',
  },
  {
    singleCheck: 'TLS certificate is valid',
    missingContext: 'Protocol negotiation or header policy may still be weak.',
    layerCombination: 'L4 TLS + L5 certificate + L7 HTTP',
    decisionValue: 'Separate identity validity from transport and browser policy posture.',
  },
  {
    singleCheck: 'Page content loads',
    missingContext: 'Edge cache, MIME, or client-side behavior may mask delivery issues.',
    layerCombination: 'L8 edge + L9 payload + L10 DOM',
    decisionValue: 'Connect public response evidence to what a browser actually receives.',
  },
]

export const evidencePreview = {
  target: 'overreacted.io',
  collectedLayers: '10/10',
  warningLayers: '2 warning layers',
  riskItems: '6 risk signals',
  rows: [
    {
      id: 'EV-DNS-001',
      layer: 'L1 DNS',
      observed: 'A and AAAA records resolved successfully.',
      status: 'OK',
      tone: 'success' as const,
    },
    {
      id: 'EV-TLS-004',
      layer: 'L4 TLS',
      observed: 'TLS 1.2 enabled; review policy before enforcing TLS 1.3 only.',
      status: 'WARN',
      tone: 'warning' as const,
    },
    {
      id: 'EV-HTTP-007',
      layer: 'L7 HTTP',
      observed: 'strict-transport-security header missing from observed response.',
      status: 'FAIL',
      tone: 'danger' as const,
    },
  ],
  boundary:
    'Evidence is collected from public responses and browser-observable state. Findings are risk signals, not confirmed exploitability.',
}

export const modelFaqs = [
  {
    question: 'What do the 10 layers mean?',
    answer:
      'They are public evidence categories from DNS resolution through browser-observable DOM state. Each layer contributes a separate diagnostic signal.',
  },
  {
    question: 'Is this a vulnerability scan?',
    answer:
      'No. It is a bounded public diagnostic that reports risk signals and missing evidence without exploit payloads or private access.',
  },
  {
    question: 'What can public evidence prove?',
    answer:
      'It can prove what a public client observed: records, headers, protocol behavior, edge signals, and rendered page state. It cannot prove private origin ownership or exploitability.',
  },
  {
    question: 'How is missing data handled?',
    answer:
      'Missing data is marked separately from observed warnings or failures so the report does not present uncollected evidence as fact.',
  },
]

export const technicalTrustNotes = [
  {
    title: 'Bounded public evidence',
    body: 'The model uses public DNS, HTTP, TLS, and browser-observable responses only.',
  },
  {
    title: 'Risk-signal language',
    body: 'Warnings and failures identify review targets; they do not claim confirmed compromise.',
  },
  {
    title: 'Missing-data disclosure',
    body: 'Unavailable evidence is disclosed directly instead of being hidden or inferred.',
  },
]
