import { Button,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProTable,LegionsProPageContainer } from '../../../../es';
import { PageListConfig } from './config';
import { InstanceProTable } from '../../../../es/LegionsProTable/interface';
import { observablePromise } from 'legions/store-utils';
import { DemoPageListContainerEntity } from './model';

interface IProps {}
/* @observer */
export class ProTable extends PageListConfig<IProps,{}> {
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
        <Row>
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
                /* autoQuery={{
                params: (pageIndex, pageSize) => {
                    return {
                    size: pageSize,
                    current: pageIndex,
                    ...this.queryPrams,
                    };
                },

                    transform: (value: observablePromise.PramsResult<null>) => {
                    
                        if (value && !value.isPending && value.value) {
                        //@ts-ignore
                    const {data, current,size,} = value.value.result;

                    return {
                        data: data.map((item, index) => {
                        item['key'] = index + 1 + (current - 1) * size;
                        item.state = item.stateDesc[item.state];
                        return item;
                        }),
 //@ts-ignore
                        total: value.value.result.total,
                    };
                    }

                    return {
                    total: 0,
                    data: [],
                    };
                },

                token: (() => {
                    // return string 返回字符串
                    return process.env.environment === 'dev' ? 'SESSION=3aaa0e0f-e799-4ec6-8612-da5593f7414d' : 'SESSION=3aaa0e0f-e799-4ec6-8612-da5593f7414d';
                })(),

                method: 'get',
                ApiUrl: 'https://scm.hoolinks.com//asn/plan/order/findAsnPlanOrderPage.json',
                model: DemoPageListContainerEntity,
                }} */
          >
          </LegionsProTable>
        </Row>
      }
      ></LegionsProPageContainer>)
    }
}

