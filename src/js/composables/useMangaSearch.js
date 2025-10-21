import { ref } from 'vue'
import { api } from '../services/client'

export function useMangaSearch(){
    const results = ref ([])
    const loading = ref (false)

    async function searchManga(query){
        const q = query.trim()
        if (!q) {
            results.value = []
            return
        }

        loading.value = true 
        
        try{
            const { data } = await api.get('/manga',{
                params:{
                    q,
                    limit: 5
                },
            })
            results.value = (data?.data || []).map(manga =>({
                name: manga.title,
                image: manga.images?.jpg?.image_url || '',
                status: manga.status || 'Unknown',
                id: manga.mal_id,
            }))
        } catch(err){
            console.error('Search Api manga error: ', err);
            results.value = []
        } finally {
            loading.value = false
        }
    }
    return { results, loading, searchManga}
}