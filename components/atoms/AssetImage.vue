<template>
  <v-img :src="imgSrc()" :lazy-src="lazyImgSrc()" :alt="alt" />
</template>

<script>
export default {
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
  },
  methods: {
    imgSrc() {
      try {
        return require(`~/assets/images/${this.src}`)
      } catch (error) {
        return null
      }
    },
    lazyImgSrc() {
      try {
        return require(`~/assets/images/${this.lazySrc}`)
      } catch (error) {
        return null
      }
    },
  },
}
</script>
