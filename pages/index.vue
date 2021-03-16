<template>
  <v-col>
    <v-row class="flex-wrap-reverse">
      <v-col :sm="9" :xl="10">
        <nuxt-content :document="document"></nuxt-content>
      </v-col>
      <v-col :sm="3" :xl="2">
        <v-row justify="center" class="mb-4">
          <v-avatar size="100%" justify="center">
            <img
              :src="require('~/assets/images/profile-image.jpg')"
              alt="Jan"
            />
          </v-avatar>
        </v-row>
        <v-row justify="center" align-items="center">
          <a
            href="https://github.com/DerYeger"
            class="account-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-icon x-large v-text="'fab fa-github'" />
            <span>GitHub</span>
            <v-icon small v-text="'mdi-open-in-new'" />
          </a>
        </v-row>
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
  mounted() {
    this.$store.commit('setTitle', routes.home.title)
    this.$store.commit('setBreadcrumbs', [])
  },
})
</script>

<style lang="scss">
.account-link {
  text-decoration: none;
  color: unset !important;

  span {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
</style>
