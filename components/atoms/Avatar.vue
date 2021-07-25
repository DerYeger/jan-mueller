<template>
  <v-avatar size="256px" class="avatar elevation-6">
    <asset-image
      src="avatar.webp"
      lazy-src="avatar-lazy.webp"
      alt="Jan"
      :allow-fullscreen="false"
    />
  </v-avatar>
</template>

<style scoped>
.avatar::after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
</style>
