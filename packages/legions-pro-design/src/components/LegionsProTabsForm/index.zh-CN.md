---
category: Components
cols: 1
type: 数据展示
title: ProTabsForm
subtitle: 页签表单
---

ProTabsForm 的诞生是为了解决项目中需要写很多 多页签表单场景，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。


## 何时使用

当你的表单是多页签表单时，ProTabsForm 是不二选择。

## API

ProTabsForm 这里只列出部分常用的 api。


| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| group | 	表单信息分组展示，可选| [IGroup](#IGroup)[] | [] |
| controls | 表单元素配置项 | Array | [] |
| InputDataModel | 表单输入数据模型,通常是一个类 |Function|-|
| colCount | 等分栅格 默认2，可选 | 1 \| 2 \| 3 \| 4| 2 |
| size | 表单大小舒适,迷你,紧凑 | 'default' \| 'small'\|'table' | `default` |
|onTabAdd|添加页签项成功后触发回调钩子，可选|(uid: string) => void|-|
|onBeforeTabPaneRender|页签项执行渲染前的钩子函数，可选|(key: string) => void|-|
|onReady|抛回部分数据及方法|(formRef?: InstanceTabsForm<Model>)|-|

### IGroup
分组功能配置信息

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 	分组名称| string \| React.ReactNode | - |
| id | 分组唯一标识 | number | - |
| active | 活动分组 |boolean|-|
| isFolding | 是否折叠 | boolean| - |
| className | 分组样式名 | string | - |
| isShowSizeIcon | 是否显示设置主题风格图标 默认不显示, true 显示 | boolean| - |
<style>
[id^="components-legionsproecharts-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
