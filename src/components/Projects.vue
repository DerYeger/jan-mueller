<script setup lang="ts">
import { useProjects } from '~/composables'

const projects = useProjects()

const { t } = useI18n()
</script>

<template>
  <div class="flex-center flex-col">
    <h2 class="subheading">{{ t('projects') }}</h2>
    <div class="flex-center gap-4">
      <ProjectLink
        v-for="project of projects"
        :key="project.repo"
        :project="project"
      />
      <a
        href="https://github.com/DerYeger?tab=repositories"
        rel="noopener"
        target="_blank"
      >
        {{ t('and-more') }}
      </a>
    </div>
  </div>
</template>
