export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface StatusItem {
  label: string
  value?: string
  status?: string
  tone: Tone
}

export const heroReportItems: StatusItem[] = [
  { label: 'L1: DNS Resolution', status: 'PASS', tone: 'success' },
  { label: 'L4: TLS Handshake', status: 'WARN', tone: 'warning' },
  { label: 'L7: HTTP Headers', status: 'FAIL', tone: 'danger' },
]

export const breakdownRows = [
  {
    layer: 'L1 DNS',
    status: 'OK',
    tone: 'success' as const,
    summary: 'A and AAAA records resolved successfully.',
  },
  {
    layer: 'L2 BGP',
    status: 'OK',
    tone: 'success' as const,
    summary: 'ASN 13335 public routing signal observed.',
  },
  {
    layer: 'L4 TLS',
    status: 'WARN',
    tone: 'warning' as const,
    summary: 'TLS 1.2 enabled. Review policy before enforcing TLS 1.3 only.',
  },
  {
    layer: 'L7 HTTP',
    status: 'FAIL',
    tone: 'danger' as const,
    summary: 'Missing strict-transport-security header.',
  },
]

export const proofMetrics = [
  { value: '10/10', label: 'Layer coverage' },
  { value: '55', label: 'Sample records' },
  { value: 'Structured', label: 'Report output' },
  { value: 'Read-only mode', label: 'Recon' },
]

export const benefitCards = [
  {
    mark: 'AV',
    title: 'Architectural Validation',
    body: 'Verify that public-facing infrastructure matches the intended external architecture.',
  },
  {
    mark: 'SX',
    title: 'Surface Exposure',
    body: 'Identify leaked headers, misconfigured DNS entries, and exposed delivery surfaces.',
  },
  {
    mark: 'PB',
    title: 'Performance Bottlenecks',
    body: 'Detect redirect chains, CDN routing issues, and slow TLS handshake behavior.',
  },
]

export const processSteps = [
  {
    id: '1',
    title: 'Input & Validate',
    body: 'Provide a target domain. The system validates the input and normalizes it for the scan sequence.',
  },
  {
    id: '2',
    title: '10-Layer Execution',
    body: 'A coordinated sequence of public, non-intrusive probes checks network and application layers.',
  },
  {
    id: '3',
    title: 'Structured Output',
    body: 'Public response evidence is organized into a deterministic diagnostic report.',
  },
]

export const layerGroups = [
  {
    title: 'Network Foundation (L1-L3)',
    checks: [
      'DNS delegation and record integrity (A, AAAA, MX, TXT)',
      'Public routing and CDN affiliation signals',
      'IP topology and geographic distribution mapping',
    ],
  },
  {
    title: 'Transport Security (L4-L6)',
    checks: [
      'TLS cipher suite strength and protocol status',
      'Certificate chain validation, SANs, and expiry tracking',
      'Protocol negotiation and multiplexing capabilities',
    ],
  },
  {
    title: 'Application Delivery (L7-L10)',
    checks: [
      'HTTP header security posture (HSTS, CSP, X-Frame)',
      'Information leakage via server banners and debug headers',
      'WAF/CDN presence and caching configuration signals',
      'DOM state analysis and client-side execution boundaries',
    ],
  },
]

export const layerModel = [
  ['01', 'DNS'],
  ['02', 'BGP'],
  ['03', 'IP/TCP'],
  ['04', 'TLS'],
  ['05', 'Certificates'],
  ['06', 'ALPN'],
  ['07', 'HTTP'],
  ['08', 'WAF/CDN'],
  ['09', 'Payload'],
  ['10', 'DOM'],
] as const

export const evidenceLines = [
  { text: '# Sample Evidence: overreacted.io L7 Headers (Excerpt)', tone: 'neutral' as const },
  { text: 'HTTP/2 200 OK', tone: 'neutral' as const },
  { text: 'date: Wed, 24 May 2024 10:15:30 GMT', tone: 'neutral' as const },
  { text: 'content-type: text/html; charset=utf-8', tone: 'neutral' as const },
  { text: 'cf-cache-status: HIT', tone: 'neutral' as const },
  { text: '# MISSING: strict-transport-security', tone: 'danger' as const },
  { text: '# MISSING: x-content-type-options', tone: 'danger' as const },
  { text: 'server: cloudflare', tone: 'neutral' as const },
  { text: 'cf-ray: 888a1b2c3d4e5f6g-SJC', tone: 'neutral' as const },
]

export const anomalies = [
  {
    title: 'Finding 01: Infrastructure signal',
    body: 'Cloudflare header signals observed. HTTPS reachable without observed HSTS.',
    impact: 'Impact: L7 HTTP / L8 WAF',
  },
  {
    title: 'Finding 02: Transport layer warning',
    body: 'Missing security headers expose potential downgrade or MIME-sniffing risks.',
    impact: 'Impact: L4 TLS / L7 HTTP',
  },
]

export const trustBadges = ['Read-only probes', 'Standard user agents', 'Rate-limited execution']

export const faqs = [
  {
    question: 'Do I need to install an agent?',
    answer:
      'No. The scan is performed from external infrastructure to provide an outside-in view of the public perimeter.',
  },
  {
    question: 'Will this trigger our WAF or IDS?',
    answer:
      'It is designed around public requests and does not deploy exploitation payloads. Strict edge rules may still log validation probes.',
  },
  {
    question: 'How long does a scan take?',
    answer:
      'Runtime depends on the responsiveness and timeout behavior of the target domain infrastructure.',
  },
]
