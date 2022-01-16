<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <p class="text-4xl">
      <Avatar />
    </p>
    <p class="max-w-65ch text-center">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <em class="text-sm" v-html="t('intro.first')" />
    </p>
    <p class="max-w-65ch text-center">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <em class="text-sm" v-html="t('intro.first')" />
    </p>
    <p class="max-w-65ch text-center">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <em class="text-sm" v-html="t('intro.first')" />
    </p>
    <p class="max-w-65ch text-center">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <em class="text-sm" v-html="t('intro.first')" />
    </p>
  </div>
</template>
