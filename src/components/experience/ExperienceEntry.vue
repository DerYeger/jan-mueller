<script setup lang="ts">
import { Experience } from '~/types'

const props = defineProps<{ experience: Experience }>()

const { experience } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <a
    v-if="experience.href"
    :href="experience.href"
    rel="noopener"
    target="_blank"
  >
    {{ t(`experience.${experience.name}`) }}
  </a>
  <span v-else class="text-light">{{
    t(`experience.${experience.name}`)
  }}</span>
  ·
  <span class="text-light">
    {{ t(`experience.${experience.description}`) }}
  </span>
  ·
  <Date :date="experience.startDate" />
  -
  <Date v-if="experience.endDate" :date="experience.endDate" />
  <span v-else class="text-lighter">{{ t('today') }}</span>
</template>
