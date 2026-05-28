<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

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
    <header class="auth-page__header">
      <RouterLink class="auth-page__brand" to="/">10-Layer Check</RouterLink>
      <RouterLink class="auth-page__home" to="/">Back to Home</RouterLink>
    </header>

    <section class="auth-page__body" :aria-labelledby="`${page.mode}-title`">
      <div class="auth-page__intro">
        <p>{{ page.eyebrow }}</p>
        <h2 :id="`${page.mode}-title`">{{ page.mode === 'login' ? 'Login' : 'Register' }}</h2>
      </div>

      <div class="auth-page__grid">
        <AuthForm
          :mode="page.mode"
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
  min-height: 100vh;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--canvas-muted) 72%, white), transparent 1px) 0
      0 / 32px 32px,
    linear-gradient(0deg, color-mix(in srgb, var(--canvas-muted) 72%, white), transparent 1px) 0 0 /
      32px 32px,
    var(--canvas-muted);
}

.auth-page__header {
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-hairline);
  background: color-mix(in srgb, var(--canvas) 96%, transparent);
  padding: 0 var(--page-gutter);
}

.auth-page__brand {
  color: var(--primary);
  font-size: 18px;
  font-weight: 800;
}

.auth-page__home {
  color: var(--ink-secondary);
  font-size: 13px;
  font-weight: 800;
}

.auth-page__home:hover {
  color: var(--primary);
}

.auth-page__body {
  width: min(100%, 1080px);
  margin: 0 auto;
  padding: 56px var(--page-gutter) 70px;
}

.auth-page__intro {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
}

.auth-page__intro p {
  margin: 0;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.auth-page__intro h2 {
  margin: 0;
  color: var(--ink-muted);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.auth-page__grid {
  display: grid;
  align-items: start;
  gap: 18px;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
}

@media (max-width: 860px) {
  .auth-page__body {
    padding-top: 32px;
  }

  .auth-page__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .auth-page__header {
    min-height: 52px;
  }

  .auth-page__home {
    font-size: 12px;
  }

  .auth-page__body {
    padding: 20px var(--page-gutter) 32px;
  }

  .auth-page__intro {
    margin-bottom: 10px;
  }
}
</style>
