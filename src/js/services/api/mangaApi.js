import { api } from '@/js/services/client'

export async function getTopManga( page = 1, limit = 10) {
    try{
        const response = await api.get('/top/manga', {
            params:{
                page,
                limit
            }
        })
        return response.data.data.map(item =>({
            mal_id: item.mal_id,
            name: item.title,
            image: item.images?.jpg?.image_url || '',
            status: item.status
        }))
    } catch (err){
        console.error('Failed to fetch top manga: ', err);
        throw err
    }
}

export async function getNewManga(limit = 15) {
    try {
        const response = await api.get('/manga', {
            params: {
                order_by: 'start_date',
                sort: 'desc',
                limit 
            }
        })
        return response.data.data.map(item => ({
            name: item.title,
            image: item.images?.jpg?.image_url || '',
            status: item.status
        }))
    } catch (err){
        throw err 
    }
}