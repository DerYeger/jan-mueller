---
title: REFUNK
description: A library for studying primitive recursive functions with Kotlin.
repository: refunk
thumbnail: refunk/thumbnail.webp
---

**_REFUNK_** was my first Kotlin project.
It's a library for studying and evaluating primitive recursive functions which I developed in parallel to the University of Kassel's course *Theoretical computer science: Computability and formal languages*.
Thus, it follows closely the syntax and formalities of that course and provides an expressive DSL.

My project [**_REFUNK_ Playground**](/projects/refunk-playground) provides an interactive editor for this library.

## Basic functions

The entire library, including every provided function, builds on the three basic functions:

- `constant(value)`, `const(value)`, `zero` and `one`.
- `Successor` and `successor`.
- `projection(index)` and `first` to `tenth`.

## Composition

Function composition is handled by the `Composition` class and various wrapper methods.

```kotlin
val f = ... 
val g1 = ... 
...
val gn = ...
val myComposition = f of { g1 and ... and gn }
val myAltComp = f(g1, ..., gn)
```

The following example demonstrates simple composition using the, in this case optional, projections `first` and `second`.

```kotlin
// f(x, y) = 2 * (x + y)
val f = multiplication(const(2), addition(first, second)) // `addition(first, second)` is equal to `addition`
val result = f(10, 11) // = 42
```

Unary functions can also be composed with `Function::andThen`

```kotlin
val myComposition = myFunction andThen myUnaryFunction
```

## Recursion

Recursions can be defined using multiple extension methods.

```kotlin
val myRecursion = recursive(myRecursiveCaseFunction) withBaseCase myBaseCaseFunction                
...             = recursive { 
                        aFunction of anotherFunction 
                  } withBaseCase { 
                        someFunction andThen someOtherFunction 
                  }
```

Named projections help access the recursion results, parameters and arguments.

```kotlin        
val addition = recursive { successor of recursionResult } withBaseCase firstBaseCaseArgument
val predecessor = recursive { recursionParameter } withBaseCase zero
```

## Invocation

The operator `Function::invoke` evaluates a function for the given arguments.

```kotlin
val addTwo = successor andThen successor
println(addTwo(0)) // Prints 2
println(addTwo(40)) // Prints 42

val myFunction = predecessor of addition
println(myFunction(3, 40)) // Prints 42
```
