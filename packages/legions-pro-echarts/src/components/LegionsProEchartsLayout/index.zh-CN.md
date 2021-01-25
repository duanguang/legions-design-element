---
category: Components
type: Layout
cols: 1
title: Layout
subtitle: 页面容器
---

基础容器布局

## 何时使用

初始化布局和大屏背景

## API

### LegionsProEchartsLayout

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isFullScreen | 是否只显示一屏 false:超出出现滚动条, true:铺满一屏 | boolean | false |
| isFillFullScreen | 背景色填满整个body | boolean | true |
| gutter | 子元素上下左右间隔 | number | 0 |
| gutterDeep | gutter遍历的深度，默认5级children | number | 5 |

### ProCol

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ySpan | 竖向栅格占位格数，仅在父窗口有固定高度的情况下生效 | number | 0

### ProRow

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ySpan | 竖向栅格占位格数，仅在父窗口有固定高度的情况下生效 | number | 0
