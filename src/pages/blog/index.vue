<script setup lang="ts">
const items = [
  {
    to: '/blog/masonry',
    title: 'Masonry',
  },
]
</script>

<template>
  <masonry-wall :items="items" :ssr-columns="1" :column-width="300" :gap="16">
    <template #default="{ item }">
      <div style="height: 100px" class="pa-4 bg-yellow-500">
        <router-link :to="item.to">
          {{ item.title }}
        </router-link>
      </div>
    </template>
  </masonry-wall>
</template>
