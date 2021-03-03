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
import { LegionsProEchartsBox, LegionsProEchartsChartCard } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
    <LegionsProEchartsBox style={{ height: '260px', paddingBottom: 5 }}>
        <LegionsProEchartsChartCard total={126} title="本月新增审核企业"></LegionsProEchartsChartCard>
    </LegionsProEchartsBox>
  </div>,
  mountNode
);
````
