import { transfer } from 'comlink'

export function identity(data: any): any {
  return transfer(data, [data.data])
}
