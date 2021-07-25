<template>
  <p>
    <samp>
      Jan <b>//</b> {{ age }} <b>//</b> B.Sc. <b>//</b>
      {{ $t('misc.software-engineer') }} <b>//</b> {{ $t('misc.vienna') }}
    </samp>
  </p>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const now = Date.now()
    const birth = Date.UTC(1998, 6, 3)
    const age = Math.abs(new Date(now - birth).getUTCFullYear() - 1970)
    return {
      age,
    }
  },
})
</script>
