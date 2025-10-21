<template>
  <div class="author-container">
    <button class="author-toggle" @click="toggleOpen">
      <span>Tác giả</span>
      <span class="chevron" :class="{ open: isOpen }">▾</span>
    </button>
    <Transition name="author-slide">
      <div v-if="isOpen">
        <AuthorItem
          v-for="author in authors"
          :key="author.mal_id"
          :author="author"
          :worksByAuthor="worksByAuthor"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMangaDetail, getMangaRelations } from '@/js/services/api/mangaApi'
import AuthorItem from '../child/AuthorItem.vue'

const isOpen = ref(false)
const authors = ref([])
const worksByAuthor = ref([])

const route = useRoute()

onMounted(async () => {
  const id = route.params.idOrSlug
  if (id) {
    try {
      const manga = await getMangaDetail(id)
      authors.value = manga.authors || []  // Authors từ API: [{mal_id, name, role}]
      
      // Lấy related works nếu cần (nếu không, giữ mockup)
      const relations = await getMangaRelations(id)
      worksByAuthor.value = relations.map(rel => ({
        name: rel.entry?.[0]?.name || 'Unknown',
        image: rel.entry?.[0]?.images?.jpg?.image_url || '',
        status: rel.relation || 'Related'
      })) || []  // Nếu không có relations, worksByAuthor rỗng hoặc mockup
    } catch (err) {
      console.error('Error fetching authors:', err)
    }
  }
})

function toggleOpen() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped src="@/css/common/author_details.css"></style>