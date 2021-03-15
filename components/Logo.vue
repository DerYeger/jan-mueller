<template>
  <img :src="logo" alt="logo" width="48px" height="48px" />
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
