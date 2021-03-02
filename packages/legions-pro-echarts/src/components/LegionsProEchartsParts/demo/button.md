---
order: 2
title:
  zh-CN: 按钮
  en-US: button
---

## zh-CN

基于antd button改造样式

## en-US

````jsx
import { LegionsProEchartsBox, LegionsProEchartsButton } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
        <LegionsProEchartsButton type="primary" style={{margin: 2}}>primary</LegionsProEchartsButton>
        <LegionsProEchartsButton style={{margin: 2}}>default</LegionsProEchartsButton>
        <LegionsProEchartsButton type="dashed" style={{margin: 2}}>dashed</LegionsProEchartsButton>
        <LegionsProEchartsButton type="danger" style={{margin: 2}}>danger</LegionsProEchartsButton>
        <br/><br/>
        <LegionsProEchartsButton icon="download" type="primary" style={{margin: 2}}>primary</LegionsProEchartsButton>
        <LegionsProEchartsButton icon="download" style={{margin: 2}}>default</LegionsProEchartsButton>
        <LegionsProEchartsButton icon="download" type="dashed" style={{margin: 2}}>dashed</LegionsProEchartsButton>
        <LegionsProEchartsButton icon="download" type="danger" style={{margin: 2}}>danger</LegionsProEchartsButton>
        <br/><br/>
        <LegionsProEchartsButton disabled type="primary" style={{margin: 2}}>primary(dis)</LegionsProEchartsButton>
        <LegionsProEchartsButton disabled style={{margin: 2}}>default(dis)</LegionsProEchartsButton>
        <LegionsProEchartsButton disabled type="dashed" style={{margin: 2}}>dashed(dis)</LegionsProEchartsButton>
        <LegionsProEchartsButton disabled type="danger" style={{margin: 2}}>danger(dis)</LegionsProEchartsButton>
        <br/><br/>
        <LegionsProEchartsButton loading type="primary" style={{margin: 2}}>primary</LegionsProEchartsButton>
        <LegionsProEchartsButton loading style={{margin: 2}}>default</LegionsProEchartsButton>
        <LegionsProEchartsButton loading type="dashed" style={{margin: 2}}>dashed</LegionsProEchartsButton>
        <LegionsProEchartsButton loading type="danger" style={{margin: 2}}>danger</LegionsProEchartsButton>
        <br/><br/>
        <LegionsProEchartsButton.Group>
            <LegionsProEchartsButton type="primary">primary</LegionsProEchartsButton>
            <LegionsProEchartsButton>default</LegionsProEchartsButton>
            <LegionsProEchartsButton type="dashed">dashed</LegionsProEchartsButton>
            <LegionsProEchartsButton type="danger">danger</LegionsProEchartsButton>
        </LegionsProEchartsButton.Group>
  </div>,
  mountNode
);
````
