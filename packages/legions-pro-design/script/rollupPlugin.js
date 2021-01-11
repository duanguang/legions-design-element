/*
 * @Author: duanguang
 * @Date: 2020-12-10 16:14:09
 * @LastEditTime: 2021-01-11 16:46:29
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/script/rollupPlugin.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const babel = { browser: {}, umd: { babel: false },es:{babel: false} };
const externalLib = [
  /* 'legions-lunar/types/api/typescript', */
  'legions-utils-tool/dom',
  'legions/store',
  'legions-micro-service',
  '../../models',
  '../../store/StoreBase',
  '../../store/pro.table',
  'legions-lunar/object-hash',
  'json-mapper-object',
  'legions-thirdparty-plugin',
  '../models',
  'legions-lunar/schedule',
  '../index',
  'legions/store-utils',
  'brain-store-utils',
  'mobx',
  'legions-lunar',
  'lodash',
  '../../db',
  'legions-utils-tool/storage',
  '../../core',
  'legions-utils-tool/regex',
  '../../core/cross-module',
  '../../services',
  'legions-utils-tool/download',
  '../LegionsProTable',
  '../LegionsProUpload',
  './style/index.modules.less',
  'legions/store-react',
  'legions-lunar/antd-toolkit',
  'sortablejs',
  'prop-types',
  '../store/pro.form',
  'history',
  'object-assign',
  'legions-nprogress',
  'legions-utils-tool/format.string',
  'legions-utils-tool/debounce',
  'classnames',
  'legions-lunar/legion.plugin.sdk',
  '../LegionsProSelect',
  'react-dom',
  'lodash/get',
  'legions-lunar/model',
  '../LegionsProErrorReportShow',
  '../style/content.modules.less',
  '../style/memu.less',
  '../../store/pro.layout',
  'legions-lunar/mobx-decorator',
  '../../LegionsProTable',
  '../../LegionsProModal',
  'legions-micro-service',
  'lodash/cloneDeep',
  'path-to-regexp',
  '../../LegionsProIframe',
  'legions-thirdparty-plugin/focus-outside',
  '../../LegionsProSelect',
  '../store/pro.modal',
  'moment',
  '../store/pro.query.conditions',
  'react-raphael',
  'legions-utils-tool/type.validation',
  'legions-utils-tool',
  '../LegionsProTableCustomColumns',
  'lodash.throttle',
  '../LegionsProModa',
  '../store/pro.table',
  'legions-utils-tool/object.utils',
  '../LegionsProDragger',
  '../LegionsProModal',
  '../LegionsProTable',
  '../LegionsProForm',
  'lodash/has',
  'lodash/set',
  '../LegionsProForm/HlForm',
  
  'react',
  './style/index.less',
  '../LegionsProEchartsBox',
  '../LegionsProLineOverflow',
  'antd',
  'lodash',
  'brain-store-utils',
  'legions/fetch',
  'legions/request',
  '../core',
  'mobx',
  './LegionsProBaiduMap',
  './LegionsProBreadcrumb',
  './LegionsProDataImport',
  './LegionsProDragger',
  './LegionsProErrorReportShow',
  './LegionsProException',
  './LegionsProForm',
  './LegionsProIframe',
  './LegionsProInput',
  './LegionsProLayout',
  './LegionsProLineOverflow',
  './LegionsProModal',
  './LegionsProNumericInput',
  './LegionsProPageContainer',
  './LegionsProPrint',
  './LegionsProQrCode',
  './LegionsProQueryConditions',
  './LegionsProScrawl',
  './LegionsProSelect',
  './LegionsProTable',
  './LegionsProTableCustomColumns',
  './LegionsProTableForm',
  './LegionsProTextArea',
  './LegionsProUEditor',
  './LegionsProUpload',
  './LegionsProVirtualTable',
  './LgeionsProVirtualList',
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