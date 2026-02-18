import { toString } from 'hast-util-to-string'
import { h } from 'hastscript'
import { escape } from 'html-escaper'
import type { Options } from 'rehype-autolink-headings'

// The following configuration for rehype-autolink-headings was taken from https://github.com/withastro/docs/blob/main/astro.config.ts
const AnchorLinkIcon = h(
  'svg',
  {
    ariaHidden: 'true',
    width: '1em',
    height: '1em',
    version: 1.1,
    viewBox: '0 0 24 24',
    xlmns: 'http://www.w3.org/2000/svg',
  },
  h(
    'g',
    {
      fill: 'none',
      stroke: 'currentColor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 2,
    },
    h('path', {
      d: 'M13.544 10.456a4.37 4.37 0 0 0-6.176 0l-3.089 3.088a4.367 4.367 0 1 0 6.177 6.177L12 18.177',
    }),
    h('path', {
      d: 'M10.456 13.544a4.37 4.37 0 0 0 6.176 0l3.089-3.088a4.367 4.367 0 1 0-6.177-6.177L12 5.823',
    }),
  ),
)

function createSROnlyLabel(text: string) {
  return h('span', { class: 'sr-only' }, `Section titled ${escape(text)}`)
}

export const autolinkConfig: Options = {
  properties: { class: 'anchor-heading' },
  behavior: 'append',
  content: (heading) => [AnchorLinkIcon, createSROnlyLabel(toString(heading))],
}
