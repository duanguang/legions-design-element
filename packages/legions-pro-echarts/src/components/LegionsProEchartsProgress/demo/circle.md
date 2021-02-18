---
order: 0
title:
  zh-CN: 进度圈
  en-US: progress-circle
---

## zh-CN

圈形的进度

## en-US

progress-circle

```jsx
import React from 'react';
import { LegionsProEchartsProgress } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <div>
                <LegionsProEchartsProgress type="circle" percent={75} gapPosition={'bottom'} />
                <LegionsProEchartsProgress type="circle" percent={70} status="exception" />
                <LegionsProEchartsProgress type="circle" percent={100} />
            </div>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
