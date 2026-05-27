<template>
  <main>
    <section class="placeholder page-section">
      <div class="page-inner">
        <p>Planned route</p>
        <h1>{{ title }}</h1>
        <span>{{ description }}</span>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<style scoped>
.placeholder {
  display: grid;
  min-height: calc(100vh - 56px);
  align-items: center;
}

p {
  margin: 0 0 12px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.1;
}

span {
  display: block;
  max-width: 620px;
  margin-top: 20px;
  color: var(--ink-secondary);
  font-size: 18px;
  line-height: 1.65;
}
</style>
