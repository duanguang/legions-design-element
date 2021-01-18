import { Button,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProTable,LegionsProPageContainer } from '../../../components';
import { InstanceProTable } from '../../../components/LegionsProTable/interface';
import { observablePromise } from 'legions/store-utils';
import { ResponseVModelNameDataEntity } from './model';
import { observable } from 'legions/store';
import { runInAction } from 'mobx'
import { HttpConfig } from '../../constants/httpConfig';
LegionsProTable.customColumnsConfig.editApi = `${HttpConfig.bffService}/table/edit`;
LegionsProTable.customColumnsConfig.queryApi = `${HttpConfig.bffService}/table/query`;
interface IProps { }
@observer
export class ProTable extends LegionsProTable.ProTableBaseClass<IProps,{},{},{}> {

  @observable status = {
    color: 'red'
  }
  constructor(props: IProps) {
    super(props)
    this.pushColumns('name',{
      title: '姓名',
      width: '100px',
      sorter: true,
    })
    this.pushColumns('age',{
      title: '年龄',
      width: '100px',
      sorter: true,
    })
    this.pushColumns('address',{
      title: '住址',
      width: '100px',
      sorter: true,
      render: (text) => {
        return <span style={{ color: `${this.status.color}` }}>{text}</span>
      }
    })
  }
  render() {
    return (<LegionsProPageContainer
      query={null}
      content={
        <Row>
          <Button onClick={() => {
            this.updateColumns('name',{ title: '姓名1' })
          }}>改变列信息</Button>
          <Button onClick={() => {
            this.refreshColumns('name',() => {
              this.status.color = 'blue';
            })
          }}>改变地址栏颜色</Button>
          <LegionsProTable
            <{},ResponseVModelNameDataEntity>
            customColumnsConfig={{ editApi: '',queryApi: '' }}
            onReady={value => {
              this.tableRef = value;
              this.tableRef.viewModel.isAdaptiveHeight = false;

              this.tableRef.viewModel.bodyExternalContainer.set('ButtonAction',{
                height: 48,
              });

              this.tableRef.viewModel.bodyExternalContainer.set('other',{
                height: 70,
              });
            }}
            selectedRowKeys={this.tableRef && this.tableRef.viewModel.selectedRows.map(item => item.id)}
            scroll={{
              x: this.tableRef && this.tableRef.viewModel.tableXAutoWidth,
              y: 300,
            }}
            pagination={true}
            columns={this.columnsData}
            uniqueKey='name'
            tableModulesName='demo/proTable'
            isOpenCustomColumns={true}
            isOpenRowChange={true}
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
              /* options: {
              'api-target':'http://192.168.200.171:3001/mock/115/getUsers',
              
            }, */
              token: (() => {
                return process.env.environment === 'dev' ? 'SESSION=3aaa0e0f-e799-4ec6-8612-da5593f7414d' : 'SESSION=3aaa0e0f-e799-4ec6-8612-da5593f7414d';
              })(),

              method: 'get',
              ApiUrl: 'http://192.168.200.171:3001/mock/115/getUsers',
              model: {
                mappingEntity: (that,res) => {
                  that.result = that.transformRows(res['data'],ResponseVModelNameDataEntity)
                }
              },
            }}

          >
          </LegionsProTable>
        </Row>
      }
    ></LegionsProPageContainer>)
  }
}

