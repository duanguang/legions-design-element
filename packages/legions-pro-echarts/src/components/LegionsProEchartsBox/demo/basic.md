---
order: 0
title:
  zh-CN: 基础容器
  en-US: base box
---

## zh-CN

通用基础容器

## en-US

base box

```jsx
import React from 'react';
import { LegionsProEchartsBox, LegionsProEchartsChartPie } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox height="260px"></LegionsProEchartsBox>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
