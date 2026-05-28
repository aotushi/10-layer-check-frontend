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
  border-left: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 34px 28px;
}

.auth-assurance__eyebrow {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.auth-assurance h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
  line-height: 1.1;
}

.auth-assurance__lead {
  margin: 12px 0 0;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.auth-assurance__list {
  display: grid;
  gap: 1px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--border-hairline);
}

.auth-assurance__list li {
  display: grid;
  gap: 12px;
  grid-template-columns: 12px minmax(0, 1fr);
  border-bottom: 1px solid var(--border-hairline);
  padding: 13px 0;
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
    border-top: 1px solid var(--border-hairline);
    border-left: 0;
    padding: 22px;
  }
}

@media (max-width: 560px) {
  .auth-assurance {
    padding: 18px 22px 20px;
  }

  .auth-assurance h2 {
    font-size: 21px;
  }

  .auth-assurance__lead {
    font-size: 13px;
  }

  .auth-assurance__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-top: 16px;
    border-top: 0;
  }

  .auth-assurance__list li {
    gap: 8px;
    grid-template-columns: 10px minmax(0, 1fr);
    border: 1px solid var(--border-hairline);
    background: var(--canvas);
    padding: 10px;
  }

  .auth-assurance__list span {
    width: 6px;
    height: 6px;
    margin-top: 4px;
  }

  .auth-assurance__list strong {
    font-size: 12px;
    line-height: 1.25;
  }

  .auth-assurance__list p {
    display: none;
  }
}
</style>
