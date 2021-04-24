/*
 * @Author: duanguang
 * @Date: 2020-12-10 16:14:09
 * @LastEditTime: 2021-03-10 10:31:51
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/script/entiy.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

const path = require('path');
const resolves = _path => path.join(process.cwd(),_path);
const array_components = [
    // 'LegionsProEcharts',
    // 'LegionsProEchartsBox',
    // 'LegionsProEchartsBar',
    // 'LegionsProEchartsCard',
    // 'LegionsProEchartsGauge',
    // 'LegionsProEchartsLine',
    // 'LegionsProEchartsPie',
    // 'LegionsProEchartsRadar',
    // 'LegionsProEchartsCore',
    // 'LegionsProEchartsHeader',
    // 'LegionsProEchartsLayout',
    // 'LegionsProEchartsLiquidFill',
    // 'LegionsProEchartsMap',
    // 'LegionsProEchartsWordCloud',
    // 'LegionsProEchartsParts',
    // 'core',
    'index',
    // 'interface',
]
const browser = [
  {
    name: 'iifeprod',
    input: resolves('components/index.ts'),
    file: resolves('dist/legions-pro-echarts.iife.js'),
    format: 'iife',
    compress: false,
    env: 'production',
    banner: 'legions-pro-echarts',
    outputName: 'legionsProEcharts',
  },
];
const umd = [
  {
    name: 'umdprod',
    input: resolves('components/index.ts'),
    file: resolves('dist/legions-pro-echarts.umd.js'),
    format: 'umd',
    compress: false,
    banner: ' legions-pro-echarts',
    outputName: 'legionsProEcharts',
  },
];
const es = [
  ...array_components.map((item) => {
    let input = '';
    let file = '';
    if (item === 'index') {
      input = resolves(`src/components/index.ts`);
      file = resolves('es/index.js');
    }
    else if (item==='core') {
      input = resolves(`src/components/core/index.ts`);
      file = resolves('es/core/index.js');
    }
    else if (item==='interface') {
      input = resolves(`src/components/interface/index.ts`);
      file = resolves('es/interface/index.js');
    }
    else {
      input = resolves(`src/components/${item}/index.tsx`);
      file = resolves(`es/${item}/index.js`);
    }
    return {
      name: `es${item}`,
      input: input,
      file: file,
      format: 'es',
      compress: false,
      banner: ' legions-pro-echarts',
      outputName: 'legionsProEcharts',
    }
  }),
];
const entitys = {
  browser,
  umd,
  es,
};
let all = [];
Object.keys(entitys).map(key => {
  all.push(...entitys[key]);
});
module.exports = {
  entitys,
  all,
};
