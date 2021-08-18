<template>
  <nuxt />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head() {
    const path = this.$route.path.length === 1 ? '' : this.$route.path
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description') as string,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `${this.host}${path}/`,
        },
      ],
    }
  },
})
</script>
