<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <em class="text-sm" v-html="t('intro.first')" />
    </p>
  </div>
</template>
