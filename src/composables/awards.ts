import { Award } from '~/types'

const awards: Award[] = [
  {
    name: 'ba',
    date: '2021-11',
    href: 'https://www.vde-kassel.de/de/veranstaltungen/berichte-zu-vergangene-veranstaltungen/foerderpreise-fuer-herausragende-studienleistungen',
  },
  {
    name: 'algods',
    date: '2018-07',
  },
  {
    name: 'dpg',
    date: '2016-07',
    href: 'https://www.dpg-physik.de/auszeichnungen/dpg-preise/abiturpreis',
  },
].sort((a, b) => b.date.localeCompare(a.date))

export function useAwards(): Award[] {
  return awards
}
