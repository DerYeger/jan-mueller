/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.vue' {
  const component: DefineComponent<object, object, any>
  export default component
}
