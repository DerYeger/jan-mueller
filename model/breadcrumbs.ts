import { localizeDocumentPath, routes } from '~/model/routes'
import { Content } from '~/model/content'

export interface Breadcrumb {
  text: string
  to: string
  icon?: string
}

export const homeBreadcrumb: Breadcrumb = {
  text: routes.home.title,
  to: routes.home.to,
  icon: 'mdi-home',
}

export const blogBreadcrumb: Breadcrumb = {
  text: routes.blog.title,
  to: routes.blog.to,
}

export const projectsBreadcrumb: Breadcrumb = {
  text: routes.projects.title,
  to: routes.projects.to,
}

export const documentsBreadcrumb: Breadcrumb = {
  text: routes.documents.title,
  to: routes.documents.to,
}

export const aboutBreadcrumb: Breadcrumb = {
  text: routes.about.title,
  to: routes.about.to,
}

export function documentBreadcrumb(
  document: Content,
  locale: string
): Breadcrumb {
  return {
    text: document.title,
    to: localizeDocumentPath(document, locale)!.path,
  }
}
