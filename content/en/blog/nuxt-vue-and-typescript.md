---
title: Nuxt, Vue and TypeScript
---

## Routing

Following an [official guide](https://nuxtjs.org/blog/creating-blog-with-nuxt-content) to get started I had weird issues with routing.
My problem was the file structure:

```
├── pages
│   ├── index.vue
│   ├── blog.vue
│   ├── blog
│   │   └── _slug.vue
```

When navigating from `/blog` to e.g. `/blog/hello-world`, the route changed and the component was instantiated, but the DOM didn't change.
After some trial and error I found an easy fix (which I should have discovered earlier to be fair):
Moving `blog.vue` to `/blog/index.vue`, as seen below.

```
├── pages
│   ├── index.vue
│   ├── blog
│   │   ├── index.vue
│   │   └── _slug.vue
```

## Problems with type checking

Even though I selected TypeScript in `create-nuxt-app`, the generated code wasn't set up properly.
(**Update:** The problem has been fixed in a new version of `create-nuxt-app`.)
For one, the TypeScript dependency was missing in `package.json`.
Furthermore, I replaced all `nuxt-ts` commands with `nuxt` since they were causing warnings.
Components declared as

```ts[pages/index.vue]
export default {
  ...
}
```

or

```ts[pages/index.vue]
import Vue from 'vue'

export default Vue.extend({
  ...
})
```

had issues with type checking, resulting in errors during static site generation.
Instead, I had to use the composition API.
Since I am using Nuxt 2.x.x I had to resort to the [Nuxt Composition API](https://composition-api.nuxtjs.org/).

```ts[pages/index.vue]
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  ...
})
```

## Styling Markdown code with Prism

Turns out Vuetify's styles are colliding with Prism's.
An easy fix is to unset the styles of the affected code blocks.

```scss[assets/style.scss]
.nuxt-content-highlight code {
    all: unset !important;
}
```

## Opinion and conclusion

So far using Nuxt was a refreshing experience.
The possibility to iterate rather quickly compared to Angular is nice.
Build times and nearly instantaneous changes are awesome.
Though opaque (and in some cases missing) error messages resulted in an avoidable and cumbersome roadblock.
After building multiple websites using the Nuxt, Vue, and TypeScript stack and learning about most of its quirks, my opinion has shifted to the positive.
The speed of development and ease of UI development that comes with frameworks like Vuetify has resulted in a highly enjoyable experience.
