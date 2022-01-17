<script setup lang="ts">
const props = withDefaults(defineProps<{ date: string; format: string }>(), {
  format: 'month',
})

const { date, format } = toRefs(props)

const { d } = useI18n()
</script>

<template>
  <span class="text-lighter">{{ d(new Date(date), format) }}</span>
</template>
