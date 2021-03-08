---
order: 0
title:
  zh-CN: 气泡框
  en-US: tooltip
---

## zh-CN

气泡框

## en-US

tooltip

```jsx
import React from 'react';
import { LegionsProEchartsBox,LegionsProLineOverflow } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
             <div><LegionsProLineOverflow text={'prompt text'} width={65}></LegionsProLineOverflow></div>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
<style>
    .code-box-demo > div{
        color:#108DE9;
    }
    .code-box-demo .pro-box-content{
        text-align: center;
        line-height: 67px;
    }
</style>
