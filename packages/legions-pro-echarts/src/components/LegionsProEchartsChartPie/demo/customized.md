---
order: 1
title:
  zh-CN: 自定义饼图展示
  en-US: customized pie
---

## zh-CN

自定义饼图展示

## en-US

customized pie

```jsx
import React from 'react';
import { LegionsProEchartsBox, LegionsProEchartsChartPie } from 'legions-pro-echarts';

export class Demo extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox style={{height: 260}}>
                <LegionsProEchartsChartPie
                    option={{
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                center:['20%','40%'],
                                radius: ['45%', '60%'],
                                itemStyle: {
                                    borderRadius: 10,
                                    borderWidth: 2
                                },
                                label: {
                                    show: false,
                                    position:'center'
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        formatter:'{b|{b}}\n{c|{c}}',
                                        rich:{
                                            b: {
                                                color: 'rgba(0,230,252,1)',
                                                fontSize:24,
                                                lineHeight: 24,
                                                align: 'center'
                                            },
                                            c: {
                                                color: 'rgba(155,231,245,1)',
                                                fontSize:12,
                                                lineHeight: 12,
                                                align: 'center'
                                            },
                                        },
                                    }
                                },
                                data: [
                                    {value: 1048, name: '搜索引擎'},
                                    {value: 735, name: '直接访问'},
                                    {value: 580, name: '邮件营销'},
                                    {value: 484, name: '联盟广告'},
                                    {value: 300, name: '视频广告',itemStyle:{
                                        color:'rgba(227,106,105,1)'
                                    }}
                                ]
                            },
                            {
                                type: 'pie',
                                center:['70%','40%'],
                                radius:'40%',
                                itemStyle: {
                                    borderRadius: 0,
                                    borderColor: 'rgba(12,13,41,0.4)',
                                    borderWidth: 0
                                },
                                label: {
                                    show: true,
                                    formatter: '{b} {d}%',
                                },
                                data: [
                                    {value: 1048, name: '搜索引擎'},
                                    {value: 735, name: '直接访问'},
                                    {value: 580, name: '邮件营销'},
                                    {value: 484, name: '联盟广告'},
                                    {value: 300, name: '视频广告',itemStyle:{
                                        color:'rgba(227,106,105,1)'
                                    }}
                                ],
                            }
                        ]
                    }}
                ></LegionsProEchartsChartPie>
            </LegionsProEchartsBox>
        )
    }
}

ReactDOM.render(<Demo/>, mountNode);
```
