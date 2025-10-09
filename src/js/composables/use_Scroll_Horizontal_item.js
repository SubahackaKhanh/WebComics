import { throttle } from 'lodash'
import { ref } from 'vue'

const scrollContainer = ref(null)

const scrollLeft = throttle(() => {
  scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' })
}, 500)
const scrollRight = throttle(() => {
  scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' })
}, 500)

export function useScroll(){
  return{
    scrollContainer,
    scrollLeft,
    scrollRight
  }
}