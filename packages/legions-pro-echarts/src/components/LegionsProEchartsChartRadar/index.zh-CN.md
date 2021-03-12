---
category: Components
type: Charts
title: Radar
subtitle: 雷达图
---

饼图主要用于表现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例。

## 何时使用

饼图更适合表现数据相对于总数的百分比等关系。如果只是表示不同类目数据间的大小，建议使用 柱状图，人们对于微小的弧度差别相比于微小的长度差别更不敏感，或者也可以通过配置 roseType 显示成南丁格尔图，通过半径大小区分数据的大小。

## API

饼图属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| option | 饼图填充[配置对象](#option) | echarts.EChartOption | - |
| data | 饼图数据[配置对象](https://echarts.apache.org/zh/option.html#series-pie.data) | echarts.EChartOption.SeriesPie.DataObject[] | [] |
