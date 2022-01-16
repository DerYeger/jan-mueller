<template>
  <img class="avatar w-64 h-64" src="/img/avatar.webp" alt="Jan" />
</template>

<style scoped>
.avatar {
  border-radius: 50%;
}

.avatar::after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
</style>
