---
order: 0
title:
  zh-CN: 基础饼图
  en-US: base pie
---

## zh-CN

基础饼图

## en-US

base box

```jsx
import React from 'react';
import { LegionsProEchartsBox, LegionsProEchartsChartPie } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox style={{height: 260}}>
                <LegionsProEchartsChartPie
                    onEvents={{click: (e) => {
                        console.log(e)
                    }}}
                    option={{
                        series: [{
                            data:[
                                { value: 5210, name: '保税跨境' },
                                { value: 9610, name: '跨境直邮' },
                            ]
                        }],
                    }}
                ></LegionsProEchartsChartPie>
            </LegionsProEchartsBox>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
