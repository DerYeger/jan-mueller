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

const textualOutput = () => {
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
  type: 'Add',
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
  type: 'Subtract',
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
  type: 'Multiply',
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
  type: 'Divide',
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
        false
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

const nodeCategories = {
  Basic: [VectorNode, RandomVectorNode, VisualizeNode, DebugNode],
  Operations: [
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
}

export function registerAllNodeTypes(baklava: IBaklavaViewModel) {
  const editor = baklava.editor
  const nodeInterfaceTypes = new BaklavaInterfaceTypes(editor, {
    viewPlugin: baklava,
  })
  nodeInterfaceTypes.addTypes(vectorType, scalarType)
  Object.entries(nodeCategories).forEach(([category, nodes]) =>
    nodes.forEach((node) => editor.registerNodeType(node, { category }))
  )
}
