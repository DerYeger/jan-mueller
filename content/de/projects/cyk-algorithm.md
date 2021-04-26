---
title: CYK Algorithm
description: Kotlin Multiplatform Implementierung des CYK-Algorithmus.
repository: cyk-algorithm
---

Bei der Entwicklung dieser Bibliothek habe ich meine ersten Erfahrungen mit Kotlin Multiplatform gemacht.
Sie implementiert den CYK-Algorithmus mit dem Ziel, Daten zur Nachvollziehbarkeit der Ausführungsschritte zu generieren.
Mein verwandtes Projekt [CYK Visualizer](/de/projects/cyk-visualizer) nutzt die generierten Daten, um den Algorithmus zu visualisieren.

Das Veröffentlichen einer Kotlin Multiplatform Bibliothek erwies sich im Vergleich zu einfachen JVM-Bibliotheken als recht schwierig.
Schließlich stieß ich auf [diesen StackOverflow-Beitrag](https://stackoverflow.com/questions/63176482/publish-kotlin-mpp-metadata-with-gradle-kotlin-dsl/63502756#63502756).
Die mitgelieferte Gradle-Konfiguration ermöglichte es mir schließlich, die Bibliothek ordnungsgemäß zu veröffentlichen und sie sowohl in Kotlin/JVM- als auch in Kotlin/JS-Projekten zu verwenden.
