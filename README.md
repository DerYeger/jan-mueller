<p align="center">
  <img src="/public/og-logo.png" alt="Logo" width="384px">
</p>

<p align="center">
  Personal website of <a href="https://github.com/DerYeger">
    Jan M&uuml;ller
  </a>
</p>

<p align="center">
  <a href="https://github.com/DerYeger/jan-mueller/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/DerYeger/jan-mueller/CI?label=ci&logo=github&color=#4DC71F">
  </a>
  <a href="https://github.com/DerYeger/jan-mueller/actions/workflows/cd.yml">
    <img alt="CD" src="https://img.shields.io/github/workflow/status/DerYeger/jan-mueller/CD?label=cd&logo=github&color=#4DC71F">
  </a>
  <a href="https://dashboard.cypress.io/projects/nhkgy5/runs">
    <img alt="Cypress Status" src="https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/nhkgy5/master&style=flat&logo=cypress">
  </a>
  <a href="https://dashboard.cypress.io/projects/nhkgy5/runs">
    <img alt="Cypress Status" src="https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/count/nhkgy5/master&style=flat&logo=cypress">
  </a>
</p>

<p align="center">
  <a href="https://jan-mueller.at">
    jan-mueller.at
  </a>
</p>

## Features

- Vue 3 with composition API and `<script setup>`
- SSG based on [Vitesse](https://github.com/antfu/vitesse)
- Styled using [UnoCSS](https://github.com/antfu/unocss)
- E2E testing with [Cypress](https://www.cypress.io/)
- Unit testing with [Vitest](https://vitest.dev/)
- Automated CI/CD pipeline using GitHub Actions
- Hosted by GitHub Pages at [jan-mueller.at](https://jan-mueller.at)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3333
$ yarn dev

# build for production and launch preview server
$ yarn build
$ yarn preview

# run unit tests
$ yarn test

# run e2e tests
$ yarn test:e2e

# lint
$ yarn lint
```
