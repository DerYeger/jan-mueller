<template>
  <v-menu offset-y bottom open-on-hover rounded="4">
    <template #activator="{ on, attrs }">
      <v-btn
        rel="noopener"
        plain
        :aria-label="showName ? repository : $t('misc.repository')"
        :href="href"
        target="_blank"
        class="mb-4 text--primary"
        v-bind="attrs"
        v-on="on"
      >
        {{ showName ? repository : $t('misc.repository') }}
        <v-icon class="ml-2">{{ mdiGithub }}</v-icon>
      </v-btn>
    </template>
    <a rel="noopener" :href="href" target="_blank">
      <v-img :src="repoCardSrc" :alt="repository" :width="600" />
    </a>
  </v-menu>
</template>

<script lang="ts">
import { mdiGithub } from '@mdi/js'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    repository: {
      type: String,
      required: true,
    },
    showName: {
      type: Boolean,
      default: false,
    },
    account: {
      type: String,
      default: 'DerYeger',
    },
  },
  data() {
    return {
      mdiGithub,
    }
  },
  computed: {
    href(): string {
      return `https://github.com/${this.account}/${this.repository}`
    },
    repoCardSrc(): string {
      return `https://opengraph.githubassets.com/1662e3493009d6893fb53c235f5fb37de0ab5d1913f8f9a68f443d7058a6f35a/${this.account}/${this.repository}`
    },
  },
})
</script>
