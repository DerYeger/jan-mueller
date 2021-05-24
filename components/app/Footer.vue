<template>
  <v-footer app dark>
    <div style="flex: 2">
      <span style="font-size: 0.75rem" class="unselectable">
        &copy; {{ new Date().getFullYear() }}, Jan Müller
      </span>
    </div>
    <div>
      <theme-toggle />
    </div>
    <div>
      <language-toggle />
    </div>
  </v-footer>
</template>
