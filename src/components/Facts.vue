<script setup lang="ts">
const age = Math.abs(
  new Date(Date.now() - new Date('1998-06-03').getTime()).getFullYear() - 1970
)

const { t } = useI18n()
</script>

<template>
  <p class="prose text-lighter">
    <samp>{{ t('about.facts', { age }) }}</samp>
  </p>
</template>
