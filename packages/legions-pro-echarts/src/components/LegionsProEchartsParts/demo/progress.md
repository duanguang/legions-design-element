---
order: 6
title:
  zh-CN: 进度条
  en-US: progress
---

## zh-CN

基于antd progress改造样式

## en-US

````jsx
import { LegionsProEchartsBox } from 'legions-pro-echarts';
import { LegionsProEchartsProgress } from 'legions-pro-echarts/es/LegionsProEchartsParts';
import moment from 'moment';

ReactDOM.render(
  <div>
        <LegionsProEchartsProgress percent={0}></LegionsProEchartsProgress>
        <LegionsProEchartsProgress percent={50}></LegionsProEchartsProgress>
        <LegionsProEchartsProgress percent={100}></LegionsProEchartsProgress>
        <br/><br/>
        <LegionsProEchartsProgress type="circle" percent={0}></LegionsProEchartsProgress>
        <LegionsProEchartsProgress type="circle" percent={50}></LegionsProEchartsProgress>
        <LegionsProEchartsProgress type="circle" percent={100}></LegionsProEchartsProgress>
        <LegionsProEchartsProgress type="dashboard" percent={0}></LegionsProEchartsProgress>
        <LegionsProEchartsProgress type="dashboard" percent={50}></LegionsProEchartsProgress>
        <LegionsProEchartsProgress type="dashboard" percent={100}></LegionsProEchartsProgress>
  </div>,
  mountNode
);
````
