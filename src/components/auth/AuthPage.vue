<script setup lang="ts">
import { computed } from 'vue'

import PublicHeader from '@/components/shell/PublicHeader.vue'
import type { AuthFieldPayload, AuthMode } from '@/content/authPage'
import { authPageCopies } from '@/content/authPage'

import AuthAssurancePanel from './AuthAssurancePanel.vue'
import AuthForm from './AuthForm.vue'

const props = defineProps<{
  mode: AuthMode
}>()

const page = computed(() => authPageCopies[props.mode])

function handleSubmit(_payload: AuthFieldPayload) {
  void _payload
  // Live auth wiring belongs in a future API task; this page keeps the visual contract stable.
}
</script>

<template>
  <main class="auth-page">
    <PublicHeader />

    <section class="auth-page__body" :aria-label="`${page.mode} account`">
      <div class="auth-page__grid">
        <AuthForm
          :mode="page.mode"
          :eyebrow="page.eyebrow"
          :title="page.title"
          :lead="page.lead"
          :submit-label="page.submitLabel"
          :switch-prompt="page.switchPrompt"
          :switch-label="page.switchLabel"
          :switch-href="page.switchHref"
          :password-help="page.passwordHelp"
          @submit="handleSubmit"
        />

        <AuthAssurancePanel
          :title="page.assuranceTitle"
          :lead="page.assuranceLead"
          :items="page.assuranceItems"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 100vh;
  background:
    linear-gradient(180deg, var(--canvas) 0, var(--canvas) 58px, transparent 58px),
    linear-gradient(90deg, color-mix(in srgb, var(--canvas-muted) 70%, white), transparent 1px) 0
      0 / 36px 36px,
    var(--canvas-muted);
}

.auth-page__body {
  display: grid;
  width: min(100%, 980px);
  min-height: 0;
  align-items: center;
  margin: 0 auto;
  padding: 42px var(--page-gutter) 48px;
}

.auth-page__grid {
  display: grid;
  align-items: stretch;
  overflow: hidden;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.72fr);
  box-shadow: 0 18px 40px color-mix(in srgb, var(--ink) 7%, transparent);
}

@media (max-width: 860px) {
  .auth-page__body {
    padding-top: 28px;
  }

  .auth-page__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .auth-page__body {
    min-height: auto;
    align-items: start;
    padding: 14px var(--page-gutter) 24px;
  }
}
</style>
