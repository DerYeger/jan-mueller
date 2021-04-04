<template>
  <div style="width: 100%">
    <article class="justify-text" lang="en">
      <h1>{{ post.title }}</h1>
      <p>
        {{ $t('misc.last-update') }}: {{ $d(new Date(post.updatedAt), 'long') }}
      </p>
      <p v-if="hasTags(post)">Tags: {{ post.tags.join(', ') }}</p>
      <table-of-contents v-if="post.toc.length > 0" :document="post" />
      <nuxt-content :document="post" />
    </article>
    <document-switcher v-if="prev || next" :prev="prev" :next="next" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { hasTags } from '~/model/blog-post'
import { localizeDocumentPath, routes } from '~/model/routes'
import {
  blogBreadcrumb,
  documentBreadcrumb,
  homeBreadcrumb,
} from '~/model/breadcrumbs'

export default defineComponent({
  async asyncData({ app, $content, params }) {
    const post = await $content('en/blog/', params.slug).fetch()

    const [prev, next] = await $content('en/blog')
      .only(['title', 'path'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      post,
      prev: localizeDocumentPath(prev, app.i18n.locale),
      next: localizeDocumentPath(next, app.i18n.locale),
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.blog.title)
    this.$store.commit('setBreadcrumbs', [
      homeBreadcrumb,
      blogBreadcrumb,
      documentBreadcrumb(this.post, this.$i18n.locale),
    ])
  },
  methods: {
    hasTags,
  },
})
</script>
