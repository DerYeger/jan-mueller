<script setup lang="ts">
import Experience from '~/components/experience/Experience.vue'

const { t } = useI18n()
</script>

<template>
  <section class="flex-center flex-col">
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="flex-center flex-col sm-flex-row sm-gap-8 w-full justify-between"
    >
      <Avatar class="pa-4" />
      <div>
        <Facts class="sm-text-right" />
        <p class="prose sm-text-right" v-html="t('about.intro')" />
      </div>
    </div>
    <div
      class="flex-center flex-col sm-flex-row-reverse sm-space-between sm-gap-8 w-full justify-between"
    >
      <Accounts class="sm-text-right" />
      <p class="prose sm-text-left" v-html="t('about.hobbies')" />
    </div>
    <div
      class="flex-center flex-col sm-flex-row sm-gap-8 w-full justify-between"
    >
      <Languages class="sm-text-left" />
      <p class="prose sm-text-right" v-html="t('about.skills')" />
    </div>
    <div
      class="flex-center flex-col sm-flex-row-reverse sm-gap-8 w-full justify-between"
    >
      <Software class="sm-text-right" />
      <p class="prose sm-text-left" v-html="t('about.inspiration')" />
    </div>
    <!-- eslint-enable vue/no-v-html -->
  </section>
  <section class="mt-16">
    <Projects />
  </section>
  <section
    class="mt-16 flex flex-col md-flex-row items-start gap-4 children:flex-1 children:w-full"
  >
    <Experience />
    <Education />
    <Awards />
  </section>
</template>
