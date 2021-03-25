---
order: 0
title:
  zh-CN: 圆形饼图
  en-US: base pie
---

## zh-CN

圆形饼图

## en-US

base pie

```jsx
import React from 'react';
import { LegionsProEchartsBox, LegionsProEchartsPie } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox style={{height: 260}}>
                <LegionsProEchartsPie
                    data={[
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' }
                    ]}
                ></LegionsProEchartsPie>
            </LegionsProEchartsBox>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
