---
title: Apollo
description: A web application for first-order model checking in graph structures.
repositories: [apollo, apollo-frontend, apollo-backend, apollo-admin]
demo: https://apollo.yeger.eu
thumbnail: apollo/thumbnail.webp
---

Apollo, a web application for first-order model checking in graph structures, is the result of my [bachelor's thesis](/documents/bachelor-thesis).

The [backend](https://github.com/DerYeger/apollo-backend/) is a Kotlin/JVM application.
It is responsible for parsing first-order-logic formulas and performing the model checking algorithm.
Its parsing and validation logic is built upon a Java desktop application by Arno Ehle and Benedikt Hruschka.
However, the model checking algorithm has been rewritten from scratch to generate various levels of feedback to visualize results.
The codebase is almost entirely covered by tests and has automatically generated [documentation](https://apollo-backend.yeger.eu/).

Apollo's [frontend](https://github.com/DerYeger/apollo-frontend/) is an Angular PWA.
An interactive graph editor, custom-built with D3.js, enables the creation of graph structures.
Graphs can be saved locally as well as exported and imported in JSON and YAML formats.
Results of the model checking algorithm are visualized in a tree structure, in which each node represents a (sub-)formula that has been checked.
Using *compodoc*, the frontend's [documentation](https://apollo-frontend.yeger.eu/) is automatically generated on releases.
