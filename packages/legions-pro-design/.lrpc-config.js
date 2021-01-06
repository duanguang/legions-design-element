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
