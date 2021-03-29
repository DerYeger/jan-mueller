<template>
  <vue-masonry-wall
    :items="projects"
    :ssr="{ columns: 1 }"
    :options="{ width: 400, padding: 12 }"
  >
    <template #default="{ item }">
      <project-card :project="item" />
    </template>
  </vue-masonry-wall>
</template>

<script lang="ts">
import { contentFunc } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { Project } from '~/model/project'
import { localizeDocumentPaths, routes } from '~/model/routes'
import { homeBreadcrumb, projectsBreadcrumb } from '~/model/breadcrumbs'

export default defineComponent({
  async asyncData({
    app,
    $content,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
  }) {
    const projects = (await $content('en/projects')
      .only(['title', 'path', 'description'])
      .sortBy('title', 'asc')
      .fetch<Project>()) as Project[]
    return {
      projects: localizeDocumentPaths(projects, app.i18n.locale),
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.projects.title)
    this.$store.commit('setBreadcrumbs', [homeBreadcrumb, projectsBreadcrumb])
  },
})
</script>
