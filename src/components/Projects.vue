<script setup lang="ts">
import { Project } from '~/types'

const projects: Project[] = [
  {
    repo: 'apollo',
    img: 'https://raw.githubusercontent.com/DerYeger/apollo-frontend/master/src/assets/icons/android-chrome-512x512.png',
    title: 'Apollo',
  },
  {
    repo: 'd3-graph-controller',
    img: 'https://graph-controller.yeger.eu/logo.svg',
    title: 'd3-graph-controller',
  },
  {
    repo: 'vecti',
    img: 'https://vecti.yeger.eu/logo.svg',
    title: 'Vecti',
  },
]

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
