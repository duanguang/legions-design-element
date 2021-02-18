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
            <LegionsProEchartsBox title="气泡框" height={100}>
                <LegionsProLineOverflow text={'prompt text'} >气泡框</LegionsProLineOverflow>
            </LegionsProEchartsBox>
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
