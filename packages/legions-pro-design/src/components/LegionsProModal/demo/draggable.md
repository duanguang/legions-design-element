---
order: 2
title:
  zh-CN: 拖拽移动
  en-US: 拖拽移动
---

## zh-CN

可自由拖拽移动对话框位置

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
            this.modalRef.viewModel.title = '拖拽移动';
            this.modalRef.viewModel.width = 300;
            this.modalRef.viewModel.visible = true;
          }}> 拖拽移动</Button>
        <LegionsProModal
          draggable
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