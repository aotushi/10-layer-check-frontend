<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/10-layer-model', label: '10-layer model' },
  { to: '/tech', label: 'Tech' },
  { to: '/login', label: 'Login' },
]
</script>

<template>
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
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--border-hairline);
  background: color-mix(in srgb, var(--canvas) 97%, transparent);
}

.site-header__inner {
  display: flex;
  width: min(100%, var(--page-max-width));
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 var(--page-gutter);
}

.site-brand {
  color: var(--primary);
  font-size: 19px;
  font-weight: 700;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: clamp(14px, 3vw, 32px);
  color: var(--ink-secondary);
  font-size: 14px;
}

.site-nav a {
  border-bottom: 2px solid transparent;
  padding: 20px 0 18px;
}

.site-nav a.router-link-active {
  border-color: var(--primary);
  color: var(--primary);
}

@media (max-width: 720px) {
  .site-header__inner {
    min-height: 48px;
    padding-block: 0;
  }

  .site-nav {
    width: auto;
    justify-content: flex-end;
    gap: 8px;
  }

  .site-nav a:not(:last-child) {
    display: none;
  }

  .site-nav a {
    padding: 16px 0 14px;
    white-space: nowrap;
  }
}
</style>
