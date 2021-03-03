---
order: 5
title:
  zh-CN: 日期选择
  en-US: datePicker
---

## zh-CN

基于antd datePicker改造样式

## en-US

````jsx
import { LegionsProEchartsBox, LegionsProEchartsDatePicker } from 'legions-pro-echarts';
import moment from 'moment';

ReactDOM.render(
  <div>
        <LegionsProEchartsDatePicker></LegionsProEchartsDatePicker>
        <br/><br/>
        <LegionsProEchartsDatePicker defaultValue={moment()}></LegionsProEchartsDatePicker>
        <br/><br/>
        <LegionsProEchartsDatePicker.RangePicker defaultValue={[moment(),moment()]}></LegionsProEchartsDatePicker.RangePicker>
        <br/><br/>
        <LegionsProEchartsDatePicker.MonthPicker defaultValue={moment()}></LegionsProEchartsDatePicker.MonthPicker>
  </div>,
  mountNode
);
````
