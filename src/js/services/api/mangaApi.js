import { api } from '@/js/services/client';

export async function getTopManga(page = 1, limit = 10) {
  try {
    const response = await api.get('/top/manga', {
      params: { page, limit }
    });
    return response.data.data.map(item => ({
      mal_id: item.mal_id,
      name: item.title,
      image: item.images?.jpg?.image_url || '',
      status: item.status
    }));
  } catch (err) {
    console.error('Failed to fetch top manga: ', err);
    throw err;
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
    });
    return response.data.data.map(item => ({
      name: item.title,
      image: item.images?.jpg?.image_url || '',
      status: item.status
    }));
  } catch (err) {
    throw err;
  }
}

let cachedGenres = null;

export async function getTagGenres() {
  try {
    if (cachedGenres) {
      console.log('Using cached genres:', cachedGenres);
      return cachedGenres;
    }
    const response = await api.get('/genres/manga');
    const allGenres = response.data.data || [];
    const uniqueGenresMap = new Map();
    allGenres.forEach(genre => {
      if (!uniqueGenresMap.has(genre.mal_id)) {
        uniqueGenresMap.set(genre.mal_id, { id: genre.mal_id, name: genre.name });
      }
    });
    cachedGenres = Array.from(uniqueGenresMap.values());
    console.log('Fetched genres:', cachedGenres);
    return cachedGenres;
  } catch (err) {
    console.error('Failed to fetch genres: ', err);
    throw err;
  }
}

export async function getListManga(page = 1, limit = 25, genres = []) {
  try {
    if (!cachedGenres) {
      await getTagGenres();
    }
    const genreIds = genres.length
      ? genres
          .map(name => cachedGenres.find(g => g.name === name)?.id)
          .filter(id => id)
          .join(',')
      : undefined;
    console.log('Fetching manga with:', { page, limit, genres: genreIds });

    const response = await api.get('/manga', {
      params: {
        page,
        limit,
        order_by: 'title',
        sort: 'asc',
        genres: genreIds
      }
    });
    return {
      items: response.data.data.map(item => ({
        mal_id: item.mal_id,
        name: item.title,
        image: item.images?.jpg?.image_url || '',
        status: item.status,
        genres: item.genres?.map(g => g.name) || []
      })),
      pagination: {
        currentPage: page,
        hasNextPage: response.data.pagination.has_next_page,
        totalItems: response.data.pagination.items.total
      }
    };
  } catch (err) {
    console.error('Failed to fetch list manga: ', err);
    throw err;
  }
}

export async function getMangaDetail(mal_id){
  try{
    const response = await api.get(`/manga/${mal_id}/full`);
    return response.data.data;
  } catch (err){
    console.error("Failed to fetch manga details: ", err);
    throw err;
  }
}

export async function getMangaRelations(mal_id){
  try{
    const response = await api.get(`/manga/${mal_id}/relations`);
    return response.data.data;
  } catch (err){
    console.error("Failed to fetch manga relations: ", err);
    throw err;
  }
}

