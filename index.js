import path from 'path';
import { createFilter } from '@rollup/pluginutils';
import SVGO from 'svgo';
import compiler from 'vue-template-compiler';
import transpile from 'vue-template-es2015-compiler';

const optimizeSvg = (content, config, path) => new Promise((resolve, reject) => {
  const svgo = new SVGO(config);
  svgo.optimize(content, { path }).then((result) => {
    if (result.error) return reject(result.error);
    return resolve(result.data);
  });
});

export default function (options) {
  const include = options && options.include;
  const exclude = options && options.exclude;
  const config = options && options.svgoConfig || { plugins: ['removeDoctype', 'removeComments'] };
  const filter = createFilter(include || '**/*.svg', exclude);
  return {
    name: 'vue-inline-svg',
    resolveId: function (source) {
      // Metches absolute paths
      // of svgs in node_modules
      // that are skipped by default in rollup
      var regexp = /^(?!\.)\S+\.svg$/gi;
      if (source.match(regexp)) {
        const id = path.resolve('node_modules/', source);
        return { id, external: false };
      }
      return null;
    },
    transform: (source, id) => {
      if (!filter(id)) return null;
      return optimizeSvg(source, config, id).then((result) => {
        const compiled = compiler.compile(result, { preserveWhitespace: false });
        const transformed = transpile(`module.exports = { render: function () { ${compiled.render} } };`).replace('module.exports =', 'export default');
        return transformed;
      });
    },
  };
}
