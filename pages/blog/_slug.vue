<template>
  <div style="width: 100%">
    <article class="justify-text" lang="en">
      <h1>{{ post.title }}</h1>
      <p>
        <i>
          {{ $d(new Date(post.createdAt), 'long') }} ·
          {{ post.readingTime }}
        </i>
      </p>
      <p>
        {{ post.description }}
      </p>
      <table-of-contents v-if="post.toc.length > 0" :document="post" />
      <nuxt-content :document="post" />
      <document-switcher v-if="prev || next" :prev="prev" :next="next" />
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { BlogPost, hasTags } from '~/model/blog-post'
import { localizeDocumentPath } from '~/model/routes'
import {
  blogBreadcrumb,
  documentBreadcrumb,
  homeBreadcrumb,
} from '~/model/breadcrumbs'
import { generateSocialTags } from '~/model/meta'

export default defineComponent({
  async asyncData({ app, $content, params }) {
    const post = (await $content('en/blog/', params.slug).fetch()) as BlogPost

    const [prev, next] = (await $content('en/blog')
      .only(['title', 'path'])
      .sortBy('createdAt', 'desc')
      .surround(params.slug)
      .fetch()) as BlogPost[]

    return {
      post,
      prev: localizeDocumentPath(prev, app.i18n.locale),
      next: localizeDocumentPath(next, app.i18n.locale),
    }
  },
  head() {
    const post = this.post as BlogPost
    const title = this.$t(post.title) as string
    return {
      title,
      meta: [...generateSocialTags(title, post.description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [
      homeBreadcrumb,
      blogBreadcrumb,
      documentBreadcrumb(this.post as BlogPost, this.$i18n.locale),
    ])
  },
  methods: {
    hasTags,
  },
})
</script>
