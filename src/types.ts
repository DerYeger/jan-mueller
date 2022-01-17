import type { ViteSSGContext } from 'vite-ssg'
import { RouteMeta, RouteRecordNormalized } from 'vue-router'

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

export interface Education {
  name: string
  institution: string
  startDate: string
  endDate?: string
}

export interface Project {
  repo: string
  img: string
  title: string
}
