export interface Route {
  title: string
  to: string
  icon: string
}

export const routes: Record<string, Route> = {
  home: {
    title: 'Home',
    to: '/',
    icon: 'mdi-apps',
  },
  projects: {
    title: 'Projects',
    to: '/projects',
    icon: 'mdi-code-tags',
  },
  blog: {
    title: 'Blog',
    to: '/blog',
    icon: 'mdi-blogger',
  },
}
