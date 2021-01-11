/*
 * @Author: duanguang
 * @Date: 2021-01-04 16:30:31
 * @LastEditTime: 2021-01-06 15:40:54
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/.lrpc-config.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const path = require('path');
const resolves = _path => path.join(process.cwd(),_path);
const { entitys,all} =require('./script/entiy')
const { babel,external,commonjs} =require('./script/rollupPlugin')
const PACKAGE = process.env.PACKAGE;
module.exports = {
  external: external[PACKAGE],
  rollupPlugin: {
  /* babel: false, */
    ...babel[PACKAGE],
    ...commonjs[PACKAGE],
    typescript: {
      include: ['*.ts+(|x)', '**/*.ts+(|x)', '**/*.js', '*.js'],
    },
    replace: {
      __DEV__: `(process.env.NODE_ENV !== 'production')`,
    },
  },
  extendPlugins: [],
  entitys: [
    ...(entitys.hasOwnProperty(process.env.PACKAGE)
      ? entitys[process.env.PACKAGE]
      : all),
  ],
};
