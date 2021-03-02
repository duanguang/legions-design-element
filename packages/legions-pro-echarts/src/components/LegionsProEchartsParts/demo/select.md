---
order: 3
title:
  zh-CN: 下拉选项
  en-US: select
---

## zh-CN

基于antd select改造样式

## en-US

````jsx
import { LegionsProEchartsBox, LegionsProEchartsSelect } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
       <LegionsProEchartsSelect>
            <LegionsProEchartsSelect.Option value="1">111</LegionsProEchartsSelect.Option>
            <LegionsProEchartsSelect.Option value="2">222</LegionsProEchartsSelect.Option>
            <LegionsProEchartsSelect.Option value="3">333</LegionsProEchartsSelect.Option>
        </LegionsProEchartsSelect>
        <br/><br/>
        <LegionsProEchartsSelect defaultValue="1">
            <LegionsProEchartsSelect.Option value="1">111</LegionsProEchartsSelect.Option>
            <LegionsProEchartsSelect.Option value="2">222</LegionsProEchartsSelect.Option>
            <LegionsProEchartsSelect.Option value="3">333</LegionsProEchartsSelect.Option>
        </LegionsProEchartsSelect>
  </div>,
  mountNode
);
````
