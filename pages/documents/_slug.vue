<template>
  <v-app dark>
    <v-main>
      <embed :src="src" width="100%" height="100%" />
      <logo class="logo-overlay" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'base',
  setup() {
    const { params } = useContext()
    const src = computed(() => `/documents/${params.value.slug}.pdf`)
    return {
      src,
    }
  },
})
</script>

<style>
.logo-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
