export interface OGMetaTag {
  hid: string
  property: string
  content: string
}

export interface TwitterMetaTag {
  hid: string
  name: string
  content: string
}

export function generateSocialTags(
  title: string,
  description: string
): (OGMetaTag | TwitterMetaTag)[] {
  const image = 'https://jan-mueller.at/og-logo.png'
  const formattedTitle = `${title} · Jan Müller`
  return [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: formattedTitle,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: image,
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: formattedTitle,
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: '@DerYeger',
    },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@DerYeger',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: formattedTitle,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: image,
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: image,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: formattedTitle,
    },
  ]
}
