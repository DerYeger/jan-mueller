import { NuxtAppOptions } from '@nuxt/types'
import { IContentDocument } from '@nuxt/content/types/content'

export interface Route {
  title: string
  to: string
  icon: string
}

export const routes: Record<string, Route> = {
  home: {
    title: 'home.title',
    to: '/',
    icon: 'mdi-home',
  },
  projects: {
    title: 'projects.title',
    to: '/projects',
    icon: 'mdi-code-tags',
  },
  blog: {
    title: 'blog.title',
    to: '/blog',
    icon: 'mdi-blogger',
  },
}

export function localizePaths<T extends IContentDocument>(
  documents: T[],
  app: NuxtAppOptions
): T[] {
  const prefix = app.i18n.locale === 'en' ? '' : `/${app.i18n.locale}`
  return documents.map((document) => ({
    ...document,
    path: document.path.replace('/en', prefix),
  }))
}

export function localizePath<T extends IContentDocument>(
  document: T | null,
  app: NuxtAppOptions
): T | undefined {
  if (document === null) {
    return undefined
  }
  const prefix = app.i18n.locale === 'en' ? '' : `/${app.i18n.locale}`
  return {
    ...document,
    path: document.path.replace('/en', prefix),
  }
}
