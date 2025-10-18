<template>
    <div class="read-page">
        <button class="back-btn" @click="goBack">← Back</button>
        <h2 class="read-title">Reading: {{ idOrSlug }}</h2>
        <div class="reader-controls">
            <button class="nav-btn" @click="goPrev" :disabled="currentChapter <= 1">Prev</button>
            <div class="chapter-indicator">Chapter {{ currentChapter }}</div>
            <button class="nav-btn" @click="goNext">Next</button>
        </div>
        <div class="reader-content">
            <div class="page-placeholder">Content for chapter {{ currentChapter }} will render here.</div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { buildReadPath, buildItemDetailsPath } from '@/js/utils/itemNavigation'

    const route = useRoute()
    const router = useRouter()

    const idOrSlug = computed(() => String(route.params.idOrSlug || 'unknown'))
    const currentChapter = computed(() => {
        const raw = Number(route.params.chapter)
        return Number.isFinite(raw) && raw > 0 ? raw : 1
    })

    function goPrev(){
        const prev = Math.max(1, currentChapter.value - 1)
        router.replace(buildReadPath({ slug: idOrSlug.value }, prev))
    }

    function goNext(){
        const next = currentChapter.value + 1
        router.replace(buildReadPath({ slug: idOrSlug.value }, next))
    }

    function goBack(){
        router.push(buildItemDetailsPath({ slug: idOrSlug.value }))
    }
</script>

<style scoped src="@/css/pages/read.css"></style>


