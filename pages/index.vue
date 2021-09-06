<template>
  <div>
    <container bound-width>
      <about-me-section :paragraphs="paragraphs" />
    </container>
    <wave-section :projects="projects" :blog-posts="blogPosts" />
    <container bound-width>
      <timeline-section />
    </container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { localizeDocumentPaths, routes } from '~/model/routes'
import { generateSocialTags } from '~/model/meta'
import { Paragraph } from '~/model/paragraph'
import { Project } from '~/model/project'
import { BlogPost } from '~/model/blog-post'

export default defineComponent({
  layout: 'uncontained',
  async asyncData(context: Context) {
    const locale = context.app.i18n.locale
    const paragraphs = (await context
      .$content(`${locale}/home`)
      .sortBy('part')
      .fetch()) as Paragraph[]
    const projects = (await context
      .$content(`${locale}/projects`)
      .sortBy('title')
      .fetch()) as Project[]
    const blogPosts = (await context
      .$content('/en/blog')
      .sortBy('date', 'asc')
      .fetch()) as BlogPost[]
    return {
      paragraphs,
      projects: localizeDocumentPaths(projects, locale),
      blogPosts: localizeDocumentPaths(blogPosts, locale),
    }
  },
  head() {
    const title = this.$t(routes.home.title) as string
    const description = this.$t('meta.description') as string
    return {
      title,
      meta: [...generateSocialTags(title, description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [])
  },
})
</script>
