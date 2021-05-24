<template>
  <v-col class="bound-width">
    <v-row>
      <v-col
        xs="6"
        sm="5"
        md="4"
        class="pt-0"
        :class="{ 'max-width': $vuetify.breakpoint.xs }"
      >
        <v-row justify="center" class="mb-4 mt-2 ml-1 mr-1">
          <avatar />
        </v-row>
        <account-link-row />
      </v-col>
      <v-col
        class="pt-0"
        :style="
          $vuetify.breakpoint.xs ? 'padding-left: 0; padding-right: 0' : ''
        "
      >
        <article :class="{ 'justify-text': $vuetify.breakpoint.xs }">
          <nuxt-content :document="document" />
        </article>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { contentFunc } from '@nuxt/content/types/content'
import { routes } from '~/model/routes'
import { generateSocialTags } from '~/model/meta'

export default defineComponent({
  async asyncData({
    app,
    $content,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
  }) {
    const document = await $content(`${app.i18n.locale}/home`).fetch()
    return {
      document,
    }
  },
  head() {
    const title = this.$t(routes.home.title) as string
    const description = this.$t('meta.description') as string
    return {
      title,
      meta: [...generateSocialTags(title, description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [])
  },
})
</script>

<style scoped>
.max-width {
  flex-basis: 100%;
}
</style>
