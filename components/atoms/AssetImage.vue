<template>
  <div style="display: contents">
    <v-img
      :src="imgSrc"
      :lazy-src="lazyImgSrc"
      :alt="alt"
      :contain="contain"
      :class="`elevation-${elevation} ` + (allowFullscreen ? 'main-image' : '')"
      :max-height="maxHeight"
      :max-width="maxWidth"
      @click="overlay = true"
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>
    <v-overlay v-if="allowFullscreen" :value="overlay" opacity="1" z-index="42">
      <v-img
        :src="imgSrc"
        :lazy-src="lazyImgSrc"
        contain
        height="100vh"
        width="100vw"
        style="margin-bottom: 0"
      />
      <v-btn icon class="close-button" @click="overlay = false">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { mdiClose } from '@mdi/js'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    lazySrc: {
      type: String,
      default: undefined,
    },
    alt: {
      type: String,
      required: true,
    },
    contain: Boolean,
    maxHeight: {
      type: String,
      default: undefined,
    },
    maxWidth: {
      type: String,
      default: undefined,
    },
    allowFullscreen: {
      type: Boolean,
      default: true,
    },
    elevation: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      mdiClose,
      overlay: false,
    }
  },
  computed: {
    imgSrc(): any | null {
      try {
        return require(`~/assets/images/${this.src}`)
      } catch (error) {
        return null
      }
    },
    lazyImgSrc(): any | null {
      try {
        return require(`~/assets/images/${this.lazySrc}`)
      } catch (error) {
        return null
      }
    },
  },
})
</script>

<style scoped>
.close-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
}

.main-image {
  cursor: pointer;
}
</style>
