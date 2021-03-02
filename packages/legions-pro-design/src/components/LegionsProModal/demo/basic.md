---
order: 0
title:
  zh-CN: 简单对话框
  en-US: 简单对话框
---

## zh-CN

一个简单模态框使用

## en-US

```jsx
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
            this.modalRef.viewModel.title = '修改密码';
            this.modalRef.viewModel.width = 660;
            this.modalRef.viewModel.visible = true;
          }}> 打开</Button>
        <LegionsProModal
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
```
