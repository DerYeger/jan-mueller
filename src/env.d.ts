/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference lib="webworker" />
/// <reference types="vite-plugin-comlink/client" />

declare module '*.vue' {
  const component: DefineComponent<object, object, any>
  export default component
}
