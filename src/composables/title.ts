import { Ref } from 'vue'

const siteTitle = 'Jan Müller'

export function useTitleTemplate(title: string): void {
  const { t } = useI18n()
  const pageTitle: Ref<string> = computed(() => `${t(title)} · ${siteTitle}`)
  useHead({
    title: pageTitle,
    meta: [
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: pageTitle,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: pageTitle,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: pageTitle,
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: pageTitle,
      },
    ],
  })
}
