<template>
  <div>
    <div v-for="post of posts" :key="post.slug">
      <v-card :to="{ name: 'blog-slug', params: { slug: post.slug } }">
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
import { BlogPost, hasTags } from '~/model/blog-post'
import { routes } from '~/model/routes'
import { formatDate } from '~/model/utils'

export default defineComponent({
  async asyncData({ $content }: { $content: contentFunc }) {
    const posts = (await $content('blog')
      .only(['title', 'slug', 'createdAt', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch<BlogPost>()) as BlogPost[]

    return {
      posts,
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
