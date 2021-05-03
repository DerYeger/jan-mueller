---
title: CYK Algorithm
description: Kotlin Multiplatform implementation of the CYK algorithm.
repository: cyk-algorithm
thumbnail: cyk-algorithm/thumbnail.webp
---

I made my first experiences with Kotlin Multiplatform while developing this library.
It implements the CYK algorithm with a focus on providing educational data by tracing evaluation steps.
My related project [CYK Visualizer](/projects/cyk-visualizer) uses the generated data to visualize the algorithm.

Publishing a Kotlin Multiplatform library turned out to be quite difficult, compared to plain JVM libraries.
Eventually, I came across [this StackOverflow post](https://stackoverflow.com/questions/63176482/publish-kotlin-mpp-metadata-with-gradle-kotlin-dsl/63502756#63502756).
The supplied Gradle configuration finally allowed me to properly publish the library and use it in both Kotlin/JVM and Kotlin/JS projects.
