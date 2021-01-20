---
category: Components
type: Layout
title: Row
subtitle: 行布局
---

球状液体填充通常用来表示百分比，比如流量使用占比，销售数据占比等

## 何时使用

当需要显示百分占比，使用此展示比传统数字百分比在视觉上效果更佳

## API

液体填充的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| option | 液体填充[配置对象](#option) | echarts.EChartOption | - |

### option

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题文本 | `{text:string}[]` | - |
| series | [系列列表](https://echarts.apache.org/zh/option.html#series) | `{data:[{name:string;value:string|number},number,number,number],label:{show:boolean}}[]` | - |
