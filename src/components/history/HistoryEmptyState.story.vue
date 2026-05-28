<script setup lang="ts">
import HistoryEmptyState from './HistoryEmptyState.vue'
</script>

<template>
  <Story title="History/HistoryEmptyState" group="history">
    <Variant title="Empty">
      <HistoryEmptyState
        title="No scan history yet"
        description="Start with a public domain scan. Saved reports will appear here after account persistence is connected."
        action-label="Run first scan"
        action-href="/"
      />
    </Variant>

    <Variant title="Error">
      <HistoryEmptyState
        title="History query failed"
        description="History could not be loaded. Retry the query before changing filters."
        action-label="Retry"
        tone="danger"
      />
    </Variant>
  </Story>
</template>
