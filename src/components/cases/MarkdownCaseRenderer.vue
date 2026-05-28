<script setup lang="ts">
import type { CaseMarkdownNode } from '@/utils/caseMarkdown'

defineProps<{
  nodes: CaseMarkdownNode[]
}>()
</script>

<template>
  <article class="markdown-case">
    <template v-for="(node, index) in nodes" :key="`${node.type}-${index}`">
      <h1 v-if="node.type === 'heading' && node.depth === 1" :id="node.id">
        {{ node.text }}
      </h1>

      <h2 v-else-if="node.type === 'heading' && node.depth === 2" :id="node.id">
        {{ node.text }}
      </h2>

      <h3 v-else-if="node.type === 'heading' && node.depth === 3" :id="node.id">
        {{ node.text }}
      </h3>

      <p v-else-if="node.type === 'paragraph'">{{ node.text }}</p>

      <aside
        v-else-if="node.type === 'callout'"
        :class="`markdown-case__callout markdown-case__callout--${node.label.toLowerCase()}`"
      >
        <strong>{{ node.label }}</strong>
        <span>{{ node.text }}</span>
      </aside>

      <ul v-else-if="node.type === 'list'" class="markdown-case__list">
        <li v-for="item in node.items" :key="item">{{ item }}</li>
      </ul>

      <div v-else-if="node.type === 'table'" class="markdown-case__table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="header in node.headers" :key="header" scope="col">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in node.rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </article>
</template>

<style scoped>
.markdown-case {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 34px;
}

.markdown-case :where(h1, h2, h3) {
  scroll-margin-top: 88px;
}

.markdown-case h1 {
  margin: 0 0 28px;
  color: var(--ink);
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.04;
}

.markdown-case h2 {
  border-top: 1px solid var(--border-hairline);
  margin: 34px 0 14px;
  padding-top: 30px;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.25;
}

.markdown-case h3 {
  margin: 24px 0 10px;
  color: var(--ink);
  font-size: 18px;
  line-height: 1.35;
}

.markdown-case p {
  margin: 0 0 16px;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.72;
}

.markdown-case__callout {
  display: grid;
  gap: 8px;
  border: 1px solid var(--border-hairline);
  margin: 18px 0;
  padding: 14px 16px;
}

.markdown-case__callout strong {
  color: var(--ink);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.markdown-case__callout span {
  color: var(--ink-secondary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
  line-height: 1.55;
  overflow-wrap: anywhere;
}

.markdown-case__callout--evidence {
  background: var(--canvas-soft);
}

.markdown-case__callout--boundaries {
  border-color: color-mix(in srgb, var(--warning) 32%, var(--border-hairline));
  background: color-mix(in srgb, var(--warning) 7%, var(--canvas));
}

.markdown-case__list {
  display: grid;
  gap: 8px;
  margin: 0 0 18px;
  padding-left: 20px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.55;
}

.markdown-case__table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border-hairline);
  margin: 18px 0 24px;
  background: var(--canvas-soft);
}

.markdown-case table {
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;
  font-size: 12px;
}

.markdown-case th,
.markdown-case td {
  border-bottom: 1px solid var(--border-hairline);
  padding: 10px 12px;
  text-align: left;
  vertical-align: top;
}

.markdown-case th {
  color: var(--ink);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.markdown-case td {
  color: var(--ink-secondary);
  line-height: 1.45;
}

.markdown-case tr:last-child td {
  border-bottom: 0;
}

@media (max-width: 640px) {
  .markdown-case {
    padding: 20px;
  }

  .markdown-case h1 {
    margin-bottom: 18px;
    font-size: 32px;
  }

  .markdown-case h2 {
    margin-top: 24px;
    padding-top: 22px;
    font-size: 20px;
  }

  .markdown-case p {
    font-size: 13px;
    line-height: 1.58;
  }
}
</style>
