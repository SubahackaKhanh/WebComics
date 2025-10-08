<template>
    <button 
    class="tag" 
    :class="{ active : active}" 
    @click="$emit('toggle', name)"> {{ name }} </button>
</template>

<script setup>
    import '@/css/tag.css'

    const props = defineProps({
        name: String,
        active: Boolean
    })
</script>
