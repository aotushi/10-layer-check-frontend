export type CaseMarkdownNode =
  | {
      type: 'heading'
      id: string
      depth: 1 | 2 | 3
      text: string
    }
  | {
      type: 'paragraph'
      text: string
    }
  | {
      type: 'callout'
      label: 'Evidence' | 'Boundaries'
      text: string
    }
  | {
      type: 'list'
      items: string[]
    }
  | {
      type: 'table'
      headers: string[]
      rows: string[][]
    }

export interface CaseTocItem {
  id: string
  text: string
  depth: 1 | 2 | 3
}

const entityMap: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#39;': "'",
}

function decodeMarkdownText(value: string) {
  return value.replace(
    /&(?:amp|lt|gt|quot);|&#x27;|&#39;/g,
    (entity) => entityMap[entity] ?? entity,
  )
}

function slugify(value: string, usedIds: Map<string, number>) {
  const base =
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'section'
  const count = usedIds.get(base) ?? 0
  usedIds.set(base, count + 1)
  return count === 0 ? base : `${base}-${count + 1}`
}

function isDividerRow(cells: string[]) {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()))
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => decodeMarkdownText(cell.trim()))
}

export function parseCaseMarkdown(markdown: string) {
  const usedIds = new Map<string, number>()
  const nodes: CaseMarkdownNode[] = []
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')

  let index = 0

  while (index < lines.length) {
    const rawLine = lines[index] ?? ''
    const line = rawLine.trim()

    if (!line) {
      index += 1
      continue
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line)
    if (heading) {
      const text = decodeMarkdownText(heading[2].trim())
      nodes.push({
        type: 'heading',
        depth: heading[1].length as 1 | 2 | 3,
        id: slugify(text, usedIds),
        text,
      })
      index += 1
      continue
    }

    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while ((lines[index] ?? '').trim().startsWith('|')) {
        tableLines.push((lines[index] ?? '').trim())
        index += 1
      }

      const parsedRows = tableLines.map(parseTableRow)
      const headers = parsedRows[0] ?? []
      const rows = parsedRows.slice(isDividerRow(parsedRows[1] ?? []) ? 2 : 1)

      if (headers.length > 0 && rows.length > 0) {
        nodes.push({
          type: 'table',
          headers,
          rows,
        })
      }
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while ((lines[index] ?? '').trim().startsWith('- ')) {
        items.push(decodeMarkdownText((lines[index] ?? '').trim().slice(2)))
        index += 1
      }
      nodes.push({ type: 'list', items })
      continue
    }

    const callout = /^(Evidence|Boundaries):\s*(.+)$/.exec(line)
    if (callout) {
      nodes.push({
        type: 'callout',
        label: callout[1] as 'Evidence' | 'Boundaries',
        text: decodeMarkdownText(callout[2].trim()),
      })
      index += 1
      continue
    }

    const paragraphs: string[] = [line]
    index += 1

    while (index < lines.length) {
      const nextLine = (lines[index] ?? '').trim()
      if (
        !nextLine ||
        nextLine.startsWith('#') ||
        nextLine.startsWith('|') ||
        nextLine.startsWith('- ') ||
        /^(Evidence|Boundaries):\s*/.test(nextLine)
      ) {
        break
      }
      paragraphs.push(nextLine)
      index += 1
    }

    nodes.push({
      type: 'paragraph',
      text: decodeMarkdownText(paragraphs.join(' ')),
    })
  }

  const toc = nodes
    .filter(
      (node): node is Extract<CaseMarkdownNode, { type: 'heading' }> => node.type === 'heading',
    )
    .filter((node) => node.depth > 1)
    .map<CaseTocItem>(({ id, text, depth }) => ({ id, text, depth }))

  return { nodes, toc }
}
