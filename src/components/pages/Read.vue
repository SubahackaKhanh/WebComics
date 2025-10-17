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

<style scoped>
    .read-page{ padding:16px; color:#e5e7eb }
    .back-btn{ margin-bottom:10px; border:2px solid #93c5fd; color:#60a5fa; background:transparent; padding:6px 12px; border-radius:10px; cursor:pointer; transition: all .2s ease }
    .back-btn:hover{ background:#0b1220; box-shadow:0 0 10px rgba(147,197,253,.4) }
    .read-title{ color:#93c5fd; margin:0 0 12px 0 }
    .reader-controls{ display:flex; align-items:center; gap:12px; margin-bottom:12px }
    .chapter-indicator{ border:1px solid #93c5fd; border-radius:8px; padding:6px 10px; color:#60a5fa }
    .nav-btn{ border:2px solid #93c5fd; color:#60a5fa; background:transparent; padding:6px 12px; border-radius:10px; cursor:pointer; transition: all .2s ease }
    .nav-btn:hover{ background:#0b1220; box-shadow:0 0 10px rgba(147,197,253,.4) }
    .nav-btn:disabled{ opacity:.5; cursor:not-allowed }
    .reader-content{ border:2px solid #93c5fd; border-radius:16px; padding:16px; min-height:200px }
    .page-placeholder{ color:#93c5fd }
</style>


