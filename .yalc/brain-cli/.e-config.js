const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const  path = require('path');
module.exports = {
  name: 'test',
  open: true,
  defaultPort: 8001,
  projectType: 'ts',
  server: '0.0.0.0',
  imageInLineSize: 8192,
  isTslint: true,
  publicPath: '/public/',
  devServer: {
    noInfo: true,
    https: false,
    proxy: {
      // '/main': {
      //     target: 'https://uat-scm.hoolinks.com/',
      //     //changeOrigin: true,
      //     secure: false,
      //         onProxyReq: (proxyReq, req, res) => {
      //             proxyReq.setHeader('host', 'uat-scm.hoolinks.com')
      //             proxyReq.setHeader('cookie', ' Hm_lvt_c255ba4153ae8ae8b787c209cc7518a8=1553052488,1553052893,1553053026,1553053105; SYSSOURCE=SCM; JSESSIONID=F46353CD405C32BF40B7CC6CC0B4C44D; SCP_JSESSIONID=8221664EFABD7C98FFB74DDC8CC12C85; Hm_lpvt_c255ba4153ae8ae8b787c209cc7518a8=1554866067; SESSION=d2104255-eee1-4299-9d8d-9369d83f0977')
      //         }
      // },
    }
  },
  postcss: {
    // px2rem:{
    //     rootValue: 75,
    //     unitPrecision: 3,
    // },
    autoprefixer: {
      /**
       * 参考dora配置
       */
      browsers: [
        'last 2 versions',
        // "Firefox ESR",
        'Firefox >= 15',
        '> 1%',
        'ie >= 8',
        'not ie<=8'
      ]
    }
  },
  webpack: {
    dllConfig: {
      /* vendors: { value: ['react'],externalUrl:'http://localhost:8001/public/test/'}, */
      vendors: ['react'],
      /* customDll: [{ key: 'framework',value: ['invariant','react-dom'],externalUrl: '' }],
      compileOptions: {
        externalUrl:'http://localhost:8001/public/test/'
      } */
    },
    disableReactHotLoader: false,
    commonsChunkPlugin: ['common','vendor'],
    plugins: [
      new ProgressBarPlugin({
        summary: false,
        format:
          `${chalk.green.bold('build [:bar]')}` +
          chalk.green.bold(':percent') +
          ' (:elapsed seconds)',
        summaryContent: ''
      })
    ],
    /* optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            minChunks: 1,
            name: "vendor",
            priority: 7,
            test: /object-hash|lodash/,
            //maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0 // This is example is too small to create commons chunks
          }
        }
      },
    }, */
  },
  babel: {
    query: {
      presets: [
        [
        "@babel/preset-env",
        {
         /*  targets: {
            esmodules: true,
          }, */
          "useBuiltIns": "usage",
          "corejs": "3",
        }
      ],
     /*  "@babel/preset-env", */
    "@babel/preset-react"],
    
      cacheDirectory: true,
      plugins: [
        /* 'babel-plugin-legion-hmr', */
        'add-module-exports',
        '@babel/plugin-transform-runtime',
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        // [
        //     "import",
        //     [
        //         {libraryName: "@kad/e-antd"},
        //         {libraryName: "antd", style: true}
        //     ]
        // ]
        ['import',{ libraryName: 'antd',style: true }],
      ]
    }
  },
  htmlWebpackPlugin: {
    title: 'webApp' /**/
  },
  apps: ['app1','app2']
};
