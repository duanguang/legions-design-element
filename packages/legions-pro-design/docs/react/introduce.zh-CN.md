---
order: 0
title: Legions Pro Echarts of React
---

Echarts 定义了基础的可视化规范，对应也提供了大量的基础组件。但是对于中后台类应用，我们希望提供更高程度的抽象，提供更上层的设计规范，并且对应提供相应的组件使得开发者可以快速搭建出高质量的页面。

在 ProErcharts 中我们内置了一系列的设计规范，预设了常用的逻辑。在这个基础上我们同样提供了灵活的支持。我们希望通过 Pro 系列组件提供快速高效大家高质量中后台应用的能力，进一步扩展 Echarts 的能力，欢迎使用并提出宝贵的意见。

<div class="pic-plus">
  <img width="150" src="https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg">
  <span>+</span>
  <img width="160" src="https://t.alipayobjects.com/images/rmsweb/T16xRhXkxbXXXXXXXX.svg">
</div>

<style>
.pic-plus > * {
  display: inline-block !important;
  vertical-align: middle;
}
.pic-plus span {
  font-size: 30px;
  color: #aaa;
  margin: 0 20px;
}
</style>

---

## 特性

- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 React 可视化组件。
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 基于 npm + webpack + babel 的工作流，支持 ES2015 和 TypeScript。

## 支持环境

* 现代浏览器和 IE11 及以上（需要 [polyfills](https://ant.design/docs/react/getting-started-cn#兼容性)）。


## 版本

- 稳定版：[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
- 预览版：[![npm (next)](https://img.shields.io/npm/v/antd/next.svg?style=flat-square)](https://www.npmjs.org/package/antd)

你可以订阅：https://github.com/ant-design/ant-design/releases.atom 来获得稳定版发布的通知。

## 安装

### 使用 npm 或 yarn 安装

**我们推荐使用 npm 或 yarn 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
$ npm install legions-pro-echarts --save
```

```bash
$ yarn add legions-pro-echarts
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

### 浏览器引入



> **强烈不推荐使用已构建文件**，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。

## 示例

```jsx
import { LegionsProEchartsLiquidFill } from 'legions-pro-echarts';
ReactDOM.render(<LegionsProEchartsLiquidFill option={{}} />, mountNode);
```

引入样式：

```jsx
import 'legions-pro-echarts/dist/legions-pro-echarts.css';  // or 'legions-pro-echarts/dist/legions-pro-echarts.less'
```

### 按需加载

下面两种方式都可以只加载用到的组件。

- 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）。

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { "libraryName": "legions-pro-echarts", "style": "css" }] // `style: true` 会加载 less 文件
     ]
   }
   ```

   然后只需从 antd 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。

   ```jsx
   // babel-plugin-import 会帮助你加载 JS 和 CSS
   import { LegionsProEchartsLiquidFill } from 'legions-pro-echarts';
   ```

- 手动引入

   ```jsx
   import {LegionsProEchartsLiquidFill} from 'legions-pro-echarts/lib/LegionsProEchartsLiquidFill';  // 加载 JS
   import 'legions-pro-echarts/lib/LegionsProEchartsLiquidFill/style/css';        // 加载 CSS
   ```

### TypeScript

```js
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "jsx": "preserve",
    "allowSyntheticDefaultImports": true
  }
}
```

> 注意：
> - 设置 `allowSyntheticDefaultImports` 避免 `error TS1192: Module 'react' has no default export` 的错误。
> - 不要使用 @types/antd, antd 已经自带了 TypeScript 定义。

## 链接

- [首页](http://ant.design/)
- [组件库](/docs/react/introduce)
- [Ant Design Pro](http://pro.ant.design/)
- [更新日志](/changelog)



## 如何贡献

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/ant-design/ant-design/pulls)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

## 社区互助

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助，同时我们也鼓励资深用户通过下面的途径给新人提供帮助。

通过 Stack Overflow 或者 Segment Fault 提问时，建议加上 `pro-echarts` 标签。

1. [<img alt="Stack Overflow" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=2bb144720a66" width="140" />](http://stackoverflow.com/questions/tagged/pro-echarts)（English）
2. [<img alt="Segment Fault" src="http://static.segmentfault.com/global/img/logo.svg" width="100" />](https://segmentfault.com/t/pro-echarts)（中文）
