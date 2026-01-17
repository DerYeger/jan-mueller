/// <reference types="astro/client" />
/// <reference lib="webworker" />
/// <reference types="vite-plugin-comlink/client" />

import '../.astro/types.d.ts'

declare module '*.vue' {
  const component: DefineComponent<object, object, any>
  export default component
}
