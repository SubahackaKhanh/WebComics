<template>
    <div class="tags-container">
        <div class="tags-header">
            <span v-if="selectedTags.length">
                Selected ({{ selectedTags.length }})
            </span>
            <button 
                v-if="selectedTags.length"
                class="clear-btn"
                @click="clearTags"> Clear All </button>
        </div>
        <div class="tags-grid">
            <tags
                v-for="genre in genres"
                :key="genre.id"
                :name="genre.name"
                :active="selectedTags.includes(genre.name)"
                @toggle="toggleTag"
            />
        </div>
    </div>
</template>

<script>
    import tags from '../child/tags.vue';
    const props = defineProps({
        genres: Array,
        selectedTags: Array
    })

    const emit = definedEmits(['update:selectedTags'])

    function toggleTag(tagName){
        const newTags = [...props.selectedTags]
        const index = newTags.indexOf(tagName)
        if (index === -1) newTags.push(tagName)
        else newTags.splice(index, 1)
        emit('update:selectedTags', newTags)
    }

    function clearTags(){
        emit('update:selectedTags',[])
    }
</script>

<style scoped src="@/css/tagscontainer.css"></style>