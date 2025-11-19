<template>
  <div class="items-card" v-if="item && item.mal_id">
    <div class="item-pic">
      <img v-lazy="item.image || ''" :alt="item.name || 'Manga'" />
    </div>
    <div class="item-name" @click="handleClick">
      {{ item.name || 'Unknown' }}
      <div class="item-status" v-if="item.status" :class="item.status?.toLowerCase()">
        {{ item.status }}
      </div>
    </div>
  </div>
</template>

<script setup>
// import router from '@/router'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const handleClick = () =>{
  if (props.item.mal_id){
    router.push(`/details/${props.item.mal_id}`)
  } else {
    console.warn('No mal_id found for item: ', props.item);
  }
}
</script>

<style scoped src="@/css/child/itemcard.css"></style>