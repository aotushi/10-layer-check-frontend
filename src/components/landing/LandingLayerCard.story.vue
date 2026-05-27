<template>
  <Story title="Landing/LandingLayerCard" group="landing">
    <Variant title="Layer card">
      <div class="story-shell">
        <LandingLayerCard :layer="layerDetails[0]" />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { layerDetails } from '@/content/layerModelPage'

import LandingLayerCard from './LandingLayerCard.vue'
</script>

<style scoped>
.story-shell {
  max-width: 560px;
}
</style>
