/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.vue' {
  // eslint-disable-next-line ts/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
