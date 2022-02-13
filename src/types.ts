import type { ViteSSGContext } from 'vite-ssg'
import type { RouteMeta, RouteRecordNormalized } from 'vue-router'

export type UserModule = (ctx: ViteSSGContext) => void

export type RouteWithFrontmatter = RouteRecordNormalized & {
  meta: RouteMeta & {
    frontmatter: Record<string, string>
  }
}

export interface Award {
  name: string
  date: string
  href?: string
}

export interface Document extends File<'documents'> {
  language: string
}

export interface Education {
  name: string
  institution: string
  startDate: string
  endDate?: string
}

export interface Experience {
  name: string
  description: string
  startDate: string
  endDate?: string
  href?: string
}

export interface File<Type extends 'documents' | 'models'> {
  name: string
  date: string
  dateFormat?: 'default' | 'month'
  type: Type
}

export type Model = File<'models'>

export interface Project {
  repo: string
  img: string
  title: string
}
