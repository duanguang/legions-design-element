import { Button,Row } from 'antd';
import React from 'react';
import { bind,observer } from 'legions/store-react';
import { LegionsProTable,LegionsProForm } from '../../../components';
import { InstanceProTable } from '../../../components/LegionsProTable/interface';
import { observablePromise } from 'legions/store-utils';
import { observable } from 'legions/store';
import { runInAction } from 'mobx'
import { HttpConfig } from '../../constants/httpConfig';
LegionsProTable.customColumnsConfig.editApi = `${HttpConfig.bffService}/table/edit`;
LegionsProTable.customColumnsConfig.queryApi = `${HttpConfig.bffService}/table/query`;
interface IProps { }
@observer
export class ProForm extends LegionsProTable.ProTableBaseClass<IProps,{},{},{}> {

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
         
        </Row>
      }
    ></LegionsProPageContainer>)
  }
}

