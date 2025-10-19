<template>
  <div class="author-container">
    <!-- Nút tổng -->
    <button class="author-toggle" @click="toggleOpen">
      <span>Tác giả</span>
      <span class="chevron" :class="{ open: isOpen }">▾</span>
    </button>

    <!-- Transition bọc cả danh sách -->
    <Transition name="author-slide">
      <div v-if="isOpen">
        <AuthorItem
          v-for="item in authors"
          :key="item.id"
          :author="item"
          :worksByAuthor="worksByAuthor"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthorItem from '../child/AuthorItem.vue'

const isOpen = ref(false) 

function toggleOpen() {
  isOpen.value = !isOpen.value
}

const authors = [
  {
    id: 1,
    name: 'Yusuke Murata',
    bio: 'Họa sĩ manga nổi tiếng với tác phẩm One Punch Man.',
    email: 'murata@example.com'
  },
  {
    id: 2,
    name: 'ONE',
    bio: 'Tác giả gốc của One Punch Man, nổi tiếng với phong cách hài hước.',
    email: 'one@example.com'
  }
]

// Placeholder works list
const worksByAuthor = [
  { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'Eyesyahiro Pochihield 21', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Completed' },
  { name: 'Manga Sample A', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'HOT' },
  { name: 'Manga Sample B', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'New' }
]
</script>

<style scoped src="@/css/common/author_details.css"></style>
