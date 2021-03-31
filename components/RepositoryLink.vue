<template>
  <v-menu offset-y bottom open-on-hover rounded="4">
    <template #activator="{ on, attrs }">
      <v-btn
        rel="noopener"
        text
        :aria-label="$t('actions.view-on') + ' GitHub'"
        :href="href"
        target="_blank"
        class="mb-4 text--primary"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('actions.view-on') }}
        <v-icon class="ml-2" v-text="'fab fa-github'" />
      </v-btn>
    </template>
    <a rel="noopener" :href="href" target="_blank">
      <img :src="repoCardSrc" alt="Repository card" style="display: block" />
    </a>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    repository: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      default: 'DerYeger',
    },
  },
  computed: {
    href(): string {
      return `https://github.com/${this.account}/${this.repository}`
    },
    repoCardSrc(): string {
      return (
        'https://github-readme-stats.vercel.app/api/pin/?border_radius=4&username=DerYeger&repo=' +
        this.repository
      )
    },
  },
})
</script>
