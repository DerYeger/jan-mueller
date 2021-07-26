<template>
  <a
    rel="noopener"
    :href="href"
    target="_blank"
    class="svg-icon"
    :aria-label="name"
    style="margin: 6px"
  >
    <abbr :title="name">
      <img :src="require(`~/assets/images/icons/${icon}.svg`)" :alt="name" />
    </abbr>
  </a>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../assets/style';

img {
  @extend .unselectable;

  width: 36px;
  height: 36px;
}
</style>
