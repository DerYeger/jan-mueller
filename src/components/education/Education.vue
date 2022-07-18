<script setup lang="ts">
import { useEducation, useSlideIn } from '~/composables'

const { t } = useI18n()

const education = useEducation()

const container = ref<HTMLElement>()
useSlideIn(container)
</script>

<template>
  <div ref="container" class="flex-center flex-col">
    <h2 class="subheading">{{ t('education.title') }}</h2>
    <ul class="children:my-2">
      <li v-for="entry of education" :key="entry.name">
        <EducationEntry :education="entry" />
      </li>
    </ul>
  </div>
</template>
