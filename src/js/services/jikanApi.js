import axios from 'axios'

// Base URL cho Jikan API
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4'

// Rate limiting configuration
const RATE_LIMIT = {
  requestsPerSecond: 2, // Giảm xuống 2 requests/second để an toàn
  requestsPerMinute: 30, // Giảm xuống 30 requests/minute
}

// Cache để lưu trữ kết quả API
const apiCache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 phút

// Queue để quản lý rate limiting
const requestQueue = []
let isProcessingQueue = false

// Tạo axios instance với cấu hình mặc định
const jikanApi = axios.create({
  baseURL: JIKAN_BASE_URL,
  timeout: 15000, // Tăng timeout lên 15s
  headers: {
    'Content-Type': 'application/json',
  }
})

// Utility functions cho rate limiting và caching
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getCacheKey = (url, params) => {
  const sortedParams = Object.keys(params || {})
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')
  return `${url}?${sortedParams}`
}

const getFromCache = (cacheKey) => {
  const cached = apiCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`[Jikan API] Cache hit for ${cacheKey}`)
    return cached.data
  }
  return null
}

const setCache = (cacheKey, data) => {
  apiCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  })
}

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return
  
  isProcessingQueue = true
  
  while (requestQueue.length > 0) {
    const { resolve, reject, request } = requestQueue.shift()
    
    try {
      const result = await request()
      resolve(result)
    } catch (error) {
      reject(error)
    }
    
    // Delay giữa các requests để tuân thủ rate limit
    await delay(1000 / RATE_LIMIT.requestsPerSecond)
  }
  
  isProcessingQueue = false
}

const queueRequest = (request) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ resolve, reject, request })
    processQueue()
  })
}

// Response interceptor để handle errors
jikanApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.error('[Jikan API Error]', error.response?.data || error.message)
    
    // Handle rate limiting với exponential backoff
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 60
      console.warn(`[Jikan API] Rate limited. Retrying after ${retryAfter}s`)
      
      // Dispatch event để hiển thị warning
      window.dispatchEvent(new CustomEvent('jikan-rate-limit'))
      
      await delay(retryAfter * 1000)
      return jikanApi.request(error.config)
    }
    
    return Promise.reject(error)
  }
)

// API Service class
class JikanApiService {
  /**
   * Lấy danh sách anime top
   * @param {string} type - anime hoặc manga
   * @param {string} filter - airing, upcoming, bypopularity, favorite
   * @param {number} page - trang hiện tại
   * @param {number} limit - số lượng item per page
   */
  async getTopAnime(type = 'anime', filter = 'bypopularity', page = 1, limit = 25) {
    const cacheKey = getCacheKey(`/top/${type}`, { filter, page, limit })
    
    // Check cache first
    const cachedData = getFromCache(cacheKey)
    if (cachedData) {
      return cachedData
    }
    
    try {
      const response = await queueRequest(async () => {
        return await jikanApi.get(`/top/${type}`, {
          params: {
            filter,
            page,
            limit
          }
        })
      })
      
      const data = response.data
      setCache(cacheKey, data)
      return data
    } catch (error) {
      throw new Error(`Failed to fetch top ${type}: ${error.message}`)
    }
  }

  /**
   * Lấy danh sách anime theo genre
   * @param {number} genreId - ID của genre
   * @param {number} page - trang hiện tại
   * @param {number} limit - số lượng item per page
   */
  async getAnimeByGenre(genreId, page = 1, limit = 25) {
    try {
      const response = await jikanApi.get(`/anime`, {
        params: {
          genres: genreId,
          page,
          limit,
          order_by: 'popularity',
          sort: 'desc'
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch anime by genre: ${error.message}`)
    }
  }

  /**
   * Lấy chi tiết anime/manga theo ID
   * @param {string} type - anime hoặc manga
   * @param {number} id - ID của anime/manga
   */
  async getAnimeDetails(type = 'anime', id) {
    try {
      const response = await jikanApi.get(`/${type}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch ${type} details: ${error.message}`)
    }
  }

  /**
   * Tìm kiếm anime/manga
   * @param {string} query - từ khóa tìm kiếm
   * @param {string} type - anime hoặc manga
   * @param {number} page - trang hiện tại
   * @param {number} limit - số lượng item per page
   */
  async searchAnime(query, type = 'anime', page = 1, limit = 25) {
    try {
      const response = await jikanApi.get(`/${type}`, {
        params: {
          q: query,
          page,
          limit,
          order_by: 'popularity',
          sort: 'desc'
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to search ${type}: ${error.message}`)
    }
  }

  /**
   * Lấy danh sách genres
   * @param {string} type - anime hoặc manga
   */
  async getGenres(type = 'anime') {
    try {
      const response = await jikanApi.get(`/genres/${type}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch ${type} genres: ${error.message}`)
    }
  }

  /**
   * Lấy anime theo mùa
   * @param {number} year - năm
   * @param {string} season - winter, spring, summer, fall
   * @param {number} page - trang hiện tại
   * @param {number} limit - số lượng item per page
   */
  async getSeasonalAnime(year, season, page = 1, limit = 25) {
    try {
      const response = await jikanApi.get(`/seasons/${year}/${season}`, {
        params: {
          page,
          limit
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch seasonal anime: ${error.message}`)
    }
  }

  /**
   * Lấy anime đang phát sóng
   * @param {number} page - trang hiện tại
   * @param {number} limit - số lượng item per page
   */
  async getAiringAnime(page = 1, limit = 25) {
    const cacheKey = getCacheKey('/anime', { status: 'airing', page, limit, order_by: 'popularity', sort: 'desc' })
    
    const cachedData = getFromCache(cacheKey)
    if (cachedData) {
      return cachedData
    }
    
    try {
      const response = await queueRequest(async () => {
        return await jikanApi.get('/anime', {
          params: {
            status: 'airing',
            page,
            limit,
            order_by: 'popularity',
            sort: 'desc'
          }
        })
      })
      
      const data = response.data
      setCache(cacheKey, data)
      return data
    } catch (error) {
      throw new Error(`Failed to fetch airing anime: ${error.message}`)
    }
  }

  /**
   * Lấy anime sắp ra mắt
   * @param {number} page - trang hiện tại
   * @param {number} limit - số lượng item per page
   */
  async getUpcomingAnime(page = 1, limit = 25) {
    const cacheKey = getCacheKey('/anime', { status: 'upcoming', page, limit, order_by: 'popularity', sort: 'desc' })
    
    const cachedData = getFromCache(cacheKey)
    if (cachedData) {
      return cachedData
    }
    
    try {
      const response = await queueRequest(async () => {
        return await jikanApi.get('/anime', {
          params: {
            status: 'upcoming',
            page,
            limit,
            order_by: 'popularity',
            sort: 'desc'
          }
        })
      })
      
      const data = response.data
      setCache(cacheKey, data)
      return data
    } catch (error) {
      throw new Error(`Failed to fetch upcoming anime: ${error.message}`)
    }
  }
}

// Tạo instance duy nhất của service
const jikanService = new JikanApiService()

export default jikanService
export { JikanApiService }
