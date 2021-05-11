<template>
  <vue-masonry-wall
    :items="posts"
    :ssr="{ columns: 1 }"
    :options="{ width: 400, padding: 12 }"
  >
    <template #default="{ item }">
      <blog-post-card :blog-post="item" />
    </template>
  </vue-masonry-wall>
</template>

<script lang="ts">
import { contentFunc } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { BlogPost, hasTags } from '~/model/blog-post'
import { blogBreadcrumb, homeBreadcrumb } from '~/model/breadcrumbs'
import { localizeDocumentPaths, routes } from '~/model/routes'
import { generateSocialTags } from '~/model/meta'

export default defineComponent({
  async asyncData({
    app,
    $content,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
  }) {
    const posts = (await $content('en/blog')
      .without(['body', 'bodyText', 'toc'])
      .sortBy('createdAt', 'desc')
      .fetch<BlogPost>()) as BlogPost[]
    return {
      posts: localizeDocumentPaths(posts, app.i18n.locale),
    }
  },
  head() {
    const title = (this.$t as Function)(routes.blog.title)
    const description = (this.$t as Function)('meta.description')
    return {
      title,
      meta: [...generateSocialTags(title, description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [homeBreadcrumb, blogBreadcrumb])
  },
  methods: {
    hasTags,
  },
})
</script>
