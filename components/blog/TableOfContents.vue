<template>
  <div class="mb-4">
    <nav>
      <h2>{{ $t('misc.content') }}</h2>
      <ul>
        <li v-for="link of document.toc" :key="link.id">
          <nuxt-link :to="`#${link.id}`" v-text="link.text" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Content } from '~/model/content'

export default defineComponent({
  props: {
    document: {
      type: Object as () => Content,
      required: true,
    },
  },
})
</script>
