import { Ref } from 'vue'

const siteTitle = 'Jan Müller'

export function useTitleTemplate(title: string): void {
  const { t } = useI18n()
  const pageTitle: Ref<string> = computed(() => `${t(title)} · ${siteTitle}`)
  useHead({
    title: pageTitle,
    meta: [
      {
        property: 'twitter:title',
        content: pageTitle,
      },
      {
        property: 'twitter:image:alt',
        content: pageTitle,
      },
      {
        property: 'og:title',
        content: pageTitle,
      },
      {
        property: 'og:image:alt',
        content: pageTitle,
      },
    ],
  })
}
