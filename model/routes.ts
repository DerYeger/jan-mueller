import {
  mdiCodeTags,
  mdiFileDocument,
  mdiHome,
  mdiInformationVariant,
  mdiPen,
} from '@mdi/js'
import { Content } from '~/model/content'

export interface Route {
  title: string
  to: string
  icon: string
}

export const routes: Record<string, Route> = {
  home: {
    title: 'home.title',
    to: '/',
    icon: mdiHome,
  },
  projects: {
    title: 'projects.title',
    to: '/projects',
    icon: mdiCodeTags,
  },
  blog: {
    title: 'blog.title',
    to: '/blog',
    icon: mdiPen,
  },
  documents: {
    title: 'documents.title',
    to: '/documents',
    icon: mdiFileDocument,
  },
  about: {
    title: 'about.title',
    to: '/about',
    icon: mdiInformationVariant,
  },
}

export function localizeDocumentPaths<T extends Content>(
  documents: T[],
  locale: string
): T[] {
  const prefix = locale === 'en' ? '/' : `/${locale}/`
  return documents.map((document) => ({
    ...document,
    path: document.path.replace('/en/', prefix),
  }))
}

export function localizeDocumentPath<T extends Content>(
  document: T | null,
  locale: string
): T | undefined {
  if (document === null) {
    return undefined
  }
  const prefix = locale === 'en' ? '/' : `/${locale}/`
  return {
    ...document,
    path: document.path.replace('/en/', prefix),
  }
}

export function localizePath(path: string, locale: string): string {
  const prefix = locale === 'en' ? '/' : `/${locale}/`
  if (path.startsWith('/en/')) {
    return path.replace('/en/', prefix)
  } else {
    return `${prefix}${path}`
  }
}
