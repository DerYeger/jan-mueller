<script setup lang="ts">
import { useExperience } from '~/composables'

const { t } = useI18n()

const education = useExperience()
</script>

<template>
  <div class="flex-center flex-col">
    <h2 class="subheading">{{ t('experience.title') }}</h2>
    <ul>
      <li v-for="entry of education" :key="entry.name">
        <ExperienceEntry :experience="entry" />
      </li>
    </ul>
  </div>
</template>
