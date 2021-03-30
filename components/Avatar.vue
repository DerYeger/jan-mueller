<template>
  <v-avatar size="100%" width="100%" class="avatar">
    <asset-image src="avatar.webp" lazy-src="avatar-lazy.webp" alt="Jan" />
  </v-avatar>
</template>

<style scoped>
.avatar::after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
</style>
