import { Breadcrumb } from '~/model/breadcrumbs'

export interface State {
  breadcrumbs: Breadcrumb[]
}

export const state: () => State = () => ({
  breadcrumbs: [] as Breadcrumb[],
})

export const mutations = {
  setBreadcrumbs(state: State, breadcrumbs: Breadcrumb[]) {
    state.breadcrumbs = breadcrumbs
  },
}
