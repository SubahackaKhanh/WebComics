<template>
  <div class="pagination">
    <button class="page-btn" @click="pagination.prevPage()" :disabled="pagination.currentPage === 1">
      ◀
    </button>

    <button
      v-for="page in pagination.visiblePages"
      :key="page"
      class="page-btn"
      :class="{ active: page === pagination.currentPage }"
      @click="pagination.setPage(page)"
      :disabled="page === '...'"
    >
      {{ page }}
    </button>

    <button
      class="page-btn"
      @click="pagination.nextPage()"
      :disabled="pagination.currentPage === pagination.totalPages"
    >
      ▶
    </button>
  </div>
</template>

<script setup>
import { usePaginationStore } from "@/js/module/pagination";
const pagination = usePaginationStore();
</script>

<style scoped src="@/css/common/pagination.css"></style>
