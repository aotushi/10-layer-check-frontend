export type HistoryStatus = 'completed' | 'partial' | 'failed' | 'running'

export type HistoryTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export type HistoryRecord = {
  id: string
  target: string
  status: HistoryStatus
  statusLabel: string
  tone: HistoryTone
  createdAt: string
  createdAtLabel: string
  layerCoverage: string
  riskSignals: number
  evidenceRecords: number
  reportPath?: string
  summary: string
}

export type HistorySummaryItem = {
  label: string
  value: string
  detail: string
  tone: HistoryTone
}

export type HistoryTableState = 'loading' | 'empty' | 'populated' | 'error'

export type HistoryPageContent = {
  userEmail: string
  summary: HistorySummaryItem[]
  records: HistoryRecord[]
}

export const sampleHistoryPage = {
  userEmail: 'reviewer@example.com',
  summary: [
    {
      label: 'Total scans',
      value: '7',
      detail: 'Saved public-domain diagnostic runs.',
      tone: 'info',
    },
    {
      label: 'Completed',
      value: '5',
      detail: 'Reports available for review.',
      tone: 'success',
    },
    {
      label: 'Needs review',
      value: '2',
      detail: 'Partial or failed jobs kept visible.',
      tone: 'warning',
    },
    {
      label: 'Latest scan',
      value: '03:42',
      detail: 'UTC sample smoke result timestamp.',
      tone: 'neutral',
    },
  ],
  records: [
    {
      id: 'scan-overreacted-20260526',
      target: 'overreacted.io',
      status: 'completed',
      statusLabel: 'Complete',
      tone: 'success',
      createdAt: '2026-05-26T03:42:37.997Z',
      createdAtLabel: '2026-05-26 03:42 UTC',
      layerCoverage: '10/10',
      riskSignals: 6,
      evidenceRecords: 55,
      reportPath: '/dashboard/reports/sample-overreacted',
      summary: 'Public evidence captured across all layers; HTTP policy needs review.',
    },
    {
      id: 'scan-docs-example-20260524',
      target: 'docs.example.net',
      status: 'partial',
      statusLabel: 'Partial',
      tone: 'warning',
      createdAt: '2026-05-24T11:18:10.000Z',
      createdAtLabel: '2026-05-24 11:18 UTC',
      layerCoverage: '8/10',
      riskSignals: 3,
      evidenceRecords: 41,
      reportPath: '/dashboard/reports/sample-overreacted',
      summary: 'Provider timeout left browser runtime and application signals incomplete.',
    },
    {
      id: 'scan-long-domain-20260522',
      target: 'very-long-public-documentation-hostname-for-regression-review.example.org',
      status: 'completed',
      statusLabel: 'Complete',
      tone: 'success',
      createdAt: '2026-05-22T08:05:22.000Z',
      createdAtLabel: '2026-05-22 08:05 UTC',
      layerCoverage: '10/10',
      riskSignals: 1,
      evidenceRecords: 63,
      reportPath: '/dashboard/reports/sample-overreacted',
      summary: 'Long target text keeps the table scannable without hiding the report action.',
    },
    {
      id: 'scan-api-example-20260519',
      target: 'api.example.com',
      status: 'failed',
      statusLabel: 'Failed',
      tone: 'danger',
      createdAt: '2026-05-19T16:20:00.000Z',
      createdAtLabel: '2026-05-19 16:20 UTC',
      layerCoverage: '3/10',
      riskSignals: 0,
      evidenceRecords: 9,
      summary: 'Request failed before normalized report generation; retry remains available.',
    },
    {
      id: 'scan-product-example-20260518',
      target: 'product.example.com',
      status: 'running',
      statusLabel: 'Running',
      tone: 'info',
      createdAt: '2026-05-18T05:12:00.000Z',
      createdAtLabel: '2026-05-18 05:12 UTC',
      layerCoverage: '4/10',
      riskSignals: 0,
      evidenceRecords: 18,
      summary: 'Async provider work is still collecting public evidence.',
    },
  ],
} satisfies HistoryPageContent
