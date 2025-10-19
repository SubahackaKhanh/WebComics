import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jikanService from '@/js/services/jikanApi.js'
import { useLoadingStore } from '@/js/composables/useLoadingStore'

export const useAnimeStore = defineStore('anime', () => {
  // State
  const topAnime = ref([])
  const airingAnime = ref([])
  const upcomingAnime = ref([])
  const searchResults = ref([])
  const currentAnime = ref(null)
  const genres = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Cache flags để tránh gọi API nhiều lần
  const cacheFlags = ref({
    topAnime: false,
    airingAnime: false,
    upcomingAnime: false,
    genres: false
  })

  // Pagination state
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 25
  })

  // Getters
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => !!error.value)
  const errorMessage = computed(() => error.value)

  // Actions
  const setError = (message) => {
    error.value = message
  }

  const clearError = () => {
    error.value = null
  }

  const clearCache = () => {
    cacheFlags.value = {
      topAnime: false,
      airingAnime: false,
      upcomingAnime: false,
      genres: false
    }
    topAnime.value = []
    airingAnime.value = []
    upcomingAnime.value = []
    searchResults.value = []
    currentAnime.value = null
    genres.value = []
  }

  const updatePagination = (data) => {
    pagination.value = {
      currentPage: data.pagination?.current_page || 1,
      totalPages: data.pagination?.last_visible_page || 1,
      totalItems: data.pagination?.items?.total || 0,
      pageSize: data.pagination?.items?.per_page || 25
    }
  }

  // Fetch top anime
  const fetchTopAnime = async (filter = 'bypopularity', page = 1) => {
    // Kiểm tra cache flag
    if (cacheFlags.value.topAnime && topAnime.value.length > 0) {
      console.log('[Anime Store] Using cached top anime data')
      return { data: topAnime.value }
    }

    const loadingStore = useLoadingStore()
    
    try {
      await loadingStore.withLoading(async () => {
        clearError()
        
        const response = await jikanService.getTopAnime('anime', filter, page)
        
        topAnime.value = response.data || []
        cacheFlags.value.topAnime = true
        
        updatePagination(response)
        return response
      }, 'topAnime')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Fetch airing anime
  const fetchAiringAnime = async (page = 1) => {
    // Kiểm tra cache flag
    if (cacheFlags.value.airingAnime && airingAnime.value.length > 0) {
      console.log('[Anime Store] Using cached airing anime data')
      return { data: airingAnime.value }
    }

    const loadingStore = useLoadingStore()
    
    try {
      await loadingStore.withLoading(async () => {
        clearError()
        
        const response = await jikanService.getAiringAnime(page)
        airingAnime.value = response.data || []
        cacheFlags.value.airingAnime = true
        
        updatePagination(response)
        return response
      }, 'airingAnime')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Fetch upcoming anime
  const fetchUpcomingAnime = async (page = 1) => {
    // Kiểm tra cache flag
    if (cacheFlags.value.upcomingAnime && upcomingAnime.value.length > 0) {
      console.log('[Anime Store] Using cached upcoming anime data')
      return { data: upcomingAnime.value }
    }

    const loadingStore = useLoadingStore()
    
    try {
      await loadingStore.withLoading(async () => {
        clearError()
        
        const response = await jikanService.getUpcomingAnime(page)
        upcomingAnime.value = response.data || []
        cacheFlags.value.upcomingAnime = true
        
        updatePagination(response)
        return response
      }, 'upcomingAnime')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Search anime
  const searchAnime = async (query, page = 1) => {
    const loadingStore = useLoadingStore()
    
    try {
      await loadingStore.withLoading(async () => {
        clearError()
        
        const response = await jikanService.searchAnime(query, 'anime', page)
        searchResults.value = response.data || []
        
        updatePagination(response)
        return response
      }, 'searchAnime')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Fetch anime details
  const fetchAnimeDetails = async (id) => {
    const loadingStore = useLoadingStore()
    
    try {
      await loadingStore.withLoading(async () => {
        clearError()
        
        const response = await jikanService.getAnimeDetails('anime', id)
        currentAnime.value = response.data
        
        return response
      }, 'animeDetails')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Fetch genres
  const fetchGenres = async () => {
    try {
      setLoading(true)
      clearError()
      
      const response = await jikanService.getGenres('anime')
      genres.value = response.data || []
      
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fetch anime by genre
  const fetchAnimeByGenre = async (genreId, page = 1) => {
    try {
      setLoading(true)
      clearError()
      
      const response = await jikanService.getAnimeByGenre(genreId, page)
      
      updatePagination(response)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Transform anime data to match your component structure
  const transformAnimeData = (animeData) => {
    return animeData.map(anime => ({
      id: anime.mal_id,
      name: anime.title || anime.title_english || 'Unknown Title',
      image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url || '/placeholder.jpg',
      status: anime.status || 'Unknown',
      score: anime.score || 0,
      episodes: anime.episodes || 0,
      year: anime.year || null,
      genres: anime.genres?.map(g => g.name) || [],
      synopsis: anime.synopsis || '',
      url: anime.url || ''
    }))
  }

  // Get transformed data
  const getTransformedTopAnime = computed(() => transformAnimeData(topAnime.value))
  const getTransformedAiringAnime = computed(() => transformAnimeData(airingAnime.value))
  const getTransformedUpcomingAnime = computed(() => transformAnimeData(upcomingAnime.value))
  const getTransformedSearchResults = computed(() => transformAnimeData(searchResults.value))

  return {
    // State
    topAnime,
    airingAnime,
    upcomingAnime,
    searchResults,
    currentAnime,
    genres,
    loading,
    error,
    pagination,
    cacheFlags,

    // Getters
    isLoading,
    hasError,
    errorMessage,
    getTransformedTopAnime,
    getTransformedAiringAnime,
    getTransformedUpcomingAnime,
    getTransformedSearchResults,

    // Actions
    setError,
    clearError,
    clearCache,
    fetchTopAnime,
    fetchAiringAnime,
    fetchUpcomingAnime,
    searchAnime,
    fetchAnimeDetails,
    fetchGenres,
    fetchAnimeByGenre,
    transformAnimeData
  }
})
