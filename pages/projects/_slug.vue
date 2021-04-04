<template>
  <div style="width: 100%">
    <article class="justify-text" lang="en">
      <h1>{{ project.title }}</h1>
      <p>
        {{ $t('misc.last-update') }}:
        {{ $d(new Date(project.updatedAt), 'long') }}
      </p>
      <repository-link :repository="project.repository"></repository-link>
      <demo-link v-if="project.demo" :href="project.demo"></demo-link>
      <nuxt-content :document="project" />
    </article>
    <document-switcher v-if="prev || next" :prev="prev" :next="next" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
})
</script>
