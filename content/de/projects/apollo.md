---
title: Apollo
description: Eine Webanwendung zur prädikatenlogischen Modellprüfung von Graphstrukturen.
repositories: [apollo, apollo-frontend, apollo-backend]
demo: https://apollo.yeger.eu
thumbnail: apollo/thumbnail.webp
---

Apollo, eine Webanwendung zur prädikatenlogischen Modellprüfung von Graphstrukturen, ist das Ergebnis meiner [Bachelorarbeit](/de/documents/bachelor-thesis).

Das [Backend](https://github.com/DerYeger/apollo-backend/) ist eine Kotlin/JVM Anwendung.
Es ist für das Parsen von Formeln der Prädikatenlogik erster Ordnung und die Durchführung des Modellprüfungsalgorithmus verantwortlich.
Seine Parsing- und Validierungslogik basiert auf einer Java-Desktop-Anwendung von Arno Ehle und Benedikt Hruschka.
Der Modellprüfungsalgorithmus wurde jedoch von Grund auf neu geschrieben, um verschiedene Feedback-Stufen zur Visualisierung der Ergebnisse zu generieren.
Die Codebasis wird fast vollständig durch Tests abgedeckt und verfügt über automatisch generierte [Dokumentation] (https://apollo-backend.yeger.eu/).

Apollos [Frontend](https://github.com/DerYeger/apollo-frontend/) ist eine Angular-PWA.
Ein interaktiver Grapheditor, welcher eigens mit D3.js entwickelt wurde, ermöglicht eine Erstellung von Graphstrukturen.
Graphen können sowohl lokal gespeichert als auch in den Formaten JSON und YAML exportiert sowie importiert werden.
Die Ergebnisse des Modellprüfungsalgorithmus werden in einer Baumstruktur visualisiert, in der jeder Knoten eine geprüfte (Unter-)Formel repräsentiert.
Mithilfe von *compodoc* wird die [Dokumentation](https://apollo-frontend.yeger.eu/) des Frontends bei Releases automatisch generiert.
