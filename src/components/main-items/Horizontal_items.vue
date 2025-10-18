git <template>
  <div class="grid-items-wrapper">
    
    <button class="scroll-btn left" @click="scrollLeft">❮</button>

    <div class="grid-items" ref="scrollContainer">
      <h1>{{ titleToRender }}</h1>
      <items-card
        v-for="(item, index) in itemsToRender"
        :key="index"
        :item="item"
      />
    </div>

    <button class="scroll-btn right" @click="scrollRight">❯</button>
  </div>
</template>

<script setup>
import itemsCard from '../child/items-card.vue'
import { useScroll } from '@/js/composables/use_Scroll_Horizontal_item'
import { computed } from 'vue'

const { scrollContainer, scrollLeft, scrollRight} = useScroll()

const props = defineProps({
  title: { type: String, default: 'Top Favorite' },
  items: { type: Array, default: () => [] }
})

const defaultItems = [
  { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'Naruto', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Completed' },
  { name: 'Jujutsu Kaisen', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'HOT' },
  { name: 'Demon Slayer', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'New' },
  { name: 'Attack on Titan', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Completed' },
  { name: 'Chainsaw Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'Monkey Leveling', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'HOT' }
]

const itemsToRender = computed(() => (props.items && props.items.length ? props.items : defaultItems))
const titleToRender = computed(() => props.title || 'Top Favorite')
</script>

<style scoped src="@/css/main-items/horizontal_items.css"></style>