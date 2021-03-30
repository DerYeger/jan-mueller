<template>
  <v-col class="mt-4">
    <v-row>
      <v-col
        sm="5"
        md="4"
        lg="3"
        xl="2"
        :class="$vuetify.breakpoint.xs ? 'forced-wrap' : ''"
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
      <v-col :min-width="$vuetify.breakpoint.xs ? '100%' : '0'">
        <nuxt-content :document="document"></nuxt-content>
      </v-col>
    </v-row>
  </v-col>
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
  data() {
    return {
      accounts: [
        {
          name: 'GitHub',
          href: 'https://github.com/DerYeger',
          icon: 'fab fa-github',
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.home.title)
    this.$store.commit('setBreadcrumbs', [])
  },
})
</script>

<style>
.forced-wrap {
  flex-basis: 100%;
}
</style>
