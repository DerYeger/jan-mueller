<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Avatar class="pa-4" />
    <section class="text-sm">
      <!-- eslint-disable vue/no-v-html -->
      <p class="prose" v-html="t('about.intro')" />
      <Accounts />
      <p class="prose" v-html="t('about.hobbies')" />
      <Languages />
      <p class="prose" v-html="t('about.skills')" />
      <Software />
      <p class="prose" v-html="t('about.inspiration')" />
      <!-- eslint-enable vue/no-v-html -->
    </section>
  </div>
</template>
