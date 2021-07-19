---
title: FinWa
description: Web application that visualizes finances.
repository: finwa
demo: https://finwa.yeger.eu
thumbnail: finwa/thumbnail.webp
---

FinWa, a PWA with partially statically generated pages, is my third Nuxt project.

It is a web application for the visualization of incomes and expenses.
These can be created for singular months as well as a recurring cash flow.
For the latter, interval and optional end months can be defined.
In addition, expenses can be classified into customizable categories.

Data is stored exclusively in `localStorage`, so that privacy is ensured.
To achieve a clean separation of the Vuex store, I used *namespaces* for the first time.
Additionally, the libraries [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) and [vue-persistent-storage-manager](https://github.com/DerYeger/vue-persistent-storage-manager) were used.
While the former synchronizes store and `localStorage`, the second library, developed by me, enables requesting a persistence permission as well as displaying storage consumption.

[Chart.js](https://www.chartjs.org/) is used to display the graphs shown below.

<div class="mb-4">
  <v-row>
    <v-col :sm="12" :cols="6" :lg="6">
      <asset-image src="projects/finwa/home.webp" alt="FinWa Home"></asset-image>
    </v-col>
    <v-col :sm="12" :cols="6" :lg="6">
      <asset-image src="projects/finwa/overview.webp" alt="FinWa Overview"></asset-image>
    </v-col>
  </v-row>
</div>
