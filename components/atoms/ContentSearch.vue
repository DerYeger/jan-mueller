<template>
  <v-menu :value="showResults" offset-y bottom rounded="xl" open-on-click>
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="query"
        dense
        rounded
        filled
        v-bind="attrs"
        hide-details="auto"
        prepend-inner-icon="mdi-magnify"
        :placeholder="$t('actions.search')"
        class="search-input unselectable"
        v-on="on"
      />
    </template>
    <v-list v-if="results.length > 0">
      <v-list-item
        v-for="result of results"
        :key="result.path"
        :to="result.path"
        width="100%"
        @click="reset()"
      >
        <v-list-item-title>{{ result.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>{{ $t('misc.no-results') }}</v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { localizeDocumentPaths } from '~/model/routes'
import { Content } from '~/model/content'

export default defineComponent({
  data() {
    return {
      results: [] as Content[],
      query: '',
      showResults: false,
    }
  },
  computed: {
    currentLocale(): string {
      return this.$i18n.locale
    },
  },
  watch: {
    async currentLocale(val: string) {
      await this.updateSearchResults(this.query, val)
    },
    async query(val: string) {
      await this.updateSearchResults(val, this.currentLocale)
    },
  },
  methods: {
    async updateSearchResults(query: string, locale: string) {
      if (!query) {
        this.results = []
        return
      }
      this.results = localizeDocumentPaths(
        [
          ...((await this.$content('en/blog', { deep: true })
            .only(['title', 'path'])
            .search('title', query)
            .sortBy('title', 'asc')
            .limit(4)
            .fetch()) as Content[]),
          ...((await this.$content('en/projects', { deep: true })
            .only(['title', 'path'])
            .search('title', query)
            .sortBy('title', 'asc')
            .limit(4)
            .fetch()) as Content[]),
        ],
        locale
      )
    },
    reset() {
      this.query = ''
      this.showResults = false
    },
  },
})
</script>

<style>
.search-input {
  max-width: 16rem;
}
</style>
