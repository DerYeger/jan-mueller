<template>
  <div style="width: 100%">
    <article class="justify-text" lang="en">
      <h1>{{ project.title }}</h1>
      <repository-link
        v-if="project.repository"
        :repository="project.repository"
      ></repository-link>
      <demo-link v-if="project.demo" :href="project.demo"></demo-link>
      <nuxt-content :document="project" />
      <document-switcher v-if="prev || next" :prev="prev" :next="next" />
    </article>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { localizeDocumentPath } from '~/model/routes'
import {
  documentBreadcrumb,
  homeBreadcrumb,
  projectsBreadcrumb,
} from '~/model/breadcrumbs'
import { generateSocialTags } from '~/model/meta'

export default defineComponent({
  async asyncData({ app, $content, params }) {
    const projectsDir = `${app.i18n.locale}/projects`
    const project = await $content(projectsDir, params.slug).fetch()

    const [prev, next] = await $content(projectsDir)
      .only(['title', 'path'])
      .sortBy('title', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      project,
      prev: localizeDocumentPath(prev, app.i18n.locale),
      next: localizeDocumentPath(next, app.i18n.locale),
    }
  },
  head() {
    const title = this.$t(this.project.title)
    return {
      title,
      meta: [...generateSocialTags(title, this.project.description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [
      homeBreadcrumb,
      projectsBreadcrumb,
      documentBreadcrumb(this.project, this.$i18n.locale),
    ])
  },
})
</script>
