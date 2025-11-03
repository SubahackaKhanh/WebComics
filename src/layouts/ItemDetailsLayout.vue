<template>
    <Header/>
    <div class="item-details-layout">
        <section class="hero">
            <div class="items-scroller">
                <items-card
                    v-for="(item, index) in items"
                    :key="index"
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

let abortController
onMounted(async () => {
  abortController = new AbortController()
  const id = route.params.idOrSlug
  if (id) {
    try {
      const manga = await getMangaDetail(id, abortController.signal)
      items.value = [{
        mal_id: manga.mal_id,
        name: manga.title,
        image: manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url || '',
        status: manga.status
      }]
      
      // Nếu muốn related items: Uncomment dưới
      // const relations = await getMangaRelations(id)
      // items.value = relations.map(rel => ({
      //   mal_id: rel.entry?.[0]?.mal_id,
      //   name: rel.entry?.[0]?.name,
      //   image: rel.entry?.[0]?.images?.jpg?.image_url || '',
      //   status: rel.relation
      // }))
    } catch (err) {
      if (err?.name !== 'AbortError') {
        console.error('Error fetching items:', err)
      }
    }
  }
})

onBeforeUnmount(() => {
  if (abortController) abortController.abort()
})
</script>

<style scoped src="@/css/layout/ItemDetailsLayout.css"></style>