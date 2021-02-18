---
order: 0
title:
  zh-CN: 小型进度圈
  en-US: progress-circle-small
---

## zh-CN

小一号的圈形进度

## en-US

progress-circle-small

```jsx
import React from 'react';
import { LegionsProEchartsBox,LegionsProEchartsProgress } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
           <div>
                <LegionsProEchartsProgress type="circle" percent={70} width={80} />
                <LegionsProEchartsProgress type="circle" percent={70} width={80} showInfo={false} />
           </div>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
