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
  about: {
    title: 'about.title',
    to: '/about',
    icon: 'mdi-file-document',
  },
}

export function localizeDocumentPaths<T extends IContentDocument>(
  documents: T[],
  locale: string
): T[] {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return documents.map((document) => ({
    ...document,
    path: document.path.replace('/en', prefix),
  }))
}

export function localizeDocumentPath<T extends IContentDocument>(
  document: T | null,
  locale: string
): T | undefined {
  if (document === null) {
    return undefined
  }
  const prefix = locale === 'en' ? '' : `/${locale}`
  return {
    ...document,
    path: document.path.replace('/en', prefix),
  }
}

export function localizePath(path: string, locale: string): string {
  const prefix = locale === 'en' ? '' : `/${locale}`
  if (path.startsWith('/en')) {
    return path.replace('/en', prefix)
  } else {
    return `${prefix}${path}`
  }
}
