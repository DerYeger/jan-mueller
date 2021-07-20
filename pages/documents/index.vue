<template>
  <vue-masonry-wall
    :items="documents"
    :ssr="{ columns: 1 }"
    :options="{ width: 400, padding: 12 }"
  >
    <template #default="{ item }">
      <v-card>
        <v-card-title style="word-break: keep-all">
          {{ $t(`documents.files.${item}`) }}
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="secondary"
            :href="`/documents/${item}.pdf`"
            target="_blank"
            download
          >
            {{ $t('actions.download') }}
          </v-btn>
          <v-btn text color="primary" :to="localePath(`/documents/${item}`)">
            {{ $t('actions.view') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </vue-masonry-wall>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { routes } from '~/model/routes'
import { generateSocialTags } from '~/model/meta'
import { documentsBreadcrumb, homeBreadcrumb } from '~/model/breadcrumbs'

export default defineComponent({
  setup() {
    const documents = ['bachelor-thesis', 'koffee', 'threadsafe-datastructures']
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
