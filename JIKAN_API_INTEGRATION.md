# Tích hợp API Jikan.moe

Dự án này đã được tích hợp với API Jikan.moe để hiển thị dữ liệu anime/manga thật thay vì dữ liệu giả.

## Các tính năng đã tích hợp

### 1. API Service (`src/js/services/jikanApi.js`)
- Service để gọi API Jikan.moe
- Hỗ trợ các endpoint chính:
  - Top anime/manga
  - Tìm kiếm anime/manga
  - Chi tiết anime/manga
  - Anime theo genre
  - Anime đang phát sóng
  - Anime sắp ra mắt

### 2. Anime Store (`src/js/composables/useAnimeStore.js`)
- Pinia store để quản lý state anime
- Các actions chính:
  - `fetchTopAnime()` - Lấy top anime
  - `fetchAiringAnime()` - Lấy anime đang phát sóng
  - `fetchUpcomingAnime()` - Lấy anime sắp ra mắt
  - `searchAnime(query)` - Tìm kiếm anime
  - `fetchAnimeDetails(id)` - Lấy chi tiết anime
  - `fetchGenres()` - Lấy danh sách genres

### 3. Components đã cập nhật

#### Horizontal_items.vue
- Hiển thị anime theo chiều ngang
- Hỗ trợ các loại: top, airing, upcoming
- **Không có fallback data** - chỉ hiển thị dữ liệu thật
- Loading, error, và empty states

#### List_items.vue
- Hiển thị danh sách anime với pagination
- Tích hợp với API để load dữ liệu thật
- **Không có fallback data** - chỉ hiển thị dữ liệu thật
- Loading, error, và empty states

#### LeaderBoard.vue
- Hiển thị top 10 anime
- Dữ liệu từ API top anime
- **Không có fallback data** - chỉ hiển thị dữ liệu thật
- Loading, error, và empty states

#### ItemDetails.vue
- Hiển thị chi tiết anime
- Load dữ liệu dựa trên ID từ URL
- Hiển thị poster, thông tin, synopsis
- **Không có fallback data** - chỉ hiển thị dữ liệu thật

#### SearchBar.vue
- Tìm kiếm anime real-time
- Debounced search (300ms)
- Navigate đến chi tiết anime

#### Home.vue
- Hiển thị nhiều section anime khác nhau
- Top Anime, Currently Airing, Upcoming Anime

## Cách sử dụng

### 1. Chạy ứng dụng
```bash
npm run dev
```

### 2. Truy cập các tính năng
- **Home page**: Hiển thị các section anime khác nhau
- **Search**: Gõ tên anime để tìm kiếm
- **Details**: Click vào anime để xem chi tiết
- **Navigation**: Sử dụng pagination để xem thêm anime

### 3. API Endpoints được sử dụng
- `GET /top/anime` - Top anime
- `GET /anime?status=airing` - Anime đang phát sóng
- `GET /anime?status=upcoming` - Anime sắp ra mắt
- `GET /anime?q={query}` - Tìm kiếm anime
- `GET /anime/{id}` - Chi tiết anime
- `GET /genres/anime` - Danh sách genres

## Cấu trúc dữ liệu

Dữ liệu anime được transform để phù hợp với component:

```javascript
{
  id: number,           // MAL ID
  name: string,         // Tên anime
  image: string,        // URL poster
  status: string,       // Trạng thái (Airing, Finished, etc.)
  score: number,        // Điểm đánh giá
  episodes: number,     // Số tập
  year: number,         // Năm phát hành
  genres: string[],     // Danh sách thể loại
  synopsis: string,     // Tóm tắt
  url: string          // Link MyAnimeList
}
```

## Error Handling

- Tất cả API calls đều có error handling
- **Không có fallback data** - chỉ hiển thị dữ liệu thật từ API
- Loading states cho UX tốt hơn
- Retry mechanism cho các lỗi tạm thời
- Empty states khi không có dữ liệu
- Error states với nút retry

## Loading System

Ứng dụng sử dụng **Loading.vue có sẵn** với animation đẹp mắt:

### Loading Component
- **Loading.vue**: Loading component gốc với animation SVG đẹp mắt
- **useLoadingStore**: Pinia store để quản lý loading states
- **Global Loading**: Hiển thị loading toàn màn hình khi có bất kỳ API call nào

### Loading Features
- **Automatic Loading**: Tự động hiển thị loading khi gọi API
- **Beautiful Animation**: Animation SVG với các icon đẹp mắt
- **Global Overlay**: Loading overlay toàn màn hình với transition mượt mà
- **Loading States**: Loading cho từng API call riêng biệt
  - `topAnime`: Loading top anime
  - `airingAnime`: Loading anime đang phát sóng
  - `upcomingAnime`: Loading anime sắp ra mắt
  - `searchAnime`: Loading kết quả tìm kiếm
  - `animeDetails`: Loading chi tiết anime

## UI States

Ứng dụng hiện có các trạng thái UI sau:

### Loading State
- Hiển thị khi đang tải dữ liệu từ API
- Animation loading với gradient effect
- Text thông báo "Loading..."

### Error State  
- Hiển thị khi API call thất bại
- Background màu đỏ nhạt với border
- Nút "Retry" để thử lại
- Text thông báo lỗi

### Empty State
- Hiển thị khi không có dữ liệu
- Background màu xám nhạt
- Text thông báo "No data available"
- Style italic cho text

### Success State
- Hiển thị dữ liệu anime thật từ API
- Không có fallback data

## Rate Limiting & Performance

### Rate Limiting
- **Jikan API Limits**: 3 requests/second, 60 requests/minute
- **Our Implementation**: 2 requests/second để an toàn
- **Request Queue**: Tự động queue các requests để tuân thủ rate limit
- **Exponential Backoff**: Tự động retry khi gặp 429 error

### Caching System
- **API Cache**: Cache responses trong 5 phút
- **Store Cache**: Cache flags để tránh duplicate API calls
- **Cache Keys**: Unique keys dựa trên URL và parameters

### Error Handling
- **429 Rate Limit**: Tự động retry với delay
- **Network Errors**: Graceful error handling
- **User Notification**: Warning component khi có rate limit issues
- **Retry Mechanism**: Exponential backoff cho failed requests

## Tương lai

Có thể mở rộng thêm:
- Manga support
- User favorites
- Watchlist
- Reviews và ratings
- Recommendations
- Advanced filtering
