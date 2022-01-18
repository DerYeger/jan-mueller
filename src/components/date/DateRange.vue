<script setup lang="ts">
const props = withDefaults(
  defineProps<{ startDate: string; endDate?: string; format?: string }>(),
  {
    endDate: undefined,
    format: 'month',
  }
)

const { startDate, endDate, format } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <span>
    <Date :date="startDate" :format="format" />
    –
    <Date v-if="endDate" :date="endDate" :format="format" />
    <span v-else>{{ t('today') }}</span>
  </span>
</template>
