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
import { mdiArtstation, mdiGithub, mdiNpm, mdiXing } from '@mdi/js'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      accounts: [
        {
          name: 'GitHub',
          href: 'https://github.com/DerYeger',
          icon: mdiGithub,
        },
        {
          name: 'NPM',
          href: 'https://www.npmjs.com/~yeger',
          icon: mdiNpm,
          color: '#CB0000',
        },
        {
          name: 'XING',
          href: 'https://www.xing.com/profile/Jan_Mueller1092/cv',
          icon: mdiXing,
          color: '#006566',
        },
        {
          name: 'ArtStation',
          href: 'https://www.artstation.com/deryeger',
          icon: mdiArtstation,
          color: '#00AFEB',
        },
      ],
    }
  },
})
</script>
