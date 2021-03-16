<template>
  <nuxt-content :document="document"></nuxt-content>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { contentFunc } from '@nuxt/content/types/content'
import { routes } from '~/model/routes'
import { aboutBreadcrumb, homeBreadcrumb } from '~/model/breadcrumbs'

export default defineComponent({
  async asyncData({
    app,
    $content,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
  }) {
    const document = await $content(`${app.i18n.locale}/about`).fetch()
    return {
      document,
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.about.title)
    this.$store.commit('setBreadcrumbs', [homeBreadcrumb, aboutBreadcrumb])
  },
})
</script>
