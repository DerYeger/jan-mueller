<template>
  <masonry-wall
    v-slot="{ item }"
    :items="documents"
    :ssr-columns="1"
    :column-width="300"
    :padding="24"
    class="px-3"
  >
    <document-card :document="item" />
  </masonry-wall>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { routes } from '~/model/routes'
import { generateSocialTags } from '~/model/meta'
import { documentsBreadcrumb, homeBreadcrumb } from '~/model/breadcrumbs'
import { Document } from '~/model/documents'

export default defineComponent({
  setup() {
    const documents: Document[] = [
      {
        file: 'bachelor-thesis',
        language: 'german',
        date: new Date(2021, 2, 10),
      },
      { file: 'koffee', language: 'german', date: new Date(2020, 9, 21) },
      {
        file: 'threadsafe-data-structures',
        language: 'german',
        date: new Date(2020, 1, 12),
      },
    ]
    return {
      documents,
    }
  },
  head() {
    const title = this.$t(routes.documents.title) as string
    const description = this.$t('meta.description') as string
    return {
      title,
      meta: [...generateSocialTags(title, description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [homeBreadcrumb, documentsBreadcrumb])
  },
})
</script>
