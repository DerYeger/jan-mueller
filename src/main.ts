import MasonryWall from '@yeger/vue-masonry-wall'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import * as VueMarmosetViewer from 'vue-marmoset-viewer'

import App from './App.vue'

import '@unocss/reset/normalize.css'
import 'uno.css'
import './styles/main.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
      i.install?.(ctx)
    )
    ctx.app.use(MasonryWall)
    ctx.app.use(VueMarmosetViewer.MarmosetViewer)
  }
)
