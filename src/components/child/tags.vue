<template>
    <button 
    class="tag" 
    :class="{ active : active}" 
    @click="$emit('toggle', name)"> {{ name }} </button>
</template>

<script setup>
    const props = defineProps({
        name: String,
        active: Boolean
    })
</script>

<style scoped src="@/css/tag.css"></style>