export const getImageAsset = (assets: Record<string, any>, image: string) =>
  assets.find((asset: any) => {
    if (!asset.default?.src) {
      return false
    }
    const index = asset.default.src.indexOf('/assets/')
    return asset.default.src.slice(index) === image
  })

export const accounts = [
  {
    name: 'GitHub',
    icon: 'akar-icons:github-fill',
    href: 'https://github.com/DerYeger',
  },
  {
    name: 'LinkedIn',
    icon: 'akar-icons:linkedin-fill',
    href: 'https://www.linkedin.com/in/jan-müller-644144249/',
  },
  {
    name: 'XING',
    icon: 'carbon:logo-xing',
    href: 'https://www.xing.com/profile/Jan_Mueller1092/cv',
  },
  {
    name: 'Twitter',
    icon: 'fa-brands:twitter',
    href: 'https://twitter.com/DerYeger',
  },
]
