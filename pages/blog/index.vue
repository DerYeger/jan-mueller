<template>
  <div>
    <div v-for="post of posts" :key="post.slug">
      <v-card :to="post.path">
        <v-card-title class="headline">{{ post.title }}</v-card-title>
        <v-card-text>
          <p>{{ formatDate(post.createdAt) }}</p>
          <p v-if="hasTags(post)">Tags: {{ post.tags.join(', ') }}</p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { contentFunc } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { BlogPost, hasTags } from '~/model/blog-post'
import { localizePaths, routes } from '~/model/routes'
import { formatDate } from '~/model/utils'

export default defineComponent({
  async asyncData({
    app,
    $content,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
  }) {
    const posts = (await $content('en/blog')
      .only(['title', 'slug', 'createdAt', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch<BlogPost>()) as BlogPost[]
    return {
      posts: localizePaths(posts, app),
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.blog.title)
  },
  methods: {
    hasTags,
    formatDate,
  },
})
</script>
