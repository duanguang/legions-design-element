/*
 * @Author: duanguang
 * @Date: 2020-12-10 16:14:09
 * @LastEditTime: 2020-12-18 16:56:11
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/script/rollupPlugin.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const babel = { browser: {}, umd: { babel: false },es:{babel: false} };

const externalLib = [
    'react',
    'antd',
    'lodash',
    'fast-deep-equal',
    'size-sensor',
    'legions/fetch',
    'legions/request',

    'echarts/charts',
    'echarts/components',
    'echarts/renderers',
    'echarts/core',
    'echarts-liquidfill',
    'echarts-wordcloud',
    /\.less/,
    /LegionsProEcharts(?!Parts)/,
    '../core',
    '../interface',

]
const external = {
  browser: [],
  umd: externalLib,
  es:externalLib
};
const commonjs = {
  browser: {
    commonjs: {
      namedExports: {
        // 显式指出指定文件导出模块,
        /*  'node_modules/legions-import-html-entry/lib/legions-import-html-entry.umd.js': [
      'importHTML',
      'importEntry',
    ], */
      },
    },
  },
  umd: {},
  es:{},
};
module.exports = {
    babel,
    external,
    commonjs
}
