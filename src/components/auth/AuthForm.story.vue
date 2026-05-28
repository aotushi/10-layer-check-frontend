<script setup lang="ts">
import { authPageCopies } from '@/content/authPage'

import AuthForm from './AuthForm.vue'
</script>

<template>
  <Story title="Auth/AuthForm" group="auth">
    <Variant title="Login">
      <AuthForm v-bind="authPageCopies.login" />
    </Variant>

    <Variant title="Register">
      <AuthForm v-bind="authPageCopies.register" />
    </Variant>

    <Variant title="Loading">
      <AuthForm v-bind="authPageCopies.login" visual-state="loading" />
    </Variant>

    <Variant title="Invalid credentials">
      <AuthForm v-bind="authPageCopies.login" visual-state="invalid-credentials" />
    </Variant>

    <Variant title="Validation error">
      <AuthForm v-bind="authPageCopies.register" visual-state="validation-error" />
    </Variant>

    <Variant title="Server error">
      <AuthForm v-bind="authPageCopies.register" visual-state="server-error" />
    </Variant>
  </Story>
</template>
