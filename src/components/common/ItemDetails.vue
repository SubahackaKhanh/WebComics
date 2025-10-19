<template>
    <div class="details-container">
        <div v-if="animeStore.hasError" class="error">
            <p>Error: {{ animeStore.errorMessage }}</p>
            <button @click="loadAnimeDetails">Retry</button>
        </div>
        
        <div v-else-if="currentAnime" class="anime-details">
            <div class="anime-header">
                <img 
                    :src="currentAnime.image" 
                    :alt="currentAnime.name"
                    class="anime-poster"
                    @error="handleImageError"
                />
                <div class="anime-info">
                    <h1>{{ currentAnime.name }}</h1>
                    <div class="anime-meta">
                        <span v-if="currentAnime.score" class="score">
                            ⭐ {{ currentAnime.score }}/10
                        </span>
                        <span v-if="currentAnime.status" class="status">
                            {{ currentAnime.status }}
                        </span>
                        <span v-if="currentAnime.episodes" class="episodes">
                            {{ currentAnime.episodes }} episodes
                        </span>
                        <span v-if="currentAnime.year" class="year">
                            {{ currentAnime.year }}
                        </span>
                    </div>
                    <div v-if="currentAnime.genres && currentAnime.genres.length" class="genres">
                        <span 
                            v-for="genre in currentAnime.genres.slice(0, 5)" 
                            :key="genre"
                            class="genre-tag"
                        >
                            {{ genre }}
                        </span>
                    </div>
                </div>
            </div>
            
            <div v-if="currentAnime.synopsis" class="synopsis">
                <h3>Synopsis</h3>
                <p>{{ currentAnime.synopsis }}</p>
            </div>
            
            <div class="actions">
                <button class="btn-read" @click="onClickRead">Read</button>
                <a 
                    v-if="currentAnime.url" 
                    :href="currentAnime.url" 
                    target="_blank" 
                    class="btn-external"
                >
                    View on MyAnimeList
                </a>
            </div>
        </div>
        
        <div v-else class="no-data">
            <h1>Anime Details</h1>
            <p class="details-text">No anime data available. Please check the URL or try again.</p>
            <div class="actions">
                <button class="btn-read" @click="onClickRead">Read</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { useAnimeStore } from '@/js/composables/useAnimeStore'
    import { useLoadingStore } from '@/js/composables/useLoadingStore'
    import { buildReadPath } from '@/js/utils/itemNavigation'
    import { computed, onMounted, watch } from 'vue'

    const route = useRoute()
    const router = useRouter()
    const animeStore = useAnimeStore()
    const loadingStore = useLoadingStore()

    // Computed để lấy anime hiện tại
    const currentAnime = computed(() => animeStore.currentAnime)

    // Load anime details dựa trên ID từ route
    const loadAnimeDetails = async () => {
        const idOrSlug = route.params.idOrSlug
        if (idOrSlug && !isNaN(Number(idOrSlug))) {
            try {
                await animeStore.fetchAnimeDetails(Number(idOrSlug))
            } catch (error) {
                console.error('Failed to load anime details:', error)
            }
        }
    }

    // Load data khi component mount
    onMounted(() => {
        loadAnimeDetails()
    })

    // Watch route changes để load anime mới
    watch(() => route.params.idOrSlug, () => {
        loadAnimeDetails()
    })

    function onClickRead(){
        const idOrSlug = route.params.idOrSlug || 'one-punch-man'
        const to = buildReadPath({ slug: String(idOrSlug) }, 1)
        router.push(to)
    }

    // Handle image error
    const handleImageError = (event) => {
        event.target.src = 'https://picfiles.alphacoders.com/178/178909.jpg'
    }
</script>

<style scoped src="@/css/common/itemdetails.css"></style>