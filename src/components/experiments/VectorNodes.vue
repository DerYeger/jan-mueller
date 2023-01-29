<script setup lang="ts">
import {
  Components,
  DependencyEngine,
  EditorComponent,
  applyResult,
  useBaklava,
} from 'baklavajs'

import '@baklavajs/themes/dist/syrup-dark.css'
import { registerAllNodeTypes } from '~/components/experiments/nodes'

const BaklavaNode = Components.Node

const baklava = useBaklava()
registerAllNodeTypes(baklava)

const engine = new DependencyEngine(baklava.editor)
const token = Symbol('engine')
engine.events.afterRun.subscribe(token, (result) => {
  engine.pause()
  applyResult(result, baklava.editor)
  engine.resume()
})
engine.start()
</script>

<template>
  <EditorComponent :view-model="baklava">
    <template #node="nodeProps">
      <BaklavaNode
        v-if="nodeProps.node.type === 'Visualize'"
        :key="`${nodeProps.node.id}-visualize`"
        v-bind="nodeProps"
        style="width: 20rem"
      />
      <BaklavaNode v-else :key="nodeProps.node.id" v-bind="nodeProps" />
    </template>
  </EditorComponent>
</template>

<style>
.baklava-node-interface[data-interface-type='scalar'] .__port {
  background-color: red;
}

.baklava-node-interface[data-interface-type='vector'] .__port {
  background-color: green;
}
</style>
