import { Education } from '~/types'

const education: Education[] = [
  {
    name: 'ma',
    institution: 'tu',
    startDate: '2021-10',
  },
  {
    name: 'ba',
    institution: 'uk',
    startDate: '2016-10',
    endDate: '2021-03',
  },
  {
    name: 'abitur',
    institution: 'wg',
    startDate: '2009-09',
    endDate: '2016-07',
  },
].sort((a, b) => b.startDate.localeCompare(a.startDate))

export function useEducation(): Education[] {
  return education
}
