---
order: 2
title:
  zh-CN: 多维度折线图
  en-US: multiple Line
---

## zh-CN

当我们需要显示更多描述信息时，可设置 `series.label.show` 为 `true`

## en-US

````jsx
import { LegionsProEchartsBox, LegionsProEchartsLine } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
    <LegionsProEchartsBox style={{ height: '260px', paddingBottom: 5 }}>
        <LegionsProEchartsLine
            option={{
                xAxis: {
                    data: ['202001', '202002', '202003', '202004', '202005', '202006', '202007', '202008', '202009', '202010'],
                },
                series: [
                    {
                        name: '出口',
                        type: 'line',
                        stack: '总量',
                        symbolSize: 5,
                        data: [10.32, 12.43, 26.45, 20.09, 34.42, 11.43, 13.58, 25.47, 38.45, 31.58],
                    },
                    {
                        name: '进口',
                        type: 'line',
                        stack: '总量',
                        symbolSize: 5,
                        data: [11.43, 13.58, 25.47, 38.45, 31.58, 26.45, 20.09, 34.42, 11.43, 42.56],
                    },
                ],
            }}
        ></LegionsProEchartsLine>
    </LegionsProEchartsBox>
  </div>,
  mountNode
);
````
