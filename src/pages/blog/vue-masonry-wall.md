---
title: Masonry layout for Vue 2 and Vue 3
description: Responsive masonry layout with SSR support and zero dependencies for Vue 2 and Vue 3.
date: 2021-08-16
tags: [Vue, Masonry, Layout]
language: english
---

# {{frontmatter.title}}

> {{ frontmatter.description }}

## Introduction

In quite a few of my Vue 2 projects I'm using the library [vue-masonry-wall](https://github.com/fuxingloh/vue-masonry-wall).
Its ease-of-use and SSR support were key factors in my decision to use this library in particular.

However, I'm currently in the progress of preparing my projects for the release of Nuxt 3 and the accompanying migration to Vue 3.
Since I couldn't find a comparable masonry layout for Vue 3, I chose to create a new library based on [Fuxing Loh's](https://github.com/fuxingloh) `vue-masonry-wall`.

The result is [@yeger/vue-masonry-wall](https://github.com/DerYeger/vue-masonry-wall), a rewrite of the original library in TypeScript and Vue 3.
It has no dependencies, resulting in a bundle size decrease of up to 54%.

I also created [@yeger/vue2-masonry-wall](https://github.com/DerYeger/vue2-masonry-wall) for use in Vue 2 projects.
It, too, drops any dependencies, achieving a bundle size decrease of up to 40%

In addition, multiple issues have been fixed.
Notably, spacing (`gap`) is now considered while calculating the column count, and the removal of elements is now supported.

## Installation

### Vue 2

```bash
# yarn
$ yarn add @yeger/vue2-masonry-wall

# npm
$ npm install @yeger/vue2-masonry-wall
```

First, you have to install the component like any other plugin.
Consult the [Vue 2 documentation](https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin) for detailed information on installing plugins.

```ts
import MasonryWall from '@yeger/vue2-masonry-wall'
import Vue from 'vue'

Vue.use(MasonryWall)
```

### Vue 3

```bash
# yarn
$ yarn add @yeger/vue-masonry-wall

# npm
$ npm install @yeger/vue-masonry-wall
```

First, you have to install the component like any other plugin.
Consult the [Vue 3 documentation](https://v3.vuejs.org/guide/plugins.html#using-a-plugin) for detailed information on installing plugins.

```ts
import MasonryWall from '@yeger/vue-masonry-wall'
import { createApp } from 'vue'

const app = createApp()

app.use(MasonryWall)
```

## Usage

The component is available as `masonry-wall` or `MasonryWall`.
The only required prop is `items`, an array of type `any`.
Each element of `items` is passed to the default slot, alongside its index.
The prop `column-width` takes in a `number`, specifying the targeted column width.
It is used to calculate the column count but does not define the actual width of columns.
Similarly, `gap` defines the gaps between items in pixels and is respected while calculating the column count.
Lastly, the prop `ssr-columns` can be used to specify the column count in server-side-rendering contexts.

While every prop of the component is reactive, mutations to the `items` array will not update the layout.
To force updates, assign a new array to the `items` prop.

### Example

The following example demonstrates basic usage of the component.
For interactive demonstrations, visit [vue-masonry-wall.yeger.eu](https://vue-masonry-wall.yeger.eu/) or [vue2-masonry-wall.yeger.eu](https://vue2-masonry-wall.yeger.eu/).

```vue
<script>
export default {
  data() {
    return {
      items: [
        { content: 'First', height: 150 },
        { content: 'Second', height: 300 },
        { content: 'Third', height: 150 },
        { content: 'Fourth', height: 450 },
      ],
    }
  },
}
</script>

<template>
  <MasonryWall :items="items" :ssr-columns="1" :column-width="300" :gap="16">
    <template #default="{ item }">
      <div :style="{ height: `${item.height}px` }">
        {{ item.content }}
      </div>
    </template>
  </MasonryWall>
</template>
```
