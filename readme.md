# rollup-plugin-vue-inline-svg
[![Build Status](https://travis-ci.org/e-e-e/rollup-plugin-vue-inline-svg.svg?branch=master)](https://travis-ci.org/e-e-e/rollup-plugin-vue-inline-svg)

A simple plugin to import svg files as vue components. This is intended to be used with [rollup-plugin-vue](https://www.npmjs.com/package/rollup-plugin-vue) and is based on [vue-svg-loader](https://www.npmjs.com/package/vue-svg-loader).

## installation

```sh
npm install --save-dev rollup-plugin-vue-inline-svg
```

## usage

**rollup.config.js**
```js
import svg from 'rollup-plugin-vue-inline-svg';
import vue from 'rollup-plugin-vue'; // optional

export default {
  // ...
  plugins: [
    svg(config)
    vue(), // optional
  ]
}
```

### config

By default this plugin will attempt to transform all files that end with the extension `.svg`.
You can be more explicit by passing include and exclude options.

```js
// `include` and `exclude` can each be a minimatch
// pattern, or an array of minimatch patterns, relative to process.cwd()
{
  include: string or array of minimatch,
  exclude: string or array,
  svgoConfig: svgo config object,
}
```

See [SVGO](https://github.com/svg/svgo) for configuration options that it accepts.

### Import svgs from `node_modules`

The plugin is able to import svg files from `node_modules` packages:

```js
import AlertSvg from 'octicons/build/svg/alert.svg'
```

The only important thing to remember is that the **rollup build process needs to be started from the project root directory** (e.g. via npm scripts). This is because the plugin will search the `node_modules` directory, via the `process.cwd()` [node method](https://nodejs.org/api/process.html#process_process_cwd), from where the process has started.
