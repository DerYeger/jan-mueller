<script setup lang="ts">
import type { Education } from '~/types'

const props = defineProps<{ education: Education }>()

const { education } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col lh-6">
    <span class="text-light">{{ t(`education.${education.name}`) }}</span>
    <span class="text-light">
      {{ t(`education.institutions.${education.institution}`) }}
    </span>
    <DateRange
      class="text-lighter"
      :start-date="education.startDate"
      :end-date="education.endDate"
    />
  </div>
</template>
