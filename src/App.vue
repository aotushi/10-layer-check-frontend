<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

import PublicHeader from '@/components/shell/PublicHeader.vue'

const route = useRoute()
const showPublicHeader = computed(
  () => route.meta.shell !== 'product' && route.meta.shell !== 'auth',
)
</script>

<template>
  <div class="app-shell">
    <PublicHeader v-if="showPublicHeader" />

    <RouterView />
  </div>
</template>
