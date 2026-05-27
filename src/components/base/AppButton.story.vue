<template>
  <Story title="Base/AppButton" group="base">
    <Variant title="Primary">
      <AppButton>Run scan</AppButton>
    </Variant>

    <Variant title="Ghost">
      <AppButton variant="ghost">Review evidence</AppButton>
    </Variant>

    <Variant title="Loading">
      <AppButton loading>Scanning</AppButton>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue'
</script>
