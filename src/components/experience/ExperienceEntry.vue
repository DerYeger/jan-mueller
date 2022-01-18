<script setup lang="ts">
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
    <span class="text-lighter">
      <Date :date="experience.startDate" />
      –
      <Date v-if="experience.endDate" :date="experience.endDate" />
      <span v-else>{{ t('today') }}</span>
    </span>
  </div>
</template>
