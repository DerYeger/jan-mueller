<script setup lang="ts">
import { Education } from '~/types'

const props = defineProps<{ education: Education }>()

const { education } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col">
    <span class="text-light">{{ t(`education.${education.name}`) }}</span>
    <span class="text-light">
      {{ t(`education.institutions.${education.institution}`) }}
    </span>
    <span>
      <Date :date="education.startDate" />
      -
      <Date v-if="education.endDate" :date="education.endDate" />
      <span v-else class="text-lighter">{{ t('today') }}</span>
    </span>
  </div>
</template>
