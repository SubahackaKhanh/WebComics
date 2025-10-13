<template>
  <Loading v-if="loading.isLoading" />
  <RouterView/>
</template>

<script setup>
import { useLoadingStore } from '@/js/composables/useLoadingStore'
import Loading from '@/components/pages/Loading.vue'
const loading = useLoadingStore()
</script>

