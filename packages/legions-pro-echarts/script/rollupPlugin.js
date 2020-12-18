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
  'echarts/lib/echarts',
  'echarts/lib/chart/bar',
  'echarts/lib/component/toolbox',
  'echarts/lib/component/legend',
  'echarts/lib/component/tooltip',
  'echarts/lib/component/title',
  'echarts/lib/chart/line',
  'echarts/lib/chart/pie',
  'echarts/lib/data/helper/completeDimensions',
  'echarts/lib/util/symbol',
  'echarts-gl',
  'echarts/lib/chart/map',
  'fast-deep-equal',
  'size-sensor',
  'react',
  './style/index.less',
  '../LegionsProEchartsBox',
  '../LegionsProLineOverflow',
  'antd',
  'lodash',
  'brain-store-utils',
  'legions/fetch',
  'legions/request',
  '../LegionsProEcharts',
  './LegionsProEcharts',
  './LegionsProEchartsCore',
  './LegionsProEchartsBox',
  './LegionsProEchartsBoxList',
  './LegionsProEchartsChartBar',
  './LegionsProEchartsChartCard',
  './LegionsProEchartsChartLine',
  './LegionsProEchartsChartPie',
  './LegionsProEchartsCol',
  './LegionsProEchartsLayout',
  './LegionsProEchartsLiquidFill',
  './LegionsProEchartsMap',
  './LegionsProEchartsRow',
  '../core',
  'mobx',

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