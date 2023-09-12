<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'

interface Image {
  src: string
  alt: string
  aspectRatio: number
}

const images: Image[] = [
  { src: '/static/photo/2E8A1753.jpg', alt: 'Monkey', aspectRatio: 4 / 5 },
  {
    src: '/static/photo/2E8A4153.jpg',
    alt: 'Wall of green leaves',
    aspectRatio: 3 / 2,
  },
  { src: '/static/photo/2E8A3901.jpg', alt: 'Bunny', aspectRatio: 4 / 5 },
  {
    src: '/static/photo/2E8A3793.jpg',
    alt: 'Play of light beneath a bridge',
    aspectRatio: 3 / 2,
  },
  { src: '/static/photo/2E8A3296.jpg', alt: 'Squirrel', aspectRatio: 4 / 5 },
  { src: '/static/photo/2E8A3395.jpg', alt: 'Tit bird', aspectRatio: 4 / 5 },
  { src: '/static/photo/2E8A3993.jpg', alt: 'Rabbit', aspectRatio: 3 / 2 },
  { src: '/static/photo/2E8A1130.jpg', alt: 'Crow', aspectRatio: 4 / 5 },
  { src: '/static/photo/2E8A1174.jpg', alt: 'Heron', aspectRatio: 3 / 2 },
  { src: '/static/photo/2E8A1210.jpg', alt: 'Heron', aspectRatio: 4 / 5 },
]
</script>

<template>
  <div class="bg-white p-4">
    <MasonryWall
      v-slot="{ item: image }"
      :items="images"
      :ssr-columns="1"
      :column-width="384"
      :gap="16"
      :key-mapper="(image: Image) => image.src"
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
          class="w-full"
        />
      </div>
    </MasonryWall>
  </div>
</template>
