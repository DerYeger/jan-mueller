<template>
  <masonry-wall
    v-slot="{ item }"
    :items="posts"
    :ssr-columns="1"
    :column-width="300"
    :gap="24"
    class="px-3 pb-3"
  >
    <blog-post-card :blog-post="item" />
  </masonry-wall>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { BlogPost, hasTags } from '~/model/blog-post'
import { blogBreadcrumb, homeBreadcrumb } from '~/model/breadcrumbs'
import { localizeDocumentPaths, routes } from '~/model/routes'
import { generateSocialTags } from '~/model/meta'

export default defineComponent({
  async asyncData(context: Context) {
    const posts = (await context
      .$content('en/blog')
      .without(['body', 'bodyText', 'toc'])
      .sortBy('createdAt', 'desc')
      .fetch<BlogPost>()) as BlogPost[]
    return {
      posts: localizeDocumentPaths(posts, context.app.i18n.locale),
    }
  },
  head() {
    const title = this.$t(routes.blog.title) as string
    const description = this.$t('meta.description') as string
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
