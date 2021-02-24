---
category: Components
cols: 2
type: 数据展示
title: ProModal
subtitle: 模态框
---

ProModal 的诞生是为了解决antd 模态框组件无法满足业务需要，如支持拖拽移动,缩放，最大化，还原等功能


## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

## API

ProModal 在 antd 的 Modal 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Modal 不同的 api。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modalType | 	模态框类型| `drawer` \| `modal` \| `fullscreen` | "modal" |
| placement | 抽屉方向（当模态框类型为`placement` 类型时可以配置使用） | 'left' \| 'right' \| 'top' \| 'bottom' | - |
| draggable | 是否可以拖拽移动 | boolean | - |
| resizable| 是否可以调整模态框大小 | boolean| - |
|onVisibleChange|模态框显示隐藏时触发|(visible:boolean)=>void|-|
|onReady|抛回部分数据及方法|(instance: [InstanceLegionsProModal]) => void|-|

<style>
[id^="components-legionsproecharts-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
