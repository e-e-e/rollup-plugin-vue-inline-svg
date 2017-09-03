import { createFilter } from 'rollup-pluginutils';
import SVGO from 'svgo';
import compiler from 'vue-template-compiler';
import transpile from 'vue-template-es2015-compiler';

const svgo = new SVGO({
  plugins: ['removeDoctype', 'removeComments'],
});

const optimizeSvg = content => new Promise((resolve, reject) => {
  svgo.optimize(content, (result) => {
    if (result.error) return reject(result.error);
    return resolve(result.data);
  });
});

export default function (options) {
  const include = options && options.include;
  const exclude = options && options.exclude;
  const filter = createFilter(include || '**/*.svg', exclude);
  return {
    name: 'vue-inline-svg',
    transform: (source, id) => {
      if (!filter(id)) return null;
      return optimizeSvg(source).then((result) => {
        const compiled = compiler.compile(result, { preserveWhitespace: false });
        const transformed = transpile(`module.exports = { render: function () { ${compiled.render} } };`).replace('module.exports =', 'export default');
        return transformed;
      });
    },
  };
}
