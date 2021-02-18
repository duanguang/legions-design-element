---
category: Components
type: Charts
title: Progress
subtitle: 进度条
---

展示当前进度或数据占比等

## API

```jsx
<LegionsProEchartsProgress percent={75} />
```

### LegionsProEchartsBox props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 内容的模板函数 | function(percent) | percent => percent + '%' |
| percent | 百分比 | number | 0 |
| showInfo | 是否显示进度数值或状态图标 |  boolean | true |
| strokeWidth (type=line) | 进度条线的宽度，单位 px |  number | 8 |
| strokeWidth (type=circle) | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 |  number | 8 |
| type | 类型，可选 line circle dashboard |  string | line |
| width (type=circle) | 圆形进度条画布宽度，单位 px |  number | 132 |
| gapDegree (type=circle) | 圆形进度条缺口角度，可取值 0 ~ 360 |  number | 0 |
| gapPosition (type=circle) | 圆形进度条缺口位置 |  Enum{ 'top', 'bottom', 'left', 'right' } | top |
