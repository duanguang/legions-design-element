---
order: 0
title:
  zh-CN: 二维码生成
  en-US: 二维码生成
---

## zh-CN

一个简单二维码生成的使用

## en-US

```jsx
import create from '../../../common/components/render.tsx';
import React from 'react';
import { LegionsProQrCode,  } from 'legions-pro-design';



interface IProps {}
class LegionsProQrCodeDemo extends React.Component<IProps,{}> {
  constructor(props: IProps) {
    super(props);
    
  }
  render() {
    return (
      <LegionsProQrCode
         value="https://www.baidu.com/"
         image="https://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg"
        ></LegionsProQrCode>
    );
  }
}
const root = props => {
  return <LegionsProQrCodeDemo></LegionsProQrCodeDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
