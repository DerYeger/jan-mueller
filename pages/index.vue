<template>
  <v-row class="bound-width" no-gutters>
    <v-col>
      <v-row>
        <v-col
          cols="12"
          sm="auto"
          class="d-flex justify-center"
          align-self="center"
        >
          <avatar />
        </v-col>
        <v-col align-self="center">
          <h1 class="text-center text-sm-left">
            {{ $t('misc.about-me') }}
          </h1>
          <quick-facts />
          <nuxt-content :document="paragraphs[0]" />
        </v-col>
      </v-row>
      <v-row class="mt-sm-8 flex-wrap-reverse">
        <v-col align-self="center">
          <nuxt-content :document="paragraphs[1]" />
        </v-col>
        <v-col cols="12" sm="5" align-self="center">
          <aside class="my-8 my-sm-0">
            <h2 class="text-center text-sm-right">
              {{ $t('misc.accounts') }}
            </h2>
            <account-link-row class="justify-center justify-sm-end" />
          </aside>
        </v-col>
      </v-row>
      <v-row class="mt-sm-8">
        <v-col cols="12" sm="6" align-self="center">
          <aside class="my-8 my-sm-0">
            <h2 class="text-center text-sm-left">
              {{ $t('misc.languages') }}
            </h2>
            <language-list class="justify-center justify-sm-start" />
          </aside>
        </v-col>
        <v-col align-self="center">
          <nuxt-content :document="paragraphs[2]" />
        </v-col>
      </v-row>
      <v-row class="mt-sm-8 flex-wrap-reverse">
        <v-col align-self="center">
          <nuxt-content :document="paragraphs[3]" />
        </v-col>
        <v-col cols="12" sm="6" align-self="center">
          <aside class="my-8 my-sm-0">
            <h2 class="text-center text-sm-right">
              {{ $t('misc.software') }}
            </h2>
            <software-list class="justify-center justify-sm-end" />
          </aside>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { routes } from '~/model/routes'
import { generateSocialTags } from '~/model/meta'
import { Paragraph } from '~/model/paragraph'

export default defineComponent({
  async asyncData(context: Context) {
    const paragraphs = (await context
      .$content(`${context.app.i18n.locale}/home`)
      .sortBy('part')
      .fetch()) as Paragraph[]
    return {
      paragraphs,
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

<style>
h1 {
  font-size: 4rem;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 0.25em;
}

h1,
h2 {
  line-height: 1;
}

p:last-child {
  margin-bottom: 0;
}
</style>
