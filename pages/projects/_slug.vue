<template>
  <div style="width: 100%">
    <article class="justify-text" lang="en">
      <h1>{{ project.title }}</h1>
      <div>
        <repository-link
          v-if="project.repository"
          :repository="project.repository"
        />
        <repository-link
          v-for="repository of project.repositories || []"
          :key="repository"
          :repository="repository"
          :show-name="true"
        />
        <demo-link v-if="project.demo" :href="project.demo" />
      </div>
      <nuxt-content :document="project" />
      <document-switcher v-if="prev || next" :prev="prev" :next="next" />
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { localizeDocumentPath } from '~/model/routes'
import {
  documentBreadcrumb,
  homeBreadcrumb,
  projectsBreadcrumb,
} from '~/model/breadcrumbs'
import { generateSocialTags } from '~/model/meta'
import { Project } from '~/model/project'

export default defineComponent({
  async asyncData(ctx: Context) {
    const slug = ctx.params.slug
    const locale = ctx.app.i18n.locale
    const projectsDir = `${locale}/projects`
    const project: Project = (await ctx
      .$content(projectsDir, slug)
      .fetch()) as Project

    const [prev, next] = (await ctx
      .$content(projectsDir)
      .only(['title', 'path'])
      .sortBy('title', 'asc')
      .surround(slug)
      .fetch()) as Project[]

    return {
      project,
      prev: localizeDocumentPath(prev, locale),
      next: localizeDocumentPath(next, locale),
    }
  },
  head() {
    const project = this.project as Project
    const title = this.$t(project.title) as string
    return {
      title,
      meta: [...generateSocialTags(title, project.description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [
      homeBreadcrumb,
      projectsBreadcrumb,
      documentBreadcrumb(this.project as Project, this.$i18n.locale),
    ])
  },
})
</script>
