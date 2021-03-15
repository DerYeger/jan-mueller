<template>
  <p class="link-container">
    <NuxtLink v-if="prev" :to="prev.path">
      <v-icon v-text="'mdi-chevron-left'" />
      <span>{{ prev.title }}</span>
    </NuxtLink>
    <span v-else />
    <NuxtLink v-if="next" :to="next.path">
      <span>{{ next.title }}</span>
      <v-icon v-text="'mdi-chevron-right'" />
    </NuxtLink>
    <span v-else />
  </p>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IContentDocument } from '@nuxt/content/types/content'

export default defineComponent({
  props: {
    prev: {
      type: Object as () => IContentDocument | undefined,
      default: undefined,
    },
    next: {
      type: Object as () => IContentDocument | undefined,
      default: undefined,
    },
  },
})
</script>

<style lang="scss">
.link-container {
  width: 100%;
  display: flex;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    color: unset !important;
    font-size: 1.25rem;
    font-weight: bold;
    text-decoration: none;

    .v-icon + span,
    span + .v-icon {
      margin-left: 0.25rem;
    }
  }

  a:hover span {
    text-decoration: underline;
  }
}
</style>
