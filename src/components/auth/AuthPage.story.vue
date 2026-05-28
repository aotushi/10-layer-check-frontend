<script setup lang="ts">
import AuthPage from './AuthPage.vue'
</script>

<template>
  <Story title="Auth/AuthPage" group="auth">
    <Variant title="Login page">
      <AuthPage mode="login" />
    </Variant>

    <Variant title="Register page">
      <AuthPage mode="register" />
    </Variant>
  </Story>
</template>
