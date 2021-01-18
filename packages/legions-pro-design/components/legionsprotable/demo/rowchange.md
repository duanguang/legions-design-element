---
order: 3
title:
  zh-CN: 行操作
  en-US: 行操作
---

## zh-CN

表格行展示交互动态操作

可控制行选中样式，行选中方式等

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
  size:'checkbox'|'radio',
  isOpenRowSelection:boolean,
  rowSelectionClickType:'checkbox'|'radio',
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
      type: 'checkbox',
      isOpenRowSelection:false,
      isOpenRowChange:false,
      rowSelectionClickType:'radio',
    }
  }
  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
  }
  handleOpenRowSelectionChange = (e) => {
    this.tableRef.viewModel.isOpenRowSelection=e.target.value
    this.setState({ isOpenRowSelection: e.target.value });
  }
  handleisOpenRowChange = (e) => {
    this.tableRef.viewModel.isOpenRowChange=e.target.value
    this.setState({ isOpenRowChange: e.target.value });
  }
  handleisRowSelectionChange = (e) => {
    this.setState({ rowSelectionClickType: e.target.value });
  }
  render() {
    return (
      <Row>
        <Row>
        <Form layout="inline">
            <FormItem label="多选/单选">
              <Radio.Group size="checkbox" value={this.state.type} onChange={this.handleTypeChange}>
                <Radio.Button value="checkbox">多选</Radio.Button>
                <Radio.Button value="radio">单选</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="行选中启/关">
              <Radio.Group size={false} value={this.state.isOpenRowSelection} onChange={this.handleOpenRowSelectionChange}>
                <Radio.Button value={true}>是</Radio.Button>
                <Radio.Button value={false}>否</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="单击行选中启/关">
              <Radio.Group size={false} value={this.state.isOpenRowChange} onChange={this.handleisOpenRowChange}>
                <Radio.Button value={true}>是</Radio.Button>
                <Radio.Button value={false}>否</Radio.Button>
              </Radio.Group>
            </FormItem>
             <FormItem label="单击行多选/单选">
              <Radio.Group size="checkbox" value={this.state.rowSelectionClickType} onChange={this.handleisRowSelectionChange}>
                <Radio.Button value="checkbox">多选</Radio.Button>
                <Radio.Button value="radio">单选</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
        </Row>
      <LegionsProTable
      <{},ResponseVModelNameDataEntity>
        {...this.state}
        isOpenRowSelection={false}
         isOpenRowChange={false}
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
        uniqueUid="demo/table/rowchange"
        uniqueKey="name"
         ></LegionsProTable>
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
