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
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row } from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProTable, LegionsProPageContainer } from 'legions-pro-design';

console.log(LegionsProTable,'LegionsProTable');

 class ResponseVModelNameDataEntity {
  @JsonProperty('key')
  key = void 0;
  @JsonProperty('name')
  name = void 0;
  @JsonProperty('age')
  age = void 0;
  @JsonProperty('address')
  address = void 0;
}
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
      <{},ResponseVModelNameDataEntity>
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
        autoQuery={{
            params: (pageIndex,pageSize) => {
              return {
                size: pageSize,
                current: pageIndex,
                ...this.queryPrams,
              };
            },
            transform: (value) => {
              if (value && !value.isPending && value.value) {
                const { result,current,pageSize,total } = value.value;
                return {
                  data: result.map((item,index) => {
                    item['key'] = index + 1 + (current - 1) * pageSize;
                    return item;
                  }),
                  total: total,
                };
              }
              return {
                total: 0,
                data: [],
              };
            },
            method: 'get',
            ApiUrl: 'http://192.168.200.171:3001/mock/115/getUsers',
            mappingEntity: (that,res) => {
                that.result = that.transformRows(res['data'],ResponseVModelNameDataEntity)
            }
        }}
        columns={this.columnsData}
        uniqueUid="mock/115/getUsers"
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
