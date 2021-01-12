---
category: Components
cols: 1
type: 数据展示
title: LegionsProTable
subtitle: 高级表格
---

ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。


## 何时使用

当你的表格需要与服务端进行交互或者需要多种单元格样式时，ProTable 是不二选择。

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ghost | 幽灵属性，使按钮背景透明，版本 2.7 中增加 | boolean | false |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |
| icon | 设置按钮的图标类型 | string | - |
| loading | 设置按钮载入状态 | boolean \| { delay: number } | `false` |
| shape | 设置按钮形状，可选值为 `circle` 或者不设 | string | - |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` |
| type | 设置按钮类型，可选值为 `primary` `dashed` `danger`(版本 2.7 中增加) 或者不设 | string | - |
| onClick | `click` 事件的 handler | function | - |

`<Button>Hello world!</Button>` 最终会被渲染为 `<button><span>Hello world!</span></button>`，并且除了上表中的属性，其它属性都会直接传到 `<button></button>`。

<style>
[id^="components-legionsproecharts-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
