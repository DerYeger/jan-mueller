<template>
  <section>
    <v-row>
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
            <nuxt-content :document="paragraphs[0]" class="mb-n4" />
          </v-col>
        </v-row>
        <v-row class="mt-sm-8 flex-wrap-reverse">
          <v-col align-self="center">
            <nuxt-content :document="paragraphs[1]" class="mb-n4" />
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
            <nuxt-content :document="paragraphs[2]" class="mb-n4" />
          </v-col>
        </v-row>
        <v-row class="mt-sm-8 flex-wrap-reverse">
          <v-col align-self="center">
            <nuxt-content :document="paragraphs[3]" class="mb-n4" />
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
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Paragraph } from '~/model/paragraph'

export default defineComponent({
  props: {
    paragraphs: {
      type: Array as PropType<Paragraph[]>,
      required: true,
    },
  },
})
</script>

<style scoped>
h2 {
  margin-bottom: 0.25em;
}
</style>
