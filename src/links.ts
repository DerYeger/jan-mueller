export interface Link {
  href: string
  label: string
}

export const mainLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/photography',
    label: 'Photography',
  },
] as const satisfies Link[]

export const photographyLinks = [
  {
    href: '/photography',
    label: 'Gallery',
  },
  {
    href: '/photography/maps/japan',
    label: 'Japan',
  },
] as const satisfies Link[]
