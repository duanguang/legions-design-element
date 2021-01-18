/** @format */
const {
  createTransformer,
  createTransformerReactJsxProps,
} = require('ts-plugin-legions');
var packageConfig = require('./package.json');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
module.exports = function (configs) {
  configs = Object.assign({}, configs, {
    name: packageConfig.name,
    /*  name: 'scm-static', */
    defaultPort: 8057,
    projectType: 'ts',
    publicPath: '/app/',
    isTslint: true,
    //server:'test.hoolinks.com',
    //server:'127.0.0.1',
    devServer: Object.assign({}, configs.devServer, {
      proxy: {
        '/v1/oss/uploadByForm': {
          target: 'https://qa-fc.hoolinks.com',
          secure: false,
          onProxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('host', 'qa-fc.hoolinks.com');
          },
        },
        '/order/file': {
          target: 'https://qa-scm.hoolinks.com',
          secure: false,
          onProxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('host', 'qa-scm.hoolinks.com');
            proxyReq.setHeader(
              'cookie',
              'SESSION=86b2ee3f-537b-4fad-97bd-8fca31463729'
            );
          },
        },
      },
    }),
    apps: ['examples', 'examples'],
    entries: ['src/examples/index'],
    webpack: {
      dllConfig: {
        vendors: [
          'react',
          'mobx',
          'mobx-react',
          'superagent',
          'react-router',
          'react-dom',
          'classnames',
          'isomorphic-fetch',
          'history',
          'invariant',
          'warning',
          'hoist-non-react-statics',
        ],
      },
      commonsChunkPlugin: ['common', 'vendor'],
      tsCompilePlugin: {
        option: {
          getCustomTransformers: () => ({
            before: [
              createTransformer([
                {
                  libraryName: 'legions/store',
                  bindings: ['StoreModules'],
                },
              ]),
              createTransformerReactJsxProps({
                components: [
                  { name: 'LegionsProTable', props: 'uniqueUid', value: '' },
                  { name: 'LegionsProForm', props: 'uniqueUid' },
                  { name: 'QueryConditions', props: 'uniqueUid' },
                ],
              }),
            ],
          }),
        },
      },
      disableReactHotLoader: false,

      cssModules: {
        enable: true, // 默认false
      },
      plugins: [
        new ProgressBarPlugin({
          summary: false,
          format:
            `${chalk.green.bold('build [:bar]')}` +
            chalk.green.bold(':percent') +
            ' (:elapsed seconds)',
          summaryContent: '',
        }),
        new webpack.NamedChunksPlugin(),
        new FilterWarningsPlugin({
          exclude: /export .* was not found in/,
        }),
      ],
      extend: (loaders, { isDev, loaderType, projectType, transform }) => {
        if (loaderType === 'JsLoader') {
          loaders.push({
            test: /\.(jsx|js)?$/,
            include: [
              path.join(process.cwd(), 'node_modules/legions-mobx-decorator'),
              path.join(process.cwd(), 'node_modules/legions-lunar'),
              path.join(process.cwd(), 'node_modules/legions-micro-service'),
              /* path.join(process.cwd(), 'components'), */
            ],
            loader: 'happypack/loader?id=js',
          });
        }
        if (loaderType === 'TsLoader' && projectType === 'ts') {
          loaders.push({
            test: /\.(ts|tsx)$/,
            include: [
              path.join(process.cwd(), 'node_modules/legions-mobx-decorator'),
              path.join(process.cwd(), 'node_modules/legions-lunar'),
              /* path.join(process.cwd(), 'components'), */
            ],
            loader: 'happypack/loader?id=ts',
          });
        }
        if (loaderType === 'StyleLoader' && transform) {
          const newLoaders = [
            {
              test: /\.css$/,
              use: transform.execution(null, null, null),
              include: [path.join(process.cwd(), 'node_modules')],
            },
            /* {
              test: new RegExp(`^(?!.*\\.modules).*\\.less`),
              use: transform.execution(null, {
                loader: 'less-loader',
                options: { javascriptEnabled: true },
              },transform.LoaderOptions),
              include: [
                path.join(process.cwd(), 'components'),
              ],
            }, */
          ];
          newLoaders.map(item => {
            loaders.push(item);
          });
        }
      },
    },
    htmlWebpackPlugin: {
      title: 'webApp' /*O2O订单管理系统*/,
    },
    postcss: {
      autoprefixer: {
        browsers: ['last 2 version', 'safari 5', 'ios 6', 'android 4'],
      },
    },
    babel: {
      query: {
        presets: [
          [
            '@babel/preset-env',
            {
              /*  targets: {
                       esmodules: true,
                     }, */
              useBuiltIns: 'entry', // entry usage
              corejs: '2',
              targets: {
                browsers: [
                  // 浏览器
                  'last 2 versions',
                  'ie >= 10',
                ],
              },
            },
          ],
          /*  "@babel/preset-env", */
          '@babel/preset-react',
        ],
        cacheDirectory: '.webpack_cache',
        plugins: [
          'add-module-exports',
          '@babel/plugin-transform-runtime',
          [
            '@babel/plugin-proposal-decorators',
            {
              legacy: true,
            },
          ],
          [
            'import',
            {
              libraryName: 'antd',
              style: true,
            },
          ],
        ],
      },
    },
  });
  return configs;
};
