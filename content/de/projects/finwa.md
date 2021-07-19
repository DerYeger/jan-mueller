---
title: FinWa
description: Webanwendung zur Visualisierung von Finanzen.
repository: finwa
demo: https://finwa.yeger.eu
thumbnail: finwa/thumbnail.webp
---

FinWa ist mein drittes Nuxt-Projekt, bei dem eine PWA mit teilweise statisch generierten Seiten entstand.

Es handelt sich um eine Webanwendung zur Visualisierung von Einnahmen und Ausgaben.
Dabei können diese sowohl für einzelne Monate als auch als wiederkehrende Geldflüsse eingetragen werden.
Bei letzteren können Intervall und optional Endmonate festgelegt werden.
Zudem lassen sich Ausgaben in anpassbare Kategorien einordnen.

Daten werden ausschließlich im `localStorage` hinterlegt, sodass die Privatsphäre sichergestellt ist.
Dementsprechend liegt kein Backend vor.
Um eine saubere Trennung des Vuex Stores zu erreichen, verwendete ich erstmals *Namespaces*.
Zusätzlich kamen die Bibliotheken [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) und [vue-persistent-storage-manager](https://github.com/DerYeger/vue-persistent-storage-manager) zum Einsatz.
Während erstere Store und `localStorage` synchronisiert, ermöglicht die zweite, von mir entwickelte Bibliothek das Anfragen einer Persistenzgenehmigung sowie das Anzeigen von Speicherverbräuchen.

Zur Darstellung der nachfolgend abgebildeten Graphen wird [Chart.js](https://www.chartjs.org/) verwendet.

<div class="mb-4">
  <v-row>
    <v-col :sm="12" :cols="6" :lg="6">
      <asset-image src="projects/finwa/home.webp" alt="FinWa Startseite"></asset-image>
    </v-col>
    <v-col :sm="12" :cols="6" :lg="6">
      <asset-image src="projects/finwa/overview.webp" alt="FinWa Übersicht"></asset-image>
    </v-col>
  </v-row>
</div>
