<template>
  <div class="document-link-container">
    <NuxtLink v-if="prev" :to="prev.path" class="mr-4">
      <v-icon v-text="'mdi-chevron-left'" />
      <span>{{ prev.title }}</span>
    </NuxtLink>
    <span v-else />
    <NuxtLink v-if="next" :to="next.path" style="text-align: right">
      <span>{{ next.title }}</span>
      <v-icon v-text="'mdi-chevron-right'" />
    </NuxtLink>
    <span v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Content } from '~/model/content'

export default defineComponent({
  props: {
    prev: {
      type: Object as () => Content | undefined,
      default: undefined,
    },
    next: {
      type: Object as () => Content | undefined,
      default: undefined,
    },
  },
})
</script>

<style lang="scss">
.document-link-container {
  width: 100%;
  display: flex;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    font-size: clamp(1rem, 2vw, 1.25rem);

    .v-icon {
      color: var(--v-primary);
    }

    .v-icon + span,
    span + .v-icon {
      margin-left: 0.25rem;
    }
  }
}
</style>
