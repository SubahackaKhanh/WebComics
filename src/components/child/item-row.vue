<template>
  <div class="item-row" v-if="item" @click="go()">
    <div class="rank-badge" v-if="rank">
      {{ rank }}
    </div>
    <div class="item-pic">
      <img :src="item.images?.jpg?.image_url" :alt="item.title" />
    </div>
    <div class="item-name">
      {{ item.title }}
      <div class="item-chapter" :class="item.status?.toLowerCase()">
        {{ item.status }}
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { buildItemDetailsPath } from '@/js/utils/itemNavigation'

const props = defineProps({
  item: Object,
  rank: Number 
})

function go(){
  router.push(buildItemDetailsPath(props.item))
}
</script>

<style scoped src="@/css/child/itemrow.css"></style>
