<script setup lang="ts">
import HomeEvidenceSections from './HomeEvidenceSections.vue'
import HomeFaqCta from './HomeFaqCta.vue'
import HomeFooter from './HomeFooter.vue'
import HomeHero from './HomeHero.vue'
import HomeReportBreakdown from './HomeReportBreakdown.vue'
import HomeValueSections from './HomeValueSections.vue'
</script>

<template>
  <main class="home-page">
    <HomeHero />
    <HomeReportBreakdown />
    <HomeValueSections />
    <HomeEvidenceSections />
    <HomeFaqCta />
    <HomeFooter />
  </main>
</template>

<style scoped>
.home-page {
  --home-section-y: var(--section-y);
  background: var(--canvas);
}

@media (max-width: 560px) {
  .home-page {
    --home-section-y: 28px;
  }
}
</style>
