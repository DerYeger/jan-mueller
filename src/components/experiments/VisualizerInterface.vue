<script setup lang="ts">
import type { Vector } from 'vecti'
import { computed, toRefs } from 'vue'

import type { VisualizerInterface } from '~/components/experiments/nodes'

const props = defineProps<{
  intf: VisualizerInterface
}>()

const { intf } = toRefs(props)

const paddingMultiplier = 1.1

function getMin(value: number) {
  if (value > 0) {
    return 0
  }
  return value * paddingMultiplier
}

function getMax(value: number) {
  if (value < 0) {
    return 0
  }
  return value * paddingMultiplier
}

function mapToX(value: number, limit: number) {
  return (value / limit) * 50 + 50
}

function mapToY(value: number, limit: number) {
  return 50 - (value / limit) * 50
}

function getLimit(vector: Vector) {
  const minX = getMin(vector.x)
  const minY = getMin(vector.y)
  const min = Math.min(minX, minY)

  const maxX = getMax(vector.x)
  const maxY = getMax(vector.y)
  const max = Math.max(maxX, maxY)
  return Math.max(Math.abs(min), max)
}

function getCoordinates(vector: Vector, limit: number) {
  const x1 = mapToX(0, limit)
  const x2 = mapToX(vector.x, limit)
  const y1 = mapToY(0, limit)
  const y2 = mapToY(vector.y, limit)

  return {
    x1,
    x2,
    y1,
    y2,
  }
}

const data = computed(() => {
  const vectors = intf.value.value
  const limit = vectors.reduce((acc, vector) => {
    const limit = getLimit(vector)
    return Math.max(acc, limit)
  }, 0)

  const actualLimit = limit > 0 ? limit : 1

  const mappedVectors = vectors
    .filter((vector) => vector.x !== 0 || vector.y !== 0)
    .map((vector) => getCoordinates(vector, actualLimit))

  // use the limit value to calculate an array of points where indicators should be placed on the axis
  const indicatorPoints = Array.from({ length: 10 }, (_, i) => {
    const value = (i * actualLimit) / 10
    return mapToX(value, actualLimit)
  })

  return {
    vectors: mappedVectors,
    limit: actualLimit,
    indicatorPoints,
  }
})
</script>

<template>
  <div class="h-full w-[calc(100%+0.5em)] p-2">
    <svg class="h-full w-full overflow-visible" viewBox="0 0 100 100">
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
        class="children:stroke-neutral-700 children:opacity-75 children:stroke-[0.25px]"
      >
        <line
          v-for="point of data.indicatorPoints"
          :key="point"
          :x1="0"
          :y1="point + 5"
          :x2="100"
          :y2="point + 5"
        />
        <line
          v-for="point of data.indicatorPoints"
          :key="point"
          :x1="0"
          :y1="point - 50"
          :x2="100"
          :y2="point - 50"
        />
        <line
          v-for="point of data.indicatorPoints"
          :key="point"
          :x1="point + 5"
          :y1="0"
          :x2="point + 5"
          :y2="100"
        />
        <line
          v-for="point of data.indicatorPoints"
          :key="point"
          :x1="point - 50"
          :y1="0"
          :x2="point - 50"
          :y2="100"
        />
      </g>
      <g class="children:stroke-white">
        <line x1="0" y1="50" x2="99" y2="50" marker-end="url(#arrow-axis)" />
        <line x1="50" y1="100" x2="50" y2="1" marker-end="url(#arrow-axis)" />
      </g>
      <g class="children:fill-neutral-400 children:text-[4px]">
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
      <g class="children:stroke-red-500">
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
