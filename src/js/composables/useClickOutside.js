import { onMounted, onBeforeUnmount } from 'vue'

export function useClickOutside(targetRef, handler){
  function onDocClick(e){
    const el = targetRef?.value
    if (!el) return
    if (!el.contains(e.target)) handler?.(e)
  }

  onMounted(() => document.addEventListener('click', onDocClick))
  onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

  return { detach: () => document.removeEventListener('click', onDocClick) }
}
