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
let liquidFillValue=0.6;
let liquidFillOptions: echarts.EChartOption = {
    title: [{
        text:(liquidFillValue * 100).toFixed(0) + '{a|%}',
    }],
    series: [{
        data: [{
            name: '流量统计',
            value:0.8,
        },liquidFillValue,liquidFillValue,liquidFillValue],
        label: {
            show:true,
        }
    }]
}
ReactDOM.render(
    <div>
        <LegionsProEchartsBox
            style={{ height: '260px',paddingBottom: 5 }}
        >
            <LegionsProEchartsLiquidFill option={liquidFillOptions}>
            </LegionsProEchartsLiquidFill>
        </LegionsProEchartsBox>
    </div>,
  mountNode
);
````
