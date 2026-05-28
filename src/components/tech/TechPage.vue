<script setup lang="ts">
import HomeFooter from '@/components/home/HomeFooter.vue'

import TechArchitectureMap from './TechArchitectureMap.vue'
import TechBoundaryCta from './TechBoundaryCta.vue'
import TechFlowMap from './TechFlowMap.vue'
import TechHero from './TechHero.vue'
import TechReportArtifact from './TechReportArtifact.vue'
</script>

<template>
  <main class="tech-page">
    <TechHero />
    <TechFlowMap />
    <TechArchitectureMap />
    <TechReportArtifact />
    <TechBoundaryCta />
  </main>
  <HomeFooter />
</template>

<style scoped>
.tech-page {
  background: var(--canvas);
}
</style>
