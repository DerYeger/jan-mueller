/// <reference path="../.astro/types.d.ts" />

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}
