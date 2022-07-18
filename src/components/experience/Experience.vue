<script setup lang="ts">
import { useExperience, useSlideIn } from '~/composables'

const { t } = useI18n()

const education = useExperience()

const container = ref<HTMLElement>()
useSlideIn(container)
</script>

<template>
  <div ref="container" class="flex-center flex-col">
    <h2 class="subheading">{{ t('experience.title') }}</h2>
    <ul class="children:my-2">
      <li v-for="entry of education" :key="entry.name">
        <ExperienceEntry :experience="entry" />
      </li>
    </ul>
  </div>
</template>
