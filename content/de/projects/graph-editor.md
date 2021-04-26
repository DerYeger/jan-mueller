---
title: Graph Editor
description: Editor für gerichtete Graphen, gebaut mit D3.js.
repository: graph-editor
demo: https://graph.yeger.eu
---

Für meine Bachelorarbeit benötigte ich einen interaktiven Grapheditor.
Basierend auf dieser Implementierung habe ich ein abgespecktes Demo-Tool erstellt.
Ich entfernte domänenspezifische Features, wie das Hinzufügen von Labels zu Knoten und Links, und portierte es von Angular nach Vue.

Es war überraschend schwierig, browserübergreifende Touch-Controls zu realisieren, da sich einige Events sehr unterschiedlich verhalten.
Obwohl ich für die Erstellung von Links auf `PointerEvent` zurückgriff, führten Maus- und Touch-Interaktion dazu, dass Ereignisse für unterschiedliche DOM-Elemente ausgelöst wurden.
Insbesondere lieferten Touch-Eingaben immer die gleichen Elemente für `pointerdown` und `pointerup`.
Dies geschah unabhängig von dem tatsächlichen Element, das `pointerup` hätte liefern sollen, und entsprach nicht dem Verhalten von Mauseingaben.

Die Lösung war die Verwendung von separaten Events für Maus- und Touch-Eingaben.
Außerdem prüfen Touch-Ereignisse nun auf Überschneidungen zwischen Knoten und Mauszeiger, um ein Erstellen von Links zu erkennen.

## Demo
<demo-frame src="https://graph.yeger.eu" title="Graph Editor"></demo-frame>
