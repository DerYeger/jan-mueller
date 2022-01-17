<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="flex-center flex-col text-sm">
    <!-- eslint-disable vue/no-v-html -->
    <div class="flex-center flex-col sm-flex-row sm-gap-8">
      <Avatar class="pa-4" />
      <div>
        <Facts class="sm-text-right" />
        <p class="prose sm-text-right" v-html="t('about.intro')" />
      </div>
    </div>
    <div
      class="flex-center flex-col sm-flex-row-reverse sm-space-between sm-gap-8"
    >
      <Accounts class="sm-text-right" />
      <p class="prose sm-text-left" v-html="t('about.hobbies')" />
    </div>
    <div class="flex-center flex-col sm-flex-row sm-gap-8">
      <Languages class="sm-text-left" />
      <p class="prose sm-text-right" v-html="t('about.skills')" />
    </div>
    <div class="flex-center flex-col sm-flex-row-reverse sm-gap-8">
      <Software class="sm-text-right" />
      <p class="prose sm-text-left" v-html="t('about.inspiration')" />
    </div>
    <!-- eslint-enable vue/no-v-html -->
  </section>
  <section class="mt-8 text-sm">
    <Projects />
  </section>
</template>
