---
order: 0
title:
  zh-CN: 基础仪表盘
  en-US: base Gauge
---

## zh-CN

圆形饼图

## en-US

base pie

```jsx
import React from 'react';
import { LegionsProEchartsBox, LegionsProEchartsGauge } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox style={{height: 350}}>
                <LegionsProEchartsGauge
                    option={{
                        series: [{
                            data: [{
                                value: 50,
                                name: '速度'
                            }]
                        }]
                    }}
                ></LegionsProEchartsGauge>
            </LegionsProEchartsBox>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
