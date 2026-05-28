<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/10-layer-model', label: '10-layer model' },
  { to: '/tech', label: 'Tech' },
  { to: '/login', label: 'Login' },
]

const route = useRoute()
const showPublicHeader = computed(
  () => route.meta.shell !== 'product' && route.meta.shell !== 'auth',
)
</script>

<template>
  <div class="app-shell">
    <header v-if="showPublicHeader" class="site-header">
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
