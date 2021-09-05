<template>
  <div class="document-link-container">
    <nuxt-link v-if="prev" :to="prev.path" class="mr-4">
      <v-icon>{{ mdiChevronLeft }}</v-icon>
      <span>{{ prev.title }}</span>
    </nuxt-link>
    <span v-else />
    <nuxt-link v-if="next" :to="next.path" style="text-align: right">
      <span>{{ next.title }}</span>
      <v-icon>{{ mdiChevronRight }}</v-icon>
    </nuxt-link>
    <span v-else />
  </div>
</template>
<script lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
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
  data() {
    return {
      mdiChevronLeft,
      mdiChevronRight,
    }
  },
})
</script>

<style lang="scss">
.document-link-container {
  width: 100%;
  display: flex;
  justify-content: space-between;

  a {
    align-items: center;
    display: flex;
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
