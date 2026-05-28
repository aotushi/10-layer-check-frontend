export interface CaseMetric {
  label: string
  value: string
}

export interface CaseFinding {
  id: string
  layer: string
  summary: string
  tone: 'success' | 'warning' | 'danger' | 'neutral'
}

export interface CaseStudy {
  slug: string
  title: string
  eyebrow: string
  target: string
  summary: string
  generatedAt: string
  sourceLabel: string
  metrics: CaseMetric[]
  findings: CaseFinding[]
  boundaries: string[]
  loadMarkdown: () => Promise<string>
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'overreacted-public-report',
    title: 'overreacted.io public evidence report',
    eyebrow: 'Sample case proof',
    target: 'overreacted.io',
    generatedAt: '2026-05-26T03:42:37.997Z',
    sourceLabel: 'Persisted selected full AI report',
    summary:
      'A read-only public perimeter scan showing how the 10-layer report organizes browser-observable evidence, warning signals, missing data, and explicit trust boundaries.',
    metrics: [
      { label: 'Normalized records', value: '55' },
      { label: 'Layer coverage', value: '10/10' },
      { label: 'Warning/error layers', value: '7' },
      { label: 'High/medium risk items', value: '6' },
    ],
    findings: [
      {
        id: 'E004',
        layer: 'L4 / L7',
        summary: 'HTTPS reachable, but HSTS was not observed on the probed response.',
        tone: 'warning',
      },
      {
        id: 'E012',
        layer: 'Public content',
        summary: 'Public content surfaces and detail pages were collected as bounded evidence.',
        tone: 'neutral',
      },
      {
        id: 'M001',
        layer: 'Missing data',
        summary: 'Authenticated routes and deeper crawl paths remain outside the report boundary.',
        tone: 'danger',
      },
    ],
    boundaries: [
      'This is a public, read-only observation sample, not a customer endorsement.',
      'Technical evidence alone does not prove ownership, business impact, or exploitability.',
      'Header and runtime signals do not prove full origin topology or complete inventory.',
    ],
    loadMarkdown: async () => (await import('./cases/overreacted-public-report.md?raw')).default,
  },
]

export function findCaseStudy(slug: string | string[] | undefined) {
  const normalizedSlug = Array.isArray(slug) ? slug[0] : slug
  return caseStudies.find((item) => item.slug === normalizedSlug)
}
