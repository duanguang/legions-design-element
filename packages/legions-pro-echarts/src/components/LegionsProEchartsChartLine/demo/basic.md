---
order: 2
title:
  zh-CN: 基础折线图
  en-US: Line
---

## zh-CN

当我们需要显示更多描述信息时，可设置 `series.label.show` 为 `true`

## en-US

````jsx
import { LegionsProEchartsBox, LegionsProEchartsChartLine } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
    <LegionsProEchartsBox style={{ height: '260px', paddingBottom: 5 }}>
        <LegionsProEchartsChartLine
            option={{
                xAxis: {
                    data: ['A','B','C','D','E','F','G','H','I','J'],
                },
                series: [{
                    name: '进口', stack: '总量',
                    data: [11.43, 13.58, 25.47, 38.45, 31.58, 26.45, 20.09, 34.42, 11.43, 42.56],
                }]
            }}
        ></LegionsProEchartsChartLine>
    </LegionsProEchartsBox>
  </div>,
  mountNode
);
````
