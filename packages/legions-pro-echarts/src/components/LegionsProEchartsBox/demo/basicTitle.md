---
order: 0
title:
  zh-CN: 带有标题的容器
  en-US: title base box
---

## zh-CN

带有标题的容器

## en-US

base box

```jsx
import React from 'react';
import { LegionsProEchartsBox } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="标题" style={{height: 260}}></LegionsProEchartsBox>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
