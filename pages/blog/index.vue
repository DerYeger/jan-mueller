<template>
  <v-container>
    <v-row>
      <v-col v-for="post of posts" :key="post.slug">
        <blog-post-card :blog-post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { contentFunc } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { BlogPost, hasTags } from '~/model/blog-post'
import { localizeDocumentPaths, routes } from '~/model/routes'
import { formatDate } from '~/model/utils'
import { blogBreadcrumb, homeBreadcrumb } from '~/model/breadcrumbs'

export default defineComponent({
  async asyncData({
    app,
    $content,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
  }) {
    const posts = (await $content('en/blog')
      .only(['title', 'path', 'createdAt', 'tags', 'image'])
      .sortBy('createdAt', 'desc')
      .fetch<BlogPost>()) as BlogPost[]
    return {
      posts: localizeDocumentPaths(posts, app.i18n.locale),
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.blog.title)
    this.$store.commit('setBreadcrumbs', [homeBreadcrumb, blogBreadcrumb])
  },
  methods: {
    hasTags,
    formatDate,
  },
})
</script>
