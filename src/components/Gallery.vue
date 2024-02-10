<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'

const props = defineProps<{ images: GalleryImage[] }>()

export interface GalleryImage {
  src: string
  alt: string
  aspectRatio: number
}
</script>

<template>
  <div class="bg-white p-4">
    <MasonryWall
      v-slot="{ item: image }"
      :items="props.images"
      :ssr-columns="1"
      :column-width="384"
      :gap="16"
      :key-mapper="(image: GalleryImage) => image.src"
    >
      <div
        class="h-0 shadow-sm"
        :style="{ paddingBottom: `${100 * (1 / image.aspectRatio)}%` }"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          loading="lazy"
          decoding="async"
          oncontextmenu="return false"
          class="w-full shadow-2xl"
        >
      </div>
    </MasonryWall>
  </div>
</template>
