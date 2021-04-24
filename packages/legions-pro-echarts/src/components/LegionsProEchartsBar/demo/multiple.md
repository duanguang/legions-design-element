---
order: 1
title:
  zh-CN: 多维度柱状图
  en-US: multiple Bar
---

## zh-CN

多维度柱状图

## en-US

````jsx
import { LegionsProEchartsBox, LegionsProEchartsBar } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
    <LegionsProEchartsBox style={{ height: '260px', paddingBottom: 5 }}>
        <LegionsProEchartsBar
            option={{
                dataset: {
                dimensions: ['product', '2015', '2016', '2017'],
                source: [
                    { product: 'Matcha', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
                    { product: 'Milk', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
                    { product: 'Cheese', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
                    { product: 'Walnut', '2015': 72.4, '2016': 53.9, '2017': 39.1 },
                ],
            },
            series: [
                {
                    type: 'bar',
                    barWidth: '10%',
                    barGap: '0',
                    barCategoryGap: '15px',
                },
                {
                    type: 'bar',
                    barWidth: '10%',
                    barGap: '15%',
                },
                {
                    type: 'bar',
                    barWidth: '10%',
                    barGap: '25%',
                    barCategoryGap: '5%'
                },
            ]
        }}
        ></LegionsProEchartsBar>
    </LegionsProEchartsBox>
  </div>,
  mountNode
);
````
