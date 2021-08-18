<template>
  <div class="responsive-list tag-list">
    <v-btn
      v-for="(tag, index) of sortedTags"
      :key="index"
      v-ripple="false"
      class="tag-chip"
      x-small
      plain
      color="secondary"
    >
      #{{ tag }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tags: {
      type: Array as () => string[],
      required: true,
    },
  },
  computed: {
    sortedTags(): string[] {
      return [...this.tags].sort()
    },
  },
})
</script>

<style lang="scss">
.tag-list {
  margin-top: 0;

  .tag-chip {
    margin-right: 0.5rem;
    margin-top: 0;
    padding: 0 !important;
    min-width: unset !important;

    span {
      opacity: 1 !important;
    }
  }
}
</style>
