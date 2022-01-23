<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="flex-center flex-col">
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="flex-center flex-col md-flex-row md-gap-8 w-full justify-between"
    >
      <Avatar class="pa-4" />
      <div>
        <Facts class="text-center md-text-right" />
        <p class="prose text-center md-text-right" v-html="t('about.intro')" />
      </div>
    </div>
    <div
      class="flex-center flex-col md-flex-row-reverse md-space-between md-gap-8 w-full justify-between"
    >
      <Languages class="md-text-right" />
      <p class="prose text-center md-text-left" v-html="t('about.hobbies')" />
    </div>
    <div
      class="flex-center flex-col md-flex-row md-gap-8 w-full justify-between"
    >
      <FrameworksAndLibraries class="md-text-left" />
      <p class="prose text-center md-text-right" v-html="t('about.skills')" />
    </div>
    <div
      class="flex-center flex-col md-flex-row-reverse md-gap-8 w-full justify-between"
    >
      <ToolsAndDatabases class="md-text-right" />
      <p
        class="prose text-center md-text-left"
        v-html="t('about.inspiration')"
      />
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
