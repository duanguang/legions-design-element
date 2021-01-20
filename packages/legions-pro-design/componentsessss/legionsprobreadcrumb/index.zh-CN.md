---
category: Components
type: General
title: ProBreadcrumb
subtitle: 面包屑导航
---

ProBreadcrumb 的诞生是为了解决项目中需要写很多 面包屑导航 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。


## 何时使用



## API

通过设置 ProBreadcrumb 的属性来产生不同数据面包屑信息

面包屑的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 面包屑导航信息 | {name:string;url?string}[] | [] |


<style>
[id^="components-legionsprobreadcrumb-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsprobreadcrumb-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
