import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies).concat('path');

export default {
  input: 'index.js',
  plugins: [
    resolve({
      module: true,
      main: true,
      extensions: [ '.js' ]
    }),
    buble()
  ],
  external: external,
  output: [
    {
      format: 'cjs',
      file: pkg['main']
    },
    {
      format: 'es',
      file: pkg['module']
    }
  ]
};
