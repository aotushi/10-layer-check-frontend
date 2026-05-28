<script setup lang="ts">
import type { AuthAssuranceItem } from '@/content/authPage'

defineProps<{
  title: string
  lead: string
  items: AuthAssuranceItem[]
}>()
</script>

<template>
  <aside class="auth-assurance" aria-labelledby="auth-assurance-title">
    <p class="auth-assurance__eyebrow">Bounded account scope</p>
    <h2 id="auth-assurance-title">{{ title }}</h2>
    <p class="auth-assurance__lead">{{ lead }}</p>

    <ul class="auth-assurance__list">
      <li v-for="item in items" :key="item.label">
        <span aria-hidden="true" />
        <div>
          <strong>{{ item.label }}</strong>
          <p>{{ item.detail }}</p>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.auth-assurance {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 28px;
}

.auth-assurance__eyebrow {
  margin: 0 0 10px;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.auth-assurance h2 {
  margin: 0;
  color: var(--ink);
  font-size: 28px;
  line-height: 1.1;
}

.auth-assurance__lead {
  margin: 14px 0 0;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.55;
}

.auth-assurance__list {
  display: grid;
  gap: 1px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
  background: var(--border-hairline);
  border: 1px solid var(--border-hairline);
}

.auth-assurance__list li {
  display: grid;
  gap: 12px;
  grid-template-columns: 12px minmax(0, 1fr);
  background: var(--canvas);
  padding: 14px;
}

.auth-assurance__list span {
  width: 8px;
  height: 8px;
  margin-top: 5px;
  border: 2px solid var(--primary);
  background: var(--canvas);
}

.auth-assurance__list strong {
  display: block;
  color: var(--ink);
  font-size: 13px;
}

.auth-assurance__list p {
  margin: 5px 0 0;
  color: var(--ink-muted);
  font-size: 12px;
  line-height: 1.45;
}

@media (max-width: 820px) {
  .auth-assurance {
    padding: 22px;
  }
}

@media (max-width: 560px) {
  .auth-assurance {
    padding: 18px;
  }

  .auth-assurance h2 {
    font-size: 23px;
  }
}
</style>
