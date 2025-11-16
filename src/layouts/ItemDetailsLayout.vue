<template>
    <Header/>
    <div class="item-details-layout">
        <section class="hero">
            <div class="items-scroller">
                <div v-if="isLoading" class="loading-message">Loading...</div>
                <div v-else-if="error" class="error-message">{{ error }}</div>
                <items-card
                    v-else
                    v-for="(item, index) in items"
                    :key="item.mal_id || index"
                    :item="item"
                />
            </div>
            <aside class="chapter-middle">
                <ListItemSelect/>
            </aside>
            <aside class="author-sidebar">
                <AuthorDetails/>
            </aside>
        </section>
        <main class="content">
            <section class="details">
                <ItemDetails/>
            </section>
            <aside class="sidebar">
                <LeaderBoard/>
            </aside>
        </main>
    </div>
    <Footer/>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Footer from '@/components/global/Footer.vue'
import Header from '@/components/global/Header.vue'
import LeaderBoard from '@/components/main-items/LeaderBoard.vue'
import ItemDetails from '@/components/common/ItemDetails.vue'
import ListItemSelect from '@/components/main-items/ListItemSelect.vue'
import AuthorDetails from '@/components/common/AuthorDetails.vue'
import itemsCard from '@/components/child/items-card.vue'
import { getMangaDetail, getMangaRelations } from '@/js/services/api/mangaApi'

const route = useRoute()
const items = ref([])
const isLoading = ref(false)
const error = ref(null)

let abortController
onMounted(async () => {
  abortController = new AbortController()
  const id = route.params.idOrSlug
  if (!id) {
    console.error('No idOrSlug found in route params')
    error.value = 'No manga ID provided'
    return
  }

  isLoading.value = true
  error.value = null
  
  try {
    const manga = await getMangaDetail(id, abortController.signal)
    
    // Validate manga data
    if (!manga || !manga.mal_id) {
      throw new Error('Invalid manga data: missing mal_id')
    }

    items.value = [{
      mal_id: manga.mal_id,
      name: manga.title || manga.name || 'Unknown',
      image: manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url || '',
      status: manga.status || 'Unknown'
    }]
    
    // Nếu muốn related items: Uncomment dưới
    // const relations = await getMangaRelations(id, abortController.signal)
    // if (relations && Array.isArray(relations)) {
    //   const relatedItems = relations
    //     .filter(rel => rel.entry?.[0]?.mal_id)
    //     .map(rel => ({
    //       mal_id: rel.entry[0].mal_id,
    //       name: rel.entry[0].name || 'Unknown',
    //       image: rel.entry[0].images?.jpg?.image_url || '',
    //       status: rel.relation || 'Unknown'
    //     }))
    //   items.value.push(...relatedItems)
    // }
  } catch (err) {
    if (err?.name !== 'AbortError') {
      console.error('Error fetching manga details:', err)
      error.value = err.message || 'Failed to load manga details'
      items.value = [] // Clear items on error
    }
  } finally {
    isLoading.value = false
  }
})

onBeforeUnmount(() => {
  if (abortController) abortController.abort()
})
</script>

<style scoped src="@/css/layout/ItemDetailsLayout.css"></style>