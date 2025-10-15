<template>
  <div class="chapter-list">
    <div v-for="chapter in sortedChapters" :key="chapter.id" class="chapter-item">
      <h3>{{ chapter.title }}</h3>
      <p class="date">Ngày đăng: {{ formatDate(chapter.date) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
 // thu ma api phai tra ve
const chapters = ref([
  { id: 1, title: 'Chapter 1', date: '2023-08-01' },
  { id: 2, title: 'Chapter 2', date: '2023-08-05' },
  { id: 3, title: 'Chapter 3', date: '2023-08-10' },
])

const sortedChapters = computed(() =>
  [...chapters.value].sort((a, b) => new Date(b.date) - new Date(a.date))
)

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN')
}
</script>

<style scoped src="@/css/listitemselect.css"></style>