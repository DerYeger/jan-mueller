/// <reference path="../.astro/types.d.ts" />

declare module '*.vue' {
  // eslint-disable-next-line ts/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
