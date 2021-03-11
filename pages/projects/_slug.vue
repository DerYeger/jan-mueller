<template>
  <div class="article-container">
    <article>
      <h1>{{ project.title }}</h1>
      <p>Last update: {{ formatDate(project.updatedAt) }}</p>
      <img :src="repoCardSrc" alt="Repository card." />
      <table-of-contents
        v-if="project.toc.length > 0"
        :document="project"
      ></table-of-contents>
      <nuxt-content :document="project" />
    </article>
    <document-switcher
      :collection="'projects'"
      :prev="prev"
      :next="next"
    ></document-switcher>
  </div>
</template>

<script lang="ts">
import { contentFunc, IContentDocument } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { Dictionary } from 'vue-router/types/router'
import { NuxtAppOptions } from '@nuxt/types'
import { Project } from '~/model/project'
import { formatDate } from '~/model/utils'
import { localizePath, routes } from '~/model/routes'

export default defineComponent({
  async asyncData({
    app,
    $content,
    params,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
    params: Dictionary<string>
  }) {
    const project = (await $content(
      'en/projects',
      params.slug
    ).fetch<Project>()) as Project

    const [prev, next] = (await $content('en/projects')
      .only(['title', 'path'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()) as Array<IContentDocument | null>

    return {
      project,
      repoCardSrc:
        'https://github-readme-stats.vercel.app/api/pin/?username=DerYeger&repo=' +
        project.repository,
      prev: localizePath(prev, app),
      next: localizePath(next, app),
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
