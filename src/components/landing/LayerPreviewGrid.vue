<script setup lang="ts">
import { layerDetails } from '@/content/layerModelPage'
</script>

<template>
  <div class="layer-preview-grid" aria-label="10-layer model preview">
    <article v-for="layer in layerDetails" :key="layer.id" class="layer-preview-card">
      <span>{{ layer.id }}</span>
      <strong>{{ layer.name }}</strong>
    </article>
  </div>
</template>

<style scoped>
.layer-preview-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.layer-preview-card {
  min-height: 72px;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 12px;
}

.layer-preview-card span {
  display: block;
  color: var(--primary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
}

.layer-preview-card strong {
  display: block;
  margin-top: 8px;
  color: var(--ink);
  font-size: 13px;
  line-height: 1.3;
}

@media (max-width: 760px) {
  .layer-preview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
