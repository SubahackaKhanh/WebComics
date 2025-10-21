<template>
    <div class="details-container">
        <h1>{{ manga?.title || '' }}</h1>         <!-- <h1> {{ items.name }}</h1> -->
        <p class="details-text">{{ manga?.synopsis || '' }}</p>
        <div class="actions">
            <button class="btn-read" @click="onClickRead">Read</button>
        </div>
    </div>
    
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { buildReadPath } from '@/js/utils/itemNavigation'
    import { ref, onMounted} from 'vue'
    import { getMangaDetail } from '@/js/services/api/mangaApi'
    
    const route = useRoute()
    const router = useRouter()
    const manga = ref (null)

    onMounted(async () => {
        const id = route.params.idOrSlug
        if (id) {
            try {
                manga.value = await getMangaDetail(id)
            } catch (err){
                console.error("Error fetching manga details: ", err);
            } 
        }
    })

    function onClickRead(){
        const idOrSlug = route.params.idOrSlug || 'one-punch-man'
        const to = buildReadPath({ slug: String(idOrSlug) }, 1)
        router.push(to)
    }
</script>

<style scoped src="@/css/common/itemdetails.css"></style>