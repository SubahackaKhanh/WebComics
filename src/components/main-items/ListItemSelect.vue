<template>
  <div class="chapter-list">
    <div v-for="chapter in sortedChapters" :key="chapter.id" class="chapter-item">
      <h3>{{ chapter.title }}</h3>
      <p class="date">Date: {{ formatDate(chapter.date) }}</p>
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
  { id: 4, title: 'Chapter 4', date: '2023-08-15' },
  { id: 5, title: 'Chapter 5', date: '2023-08-20' },
  { id: 6, title: 'Chapter 6', date: '2023-08-25' },
  { id: 7, title: 'Chapter 7', date: '2023-08-30' },
  { id: 8, title: 'Chapter 8', date: '2023-09-05' },
  { id: 9, title: 'Chapter 9', date: '2023-09-10' },
  { id: 10, title: 'Chapter 10', date: '2023-09-15' },
])

const sortedChapters = computed(() =>
  [...chapters.value].sort((a, b) => new Date(b.date) - new Date(a.date))
)

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN')
}
</script>

<style scoped src="@/css/main-items/listitemselect.css"></style>