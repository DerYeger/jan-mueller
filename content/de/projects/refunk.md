---
title: REFUNK
description: Eine Bibliothek zum Studieren von primitiven rekursiven Funktionen mit Kotlin.
repository: refunk
thumbnail: refunk/thumbnail.webp
---

**_REFUNK_** war mein erstes Kotlin-Projekt.
Es handelt sich um eine Bibliothek zum Studieren und Auswerten primitiver rekursiver Funktionen, welche ich parallel zur Vorlesung *Theoretische Informatik: Berechenbarkeit und formale Sprachen* der Universität Kassel entwickelt habe.
Infolgedessen lehnt sie sich eng an die Syntax und Formalitäten dieses Kurses an und bietet eine ausdrucksstarke DSL.

Mein Projekt [**_REFUNK_ Playground**](/de/projects/refunk-playground) bietet einen interaktiven Editor zum Verwenden dieser Bibliothek.

## Grundfunktionen

Die gesamte Bibliothek, einschließlich jeder bereitgestellten Funktion, baut auf den drei Grundfunktionen auf:

- `constant(value)`, `const(value)`, `zero` und `one`.
- `Successor` und `successor`.
- `projection(index)` und `first` bis `tenth`.

## Komposition

Die Funktionskomposition wird durch die Klasse `Composition` und verschiedene Wrapper-Methoden gehandhabt.

```kotlin
val f = ... 
val g1 = ... 
...
val gn = ...
val myComposition = f of { g1 and ... and gn }
val myAltComp = f(g1, ..., gn)
```

Das folgende Beispiel demonstriert eine einfache Komposition unter Verwendung der, in diesem Fall optionalen, Projektionen `first` und `second`.

```kotlin
// f(x, y) = 2 * (x + y)
val f = multiplication(const(2), addition(first, second)) // `addition(first, second)` ist äquivalent zu `addition`
val result = f(10, 11) // = 42
```

Unäre Funktionen können auch mit `Function::andThen` zusammengesetzt werden.

```kotlin
val myComposition = myFunction andThen myUnaryFunction
```

## Rekursion

Rekursionen können mit mehreren Erweiterungsmethoden definiert werden.

```kotlin
val myRecursion = recursive(myRecursiveCaseFunction) withBaseCase myBaseCaseFunction                
...             = recursive { 
                        aFunction of anotherFunction 
                  } withBaseCase { 
                        someFunction andThen someOtherFunction 
                  }
```

Benannte Projektionen helfen beim Zugriff auf die Rekursionsergebnisse, -parameter und -argumente.

```kotlin        
val addition = recursive { successor of recursionResult } withBaseCase firstBaseCaseArgument
val predecessor = recursive { recursionParameter } withBaseCase zero
```

## Funktionsinvokation

Der Operator `Function::invoke` wertet Funktionen für angegebene Argumente aus.

```kotlin
val addTwo = successor andThen successor
println(addTwo(0)) // Gibt 2 aus
println(addTwo(40)) // Gibt 42 aus

val myFunction = predecessor of addition
println(myFunction(3, 40)) // Gibt 42 aus
```
