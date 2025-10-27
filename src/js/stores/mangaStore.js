// src/js/stores/mangaStore.js
import { defineStore } from 'pinia';
import { getNewManga, getTopManga, getMangaDetail, getMangaRelations, getListManga, getListMangaByTags, searchManga, getTagGenres } from '@/js/services/api/mangaApi';

export const useMangaStore = defineStore('manga', {
  state: () => ({
    newManga: null,
    topManga: null,
    mangaDetails: {}, // Cache theo id: { [idOrSlug]: data }
    mangaRelations: {}, // Cache theo id
    listManga: null,
    listMangaByTags: {}, // Cache theo tag
    searchResults: {}, // Cache theo query
    tagGenres: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchNewManga(signal) {
      if (this.newManga) return this.newManga;
      this.loading = true;
      try {
        this.newManga = await getNewManga(signal);
        return this.newManga;
      } catch (err) {
        this.error = err.message || 'Failed to fetch new manga';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchTopManga(page = 1, limit = 10, signal) {
      const key = `${page}_${limit}`;
      if (this.topManga?.[key]) return this.topManga[key];
      this.loading = true;
      try {
        this.topManga = this.topManga || {};
        this.topManga[key] = await getTopManga(page, limit, signal);
        return this.topManga[key];
      } catch (err) {
        this.error = err.message || 'Failed to fetch top manga';
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
        this.error = err.message || 'Failed to fetch manga details';
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
        this.error = err.message || 'Failed to fetch manga relations';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchListManga(page, limit, signal) {
      const key = `${page}_${limit}`;
      if (this.listManga?.[key]) return this.listManga[key];
      this.loading = true;
      try {
        this.listManga = this.listManga || {};
        this.listManga[key] = await getListManga(page, limit, signal);
        return this.listManga[key];
      } catch (err) {
        this.error = err.message || 'Failed to fetch manga list';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchListMangaByTags(tags, page, signal) {
      const key = `${tags.join(',')}_${page}`;
      if (this.listMangaByTags[key]) return this.listMangaByTags[key];
      this.loading = true;
      try {
        this.listMangaByTags[key] = await getListMangaByTags(tags, page, signal);
        return this.listMangaByTags[key];
      } catch (err) {
        this.error = err.message || 'Failed to fetch manga by tags';
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
        this.error = err.message || 'Failed to search manga';
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
        this.error = err.message || 'Failed to fetch tag genres';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});