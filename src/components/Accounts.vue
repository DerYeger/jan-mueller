<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <aside class="text-center py-4">
    <span class="text-xl">{{ t('accounts') }} </span>
    <div
      class="text-2xl children:mx-1 children:opacity-100 children:hover:opacity-80"
    >
      <a
        title="GitHub"
        href="https://github.com/DerYeger"
        rel="noopener"
        target="_blank"
      >
        <div class="i-carbon-logo-github text-black dark:text-white" />
      </a>
      <a
        title="NPM"
        href="https://www.npmjs.com/~yeger"
        rel="noopener"
        target="_blank"
      >
        <div class="i-logos-npm-icon" />
      </a>
      <a
        title="XING"
        href="https://www.xing.com/profile/Jan_Mueller1092/cv"
        rel="noopener"
        target="_blank"
      >
        <div class="i-carbon-logo-xing text-green" />
      </a>
    </div>
  </aside>
</template>
