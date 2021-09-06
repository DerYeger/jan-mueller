<template>
  <div
    class="wave"
    :style="{
      '--wave-color': color,
      '--wave-speed-multiplier': speedMultiplier,
    }"
  >
    <div class="wave__top" :style="{ '--wave-offset': `${offsetTop}px` }" />
    <div class="wave__body">
      <slot />
    </div>
    <div
      class="wave__bottom"
      :style="{ '--wave-offset': `${offsetBottom}px` }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'rgba(47, 73, 94, 1)',
    },
    offsetTop: {
      type: Number,
      default: 0,
    },
    offsetBottom: {
      type: Number,
      default: 256,
    },
    speedMultiplier: {
      type: Number,
      default: 1,
    },
  },
})
</script>

<style scoped>
.wave__body,
.wave__top,
.wave__bottom {
  background-color: var(--wave-color);
}

.wave__body {
  width: 100%;
}

.wave__top,
.wave__bottom {
  animation: scroll calc(3600s / var(--wave-speed-multiplier))
    cubic-bezier(0.13, 0.28, 0.95, 0.79) infinite;
  height: 65px;
  mask-image: url('~/assets/images/wave.svg');
  mask-position: var(--wave-offset) 0;
  mask-repeat: repeat-x;
  mask-size: 3440px 65px;
  width: 100%;
  z-index: 0;
}

.wave__top {
  margin-bottom: -1px;
  transform: rotate(180deg);
}

.wave__bottom {
  margin-top: -1px;
}

@keyframes scroll {
  from {
    mask-position: var(--wave-offset) 0;
  }
  to {
    mask-position: -200000px 0;
  }
}
</style>
