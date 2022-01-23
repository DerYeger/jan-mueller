<script setup lang="ts">
const { t } = useI18n()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
const router = useRouter()

const host = 'https://jan-mueller.at'
const title = 'Jan Müller'
const description = t('meta.description')
const ogImage = `${host}/og-logo.png`

useHead({
  title,
  link: [
    {
      rel: 'canonical',
      href: computed(() => `${host}${router.currentRoute.value.fullPath}`),
    },
  ],
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: ogImage,
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: title,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description,
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: ogImage,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: title,
    },
  ],
})
</script>

<template>
  <router-view />
</template>
