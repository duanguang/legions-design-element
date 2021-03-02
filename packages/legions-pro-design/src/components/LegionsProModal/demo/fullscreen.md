---
order: 3
title:
  zh-CN: 最大化
  en-US: 最大化
---

## zh-CN

支持窗口最大化及还原

## en-US



````jsx
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row } from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProModal } from 'legions-pro-design';


interface IProps {}
class ProModalDemo extends React.Component<IProps,{}> {
   modalRef: InstanceLegionsProModal = null;
  constructor(props: IProps) {
    super(props);
    
  }
  render() {
    return (
       <React.Fragment>
        <Button onClick={()=>{
            this.modalRef.viewModel.title = '开启最大化';
            this.modalRef.viewModel.width = 300;
            this.modalRef.viewModel.visible = true;
          }}> 开启最大化</Button>
        <LegionsProModal
          modalType='fullscreen'
          onReady={value => {
            this.modalRef = value;
          }}
          ></LegionsProModal>
        </React.Fragment>
    );
  }
}
const root = props => {
  return <ProModalDemo></ProModalDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
````