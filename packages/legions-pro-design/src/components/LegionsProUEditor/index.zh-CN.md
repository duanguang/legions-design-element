---
category: Components
cols: 1
type: 数据展示
title: ProUEditor
subtitle: 富文本
---

ProUEditor 的诞生是为了解决项目中需要复杂文本内容，如图文，自定义排版等，直接引入第三方百度编辑器作为底层组件。


## 何时使用

当你的文本内容复杂，格式多样化，ProUEditor 是不二选择。

## API

ProUEditor 在 百度编辑器 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 百度编辑器 不同的 api。


| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ueditorPath | 	UEditor 代码的路径， 可选| string | - |
| ueditorConfig |UEditor 配置项 `参照百度编辑器`，可选 | object | - |
| ueditorId | 唯一id,必填 | string | - |
|onReady|抛回部分数据及方法|(instance: [ueditorInstance]) => void|-|


<style>
[id^="components-legionsproecharts-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
