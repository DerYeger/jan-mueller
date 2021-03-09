<template>
  <article>
    <h1>{{ post.title }}</h1>
    <p>Last update: {{ formatDate(post.updatedAt) }}</p>
    <p v-if="hasTags(post)">Tags: {{ post.tags.join(', ') }}</p>
    <nuxt-content :document="post" />
  </article>
</template>

<script lang="ts">
import { contentFunc } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { Dictionary } from 'vue-router/types/router'
import { BlogPost, hasTags } from '~/model/blog-post'
import { formatDate } from '~/model/utils'

export default defineComponent({
  async asyncData({
    $content,
    params,
  }: {
    $content: contentFunc
    params: Dictionary<string>
  }) {
    const post = (await $content(
      'blog',
      params.slug
    ).fetch<BlogPost>()) as BlogPost
    return {
      post,
    }
  },
  methods: {
    hasTags,
    formatDate,
  },
})
</script>
