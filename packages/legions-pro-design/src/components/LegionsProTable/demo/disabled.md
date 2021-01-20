---
order: 1
title:
  zh-CN: 不可用状态
  en-US: Disabled
---

## zh-CN

添加 `rowSelection.getCheckboxProps` 属性即可让表格指定行处于不可用状态,同时行样式会发生变化。

## en-US



````jsx
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row,Radio,Col,Form } from 'antd';
const FormItem = Form.Item;
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProTable, LegionsProPageContainer } from 'legions-pro-design';



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
interface IState{
}
class ProTableDemo extends LegionsProTable.ProTableBaseClass<IProps,IState,{},{}> {
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
    this.state={
    }
  }
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  render() {
    return (
      <Row>
      <LegionsProTable
      <{},ResponseVModelNameDataEntity>
      {...this.state}
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
        rowSelection={{
            getCheckboxProps: (record) => {
                return {
                    disabled: record['key'] === 3,
                }
            }
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
            model: {
              mappingEntity: (that,res) => {
                that.result = that.transformRows(res['data'],ResponseVModelNameDataEntity)
              }
            },
        }}
        pagination={true}
        columns={this.columnsData}
        /* 真实环境中会自动生成，演示专用*/
        uniqueUid="demo/table/disabled"
        uniqueKey="name"
        isOpenRowChange={false}></LegionsProTable>
        </Row>
    );
  }
}
const root = props => {
  return <ProTableDemo></ProTableDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
````
