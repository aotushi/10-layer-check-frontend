<script setup lang="ts">
import { computed, reactive, shallowRef } from 'vue'
import { RouterLink } from 'vue-router'

import AppButton from '@/components/base/AppButton.vue'
import type { AuthFieldPayload, AuthFormVisualState, AuthMode } from '@/content/authPage'

const props = withDefaults(
  defineProps<{
    mode: AuthMode
    eyebrow: string
    title: string
    lead: string
    submitLabel: string
    switchPrompt: string
    switchLabel: string
    switchHref: string
    passwordHelp?: string
    statusMessage?: string
    visualState?: AuthFormVisualState
  }>(),
  {
    passwordHelp: undefined,
    statusMessage: undefined,
    visualState: undefined,
  },
)

const emit = defineEmits<{
  submit: [payload: AuthFieldPayload]
}>()

const fields = reactive({
  email: props.visualState === 'validation-error' ? 'invalid-email' : 'reviewer@example.com',
  password: props.visualState === 'validation-error' ? 'short' : 'correct-horse-battery',
})

const attempted = shallowRef(false)
const localState = shallowRef<AuthFormVisualState>('idle')

const effectiveState = computed(() => props.visualState ?? localState.value)
const isLoading = computed(() => effectiveState.value === 'loading')
const isRegister = computed(() => props.mode === 'register')

const emailError = computed(() => {
  if (!attempted.value && effectiveState.value !== 'validation-error') {
    return ''
  }

  if (!fields.email.trim()) {
    return 'Email is required.'
  }

  if (!fields.email.includes('@')) {
    return 'Enter a valid email address.'
  }

  return ''
})

const passwordError = computed(() => {
  if (!attempted.value && effectiveState.value !== 'validation-error') {
    return ''
  }

  if (!fields.password) {
    return 'Password is required.'
  }

  if (isRegister.value && fields.password.length < 8) {
    return 'Password must use at least 8 characters.'
  }

  return ''
})

const formMessage = computed(() => {
  if (props.statusMessage && effectiveState.value !== 'loading') {
    return props.statusMessage
  }

  if (effectiveState.value === 'invalid-credentials') {
    return 'Email or password did not match a saved account.'
  }

  if (effectiveState.value === 'server-error') {
    return 'Authentication service is unavailable in this static frontend shell.'
  }

  if (effectiveState.value === 'validation-error') {
    return 'Review the highlighted fields before submitting.'
  }

  if (effectiveState.value === 'loading') {
    return props.mode === 'login' ? 'Checking account credentials.' : 'Creating account record.'
  }

  return ''
})

const messageTone = computed(() => (effectiveState.value === 'loading' ? 'info' : 'danger'))

function handleSubmit() {
  attempted.value = true

  if (emailError.value || passwordError.value) {
    localState.value = 'validation-error'
    return
  }

  emit('submit', { email: fields.email, password: fields.password })
  localState.value = 'loading'
}
</script>

<template>
  <form class="auth-form" novalidate @submit.prevent="handleSubmit">
    <div class="auth-form__heading">
      <p>{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <span>{{ lead }}</span>
    </div>

    <div class="auth-form__fields">
      <label class="auth-field" for="auth-email">
        <span>Email</span>
        <input
          id="auth-email"
          v-model="fields.email"
          autocomplete="email"
          inputmode="email"
          type="email"
          :aria-invalid="Boolean(emailError)"
          :aria-describedby="emailError ? 'auth-email-error' : undefined"
          :disabled="isLoading"
        />
        <small v-if="emailError" id="auth-email-error">{{ emailError }}</small>
      </label>

      <label class="auth-field" for="auth-password">
        <span>Password</span>
        <input
          id="auth-password"
          v-model="fields.password"
          :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
          type="password"
          :aria-invalid="Boolean(passwordError)"
          :aria-describedby="passwordError ? 'auth-password-error' : 'auth-password-help'"
          :disabled="isLoading"
        />
        <small v-if="passwordError" id="auth-password-error">{{ passwordError }}</small>
        <small v-else-if="passwordHelp" id="auth-password-help">{{ passwordHelp }}</small>
      </label>
    </div>

    <p
      v-if="formMessage"
      class="auth-form__message"
      :class="`auth-form__message--${messageTone}`"
      role="status"
    >
      {{ formMessage }}
    </p>

    <AppButton class="auth-form__submit" type="submit" :loading="isLoading">
      {{ submitLabel }}
    </AppButton>

    <p class="auth-form__switch">
      {{ switchPrompt }}
      <RouterLink :to="switchHref">{{ switchLabel }}</RouterLink>
    </p>
  </form>
</template>

<style scoped>
.auth-form {
  background: var(--canvas);
  padding: 34px;
}

.auth-form__heading p {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.auth-form__heading h1 {
  max-width: 430px;
  margin: 0;
  color: var(--ink);
  font-size: clamp(29px, 3.3vw, 38px);
  line-height: 1.08;
}

.auth-form__heading span {
  display: block;
  max-width: 480px;
  margin-top: 12px;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.5;
}

.auth-form__fields {
  display: grid;
  gap: 14px;
  margin-top: 24px;
}

.auth-field {
  display: grid;
  gap: 7px;
}

.auth-field span {
  color: var(--ink);
  font-size: 13px;
  font-weight: 800;
}

.auth-field input {
  width: 100%;
  min-height: 44px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-control);
  background: var(--canvas);
  color: var(--ink);
  padding: 0 12px;
  font-size: 14px;
}

.auth-field input:focus {
  border-color: var(--primary);
  outline: 2px solid color-mix(in srgb, var(--primary) 30%, transparent);
  outline-offset: 0;
}

.auth-field input:disabled {
  cursor: not-allowed;
  background: var(--canvas-soft);
  color: var(--ink-muted);
}

.auth-field input[aria-invalid='true'] {
  border-color: var(--danger);
}

.auth-field small {
  color: var(--ink-muted);
  font-size: 12px;
  line-height: 1.35;
}

.auth-field input[aria-invalid='true'] + small {
  color: var(--danger);
}

.auth-form__message {
  margin: 18px 0 0;
  border: 1px solid var(--border-hairline);
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.45;
}

.auth-form__message--danger {
  border-left: 3px solid var(--danger);
  background: color-mix(in srgb, var(--danger) 6%, white);
  color: var(--danger);
}

.auth-form__message--info {
  border-left: 3px solid var(--primary);
  background: var(--soft-primary);
  color: var(--primary);
}

.auth-form__submit {
  width: 100%;
  margin-top: 16px;
}

.auth-form__switch {
  margin: 14px 0 0;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.45;
  text-align: center;
}

.auth-form__switch a {
  color: var(--primary);
  font-weight: 800;
}

.auth-form__switch a:hover {
  color: var(--primary-hover);
}

@media (max-width: 560px) {
  .auth-form {
    padding: 22px;
  }

  .auth-form__heading h1 {
    font-size: 30px;
  }

  .auth-form__heading span {
    font-size: 14px;
    line-height: 1.45;
  }

  .auth-form__fields {
    margin-top: 22px;
  }
}
</style>
