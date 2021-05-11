<template>
  <v-col class="bound-width">
    <v-row>
      <v-col
        xs="6"
        sm="5"
        md="4"
        class="pt-0"
        :class="$vuetify.breakpoint.xs ? 'max-width' : ''"
      >
        <v-row justify="center" class="mb-4 mt-2 ml-1 mr-1">
          <avatar />
        </v-row>
        <v-row justify="center">
          <account-link
            v-for="(account, index) of accounts"
            :key="index"
            :name="account.name"
            :icon="account.icon"
            :href="account.href"
            :color="account.color"
          />
        </v-row>
      </v-col>
      <v-col
        class="pt-0"
        :style="
          $vuetify.breakpoint.xs ? 'padding-left: 0; padding-right: 0' : ''
        "
      >
        <article :class="$vuetify.breakpoint.xs ? 'justify-text' : ''">
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
  data() {
    return {
      accounts: [
        {
          name: 'GitHub',
          href: 'https://github.com/DerYeger',
          icon: 'fab fa-github',
        },
        {
          name: 'XING',
          href: 'https://www.xing.com/profile/Jan_Mueller1092/cv',
          icon: 'fab fa-xing',
        },
      ],
    }
  },
  head() {
    const title = (this.$t as Function)(routes.home.title)
    const description = (this.$t as Function)('meta.description')
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
