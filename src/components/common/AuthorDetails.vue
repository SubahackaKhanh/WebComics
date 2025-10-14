<template>
  <div class="author-container">
    <h2>Tác giả</h2>
    <div v-for="item in authors" :key="item.id" class="author-card">
      <h3>{{ item.name }}</h3>
      <p>{{ item.bio }}</p>
      <p><strong>Email:</strong> {{ item.email }}</p>
    </div>
  </div>
</template>

<script setup>
const authors = [
  {
    id: 1,
    name: 'Yusuke Murata',
    bio: 'Họa sĩ manga nổi tiếng với tác phẩm One Punch Man.',
    email: 'murata@example.com'
  },
  {
    id: 2,
    name: 'ONE',
    bio: 'Tác giả gốc của One Punch Man, nổi tiếng với phong cách hài hước.',
    email: 'one@example.com'
  }
]
</script>

<style scoped src="@/css/author_details.css"></style>
