---
order: 0
title:
  zh-CN: 本地分页
  en-US: 本地分页
---

## zh-CN

本地数据分页配置

## en-US

```jsx
import create from '../../../common/components/render.tsx';
import { JsonProperty } from 'json-mapper-object';
import { Button, Row } from 'antd';
import React from 'react';
import { bind, observer } from 'legions/store-react';
import { LegionsProSelect, LegionsProPageContainer } from 'legions-pro-design';




interface IProps {}
interface IState{
  loading: boolean,
    pageIndexSelect: number,
    visible: boolean,
    page: number,
    pageSize: number,
    pageSelelctList: { key: string; value: string }[],
    selectList:{ key: string; value: string }[],
}
class LegionsProSelectDemo extends React.Component<IProps,IState> {
  constructor(props: IProps) {
    super(props);
    const data = [];
    this.state = {
        loading: false,
        page: 1,
        pageSize: 100,
        pageIndexSelect: 1,
        visible: false,
        pageSelelctList: this.data,
        selectList:data,
    }
     for (let i = 0; i < 40; i++) {
            data.push({
                id: i,
                key: `${i}`,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no.London, Park Lane no. ${i}`,
                value: `Edward King ${i}`,
            });
        }
  }
  render() {
    return (
      <LegionsProSelect
        style={{ width: '150px' }}
        labelInValue
        paging
        pageSize={30}
        
        options={this.state.selectList.map((item: { key: string; value: string }) => {
            return { key: item.key,value: item.value,title: item.value }
        })}
      ></LegionsProSelect>
    );
  }
}
const root = props => {
  return <LegionsProSelectDemo></LegionsProSelectDemo>;
};
const app = create();
ReactDOM.render(React.createElement(app.start(root)), mountNode);
```
