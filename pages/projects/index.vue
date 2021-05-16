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
import { generateSocialTags } from '~/model/meta'

export default defineComponent({
  async asyncData({
    app,
    $content,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
  }) {
    const projects = (await $content(`${app.i18n.locale}/projects`)
      .without(['body', 'bodyText', 'toc'])
      .sortBy('title', 'asc')
      .fetch<Project>()) as Project[]
    return {
      projects: localizeDocumentPaths(projects, app.i18n.locale),
    }
  },
  head() {
    const title = this.$t(routes.projects.title) as string
    const description = this.$t('meta.description') as string
    return {
      title,
      meta: [...generateSocialTags(title, description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [homeBreadcrumb, projectsBreadcrumb])
  },
})
</script>
