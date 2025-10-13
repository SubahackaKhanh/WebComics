<template>
  <Loading v-if="loading.global" />
  <router-view />
</template>

<script setup>
import { useLoadingStore } from '@/js/composables/useLoadingStore'
import Loading from '@/components/common/Loading.vue'
// import { storeToRefs } from 'pinia'

const loading = useLoadingStore()
</script>
