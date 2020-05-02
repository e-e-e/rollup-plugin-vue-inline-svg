const chai = require('chai')
const sinon = require('sinon')
const { rollup } = require('rollup')
const svg = require('../')

const expect = chai.expect

function makeBundle(options, stringOptions) {
  options.plugins = [svg(stringOptions)]
  return rollup(options)
}

describe('rollup-plugin-vue-inline-svg', () => {
  it('should import svg from file as a compiled vue component', () => {
    return makeBundle({ input: 'test/fixtures/basic.js' }, { include: '**/*.svg' })
    .then(bundle =>  bundle.generate({ format: 'es', name: 'tpl' }))
    .then(({code, map}) => {
      const spy = sinon.spy()
      // run self testing code
      new Function('expect', 'spy', code)(expect, spy);
    });
  });
  it('should import svg from a node_module package as a compiled vue component', () => {
    return makeBundle({ input: 'test/fixtures/from-node-modules.js' }, { include: '**/*.svg' })
    .then(bundle =>  bundle.generate({ format: 'es', name: 'tpl' }))
    .then(({code, map}) => {
      const spy = sinon.spy()
      new Function('expect', 'spy', code)(expect, spy);
    });
  });
});
