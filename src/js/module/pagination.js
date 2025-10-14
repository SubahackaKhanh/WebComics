// src/stores/pagination.js
import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", {
  state: () => ({
    currentPage: 1,
    pageSize: 20,
    totalItems: 0,
  }),

  getters: {
    // Tổng số trang
    totalPages: (state) => Math.ceil(state.totalItems / state.pageSize),

    // Danh sách trang hiển thị thông minh — không nhảy layout
    visiblePages: (state) => {
      const total = Math.ceil(state.totalItems / state.pageSize);
      const current = state.currentPage;
      const maxButtons = 7; // luôn cố định 7 nút hiển thị

      if (total <= maxButtons) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }

      // Trường hợp ở đầu danh sách
      if (current <= 4) {
        return [1, 2, 3, 4, 5, "...", total];
      }

      // Trường hợp ở cuối danh sách
      if (current >= total - 3) {
        return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
      }

      // Trường hợp ở giữa
      return [1, "...", current - 1, current, current + 1, "...", total];
    },
  },

  actions: {
    setTotalItems(count) {
      this.totalItems = count;
    },

    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
});
