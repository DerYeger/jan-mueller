/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}
