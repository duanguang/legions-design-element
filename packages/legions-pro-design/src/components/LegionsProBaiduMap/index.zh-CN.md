---
category: Components
cols: 1
type: 数据展示
title: ProBaiduMap
subtitle: 百度地图
---

ProBaiduMap 的诞生是为了解决项目中需要写很多 展示当前货物信息位置 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。


## 何时使用

当你需要展示货物，商品，运输物流等坐标位置时，ProBaiduMap 是不二选择。

## API

这里只列出部分常用 api。


| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 位置，经纬度 eg：['116.403847', '39.915526']，不传递则默认定位第一个标记点| `[string | number,string | number]` | - |
| marker | 标记, 支持多个标记 eg：[['116.403847', '39.915526']]，默认北京天安门 | Array<`MapMarkerPointType`> | - |
| zoom | 缩放比例 | number | 16 |
| src| 百度api脚本地址| string| - |
| hostType | 请求类型, 默认https，根据百度window['HOST_TYPE']所有参数类型设置，1表示http、2表示https | string | `2` |


<style>
[id^="components-legionsproecharts-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
