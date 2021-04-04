---
title: Graph Editor
description: Simple editor for directed graphs, built with D3.js.
repository: graph-editor
demo: https://graph.yeger.eu
---

My bachelor thesis required an interactive graph editor.
Based on that implementation I created a stripped-down demonstration tool.
I removed domain specific-features, like adding labels to nodes and links and ported it from Angular to Vue.

Getting cross-browser touch controls to work was quite difficult, because of wildly different behavior for some events.
Even though I relied on `PointerEvent` for creating links, mouse and touch interaction resulted in events firing for different DOM elements.
In particular, touch input always provided the same elements for both `pointerdown` and `pointerup`.
This happened regardless of the actual element `pointerup` should have provided and did not match the behavior of mouse inputs.

The solution I came up with was to use separate events for mouse and touch input.
In addition, touch events now check for intersections between nodes and the pointer to handle the creating of links.

## Demo
<demo-frame src="https://graph.yeger.eu" title="Graph Editor"></demo-frame>
