<template>
  <p class="link-container">
    <span v-if="prev">
      Previous:
      <NuxtLink
        :to="{ name: toName, params: { slug: prev.slug } }"
        class="text-primary font-bold hover:underline"
        >{{ prev.title }}
      </NuxtLink>
    </span>
    <span v-else></span>
    <span v-if="next">
      Next:
      <NuxtLink
        :to="{ name: toName, params: { slug: next.slug } }"
        class="font-bold hover:underline"
        >{{ next.title }}
      </NuxtLink>
    </span>
    <span v-else></span>
  </p>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    collection: {
      type: String,
      required: true,
    },
    prev: {
      type: Object,
      default: undefined,
    },
    next: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      toName: `${this.collection}-slug`,
    }
  },
})
</script>

<style>
.link-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
