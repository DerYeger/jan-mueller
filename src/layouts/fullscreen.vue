<template>
  <div class="w-full h-full flex flex-col">
    <Header />
    <Main class="flex-1" style="width: calc(100% - 2rem)">
      <router-view />
    </Main>
    <Footer />
  </div>
</template>
