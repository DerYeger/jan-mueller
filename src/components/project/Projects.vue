<script setup lang="ts">
import { useProjects } from '~/composables'

const projects = useProjects()

const { t } = useI18n()
</script>

<template>
  <div class="flex-center flex-col">
    <h2 class="subheading">{{ t('projects') }}</h2>
    <div class="flex-center flex-wrap gap-4">
      <Project
        v-for="project of projects"
        :key="project.repo"
        :project="project"
      />
      <a
        href="https://github.com/DerYeger?tab=repositories"
        rel="noopener"
        target="_blank"
        class="px-2 py-1 no-underline flex items-center gap-1 rounded-xl"
      >
        {{ t('and-more') }}
        <carbon-arrow-right />
      </a>
    </div>
  </div>
</template>
