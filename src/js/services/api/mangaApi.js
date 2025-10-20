import { api } from '@/js/services/client'

export async function getTopManga( page = 1, limit = 10) {
    const response = await api.get('/top/manga', {
        params: { page, limit }
    })
    return response.data.data
}

