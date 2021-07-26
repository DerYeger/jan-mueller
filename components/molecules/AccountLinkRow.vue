<template>
  <div class="responsive-list">
    <account-link
      v-for="(account, index) of accounts"
      :key="index"
      :name="account.name"
      :icon="account.icon"
      :href="account.href"
      :color="account.color"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      accounts: [
        {
          name: 'GitHub',
          href: 'https://github.com/DerYeger',
          icon: 'mdi-github',
        },
        {
          name: 'NPM',
          href: 'https://www.npmjs.com/~yeger',
          icon: 'mdi-npm',
          color: '#CB0000',
        },
        {
          name: 'XING',
          href: 'https://www.xing.com/profile/Jan_Mueller1092/cv',
          icon: 'mdi-xing',
          color: '#006566',
        },
        {
          name: 'ArtStation',
          href: 'https://www.artstation.com/deryeger',
          icon: 'mdi-artstation',
          color: '#00AFEB',
        },
      ],
    }
  },
})
</script>
