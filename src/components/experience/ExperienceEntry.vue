<script setup lang="ts">
import DateRange from '~/components/date/DateRange.vue'
import { Experience } from '~/types'

const props = defineProps<{ experience: Experience }>()

const { experience } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col lh-6">
    <a
      v-if="experience.href"
      :href="experience.href"
      rel="noopener"
      target="_blank"
    >
      {{ t(`experience.${experience.name}`) }}
    </a>
    <span v-else class="text-light">
      {{ t(`experience.${experience.name}`) }}
    </span>
    <span class="text-light">
      {{ t(`experience.${experience.description}`) }}
    </span>
    <DateRange
      class="text-lighter"
      :start-date="experience.startDate"
      :end-date="experience.endDate"
    />
  </div>
</template>
