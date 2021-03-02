---
order: 0
title:
  zh-CN: 百度地图简单使用
  en-US: 百度地图简单使用
---

## zh-CN

一个百度地图的简单使用

## en-US

```jsx
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row } from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProBaiduMap, LegionsProPageContainer } from 'legions-pro-design';


interface IProps {}
class ProBaiduMapDemo extends React.Component<IProps,{}> {
   modalRef: InstanceLegionsProModal = null;
  constructor(props: IProps) {
    super(props);
    
  }
  render() {
    return (
       <React.Fragment>
        <LegionsProBaiduMap
          ></LegionsProBaiduMap>
        </React.Fragment>
    );
  }
}
const root = props => {
  return <ProBaiduMapDemo></ProBaiduMapDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
