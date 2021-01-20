/*
 * @Author: duanguang
 * @Date: 2020-12-23 10:55:09
 * @LastEditTime: 2020-12-25 11:33:38
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/site/bisheng.config.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const path = require('path');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

const isDev = process.env.NODE_ENV === 'development';
const usePreact = process.env.REACT_ENV === 'preact';

module.exports = {
  port: 8001,
  hot: true,
  source: {
    components: './src/components',
    docs: './docs',
    changelog: [
      'CHANGELOG.zh-CN.md',
      'CHANGELOG.en-US.md',
    ],
  },
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  themeConfig: {
    categoryOrder: {
      设计原则: 2,
      Principles: 2,
    },
    typeOrder: {
      General: 0,
      Layout: 1,
      Navigation: 2,
      'Data Entry': 3,
      'Data Display': 4,
      Feedback: 5,
      Localization: 6,
      Other: 7,
    },
    docVersions: {
      '0.9.x': 'http://09x.ant.design',
    },
  },
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
    },
    lessConfig: {
        javascriptEnabled: true,
      },
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload'],
  },
  webpackConfig(config) {
      config.resolve.alias = {
        'legions-pro-echarts': path.join(process.cwd(), 'src/components/index'),
        'react-router': 'react-router/umd/ReactRouter',
    };
    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
    };

    if (usePreact) {
      /* config.resolve.alias = Object.assign({}, config.resolve.alias, {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'react-router': 'react-router',
      }); */
    }
    /* config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      }); */

    /* config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 })); */

    return config;
  },

  htmlTemplateExtraData: {
    isDev,
    usePreact,
  },
};
