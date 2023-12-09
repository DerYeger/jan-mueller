// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck baklavsjs types are not up to date
import type { IBaklavaViewModel } from 'baklavajs'
import {
  BaklavaInterfaceTypes,
  NodeInterface,
  NodeInterfaceType,
  NumberInterface,
  SelectInterface,
  TextInterface,
  allowMultipleConnections,
  defineNode,
  setType,
} from 'baklavajs'
import { Vector } from 'vecti'
import type { ComponentOptions } from 'vue'
import { markRaw } from 'vue'

import VisualizerInterfaceComponent from '~/components/experiments/VisualizerInterface.vue'

const vectorType = new NodeInterfaceType<Vector>('vector')
export class VectorInterface extends NodeInterface<Vector> {
  public constructor(name: string) {
    super(name, new Vector(0, 0))
    this.use(setType, vectorType)
  }
}

export class MultiVectorInterface extends NodeInterface<Vector[]> {
  public constructor(name: string) {
    super(name, [])
    this.use(allowMultipleConnections)
    this.use(setType, vectorType as unknown as NodeInterfaceType<Vector[]>)
  }
}

export class VisualizerInterface extends MultiVectorInterface {
  public component = markRaw(VisualizerInterfaceComponent) as ComponentOptions

  public constructor(name: string) {
    super(name)
    this.setPort(false)
  }
}

const scalarType = new NodeInterfaceType<number>('scalar')

export class ScalarInterface extends NumberInterface {
  public constructor(name: string, value = 0) {
    super(name, value)
    this.use(setType, scalarType)
  }
}

const output = () => new VectorInterface('Output')

function textualOutput() {
  const intf = new TextInterface('Output', '')
  intf.setPort(false)
  return intf
}

const visualizer = () => new VisualizerInterface('Visualizer')

function getRandomInRange(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

const VectorNode = defineNode({
  type: 'Vector',
  inputs: {
    x: () => new ScalarInterface('x'),
    y: () => new ScalarInterface('y'),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ x, y }) {
    const vector = new Vector(x, y)
    return { output: vector, visualizer: [vector] }
  },
})

const RandomVectorNode = defineNode({
  type: 'Random Vector',
  inputs: {
    x: () => new ScalarInterface('x', getRandomInRange(-50, 50)),
    y: () => new ScalarInterface('y', getRandomInRange(-50, 50)),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ x, y }) {
    const vector = new Vector(x, y)
    return { output: vector, visualizer: [vector] }
  },
})

const AddNode = defineNode({
  type: 'AddVectors',
  title: 'Add',
  inputs: {
    a: () => new VectorInterface('A'),
    b: () => new VectorInterface('B'),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ a, b }) {
    const vector = a.add(b)
    return { output: vector, visualizer: [vector] }
  },
})

const SubtractNode = defineNode({
  type: 'SubtractVectors',
  title: 'Subtract',
  inputs: {
    a: () => new VectorInterface('A'),
    b: () => new VectorInterface('B'),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ a, b }) {
    const vector = a.subtract(b)
    return { output: vector, visualizer: [vector] }
  },
})

const MultiplyNode = defineNode({
  type: 'MultiplyVectors',
  title: 'Multiply',
  inputs: {
    vector: () => new VectorInterface('Vector'),
    scalar: () => new ScalarInterface('Scalar', 1),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ vector, scalar }) {
    const result = vector.multiply(scalar)
    return { output: result, visualizer: [result] }
  },
})

const DivideNode = defineNode({
  type: 'DivideVectors',
  title: 'Divide',
  inputs: {
    vector: () => new VectorInterface('Vector'),
    scalar: () => new ScalarInterface('Scalar', 1),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ vector, scalar }) {
    const result = vector.divide(scalar)
    return { output: result, visualizer: [result] }
  },
})

const DotProductNode = defineNode({
  type: 'Dot Product',
  inputs: {
    a: () => new VectorInterface('A'),
    b: () => new VectorInterface('B'),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ a, b }) {
    const result = a.dot(b)
    return { output: result, textualOutput: result.toFixed(2) }
  },
})

const CrossProductNode = defineNode({
  type: 'Cross Product',
  inputs: {
    a: () => new VectorInterface('A'),
    b: () => new VectorInterface('B'),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ a, b }) {
    const result = a.cross(b)
    return { output: result, textualOutput: result.toFixed(2) }
  },
})

const HadamardProductNode = defineNode({
  type: 'Hadamard Product',
  inputs: {
    a: () => new VectorInterface('A'),
    b: () => new VectorInterface('B'),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ a, b }) {
    const result = a.hadamard(b)
    return { output: result, visualizer: [result] }
  },
})

const LengthNode = defineNode({
  type: 'Length',
  inputs: {
    vector: () => new VectorInterface('Vector'),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ vector }) {
    const length = vector.length()
    return { output: length, textualOutput: length.toFixed(2) }
  },
})

const NormalizeNode = defineNode({
  type: 'Normalize',
  inputs: {
    vector: () => new VectorInterface('A'),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ vector }) {
    const result = vector.normalize()
    return { output: result, visualizer: [result] }
  },
})

const RotateNode = defineNode({
  type: 'Rotate',
  inputs: {
    vector: () => new VectorInterface('Vector'),
    angle: () => new ScalarInterface('Angle'),
    unit: () =>
      new SelectInterface('Unit', 'Degrees', ['Degrees', 'Radians']).setPort(
        false,
      ),
  },
  outputs: {
    output,
    visualizer,
  },
  calculate({ vector, angle, unit }) {
    if (unit === 'Degrees') {
      const result = vector.rotateByDegrees(angle)
      return { output: result, visualizer: [result] }
    }
    const result = vector.rotateByRadians(angle)
    return { output: result, visualizer: [result] }
  },
})

