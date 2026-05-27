<template>
  <button
    class="app-button"
    :class="`app-button--${variant}`"
    :type="type"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="app-button__dot" aria-hidden="true" />
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
    loading: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.app-button {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  padding: 0 18px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

.app-button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.app-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.app-button--primary {
  background: var(--primary);
  color: var(--ink-inverse);
}

.app-button--primary:hover:not(:disabled) {
  background: var(--primary-hover);
}

.app-button--ghost {
  border-color: var(--border-strong);
  background: var(--canvas);
  color: var(--ink);
}

.app-button--ghost:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.app-button__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
}
</style>
