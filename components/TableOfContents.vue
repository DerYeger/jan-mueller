<template>
  <div>
    <nav>
      <h2>Content</h2>
      <ul>
        <li v-for="link of document.toc" :key="link.id">
          <NuxtLink :to="`#${link.id}`" v-text="link.text" />
        </li>
      </ul>
    </nav>
    <p></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IContentDocument } from '@nuxt/content/types/content'

export default defineComponent({
  props: {
    document: {
      type: Object as () => IContentDocument,
      required: true,
    },
  },
})
</script>
