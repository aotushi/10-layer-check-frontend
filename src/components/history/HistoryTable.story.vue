<script setup lang="ts">
import { sampleHistoryPage } from '@/content/historyPage'

import HistoryTable from './HistoryTable.vue'
</script>

<template>
  <Story title="History/HistoryTable" group="history">
    <Variant title="Populated">
      <HistoryTable :rows="sampleHistoryPage.records" />
    </Variant>

    <Variant title="Loading">
      <HistoryTable :rows="[]" state="loading" />
    </Variant>

    <Variant title="Empty">
      <HistoryTable :rows="[]" state="empty" />
    </Variant>

    <Variant title="Error">
      <HistoryTable :rows="[]" state="error" />
    </Variant>
  </Story>
</template>
