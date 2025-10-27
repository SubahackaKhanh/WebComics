// src/js/stores/mangaStore.js
import { defineStore } from 'pinia';
import { getNewManga, getTopManga, getMangaDetail, getMangaRelations, getListManga, searchManga, getTagGenres } from '@/js/services/api/mangaApi';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useMangaStore = defineStore('manga', {
  state: () => ({
    newManga: null,
    topManga: {},
    mangaDetails: {},
    mangaRelations: {},
    listManga: {},
    searchResults: {},
    tagGenres: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchNewManga(signal) {
      if (this.newManga) return this.newManga;
      this.loading = true;
      try {
        this.newManga = await getNewManga(15, signal);
        return this.newManga;
      } catch (err) {
        if (err.name !== 'AbortError') {
          this.error = err.message || 'Failed to fetch new manga';
          toast.error(this.error);
        }
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchTopManga(page = 1, limit = 10, signal) {
      const key = `${page}_${limit}`;
      if (this.topManga[key]) return this.topManga[key];
      this.loading = true;
      try {
        this.topManga[key] = await getTopManga(page, limit, signal);
        return this.topManga[key];
      } catch (err) {
        if (err.name !== 'AbortError') {
          this.error = err.message || 'Failed to fetch top manga';
          toast.error(this.error);
        }
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchMangaDetail(id, signal) {
      if (this.mangaDetails[id]) return this.mangaDetails[id];
      this.loading = true;
      try {
        this.mangaDetails[id] = await getMangaDetail(id, signal);
        return this.mangaDetails[id];
      } catch (err) {
        if (err.name !== 'AbortError') {
          this.error = err.message || 'Failed to fetch manga details';
          toast.error(this.error);
        }
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchMangaRelations(id, signal) {
      if (this.mangaRelations[id]) return this.mangaRelations[id];
      this.loading = true;
      try {
        this.mangaRelations[id] = await getMangaRelations(id, signal);
        return this.mangaRelations[id];
      } catch (err) {
        if (err.name !== 'AbortError') {
          this.error = err.message || 'Failed to fetch manga relations';
          toast.error(this.error);
        }
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchListManga(page, limit, genres = [], signal) {
      const key = `${page}_${limit}_${genres.join(',')}`;
      if (this.listManga[key]) return this.listManga[key];
      this.loading = true;
      try {
        this.listManga[key] = await getListManga(page, limit, genres, signal);
        return this.listManga[key];
      } catch (err) {
        if (err.name !== 'AbortError') {
          this.error = err.message || 'Failed to fetch manga list';
          toast.error(this.error);
        }
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchSearchManga(query, signal) {
      if (this.searchResults[query]) return this.searchResults[query];
      this.loading = true;
      try {
        this.searchResults[query] = await searchManga(query, signal);
        return this.searchResults[query];
      } catch (err) {
        if (err.name !== 'AbortError') {
          this.error = err.message || 'Failed to search manga';
          toast.error(this.error);
        }
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchTagGenres(signal) {
      if (this.tagGenres) return this.tagGenres;
      this.loading = true;
      try {
        this.tagGenres = await getTagGenres(signal);
        return this.tagGenres;
      } catch (err) {
        if (err.name !== 'AbortError') {
          this.error = err.message || 'Failed to fetch tag genres';
          toast.error(this.error);
        }
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});