const VisualizeNode = defineNode({
  type: 'Visualize',
  inputs: {
    vectors: () => new MultiVectorInterface('Vectors'),
  },
  outputs: {
    visualizer,
  },
  calculate({ vectors }) {
    return { visualizer: vectors }
  },
})

const DebugNode = defineNode({
  type: 'Debug',
  inputs: {
    vector: () => new VectorInterface('Vector'),
  },
  outputs: {
    textualOutput,
  },
  calculate({ vector }) {
    return { textualOutput: `[\n${vector.x}, ${vector.y}\n]` }
  },
})

const TimeNode = defineNode({
  type: 'Time',
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate() {
    const value = Date.now() / 1000
    return { output: value, textualOutput: value.toFixed(2) }
  },
})

const AddScalarsNode = defineNode({
  type: 'AddScalars',
  title: 'Add',
  inputs: {
    a: () => new ScalarInterface('A'),
    b: () => new ScalarInterface('B'),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ a, b }) {
    const result = a + b
    return { output: result, textualOutput: result.toFixed(2) }
  },
})

const SubtractScalarsNode = defineNode({
  type: 'SubtractScalars',
  title: 'Subtract',
  inputs: {
    a: () => new ScalarInterface('A'),
    b: () => new ScalarInterface('B'),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ a, b }) {
    const result = a - b
    return { output: result, textualOutput: result.toFixed(2) }
  },
})

const MultiplyScalarsNode = defineNode({
  type: 'MultiplyScalars',
  title: 'Multiply',
  inputs: {
    a: () => new ScalarInterface('A'),
    b: () => new ScalarInterface('B', 1),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ a, b }) {
    const result = a * b
    return { output: result, textualOutput: result.toFixed(2) }
  },
})

const DivideScalarsNode = defineNode({
  type: 'DivideScalars',
  title: 'Divide',
  inputs: {
    a: () => new ScalarInterface('A'),
    b: () => new ScalarInterface('B', 1),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ a, b }) {
    const result = b !== 0 ? a / b : 0
    return { output: result, textualOutput: result.toFixed(2) }
  },
})

const ModuloNode = defineNode({
  type: 'Modulo',
  inputs: {
    a: () => new ScalarInterface('A'),
    b: () => new ScalarInterface('B', 1),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ a, b }) {
    const result = b !== 0 ? ((a % b) + b) % b : 0
    return { output: result, textualOutput: result.toFixed(2) }
  },
})

const PiNode = defineNode({
  type: 'Pi',
  outputs: {
    output: () => new ScalarInterface('Output', Math.PI),
  },
  calculate() {
    return { output: Math.PI }
  },
})

const waveTypes = ['sin', 'cos', 'tan'] as const

const WaveNode = defineNode({
  type: 'Wave',
  inputs: {
    scalar: () => new ScalarInterface('A'),
    type: () =>
      new SelectInterface(
        'Type',
        waveTypes[0],
        waveTypes as unknown as string[],
      ).setPort(false),
  },
  outputs: {
    output: () => new ScalarInterface('Output'),
    textualOutput,
  },
  calculate({ scalar, type }) {
    const result = Math[type](scalar)
    return { output: result, textualOutput: result.toFixed(2) }
  },
})

const nodeCategories = {
  Basic: [VectorNode, RandomVectorNode, TimeNode, VisualizeNode, DebugNode],
  Vectors: [
    AddNode,
    SubtractNode,
    MultiplyNode,
    DivideNode,
    LengthNode,
    NormalizeNode,
    RotateNode,
    DotProductNode,
    CrossProductNode,
    HadamardProductNode,
  ],
  Scalars: [
    AddScalarsNode,
    SubtractScalarsNode,
    MultiplyScalarsNode,
    DivideScalarsNode,
    ModuloNode,
    PiNode,
    WaveNode,
  ],
}

export function registerAllNodeTypes(baklava: IBaklavaViewModel) {
  const editor = baklava.editor
  const nodeInterfaceTypes = new BaklavaInterfaceTypes(editor, {
    viewPlugin: baklava,
  })
  nodeInterfaceTypes.addTypes(vectorType, scalarType)
  Object.entries(nodeCategories).forEach(([category, nodes]) =>
    nodes.forEach((node) => editor.registerNodeType(node, { category })),
  )
}

export function createExample(baklava: IBaklavaViewModel) {
  const vector = new VectorNode()
  vector.inputs.y.value = 1
  // @ts-expect-error Missing typedef
  vector.position = { x: 270, y: 80 }
  baklava.editor.graph.addNode(vector)

  const time = new TimeNode()
  // @ts-expect-error Missing typedef
  time.position = { x: 270, y: 500 }
  baklava.editor.graph.addNode(time)

  const modulo = new ModuloNode()
  modulo.inputs.b.value = 60
  // @ts-expect-error Missing typedef
  modulo.position = { x: 550, y: 500 }
  baklava.editor.graph.addNode(modulo)

  const multiply = new MultiplyScalarsNode()
  multiply.inputs.b.value = -6
  // @ts-expect-error Missing typedef
  multiply.position = { x: 830, y: 500 }
  baklava.editor.graph.addNode(multiply)

  const rotate = new RotateNode()
  // @ts-expect-error Missing typedef
  rotate.position = { x: 1100, y: 80 }
  baklava.editor.graph.addNode(rotate)

  baklava.editor.graph.addConnection(
    vector.outputs.output,
    rotate.inputs.vector,
  )

  baklava.editor.graph.addConnection(time.outputs.output, modulo.inputs.a)
  baklava.editor.graph.addConnection(modulo.outputs.output, multiply.inputs.a)
  baklava.editor.graph.addConnection(
    multiply.outputs.output,
    rotate.inputs.angle,
  )
}
