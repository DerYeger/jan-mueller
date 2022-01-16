<template>
  <img
    class="avatar w-54 max-w-full select-none"
    src="/img/avatar.webp"
    alt="Jan"
  />
</template>

<style scoped>
.avatar {
  border-radius: 50%;
  aspect-ratio: 1;
}

.avatar::after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
</style>
