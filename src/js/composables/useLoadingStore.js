import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const global = ref(false)
  const items = reactive({}) 

  const show = (key = 'global') => {
    if (key === 'global') global.value = true
    items[key] = true
  }

  const hide = (key = 'global') => {
    if (key === 'global') global.value = false
    items[key] = false
  }

  const isLoading = (key = 'global') =>
    key === 'global' ? global.value : !!items[key]

  const withLoading = async (fn, key = 'global') => {
    try {
      show(key)
      return await fn()
    } finally {
      hide(key)
    }
  }

  return { global, items, show, hide, isLoading, withLoading }
})
