---
title: Masonry layout in Vue 3
description: Responsive masonry layout with SSR support and zero dependencies for Vue 3.
createdAt: 2021-08-16
tags: [Vue, Masonry, Layout]
---

## Introduction

In quite a few of my Vue 2 projects I'm using the library [vue-masonry-wall](https://github.com/fuxingloh/vue-masonry-wall).
Its ease-of-use and SSR support were key factors in my decision to use this library in particular.

However, I'm currently in the progress of preparing my projects for the release of Nuxt 3 and the accompanying migration to Vue 3.
Since I couldn't find a comparable masonry layout for Vue 3, I chose to create a new library based on [Fuxing Loh's](https://github.com/fuxingloh) `vue-masonry-wall`.

The result is [@yeger/vue-masonry-wall](https://github.com/DerYeger/vue-masonry-wall), a rewrite of the original library in TypeScript and Vue 3.
It has no dependencies, resulting in a bundle size decrease of up to 54%.

In addition, multiple issues have been fixed.
Notably, padding is now considered while calculating the column count, and the removal of elements is now supported.

## Installation

```bash[bash]
# yarn
$ yarn add @yeger/vue-masonry-wall

# npm
$ npm install @yeger/vue-masonry-wall
```

## Usage

First, you have to install the component like any other plugin.
Consult the [Vue 3 documentation](https://v3.vuejs.org/guide/plugins.html#using-a-plugin) for detailed information on installing plugins.

```ts[ts]
import { createApp } from 'vue'
import MasonryWall from '@yeger/vue-masonry-wall'

const app = createApp()

app.use(MasonryWall)
```

Afterward, the component is available as `masonry-wall` or `MasonryWall`.
The only required prop is `items`, an array of type `any`.
Each element of `items` is passed to the default slot, alongside its index.
The prop `columnWidth` takes in a `number`, specifying the targeted column width.
It is used to calculate the column count but does not define the actual width of columns.
Similarly, `padding` defines the padding between items in pixels and is respected while calculating the column count.
Lastly, the prop `ssrColumns` can be used to specify the column count in server-side-rendering contexts.

While every prop of the component is reactive, mutations to the `items` array will not update the layout.
To force updates, assign a new array to the `items` prop.

The following example demonstrates basic usage of the component.
For an interactive demonstration, visit [vue-masonry-wall.yeger.eu](https://vue-masonry-wall.yeger.eu/).

```vue[vue]
<template>
  <masonry-wall :items="items" :ssrColumns="1" :columnWidth="300" :padding="16">
    <template #default="{ item, index }">
      <div :style="`height: ${item.height}px`">
        <h1>{{ item.title }}</h1>
        <span>{{ item.description }}</span>
      </div>
    </template>
  </masonry-wall>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'First', description: 'The first item.', height: 150 },
        { title: 'Second', description: 'The second item.', height: 300 },
        { title: 'Third', description: 'The second item.', height: 150 },
        { title: 'Fourth', description: 'The second item.', height: 450 },
      ]
    }
  }
}
</script>
```
