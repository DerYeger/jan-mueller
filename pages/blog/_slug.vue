<template>
  <div class="article-container">
    <article>
      <h1>{{ post.title }}</h1>
      <p>Last update: {{ formatDate(post.updatedAt) }}</p>
      <p v-if="hasTags(post)">Tags: {{ post.tags.join(', ') }}</p>
      <table-of-contents
        v-if="post.toc.length > 0"
        :document="post"
      ></table-of-contents>
      <nuxt-content :document="post" />
    </article>
    <document-switcher :prev="prev" :next="next"></document-switcher>
  </div>
</template>

<script lang="ts">
import { contentFunc, IContentDocument } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { Dictionary } from 'vue-router/types/router'
import { NuxtAppOptions } from '@nuxt/types'
import { BlogPost, hasTags } from '~/model/blog-post'
import { localizePath, routes } from '~/model/routes'
import { formatDate } from '~/model/utils'

export default defineComponent({
  async asyncData({
    app,
    $content,
    params,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
    params: Dictionary<string>
  }) {
    const post = (await $content(
      'en/blog/',
      params.slug
    ).fetch<BlogPost>()) as BlogPost

    const [prev, next] = (await $content('en/blog')
      .only(['title', 'path'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()) as Array<IContentDocument | null>

    return {
      post,
      prev: localizePath(prev, app),
      next: localizePath(next, app),
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
