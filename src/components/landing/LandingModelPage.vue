<template>
  <main class="landing-model-page">
    <LandingHero />
    <LandingProofHint />
    <DataFlowSteps />
    <LandingBenefitGrid />
    <LandingContextComparison />
    <LandingLayerList />
    <LandingEvidencePreview />
    <LandingFaqTrustCta />
    <HomeFooter />
  </main>
</template>

<script setup lang="ts">
import HomeFooter from '@/components/home/HomeFooter.vue'

import DataFlowSteps from './DataFlowSteps.vue'
import LandingBenefitGrid from './LandingBenefitGrid.vue'
import LandingContextComparison from './LandingContextComparison.vue'
import LandingEvidencePreview from './LandingEvidencePreview.vue'
import LandingFaqTrustCta from './LandingFaqTrustCta.vue'
import LandingHero from './LandingHero.vue'
import LandingLayerList from './LandingLayerList.vue'
import LandingProofHint from './LandingProofHint.vue'
</script>

<style scoped>
.landing-model-page {
  --section-y: 60px;
}

@media (max-width: 560px) {
  .landing-model-page {
    --section-y: 34px;
  }
}
</style>
