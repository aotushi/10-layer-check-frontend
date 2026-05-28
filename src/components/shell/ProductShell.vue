<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface ProductShellNavItem {
  label: string
  to?: string
  href?: string
  current?: boolean
}

defineProps<{
  navigationLabel: string
  navItems: ProductShellNavItem[]
  sessionLabel: string
  sessionValue: string
}>()
</script>

<template>
  <main class="product-shell">
    <aside class="product-shell__sidebar" :aria-label="navigationLabel">
      <RouterLink class="product-shell__brand" to="/">10-Layer Check</RouterLink>
      <nav class="product-shell__nav">
        <template v-for="item in navItems" :key="item.label">
          <RouterLink
            v-if="item.to"
            :to="item.to"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.label }}
          </RouterLink>
          <a v-else-if="item.href" :href="item.href">{{ item.label }}</a>
        </template>
      </nav>
      <div class="product-shell__session">
        <span>{{ sessionLabel }}</span>
        <strong>{{ sessionValue }}</strong>
        <slot name="session-actions" />
      </div>
    </aside>

    <div class="product-shell__workspace">
      <div class="product-shell__mobilebar">
        <RouterLink to="/">10-Layer Check</RouterLink>
        <slot name="mobilebar" />
      </div>

      <slot />
    </div>
  </main>
</template>

<style scoped>
.product-shell {
  min-height: 100vh;
  background: var(--canvas-muted);
}

.product-shell__sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 20;
  display: flex;
  width: 228px;
  flex-direction: column;
  border-right: 1px solid var(--border-hairline);
  background: var(--canvas-dark);
  padding: 22px 18px;
}

.product-shell__brand {
  color: var(--ink-inverse);
  font-size: 18px;
  font-weight: 800;
}

.product-shell__nav {
  display: grid;
  gap: 6px;
  margin-top: 34px;
}

.product-shell__nav a {
  border: 1px solid transparent;
  color: #c8d2e3;
  padding: 10px 11px;
  font-size: 13px;
  font-weight: 700;
}

.product-shell__nav a:hover,
.product-shell__nav a.router-link-active,
.product-shell__nav a[aria-current='page'] {
  border-color: var(--border-dark);
  background: var(--canvas-dark-soft);
  color: var(--ink-inverse);
}

.product-shell__session {
  display: grid;
  gap: 8px;
  margin-top: auto;
  border: 1px solid var(--border-dark);
  background: var(--canvas-dark-soft);
  padding: 12px;
}

.product-shell__session span {
  color: #a9b6c8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.product-shell__session strong {
  color: var(--ink-inverse);
  font-size: 13px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.product-shell__session :slotted(button) {
  min-height: 34px;
  border: 1px solid var(--border-dark);
  background: transparent;
  color: #c8d2e3;
  font-size: 12px;
  font-weight: 800;
}

.product-shell__workspace {
  min-width: 0;
  margin-left: 228px;
}

.product-shell__mobilebar {
  display: none;
}

@media (max-width: 1040px) {
  .product-shell__sidebar {
    display: none;
  }

  .product-shell__workspace {
    margin-left: 0;
  }

  .product-shell__mobilebar {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-hairline);
    background: var(--canvas-dark);
    padding: 0 var(--page-gutter);
  }

  .product-shell__mobilebar a,
  .product-shell__mobilebar :slotted(a) {
    color: var(--ink-inverse);
    font-size: 13px;
    font-weight: 800;
  }

  .product-shell__mobilebar :slotted(span) {
    color: #c8d2e3;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}
</style>
