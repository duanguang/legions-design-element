---
order: 4
title:
  zh-CN: 单选
  en-US: radio
---

## zh-CN

基于antd radio改造样式

## en-US

````jsx
import { LegionsProEchartsBox } from 'legions-pro-echarts';
import { LegionsProEchartsRadio } from 'legions-pro-echarts/es/LegionsProEchartsParts';
ReactDOM.render(
  <div>
        <LegionsProEchartsRadio defaultValue="1">
            <LegionsProEchartsRadio.Button value="1">总值</LegionsProEchartsRadio.Button>
            <LegionsProEchartsRadio.Button value="2">进口</LegionsProEchartsRadio.Button>
            <LegionsProEchartsRadio.Button value="3">出口</LegionsProEchartsRadio.Button>
        </LegionsProEchartsRadio>
        <br/><br/>
        <LegionsProEchartsRadio defaultValue="1" theme='card'>
            <LegionsProEchartsRadio.Button value="1">本周</LegionsProEchartsRadio.Button>
            <LegionsProEchartsRadio.Button value="2">本月</LegionsProEchartsRadio.Button>
            <LegionsProEchartsRadio.Button value="3">本季度</LegionsProEchartsRadio.Button>
            <LegionsProEchartsRadio.Button value="4">全年</LegionsProEchartsRadio.Button>
        </LegionsProEchartsRadio>
  </div>,
  mountNode
);
````
