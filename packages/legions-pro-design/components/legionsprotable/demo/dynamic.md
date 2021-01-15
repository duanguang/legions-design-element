---
order: 4
title:
  zh-CN: 表格尺寸
  en-US: Size
---

## zh-CN

表格有正常，中，迷你三种尺寸。

通过设置 `size` 为 `default` `small` `middle` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为正常。

## en-US



````jsx
import create from '../../render.tsx';
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
  size:'default'|'small'
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
      size: 'default',
    }
  }
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  render() {
    return (
      <Row>
        <Row>
        <Form layout="inline">
            <FormItem label="Size">
              <Radio.Group size="default" value={this.state.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
        </Row>
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
        uniqueUid="demo/table/dynamic"
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
