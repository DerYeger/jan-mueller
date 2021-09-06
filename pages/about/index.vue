<template>
  <article class="about-article bound-width">
    <nuxt-content :document="document" />
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { routes } from '~/model/routes'
import { aboutBreadcrumb, homeBreadcrumb } from '~/model/breadcrumbs'
import { generateSocialTags } from '~/model/meta'

export default defineComponent({
  async asyncData(context: Context) {
    const document = await context
      .$content(`${context.app.i18n.locale}/about`)
      .fetch()
    return {
      document,
    }
  },
  head() {
    const title = this.$t(routes.about.title) as string
    const description = this.$t('meta.description') as string
    return {
      title,
      meta: [...generateSocialTags(title, description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [homeBreadcrumb, aboutBreadcrumb])
  },
})
</script>

<style lang="scss">
.about-article {
  h1,
  h2 {
    hyphens: auto;
  }
}
</style>
