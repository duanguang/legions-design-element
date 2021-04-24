---
category: Components
type: Charts
title: Pie
subtitle: 饼图
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

### option

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| series | [系列列表](#series) | echarts.EChartOption.Series[] | - |

### series
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cursor | 鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 cursor。 | string | pointer |
| left | pie chart组件离容器左侧的距离。left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'。如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。 | string\|number | center |
| top | pie chart组件离容器上侧的距离。top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'top', 'middle', 'bottom'。如果 top 的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐。 | string\|number | center |
| right | pie chart组件离容器右侧的距离。right 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。 | string\|number | 自适应 |
| bottom | pie chart组件离容器下侧的距离。bottom 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。 | string\|number | 自适应 |
| center | 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。 | Array | \['50%', '40%'\] |
| radius | 饼图的半径。可以为如下类型：number：直接指定外半径值。string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。Array<number\|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。可以将内半径设大显示成圆环图（Donut chart）。 | number\|string\|Array | '40%' |
| selectedOffset | 选中扇区的偏移距离。 | number | 1.5 |
| itemStyle | [配置对象](https://echarts.apache.org/zh/option.html#series-pie.itemStyle) | Object | `{borderRadius: 0,borderColor: 'rgba(12,13,41,0.4)',borderWidth: 2}`|
| data | 饼图数据[配置对象](https://echarts.apache.org/zh/option.html#series-pie.data) | echarts.EChartOption.SeriesPie.DataObject[] | [] |

