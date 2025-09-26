export async function getImageAsset(imagePath: string): Promise<ImageMetadata | undefined> {
  const assets = import.meta.glob('~/assets/**/*')
  const asset = Object.entries(assets).find(([fileName]) =>
    fileName.endsWith(imagePath),
  )
  if (!asset) {
    return undefined
  }
  const imageImport = await asset[1]() as { default: ImageMetadata }
  return imageImport.default
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
    href: 'https://www.linkedin.com/in/jan-patrick-mueller/',
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
