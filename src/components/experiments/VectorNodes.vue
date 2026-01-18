<script setup lang="ts">
// @ts-nocheck baklavajs types are incomplete
import '@baklavajs/themes/dist/syrup-dark.css'
import { DependencyEngine, EditorComponent, applyResult, useBaklava } from 'baklavajs'
import { onBeforeUnmount } from 'vue'

import { createExample, registerAllNodeTypes } from '@components/experiments/nodes'

const baklava = useBaklava()
registerAllNodeTypes(baklava)
createExample(baklava)

const engine = new DependencyEngine(baklava.editor)
const token = Symbol('engine')
engine.events.afterRun.subscribe(token, (result) => {
  engine.pause()
  applyResult(result, baklava.editor)
  engine.resume()
})

engine.start()

const interval = setInterval(() => {
  engine.start()
}, 1000)

onBeforeUnmount(() => {
  clearInterval(interval)
  engine.events.afterRun.unsubscribe(token)
})
</script>

<template>
  <EditorComponent :view-model="baklava" />
</template>

<style>
.node-container .baklava-node[data-node-type='Visualize'] {
  width: 20rem !important;
}

.baklava-node-interface[data-interface-type='scalar'] .__port {
  background-color: red;
}

.baklava-node-interface[data-interface-type='vector'] .__port {
  background-color: green;
}
</style>
