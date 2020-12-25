---
order: 2
title:
  zh-CN: 显示副标题
  en-US: Size
---

## zh-CN

当我们需要显示更多描述信息时，可设置 `series.label.show` 为 `true` 

## en-US



````jsx
import { LegionsProEchartsBox 
,LegionsProEchartsLiquidFill} from 'legions-pro-echarts';
ReactDOM.render(
  <div>
    <LegionsProEchartsBox style={{ height: '260px', paddingBottom: 5 }}>
      <LegionsProEchartsLiquidFill
        option={{
          title: [
            {
              text: (0.2 * 100).toFixed(0) + '{a|%}',
            },
          ],
          series: [
            {
              data: [
                {
                  name: '流量统计',
                  value: 0.2,
                },
                0.2,
                0.2,
                0.2,
              ],
              label: {
                show: true,
              },
            },
          ],
        }}></LegionsProEchartsLiquidFill>
    </LegionsProEchartsBox>
  </div>,
  mountNode
);
````
