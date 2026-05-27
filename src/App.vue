<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/10-layer-model', label: '10-layer model' },
  { to: '/tech', label: 'Tech' },
  { to: '/login', label: 'Login' },
]
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="site-header__inner">
        <RouterLink class="site-brand" to="/">10-Layer Check</RouterLink>
        <nav class="site-nav" aria-label="Primary navigation">
          <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>
