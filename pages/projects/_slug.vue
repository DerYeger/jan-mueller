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

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { formatDate } from '~/model/utils'
import { localizeDocumentPath, routes } from '~/model/routes'
import {
  documentBreadcrumb,
  homeBreadcrumb,
  projectsBreadcrumb,
} from '~/model/breadcrumbs'

export default defineComponent({
  async asyncData({ app, $content, params }) {
    const project = await $content('en/projects', params.slug).fetch()

    const [prev, next] = await $content('en/projects')
      .only(['title', 'path'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      project,
      repoCardSrc:
        'https://github-readme-stats.vercel.app/api/pin/?username=DerYeger&repo=' +
        project.repository,
      prev: localizeDocumentPath(prev, app.i18n.locale),
      next: localizeDocumentPath(next, app.i18n.locale),
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.projects.title)
    this.$store.commit('setBreadcrumbs', [
      homeBreadcrumb,
      projectsBreadcrumb,
      documentBreadcrumb(this.project, this.$i18n.locale),
    ])
  },
  methods: {
    formatDate,
  },
})
</script>
