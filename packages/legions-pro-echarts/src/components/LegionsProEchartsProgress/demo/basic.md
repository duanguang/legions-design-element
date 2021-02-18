---
order: 0
title:
  zh-CN: 进度条
  en-US: progress
---

## zh-CN

标准进度条

## en-US

base progress

```jsx
import React from 'react';
import { LegionsProEchartsBox,LegionsProEchartsProgress } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <div>
                <LegionsProEchartsProgress percent={30}/>
                <LegionsProEchartsProgress percent={50} status="active" />
                <LegionsProEchartsProgress percent={70} status="exception" />
                <LegionsProEchartsProgress percent={100} showInfo={false} />
                <LegionsProEchartsProgress percent={50} showInfo={false} />
            </div>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
