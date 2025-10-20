import { api } from '@/js/services/client'

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

let cachedGenres = null; // Cache genres để dùng trong getListManga

export async function getTagGenres() {
  try {
    const response = await api.get('/genres/manga');
    const allGenres = response.data.data || [];
    const uniqueGenresMap = new Map();
    allGenres.forEach(genre => {
      if (!uniqueGenresMap.has(genre.mal_id)) {
        uniqueGenresMap.set(genre.mal_id, { id: genre.mal_id, name: genre.name });
      }
    });
    cachedGenres = Array.from(uniqueGenresMap.values());
    return cachedGenres;
  } catch (err) {
    console.error('Failed to fetch genres: ', err);
    throw err;
  }
}

export async function getListManga(page = 1, limit = 25, genres = []) {
  try {
    // Lấy danh sách genres nếu chưa cache
    if (!cachedGenres) {
      await getTagGenres();
    }
    // Chuyển tên genres thành ID
    const genreIds = genres.length
      ? genres
          .map(name => cachedGenres.find(g => g.name === name)?.id)
          .filter(id => id)
          .join(',')
      : undefined;

    const response = await api.get('/manga', {
      params: {
        page,
        limit,
        order_by: 'title',
        sort: 'asc',
        genres: genreIds // Dùng ID thay vì tên
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