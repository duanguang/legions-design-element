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
import { LegionsProEchartsBox, LegionsProEchartsList } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
    <LegionsProEchartsBox style={{ height: '260px', paddingBottom: 5 }}>
        <LegionsProEchartsList
            boxStyle={{ height: '33.33%', paddingBottom: 10, paddingTop: 5 }}
            columns={
                [
                    {
                        title: '标题',
                        dataIndex: 'name',
                    },
                    {
                        title: '总量',
                        dataIndex: 'total',
                        className: 'box-lit-progress-text',
                    },
                ]
            }
            rowKey="name"
            dataSource={[
                {
                    name: '俄罗斯',
                    proportion: 40,
                    total: 397786,
                },
                {
                    name: '美国',
                    proportion: 41,
                    total: 397786
                },
            ]}
        ></LegionsProEchartsList>
    </LegionsProEchartsBox>
  </div>,
  mountNode
);
````
