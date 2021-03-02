---
order: 7
title:
  zh-CN: 表格
  en-US: table
---

## zh-CN

基于antd table改造样式

## en-US

````jsx
import { LegionsProEchartsBox, LegionsProEchartsTable } from 'legions-pro-echarts';
ReactDOM.render(
  <div>
        <LegionsProEchartsBox title="带滚动条的表格" height="300px">
            <LegionsProEchartsTable
                style={{padding: 10}}
                scroll={{x: 500, y: 200}}
                columns={[
                    {title: '排名',width: 100,dataIndex: 'a', sorter: true},
                    {title: '订单数',width: 100,dataIndex: 'b', sorter: true},
                    {title: '涨幅1',width: 100,dataIndex: 'c', sorter: true},
                    {title: '涨幅2',width: 100,dataIndex: 'd', sorter: true},
                    {title: '涨幅3',width: 100,dataIndex: 'e', sorter: true},
                    {title: '涨幅4',width: 100,dataIndex: 'f', sorter: true},
                    {title: '涨幅5',width: 100,dataIndex: 'g', sorter: true},
                ]}
                dataSource={Array.from({length: 25}).map((_, index) => ({
                    a: index,
                    b: index,
                    c: index,
                    d: index,
                    e: index,
                    f: index,
                    g: index,
                }))}
                pagination={false}
            ></LegionsProEchartsTable>
        </LegionsProEchartsBox>
  </div>,
  mountNode
);
````
