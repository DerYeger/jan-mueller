import { Breadcrumb } from '~/model/breadcrumbs'

export interface State {
  title: string
  breadcrumbs: Breadcrumb[]
}

export const state: () => State = () => ({
  title: 'home.title',
  breadcrumbs: [] as Breadcrumb[],
})

export const mutations = {
  setTitle(state: State, title: string) {
    state.title = title
  },
  setBreadcrumbs(state: State, breadcrumbs: Breadcrumb[]) {
    state.breadcrumbs = breadcrumbs
  },
}
