---
order: 0
title:
  zh-CN: 玫瑰饼图
  en-US: rose pie
---

## zh-CN

玫瑰饼图

## en-US

rose pie

```jsx
import React from 'react';
import { LegionsProEchartsBox, LegionsProEchartsChartPie } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox style={{height: 260}}>
                <LegionsProEchartsChartPie
                    data={[
                        {value: 40, name: 'rose 1'},
                        {value: 33, name: 'rose 2'},
                        {value: 28, name: 'rose 3'},
                        {value: 22, name: 'rose 4'},
                        {value: 20, name: 'rose 5'},
                        {value: 15, name: 'rose 6'},
                        {value: 12, name: 'rose 7'},
                        {value: 10, name: 'rose 8'}
                    ]}
                    option={{
                        series: [{
                            radius: [20, 70],
                            roseType: 'radius',
                        }],
                    }}
                ></LegionsProEchartsChartPie>
            </LegionsProEchartsBox>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
