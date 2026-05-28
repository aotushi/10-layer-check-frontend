<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import LiveScanReportPage from '@/components/report/LiveScanReportPage.vue'
import ReportPage from '@/components/report/ReportPage.vue'

const route = useRoute()
const reportId = computed(() => String(route.params.id ?? 'sample-overreacted'))
const isSampleReport = computed(() => reportId.value === 'sample-overreacted')
</script>

<template>
  <ReportPage v-if="isSampleReport" />
  <LiveScanReportPage v-else :job-id="reportId" />
</template>
