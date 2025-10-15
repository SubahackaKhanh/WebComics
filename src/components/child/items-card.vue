<template>
  <div class="items-card" v-if="item">
    <div class="item-pic">
      <img :src="item.image" :alt="item.name" />
    </div>
    <div class="item-name" @click="handleClick">
      {{ item.name }}
      <div class="item-status" :class="item.status?.toLowerCase()">
        {{ item.status }}
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'

const props = defineProps({
  item: Object
})

const handleClick = () =>{
  router.push('/details')
}
</script>

<style scoped src="@/css/itemcard.css"></style>