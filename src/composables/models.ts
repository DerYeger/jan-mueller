import type { Model } from '~/types'

const models: Model[] = [
  {
    type: 'models',
    name: 'an-26',
    date: '2020-10',
    dateFormat: 'month',
  },
]

export function useModels(): Model[] {
  return models
}
