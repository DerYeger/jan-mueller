<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <aside class="text-center py-4">
    <h2 class="subheading">{{ t('languages') }}</h2>
    <div class="text-2xl children:mx-1">
      <div class="i-logos-kotlin" />
      <div class="i-logos-java" />
      <div class="i-logos-haskell-icon" />
      <div class="i-logos-python" />
      <div class="i-logos-typescript-icon" />
      <div class="i-logos-javascript" />
      <div class="i-logos-html-5" />
      <div class="i-logos-css-3" />
      <div class="i-logos-sass" />
    </div>
  </aside>
</template>
