<template>
  <div class="mb-4">
    <nav>
      <h2>{{ $t('misc.content') }}</h2>
      <ul class="pl-2">
        <li
          v-for="entry of document.toc"
          :key="entry.id"
          :class="depthToPaddingClass(entry)"
          style="list-style-position: inside"
        >
          <nuxt-link :to="`#${entry.id}`" v-text="entry.text" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Content, TableOfContentsEntry } from '~/model/content'

export default defineComponent({
  props: {
    document: {
      type: Object as () => Content,
      required: true,
    },
  },
  methods: {
    depthToPaddingClass(entry: TableOfContentsEntry): string {
      return `pl-${(entry.depth - 2) * 6}`
    },
  },
})
</script>
