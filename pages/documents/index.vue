<template>
  <vue-masonry-wall
    :items="documents"
    :ssr="{ columns: 1 }"
    :options="{ width: 400, padding: 12 }"
  >
    <template #default="{ item }">
      <document-card :document="item" />
    </template>
  </vue-masonry-wall>
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
