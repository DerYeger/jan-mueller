<template>
  <nuxt-content :document="document"></nuxt-content>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { contentFunc } from '@nuxt/content/types/content'
import { routes } from '~/model/routes'

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
  mounted() {
    this.$store.commit('setTitle', routes.home.title)
    this.$store.commit('setBreadcrumbs', [])
  },
})
</script>
