<script setup lang="ts">
import type { Vector } from 'vecti'
import { computed, toRefs } from 'vue'

const props = defineProps<{
  modelValue: Vector[]
}>()

const { modelValue } = toRefs(props)

const paddingMultiplier = 1.1

function mapToX(value: number, limit: number) {
  return (value / limit) * 50 + 50
}

function mapToY(value: number, limit: number) {
  return 50 - (value / limit) * 50
}

function getCoordinates(vector: Vector, limit: number) {
  return {
    x1: mapToX(0, limit),
    x2: mapToX(vector.x, limit),
    y1: mapToY(0, limit),
    y2: mapToY(vector.y, limit),
  }
}

const data = computed(() => {
  const vectors = modelValue.value
  const limit = vectors.reduce((acc, vector) => {
    const limit = paddingMultiplier * vector.length()
    return Math.max(acc, limit)
  }, 0)

  const actualLimit = limit > 0 ? limit : 1

  const mappedVectors = vectors
    .filter((vector) => vector.x !== 0 || vector.y !== 0)
    .map((vector) => getCoordinates(vector, actualLimit))

  const gridLines = Array.from({ length: 10 }, (_, i) => {
    const value = (i * actualLimit) / 10
    return mapToX(value, actualLimit)
  })

  return {
    vectors: mappedVectors,
    limit: actualLimit,
    gridLines,
  }
})
</script>

<template>
  <div class="visualizer-interface h-full p-2">
    <svg class="size-full overflow-visible" viewBox="0 0 100 100">
      <defs>
        <marker
          id="arrow-axis"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" class="fill-white stroke-none" />
        </marker>
        <marker
          id="arrow-vector"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" class="fill-red-500 stroke-none" />
        </marker>
      </defs>
      <g
        class="grid-lines *:stroke-neutral-700 *:stroke-[0.25px] *:opacity-75"
      >
        <line
          v-for="point of data.gridLines"
          :key="point"
          :x1="0"
          :y1="point + 5"
          :x2="100"
          :y2="point + 5"
        />
        <line
          v-for="point of data.gridLines"
          :key="point"
          :x1="0"
          :y1="point - 50"
          :x2="100"
          :y2="point - 50"
        />
        <line
          v-for="point of data.gridLines"
          :key="point"
          :x1="point + 5"
          :y1="0"
          :x2="point + 5"
          :y2="100"
        />
        <line
          v-for="point of data.gridLines"
          :key="point"
          :x1="point - 50"
          :y1="0"
          :x2="point - 50"
          :y2="100"
        />
      </g>
      <g class="*:stroke-white">
        <line x1="0" y1="50" x2="99" y2="50" marker-end="url(#arrow-axis)" />
        <line x1="50" y1="100" x2="50" y2="1" marker-end="url(#arrow-axis)" />
      </g>
      <g class="*:fill-neutral-400 *:text-[4px]">
        <text x="50%" y="-3" text-anchor="middle" dominant-baseline="top">
          y
        </text>
        <text x="53%" y="4" text-anchor="start" dominant-baseline="top">
          {{ data.limit.toFixed(0) }}
        </text>
        <text x="53%" y="99" text-anchor="start" dominant-baseline="bottom">
          -{{ data.limit.toFixed(0) }}
        </text>
        <text x="102" y="50%" text-anchor="start" dominant-baseline="middle">
          x
        </text>
        <text x="99" y="55%" text-anchor="end" dominant-baseline="middle">
          {{ data.limit.toFixed(0) }}
        </text>
        <text x="0.5" y="55%" text-anchor="start" dominant-baseline="middle">
          -{{ data.limit.toFixed(0) }}
        </text>
        <text
          x="51.75"
          y="48.75"
          text-anchor="start"
          dominant-baseline="bottom"
        >
          0
        </text>
      </g>
      <g class="*:stroke-red-500">
        <line
          v-for="(vector, index) of data.vectors"
          :key="index"
          :x1="vector.x1"
          :y1="vector.y1"
          :x2="vector.x2"
          :y2="vector.y2"
          stroke-linecap="round"
          marker-end="url(#arrow-vector)"
        />
      </g>
    </svg>
  </div>
</template>

<style>
.baklava-node .visualizer-interface {
  width: calc(100% + 0.5em);
}
</style>
