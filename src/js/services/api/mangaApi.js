// src/js/services/api/mangaApi.js
import { api } from '@/js/services/client';

// Hàm hỗ trợ retry khi gặp lỗi 429
async function fetchWithRetry(url, config = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const { signal } = config || {};
      const response = await api.get(url, { ...config, signal });

      // Xử lý rate limit 429
      if (response.status === 429) {
        const waitTime = delay * Math.pow(2, i); // Exponential backoff
        console.warn(`Rate limited. Waiting ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      // Kiểm tra response hợp lệ
      if (!response?.data) {
        console.warn('No response.data:', response);
        throw new Error('Invalid API response: No data');
      }

      // Fallback nếu data.data không phải array
      if (!Array.isArray(response.data.data)) {
        console.warn('response.data.data is not array:', response.data.data);
        response.data.data = []; // Trả mảng rỗng thay vì crash
      }

      return response;
    } catch (err) {
      console.warn(`Retry ${i + 1}/${retries} failed:`, err.message);
      if (i === retries - 1 || err.name === 'AbortError') {
        throw err;
      }
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
  throw new Error('Max retries reached');
}

let cachedGenres = null;

export async function getTopManga(page = 1, limit = 10, signal) {
  try {
    const response = await fetchWithRetry('/top/manga', { params: { page, limit }, signal });
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

export async function getNewManga(page = 1, limit = 15, signal) {
  try {
    const response = await fetchWithRetry('/manga', {
      params: { 
        order_by: 'start_date', 
        sort: 'desc', 
        limit, 
        page  // ← Thêm page nếu chưa có (Jikan yêu cầu cho pagination)
      },
      signal
    });

    const rawData = response?.data?.data || [];
    if (!Array.isArray(rawData)) {
      console.error('getNewManga: Invalid data format', rawData);
      return {
        items: [],
        pagination: { hasNextPage: false }
      };
    }

    const items = rawData.map(item => ({
      mal_id: item.mal_id,
      name: item.title,
      image: item.images?.jpg?.image_url || '',
      status: item.status
    })).filter(item => item.mal_id); // Lọc item hợp lệ

    return {
      items,
      pagination: {
        hasNextPage: response.data.pagination?.has_next_page ?? (items.length === limit)
      }
    };
  } catch (err) {
    console.error('Failed to fetch new manga: ', err);
    if (err.name === 'AbortError') {
      throw err; // Để component xử lý
    }
    return {  // Fallback: không throw, trả rỗng để UI không crash
      items: [],
      pagination: { hasNextPage: false }
    };
  }
}

export async function getTagGenres(signal) {
  try {
    if (cachedGenres) {
      console.log('Using cached genres:', cachedGenres);
      return cachedGenres;
    }
    const response = await fetchWithRetry('/genres/manga', { signal });
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

export async function getListManga(page = 1, limit = 25, genres = [], signal) {
  try {
    if (!cachedGenres) {
      await getTagGenres(signal);
    }
    const genreIds = genres.length
      ? genres
          .map(name => cachedGenres.find(g => g.name === name)?.id)
          .filter(id => id)
          .join(',')
      : undefined;
    console.log('Fetching manga with:', { page, limit, genres: genreIds });

    const response = await fetchWithRetry('/manga', {
      params: { page, limit, order_by: 'title', sort: 'asc', genres: genreIds },
      signal
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

export async function getMangaDetail(mal_id, signal) {
  try {
    const response = await fetchWithRetry(`/manga/${mal_id}/full`, { signal });
    return response.data.data;
  } catch (err) {
    console.error('Failed to fetch manga details: ', err);
    throw err;
  }
}

export async function getMangaRelations(mal_id, signal) {
  try {
    const response = await fetchWithRetry(`/manga/${mal_id}/relations`, { signal });
    return response.data.data;
  } catch (err) {
    console.error('Failed to fetch manga relations: ', err);
    throw err;
  }
}

export async function searchManga(query, signal) {
  try {
    const response = await fetchWithRetry('/manga', {
      params: { q: query },
      signal
    });
    return response.data.data.map(item => ({
      mal_id: item.mal_id,
      name: item.title,
      image: item.images?.jpg?.image_url || '',
      status: item.status
    }));
  } catch (err) {
    console.error('Failed to search manga: ', err);
    throw err;
  }
}