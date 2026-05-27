<template>
  <Story title="Landing/LayerPreviewGrid" group="landing">
    <Variant title="10-layer compact visual">
      <div class="story-shell">
        <LayerPreviewGrid />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import LayerPreviewGrid from './LayerPreviewGrid.vue'
</script>

<style scoped>
.story-shell {
  max-width: 520px;
  padding: 24px;
  background: var(--canvas-muted);
}
</style>
