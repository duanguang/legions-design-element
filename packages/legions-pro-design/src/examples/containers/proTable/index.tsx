import { Button,Radio,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProTable,LegionsProPageContainer } from '../../../components';
import { InstanceProTable } from '../../../components/LegionsProTable/interface';
import { observablePromise } from 'legions/store-utils';
import { ResponseVModelNameDataEntity } from './model';
import { observable } from 'legions/store';
import { runInAction } from 'mobx'
import { getSystem, HttpConfig } from '../../constants/httpConfig';
LegionsProTable.customColumnsConfig.editApi = `${HttpConfig.bffService}/table/edit`;
LegionsProTable.customColumnsConfig.queryApi = `${HttpConfig.bffService}/table/query`;

interface Materialsparames {
  baseCommodityItemNo?: string,
  createTimeEnd?: string,
  createTimeStart?: string,
  createrName?: string,
  current?: number,
  gname?: string,
  goodsCode?: string,
  isNotBlankCheckInfo?: string,
  itemNo?: string,
  size?: number,
  state?: string,
  typeName?: string,
}
interface IProps { }
@observer
export class ProTable extends LegionsProTable.ProTableBaseClass<IProps,{size:any},{},{}> {
  parames: Materialsparames = {
    state: '1',
    typeName: '料件',
    createTimeStart: '',
    createTimeEnd: '',
    isNotBlankCheckInfo: 'false',
}
  @observable status = {
    color: 'red'
  }
  constructor(props: IProps) {
    super(props)
    this.state = {
      size:'default'
    }
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
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
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
          <Button onClick={() => {
            this.tableRef.viewModel.selectedRowKeys = [];
          }}>清空选中行</Button>
          <Button onClick={() => {
            this.tableRef.viewModel.selectedRowKeys = ['John Brown'];
          }}>选中行</Button>
          <Radio.Group size="default" value={this.state.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
          <LegionsProTable
            <{},ResponseVModelNameDataEntity>
            {...this.state}
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
            columns={this.columnsData}
            uniqueKey='id'
            tableModulesName='demo/proTable'
            isOpenCustomColumns={true}
            autoQuery={{
              params: (pageIndex,pageSize) => {
                return { size: pageSize,current: pageIndex,...this.parames }
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
              options: {
                'api-target': `${getSystem()}/jg/basic/item-master/list.json`,
              
              },
              token: (() => {
                return process.env.environment === 'dev' ? 'SESSION=51de1ec3-354e-4dc0-b043-90d954463e37' : 'SESSION=e3bdf8a8-eae4-40b3-9da8-99152b5239f8';
              })(),

              method: 'post',
              ApiUrl: 'https://gateway.hoolinks.com/api/gateway',
              mappingEntity: (that,res) => {
                that.result = res['data']
              }
            }}
          >
          </LegionsProTable>
        </Row>
      }
    ></LegionsProPageContainer>)
  }
}

