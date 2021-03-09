<template>
  <article>
    <h1>{{ project.title }}</h1>
    <p>Last update: {{ formatDate(project.updatedAt) }}</p>
    <img :src="repoCardSrc" alt="Repository card." />
    <nuxt-content :document="project" />
  </article>
</template>

<script lang="ts">
import { contentFunc } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { Dictionary } from 'vue-router/types/router'
import { Project } from '~/model/project'
import { formatDate } from '~/model/utils'

export default defineComponent({
  async asyncData({
    $content,
    params,
  }: {
    $content: contentFunc
    params: Dictionary<string>
  }) {
    const project = (await $content(
      'projects',
      params.slug
    ).fetch<Project>()) as Project
    return {
      project,
      repoCardSrc:
        'https://github-readme-stats.vercel.app/api/pin/?username=DerYeger&repo=' +
        project.repository,
    }
  },
  methods: {
    formatDate,
  },
})
</script>
