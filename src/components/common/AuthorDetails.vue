<template>
  <div class="author-container">
    <button class="author-toggle" @click="toggleOpen">
      <span>Tác giả</span>
      <span class="chevron" :class="{ open: isOpen }">▾</span>
    </button>

    <transition name="author-slide">
      <div v-if="isOpen" class="author-content">
        <div v-for="item in authors" :key="item.id" class="author-card">
          <h3 class="author-name">{{ item.name }}</h3>
          <p class="author-bio">{{ item.bio }}</p>
          <p class="author-email"><strong>Email:</strong> {{ item.email }}</p>
        </div>

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

const isOpen = ref(true)

function toggleOpen(){
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

// Placeholder works list to mimic future API data
const worksByAuthor = [
  { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'Eyeshield 21', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Completed' },
  { name: 'Manga Sample A', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'HOT' },
  { name: 'Manga Sample B', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'New' }
]
</script>

<style scoped src="@/css/author_details.css"></style>
<style scoped>
.author-toggle{ display:flex; justify-content:space-between; align-items:center; width:100%; padding:10px 12px; border:3px solid #99c9f9; background:#cde4fc; color:#4a90e2; border-radius:8px; cursor:pointer; font-weight:600 }
.chevron{ transition: transform .2s ease }
.chevron.open{ transform: rotate(180deg) }
.author-content{ margin-top:10px }
.author-name{ margin:0 0 6px 0 }
.author-bio{ margin:0 0 4px 0 }
.author-slide-enter-from, .author-slide-leave-to{ opacity:0; transform: translateY(-6px) }
.author-slide-enter-active, .author-slide-leave-active{ transition: all .2s ease }
</style>
