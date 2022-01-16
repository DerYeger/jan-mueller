<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;400;600&display=swap',
      rel: 'stylesheet',
    },
  ],
})
</script>

<template>
  <router-view />
</template>
