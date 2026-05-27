<script setup lang="ts">
import type { LayerDetail } from '@/content/layerModelPage'

defineProps<{
  layer: LayerDetail
}>()
</script>

<template>
  <article class="layer-card">
    <div class="layer-card__header">
      <span>{{ layer.id }}</span>
      <div>
        <strong>{{ layer.name }}</strong>
        <small>{{ layer.group }}</small>
      </div>
    </div>
    <dl>
      <div>
        <dt>Detects</dt>
        <dd>{{ layer.detects }}</dd>
      </div>
      <div>
        <dt>Why it matters</dt>
        <dd>{{ layer.matters }}</dd>
      </div>
      <div>
        <dt>Example evidence</dt>
        <dd>{{ layer.evidence }}</dd>
      </div>
    </dl>
  </article>
</template>

<style scoped>
.layer-card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 20px;
}

.layer-card__header {
  display: grid;
  gap: 14px;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: start;
  margin-bottom: 18px;
}

.layer-card__header > span {
  display: inline-grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 13px;
  font-weight: 700;
}

.layer-card strong {
  display: block;
  color: var(--ink);
  font-size: 18px;
  line-height: 1.25;
}

.layer-card small {
  display: block;
  margin-top: 6px;
  color: var(--ink-muted);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.layer-card dl,
.layer-card dd {
  margin: 0;
}

.layer-card div + div {
  margin-top: 14px;
}

.layer-card dt {
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.layer-card dd {
  margin-top: 6px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.6;
}
</style>
