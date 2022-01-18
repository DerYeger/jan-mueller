<script setup lang="ts">
const props = withDefaults(defineProps<{ date: string; format?: string }>(), {
  format: 'month',
})

const { date, format } = toRefs(props)

const { d } = useI18n()

const formattedDate = computed(() => d(new Date(date.value), format.value))
</script>

<template>
  <span>{{ formattedDate }}</span>
</template>
