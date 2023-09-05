export const getImageAsset = async (imagePath: string): Promise<any> => {
  // @ts-expect-error Hacky way to get all assets
  const assets = await import.meta.glob('~/assets/**/*')
  const asset = Object.entries(assets).find(([fileName]) =>
    fileName.endsWith(imagePath)
  )
  if (!asset) {
    return undefined
  }
  // @ts-expect-error Hacky way to get image asset
  return await asset[1]()
}

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
