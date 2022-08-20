import rss from '@astrojs/rss'

export const get = () =>
  rss({
    title: `Jan's Blog`,
    // `<description>` field in output xml
    description: `Jan's personal blog is all about Software Engineering.`,
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: import.meta.glob('./blog/**/*.mdx'),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/pretty-feed-v3.xsl',
  })
