import type { Project } from '~/types'

const projects: Project[] = [
  {
    repo: 'apollo',
    img: 'https://raw.githubusercontent.com/DerYeger/apollo-frontend/master/src/assets/icons/android-chrome-512x512.png',
    title: 'Apollo',
  },
  {
    repo: 'd3-graph-controller',
    img: 'https://graph-controller.yeger.eu/logo.svg',
    title: 'd3-graph-controller',
  },
  {
    repo: 'vecti',
    img: 'https://vecti.yeger.eu/logo.svg',
    title: 'Vecti',
  },
]

export function useProjects(): Project[] {
  return projects
}
