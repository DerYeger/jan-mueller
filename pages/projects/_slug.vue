<template>
  <article>
    <h1>{{ project.title }}</h1>
    <p>Last update: {{ formatDate(project.updatedAt) }}</p>
    <img :src="repoCardSrc" alt="Repository card." />
    <table-of-contents
      v-if="project.toc.length > 0"
      :document="project"
    ></table-of-contents>
    <nuxt-content :document="project" />
    <document-switcher
      :collection="'projects'"
      :prev="prev"
      :next="next"
    ></document-switcher>
  </article>
</template>

<script lang="ts">
import { contentFunc, IContentDocument } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { Dictionary } from 'vue-router/types/router'
import { Project } from '~/model/project'
import { formatDate } from '~/model/utils'
import { routes } from '~/model/routes'

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

    const [prev, next] = (await $content('projects')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()) as Array<IContentDocument>

    return {
      project,
      repoCardSrc:
        'https://github-readme-stats.vercel.app/api/pin/?username=DerYeger&repo=' +
        project.repository,
      prev,
      next,
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.projects.title)
  },
  methods: {
    formatDate,
  },
})
</script>
