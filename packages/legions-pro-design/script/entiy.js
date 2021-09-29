/*
 * @Author: duanguang
 * @Date: 2020-12-10 16:14:09
 * @LastEditTime: 2021-09-29 23:41:58
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/script/entiy.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

const path = require('path');
const resolves = _path => path.join(process.cwd(),_path);
const buildType = process.env.buildType;
const { BUILD_TYPE} =require('./constants/component')
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
  ...BUILD_TYPE[buildType].map((item) => {
    let input = '';
    let file = '';
    if (item === 'index') {
      input = resolves(`src/components/index.ts`);
      file = resolves('es/index.js');
    }
    else if (item==='LegionsCore') {
      input = resolves(`src/components/LegionsCore/index.ts`);
      file = resolves('es/LegionsCore/index.js');
    }
    else if (item.indexOf('LegionsModels') > -1
      || item.indexOf('db') > -1
      || item.indexOf('services') > -1
      || item.indexOf('LegionsStore') > -1
      || item.indexOf('LegionsStoreConditions') > -1
      || item.indexOf('LegionsStoreForm') > -1
      || item.indexOf('LegionsStoreLayout') > -1
      || item.indexOf('LegionsStoreModal') > -1
      || item.indexOf('LegionsStoreTable') > -1
      || item.indexOf('LegionsCrossModule') > -1
    ) {
      input = resolves(`src/components/${item}/index.ts`);
      file = resolves(`es/${item}/index.js`);
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
      banner: ' legions-pro-design',
      outputName: 'legionsProDesign',
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
