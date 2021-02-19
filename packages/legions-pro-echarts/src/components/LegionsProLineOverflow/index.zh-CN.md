---
category: Components
type: Charts
title: Tooltip
subtitle: 文字提示
---

简单的文字提示气泡框

## API

```jsx
<LegionsProLineOverflow text={'prompt text'}>气泡框</LegionsProLineOverflow>
```

### LegionsProEchartsBox props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 提示文字 | string\|React.ReactNode | 无 |
| autoAdjustOverflow | 气泡被遮挡时自动调整位置 | boolean | true |
| placement | 气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom |  string | leftTop |
| trigger | 触发行为，可选 hover/focus/click |  string | hover |
| defaultVisible | 默认是否显隐 |  boolean | false |
