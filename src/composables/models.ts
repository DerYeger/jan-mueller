import { Model } from '~/types'

const models: Model[] = [
  {
    name: 'an-26',
    path: 'an-26.mview',
  },
]

export function useModels(): Model[] {
  return models
}
