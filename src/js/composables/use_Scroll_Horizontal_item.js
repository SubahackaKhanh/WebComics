import { throttle } from 'lodash'
import { ref , onMounted , onUnmounted } from 'vue'

export function useScroll(onReachEnd, options = {}) {
  const scrollContainer = ref(null)

  const {
    scrollOffset = 300,
    threshold = 200,
    throttleDelay = 400
  } = options

  const scrollLeft = throttle(() => {
    scrollContainer.value?.scrollBy({ left: -scrollOffset, behavior: 'smooth' })
  }, throttleDelay)
  const scrollRight = throttle(() => {
    scrollContainer.value?.scrollBy?.({ left: scrollOffset, behavior: 'smooth' })
  }, throttleDelay)

  const handleScroll = throttle(() => {
    const el = scrollContainer.value
    if (!el) return

    const rightRemaining = el.scrollWidth - (el.scrollLeft + el.clientWidth)

    if (rightRemaining < threshold) {
      onReachEnd?.()
    }
  }, 200)

  onMounted(() => {
    if (scrollContainer.value && typeof scrollContainer.value.addEventListener === 'function'){
      scrollContainer.value.addEventListener('scroll', handleScroll)
    }
  })

  onUnmounted(() => {
    if (scrollContainer.value && typeof scrollContainer.value.removeEventListener === 'function'){
      scrollContainer.value.removeEventListener('scroll', handleScroll)
    }
  })

  return{
    scrollContainer,
    scrollLeft,
    scrollRight
  }
}