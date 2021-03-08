---
category: Components
cols: 1
type: 数据展示
title: ProQrCode
subtitle: 二维码
---

ProQrCode 的诞生是为了解决项目中需要生成二维码。


## 何时使用

当你需要生成二维码时。

## API

这里只列出部分 api。



| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 	需要生成二维码的字符信息，比如https,http,`必填`| string | - |
| size | 二维码的宽和高，单位是px，只允许生成正方形二维码 `可选` | number | - |
| bgColor | 背景色,`可选` | string |- |
| fgColor| 前景色 `可选`| string| - |
| image | 码正中间图片的url，只支持配置正方形图片 `可选` | string | - |
| imageWidth | 宽度 `可选` | number | - |
| imageHeight | 高度 `可选` | number | - |

<style>
[id^="components-legionsproecharts-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-legionsproecharts-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
