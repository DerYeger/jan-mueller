<template>
  <img :src="logo" alt="logo" width="36px" height="36px" style="margin: 6px" />
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
