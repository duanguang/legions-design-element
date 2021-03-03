---
order: 1
title:
  zh-CN: 基础柱状图
  en-US: Base Bar
---

## zh-CN

基础柱状图

## en-US

````jsx
import { LegionsProEchartsBox, LegionsProEchartsChartBar } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
    <LegionsProEchartsBox style={{ height: '260px', paddingBottom: 5 }}>
        <LegionsProEchartsChartBar
            option={{
                xAxis: {
                    data: ['A','B','C','D'],
                },
                series: [{
                    name: '进口', stack: '总量',
                    data: [41.1,30.4,65.1,53.3]
                }]
            }}
        ></LegionsProEchartsChartBar>
    </LegionsProEchartsBox>
  </div>,
  mountNode
);
````
