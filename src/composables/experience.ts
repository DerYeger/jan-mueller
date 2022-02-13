import type { Experience } from '~/types'

const experience: Experience[] = [
  {
    name: 'senacor',
    href: 'https://senacor.com/',
    description: 'software-engineer',
    startDate: '2021-10-01',
  },
  {
    name: 'yatta',
    href: 'https://website.yatta.de/en/start/',
    description: 'software-engineer-intern',
    startDate: '2020-11-01',
    endDate: '2020-12-31',
  },
  {
    name: 'uk',
    description: 'tutor-plm',
    startDate: '2019-05-01',
    endDate: '2019-07-31',
  },
  {
    name: 'uk',
    description: 'tutor-tcs',
    startDate: '2019-04-01',
    endDate: '2019-07-31',
  },
  {
    name: 'uk',
    description: 'tutor-ee',
    startDate: '2017-11-01',
    endDate: '2018-03-03',
  },
  {
    name: 'mgs',
    href: 'https://www.manserv.com/',
    description: 'software-engineer-intern',
    startDate: '2015-07-13',
    endDate: '2015-07-31',
  },
].sort((a, b) => b.startDate.localeCompare(a.startDate))

export function useExperience(): Experience[] {
  return experience
}
