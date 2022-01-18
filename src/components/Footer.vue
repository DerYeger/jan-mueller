<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="pa-4 text-center text-sm">
    <span class="text-lighter">
      &copy; 2021 - {{ new Date().getFullYear() }}, Jan Müller ·
    </span>
    <a
      href="https://github.com/DerYeger/jan-mueller"
      rel="noopener"
      target="_blank"
    >
      {{ t('source') }}
    </a>
  </footer>
</template>
