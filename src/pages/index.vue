<script setup lang="ts">
import Facts from '~/components/Facts.vue'

const { t } = useI18n()
</script>

<template>
  <section class="flex-center flex-col text-sm">
    <!-- eslint-disable vue/no-v-html -->
    <div class="flex-center flex-col sm-flex-row sm-gap-8">
      <Avatar class="pa-4" />
      <div>
        <Facts />
        <p class="prose" v-html="t('about.intro')" />
      </div>
    </div>
    <div
      class="flex-center flex-col sm-flex-row-reverse sm-space-between sm-gap-8"
    >
      <Accounts />
      <p class="prose" v-html="t('about.hobbies')" />
    </div>
    <div class="flex-center flex-col sm-flex-row sm-gap-8">
      <Languages />
      <p class="prose" v-html="t('about.skills')" />
    </div>
    <div class="flex-center flex-col sm-flex-row-reverse sm-gap-8">
      <Software />
      <p class="prose" v-html="t('about.inspiration')" />
    </div>
    <!-- eslint-enable vue/no-v-html -->
  </section>
</template>
