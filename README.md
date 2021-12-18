# unplugin-opentelemetry

[![NPM version](https://img.shields.io/npm/v/unplugin-opentelemetry?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-opentelemetry)

## Install

```bash
npm i unplugin-opentelemetry
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import otel from 'unplugin-opentelemetry/vite'

export default defineConfig({
  plugins: [
    otel({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import otel from 'unplugin-opentelemetry/rollup'

export default {
  plugins: [
    otel({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-opentelemetry/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-opentelemetry/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-opentelemetry/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>
