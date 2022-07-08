<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg

const { t } = useI18n()
const description = t('meta.description')

const host = import.meta.env.PROD
  ? 'https://jan-mueller.at'
  : 'http://localhost:3333'
const ogImage = `${host}/og-logo.png`

const router = useRouter()

useHead({
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
      property: 'twitter:description',
      content: description,
    },
    {
      property: 'twitter:image',
      content: ogImage,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: ogImage,
    },
  ],
})
</script>

<template>
  <div id="pattern" />
  <router-view />
</template>

<style scoped>
#pattern::after,
#pattern::before {
  position: fixed;
  top: 0;
  height: 100vhmax;
  height: 120vh;
  width: 100vw;
  content: '';
}

#pattern::after {
  background-image: radial-gradient(gray 1px, transparent 0);
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent, white 200%);
  mask: radial-gradient(circle at 50% 50%, transparent, white 200%);
  background-size: 3rem 3rem;
  z-index: -10;
}

#pattern::before {
  background-image: linear-gradient(
      45deg,
      rgba(204, 0, 187, 0.25) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      135deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.25) 100%
    );
  background-repeat: no-repeat;
  background-position: center;
  z-index: -9;
}
</style>
