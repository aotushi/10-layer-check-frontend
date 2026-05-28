<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    title: string
    description: string
    actionLabel: string
    actionHref?: string
    tone?: 'neutral' | 'danger'
  }>(),
  {
    actionHref: undefined,
    tone: 'neutral',
  },
)

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <section class="history-empty" :class="`history-empty--${tone}`">
    <div>
      <p class="history-empty__kicker">{{ tone === 'danger' ? 'Recoverable state' : 'No rows' }}</p>
      <h2>{{ title }}</h2>
      <p class="history-empty__description">{{ description }}</p>
    </div>

    <RouterLink v-if="actionHref" class="history-empty__action" :to="actionHref">
      {{ actionLabel }}
    </RouterLink>
    <button v-else class="history-empty__action" type="button" @click="emit('action')">
      {{ actionLabel }}
    </button>
  </section>
</template>

<style scoped>
.history-empty {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid var(--border-hairline);
  border-left: 3px solid var(--border-strong);
  background: var(--canvas);
  padding: 22px;
}

.history-empty--danger {
  border-left-color: var(--danger);
}

.history-empty__kicker {
  margin: 0 0 8px;
  color: var(--ink-muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.history-empty h2 {
  margin: 0;
  color: var(--ink);
  font-size: 22px;
  line-height: 1.15;
}

.history-empty__description {
  max-width: 560px;
  margin: 8px 0 0;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.55;
}

.history-empty__action {
  display: inline-flex;
  min-height: 40px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: var(--ink-inverse);
  padding: 0 16px;
  font-size: 13px;
  font-weight: 800;
}

.history-empty__action:hover {
  background: var(--primary-hover);
}

@media (max-width: 640px) {
  .history-empty {
    align-items: stretch;
    flex-direction: column;
    padding: 18px;
  }
}
</style>
