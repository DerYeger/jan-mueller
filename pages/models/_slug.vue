<template>
  <v-app dark style="overflow: hidden">
    <v-main style="margin-bottom: -1px">
      <model-viewer :src="src" />
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
    const src = computed(() => `/${params.value.slug}.mview`)
    return {
      src,
    }
  },
})
</script>

<style>
.logo-overlay {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
