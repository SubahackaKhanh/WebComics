<template>
    <div class="details-container">
        <h1> ONE PUNCH MAN</h1>         <!-- <h1> {{ items.name }}</h1> -->
        <p class="details-text">{{ details }}</p>
        <div class="actions">
            <button class="btn-read" @click="onClickRead">Read</button>
        </div>
    </div>
    
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { buildReadPath } from '@/js/utils/itemNavigation'

    const route = useRoute()
    const router = useRouter()

    const details = "One Punch Man là một series anime/manga hành động – hài hước xoay quanh Saitama, một anh chàng hói bình thường nhưng lại sở hữu sức mạnh phi thường: hạ gục bất kỳ đối thủ nào chỉ với một cú đấm. Điều này khiến cuộc sống làm anh hùng của anh trở nên... nhàm chán. Không còn cảm giác hồi hộp hay thử thách, Saitama bắt đầu hành trình tìm kiếm một đối thủ xứng tầm."

    function onClickRead(){
        const idOrSlug = route.params.idOrSlug || 'one-punch-man'
        const to = buildReadPath({ slug: String(idOrSlug) }, 1)
        router.push(to)
    }
</script>

<style scoped src="@/css/common/itemdetails.css"></style>