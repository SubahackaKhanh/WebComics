<template>
  <Loading />
  <RateLimitWarning />
  <router-view />
</template>

<script setup>
import { useLoadingStore } from '@/js/composables/useLoadingStore'
import Loading from '@/components/common/Loading.vue'
import RateLimitWarning from '@/components/common/RateLimitWarning.vue'
// import { storeToRefs } from 'pinia'

const loading = useLoadingStore()
</script>
