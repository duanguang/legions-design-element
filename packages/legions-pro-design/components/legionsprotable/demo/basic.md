---
order: 0
title:
  zh-CN: 简单列表
  en-US: 简单列表
---

## zh-CN

一个简单列表绑定数据使用

## en-US

```jsx
import create from '../../render.tsx';
import { Button, Row } from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProTable, LegionsProPageContainer } from 'legions-pro-design';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
interface IProps {}
class ProTableDemo extends LegionsProTable.ProTableBaseClass<IProps,{},{},{}> {
  constructor(props: IProps) {
    super(props);
    this.pushColumns('name', {
      title: '姓名',
      width: '100px',
      sorter: true,
    });
    this.pushColumns('age', {
      title: '年龄',
      width: '100px',
      sorter: true,
    });
    this.pushColumns('address', {
      title: '住址',
      width: '100px',
      sorter: true,
    });
  }
  render() {
    return (
      <LegionsProTable
        onReady={value => {
          this.tableRef = value;
          this.tableRef.viewModel.isAdaptiveHeight = false;

          this.tableRef.viewModel.bodyExternalContainer.set('ButtonAction', {
            height: 48,
          });

          this.tableRef.viewModel.bodyExternalContainer.set('other', {
            height: 70,
          });
        }}
        selectedRowKeys={
          this.tableRef &&
          this.tableRef.viewModel.selectedRows.map(item => item.id)
        }
        scroll={{
          x: this.tableRef && this.tableRef.viewModel.tableXAutoWidth,
          y: 300,
        }}
        data={data}
        pagination={true}
        columns={this.columnsData}
        uniqueKey="name"
        isOpenRowChange={false}></LegionsProTable>
    );
  }
}
const root = props => {
  return <ProTableDemo></ProTableDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
