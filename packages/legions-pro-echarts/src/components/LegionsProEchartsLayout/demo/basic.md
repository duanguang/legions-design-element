---
order: 0
title:
  zh-CN: 基础布局，超过滚动条
  en-US: base
---

## zh-CN

竖向可以有滚动条时，容器盒子可以设置高度固定，宽度自适应

## en-US

```jsx
import React from 'react';
import { LegionsProEchartsLayout, LegionsProEchartsBox }  from 'legions-pro-echarts';
const { ProRow, ProCol } = LegionsProEchartsLayout;
class LayoutBaseDemo extends React.Component{
    render() {
        return <LegionsProEchartsLayout gutter={6}>
            <ProRow>
                <ProCol span={12}>
                    <ProRow>
                        <ProCol span={12}>
                            <LegionsProEchartsBox title="title" height="200px" style={{paddingBottom: 6}}></LegionsProEchartsBox>
                        </ProCol>
                        <ProCol span={12}>
                            <LegionsProEchartsBox title="title" height="200px" style={{paddingBottom: 6}}></LegionsProEchartsBox>
                        </ProCol>
                        <ProCol span={24}>
                            <LegionsProEchartsBox title="title" height="200px"></LegionsProEchartsBox>
                        </ProCol>
                    </ProRow>
                </ProCol>
                <ProCol span={12}>
                    <LegionsProEchartsBox title="title" height="400px"></LegionsProEchartsBox>
                </ProCol>
            </ProRow>
            <ProRow>
                <ProCol span={8}>
                    <LegionsProEchartsBox title="title" height="300px"></LegionsProEchartsBox>
                </ProCol>
                <ProCol span={8}>
                    <LegionsProEchartsBox title="title" height="300px"></LegionsProEchartsBox>
                </ProCol>
                <ProCol span={8}>
                    <LegionsProEchartsBox title="title" height="300px"></LegionsProEchartsBox>
                </ProCol>
            </ProRow>
            <ProRow>
                <ProCol span={6}>
                    <LegionsProEchartsBox height="140px"></LegionsProEchartsBox>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBox height="140px"></LegionsProEchartsBox>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBox height="140px"></LegionsProEchartsBox>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBox height="140px"></LegionsProEchartsBox>
                </ProCol>
            </ProRow>
            <ProRow>
                <ProCol span={12}>
                    <LegionsProEchartsBox title="title" height="400px"></LegionsProEchartsBox>
                </ProCol>
                <ProCol span={12}>
                    <LegionsProEchartsBox title="title" height="400px"></LegionsProEchartsBox>
                </ProCol>
            </ProRow>
            <ProRow>
                <ProCol span={24}>
                    <LegionsProEchartsBox height="150px"></LegionsProEchartsBox>
                </ProCol>
            </ProRow>
            <ProRow>
                <ProCol span={18}>
                    <LegionsProEchartsBox title="title" height="400px"></LegionsProEchartsBox>
                </ProCol>
                <ProCol span={6}>
                    <LegionsProEchartsBox title="title" height="400px"></LegionsProEchartsBox>
                </ProCol>
            </ProRow>
            <ProRow>
                <ProCol span={24}>
                    <LegionsProEchartsBox title="title" height="400px"></LegionsProEchartsBox>
                </ProCol>
            </ProRow>
        </LegionsProEchartsLayout>
    }
}

ReactDOM.render(<LayoutBaseDemo/>, mountNode);
```

<style>
    .code-box-demo{
        height: 600px;
        overflow: auto;
    }
</style>
