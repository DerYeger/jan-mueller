<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'

const props = defineProps<{ images: GalleryImage[] }>()

export interface GalleryImage {
  src: string
  alt: string
  aspectRatio: number
  lazy: boolean
}
</script>

<template>
  <div class="flex justify-center bg-white p-2">
    <MasonryWall
      v-slot="{ item: image }"
      :items="props.images"
      :ssr-columns="1"
      :column-width="420"
      :gap="8"
      :max-columns="undefined"
      :key-mapper="(image: GalleryImage) => image.src"
      class="w-full"
    >
      <div
        class="h-0 shadow-sm"
        :style="{ paddingBottom: `${100 * (1 / image.aspectRatio)}%` }"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          :loading="image.lazy ? 'lazy' : 'eager'"
          decoding="async"
          oncontextmenu="return false"
          ondragstart="return false"
          on-touchstart="return false"
          class="w-full select-none shadow-2xl"
        >
      </div>
    </MasonryWall>
  </div>
</template>
