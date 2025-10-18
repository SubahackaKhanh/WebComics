<template>
  <div class="author-item">
    <button class="author-toggle" @click="toggleOpen">
      <span>{{ author.name }}</span>
      <span class="chevron" :class="{ open: isOpen }">▾</span>
    </button>

    <transition name="author-slide">
      <div v-if="isOpen" class="author-content">
        <p class="author-bio">{{ author.bio }}</p>
        <p class="author-email"><strong>Email:</strong> {{ author.email }}</p>

        <HorizontalItems
          :title="'Cùng tác giả'"
          :items="worksByAuthor"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HorizontalItems from '@/components/main-items/Horizontal_items.vue'

const props = defineProps({
  author: Object,
  worksByAuthor: Array
})

const isOpen = ref(false)
function toggleOpen() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped src="@/css/child/author_item.css"></style>