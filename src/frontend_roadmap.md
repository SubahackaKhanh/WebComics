# Frontend Analysis & Roadmap

## Current Structure
Project sử dụng Vue 3 với cấu trúc tổ chức rõ ràng theo feature/function.

### 1. Authentication & Authorization
- **Components**: 
  - `Login.vue`, `SignUp.vue` trong pages/
  - `AuthLayout.vue` layout riêng cho auth pages
- **Services**: 
  - `userApi.js` xử lý API calls liên quan user
- **Security**:
  - Cần thêm CSRF token handling
  - Chưa thấy refresh token flow

### 2. Layout & Navigation
- **Layouts**:
  - `MainLayout.vue`: Layout chính
  - `ItemDetailsLayout.vue`: Chi tiết item
  - `AuthLayout.vue`: Auth pages
- **Navigation**:
  - `Header.vue`: Navigation chính
  - `Footer.vue`: Footer chung
  - `itemNavigation.js`: Logic điều hướng

### 3. Features
- **Manga/Items**:
  - List view (`List_items.vue`)
  - Grid view (`items-card.vue`) 
  - Horizontal scroll (`Horizontal_items.vue`)
  - Search functionality (`SearchBar.vue`)
  - Details view (`ItemDetails.vue`)
  - Favorites system (`Favorite.vue`)
- **Authors**:
  - Author listing (`AuthorItem.vue`)
  - Author details (`AuthorDetails.vue`)
- **Tags/Genres**:
  - Tags component (`tags.vue`)
  - Genres page (`Genres.vue`)
  - Tags container (`TagsContainer.vue`)

### 4. State Management & API
- **Stores**:
  - `mangaStore.js`: Quản lý state manga
  - `useLoadingStore.js`: Loading states
- **API**:
  - `client.js`: Axios instance
  - `mangaApi.js`: Manga endpoints
  - `userApi.js`: User endpoints

### 5. Utils & Composables
- **Composables**:
  - `useClickOutside`
  - `useMangaSearch`
  - `useOpenSearchIcon`
  - `useSuggestList`
  - `use_Scroll_Horizontal_item`
- **Utils**:
  - `itemNavigation.js`
  - `MenuIcon.js`

## Suggested Improvements

### 1. Security & Auth
- [ ] Implement CSRF token handling
  ```javascript
  // services/client.js
  const getCsrfToken = async () => {
    const { data } = await axios.get('/api/csrf-token');
    return data.csrfToken;
  };
  ```
- [ ] Add refresh token mechanism
- [ ] Implement proper auth state management (Pinia)
- [ ] Add email verification UI flow
- [ ] Add "Forgot Password" flow

### 2. Performance
- [ ] Implement lazy loading for images
- [ ] Add virtual scrolling for long lists
- [ ] Setup code splitting per route
- [ ] Implement service worker for offline support
- [ ] Add client-side caching strategies

### 3. UX Improvements
- [ ] Add proper error boundaries
- [ ] Implement skeleton loading states
- [ ] Add toast notifications system
- [ ] Improve form validation feedback
- [ ] Add dark mode support
- [ ] Implement infinite scroll where appropriate

### 4. Code Quality
- [ ] Add TypeScript
- [ ] Setup unit tests (Vitest)
- [ ] Add E2E tests (Cypress)
- [ ] Implement proper error handling
- [ ] Add proper logging system

### 5. Features
- [ ] Add user preferences
- [ ] Implement reading history
- [ ] Add bookmark system
- [ ] Support offline reading
- [ ] Add social features (comments, ratings)
- [ ] Implement push notifications

### 6. Accessibility
- [ ] Add ARIA labels
- [ ] Implement keyboard navigation
- [ ] Add screen reader support
- [ ] Improve color contrast
- [ ] Add skip links

### 7. Build & Deploy
- [ ] Setup proper build optimization
- [ ] Add CI/CD pipeline
- [ ] Implement proper environment management
- [ ] Add monitoring & analytics
- [ ] Setup error tracking (e.g., Sentry)

## Priority Tasks

### 🔐 Security
- [ ] CSRF token handling
- [ ] Refresh token flow
- [ ] Proper auth state management

### ⚡ Performance
- [ ] Lazy loading images
- [ ] Code splitting
- [ ] Client-side caching

### 🎨 UX
- [ ] Toast notifications
- [ ] Loading states
- [ ] Form validation improvement

### 📖 Features
- [ ] Reading history
- [ ] Bookmarks
- [ ] User preferences
