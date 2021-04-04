<template>
  <div class="link-container">
    <nuxt-link :to="localePath('/')" class="icon-link">
      <img :src="logo" alt="logo" />
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      logo: require('~/assets/images/logo.svg'),
    }
  },
})
</script>

<style lang="scss" scoped>
@import '/assets/style.scss';

.link-container {
  width: 48px;
  height: 48px;
  margin-right: -12px;
}

img {
  @extend .unselectable;

  width: 36px;
  height: 36px;
  margin: 6px;
}
</style>
