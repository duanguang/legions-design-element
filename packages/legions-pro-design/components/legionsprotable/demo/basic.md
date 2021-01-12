---
order: 0
title:
  zh-CN: 查询表格
  en-US: Type
---

## zh-CN

表格绑定查询条件的数据


## en-US




````jsx
import  create from '../../render.tsx';
import { Button,Row } from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProTable, LegionsProPageContainer} from 'legions-pro-design';
import {InstanceProTable} from 'legions-pro-design/LegionsProTable/interface';
import {IQuery} from 'legions-pro-design/LegionsProQueryConditions/interface';
const app = create();
class PageListConfig<P, S = {}> extends React.Component<P, S> {
    instanceStatement: ProTableDemo = null;
    constructor(props: P) {
     super(props);
    }
    registeredInstanceStatement(instance: ProTableDemo) {
       this.instanceStatement = instance;
    }
    protected createQueryConfig() {
      const that: ProTableDemo = this.instanceStatement;
      const queryConfig: Array<IQuery> = [{
        container: {
          width: 200,
          position: 'content',
          component: {
            label: '文本框:',
            props: {
              width: 140,
              placeholder: '请输入',
              maxLength: '50',
            },
            type: 'text',
            JsonProperty: {
              name: 'name',
              value: '',
              queryPrams: 'name',
            },

            defaultValue: '',
            hooks: [],
          },
        },
      }, {
        container: {
          position: 'right',
          component: {
            props: {
              width: 86,
            },
            hooks: [{
              name: 'onSearch',
              handle: function handle(value) {
                // @ts-ignore
                that.handleSearch(value);
              },
            }, {
              name: 'onReset',
              handle: function handle(value) {
                // @ts-ignore
                that.handleReset(value);
              },
            }],
          },
        },
      }];

      return queryConfig;
    }
    protected createTableColumnsConfig() {
      const columnsConfig: TableColumnConfig<{}>[] = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: '100px',
        key: 'name',
        sorter: true,
      }, {
        title: '年龄',
        dataIndex: 'age',
        width: '100px',
        key: 'age',
      }, {
        title: '住址',
        dataIndex: 'address',
        width: '100px',
        key: 'address',
      }
      ];

      return columnsConfig;
    }
}
class ProTableDemo extends PageListConfig{
  //@ts-ignore
    tableRef:InstanceProTable=null;
    /** 搜索条件 */
    queryPrams: Object = {};
    constructor(props: IProps) {
        super(props)
        this.registeredInstanceStatement(this);
        
    }
    handleSearch = value => {
        let val = value;

        this.queryPrams = {
          ...this.queryPrams,
          ...val,
        };

        this.tableRef.methods.onSearch();
    };

    handleReset = value => {
      this.handleSearch(value);
    };
    onOpenCustomColumns = () => {
      this.tableRef.methods.openCustomColumns();
    };
    render(){
      return (<LegionsProPageContainer 
      query={null}
      content={
        <LegionsProTable
                customColumnsConfig={{editApi:'',queryApi:''}}
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
                selectedRowKeys={this.tableRef && this.tableRef.viewModel.selectedRows.map(item => item.id)}
                scroll={{
                x: this.tableRef && this.tableRef.viewModel.tableXAutoWidth,
                y: 300,
                }}
                pagination={true}
                columns={this.createTableColumnsConfig()}
                uniqueKey='id'
                tableModulesName=''
                isOpenCustomColumns={true}
                isOpenRowChange={true}
          >
          </LegionsProTable>
      }
      ></LegionsProPageContainer>)
    }
}
const root=(props)=>{
   return <ProTableDemo>
   </ProTableDemo>
}
ReactDOM.render(
  React.createElement(app.start(root))
, mountNode);
````
