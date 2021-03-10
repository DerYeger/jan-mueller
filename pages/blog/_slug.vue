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
    <document-switcher
      :collection="'blog'"
      :prev="prev"
      :next="next"
    ></document-switcher>
  </div>
</template>

<script lang="ts">
import { contentFunc, IContentDocument } from '@nuxt/content/types/content'
import { defineComponent } from '@nuxtjs/composition-api'
import { Dictionary } from 'vue-router/types/router'
import { BlogPost, hasTags } from '~/model/blog-post'
import { formatDate } from '~/model/utils'
import { routes } from '~/model/routes'

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

    const [prev, next] = (await $content('blog')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()) as Array<IContentDocument>

    return {
      post,
      prev,
      next,
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
