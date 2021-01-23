---
order: 0
title:
  zh-CN: 全屏布局，只显示一屏，超出隐藏
  en-US: base
---

## zh-CN

当需要一屏展示所有内容，并且宽高都自适应时可采用该布局

## en-US

```jsx
import React from 'react';
import { LegionsProEchartsLayout, LegionsProEchartsBox }  from 'legions-pro-echarts';
const { ProRow, ProCol } = LegionsProEchartsLayout;
export class LayoutFullDemo extends React.Component{
    render() {
        return <LegionsProEchartsLayout isFullScreen gutter={6}>
            <ProRow ySpan={17}>
                <ProCol ySpan={24} span={12}>
                    <ProRow ySpan={24}>
                        <ProCol span={12} ySpan={8}>
                            <LegionsProEchartsBox title="title" style={{paddingBottom: 6}}></LegionsProEchartsBox>
                        </ProCol>
                        <ProCol span={12} ySpan={8}>
                            <LegionsProEchartsBox title="title" style={{paddingBottom: 6}}></LegionsProEchartsBox>
                        </ProCol>
                        <ProCol span={24} ySpan={8} >
                            <LegionsProEchartsBox title="title" style={{paddingBottom: 6}}></LegionsProEchartsBox>
                        </ProCol>
                        <ProCol span={12} ySpan={8} >
                            <LegionsProEchartsBox title="title"></LegionsProEchartsBox>
                        </ProCol>
                        <ProCol span={12} ySpan={8} >
                            <LegionsProEchartsBox title="title"></LegionsProEchartsBox>
                        </ProCol>
                    </ProRow>
                </ProCol>
                <ProCol ySpan={24} span={12}>
                    <ProRow ySpan={24}>
                        <ProCol span={24} ySpan={24}>
                            <LegionsProEchartsBox title="title"></LegionsProEchartsBox>
                        </ProCol>
                    </ProRow>
                </ProCol>
            </ProRow>
            <ProRow ySpan={7}>
                <ProCol ySpan={24} span={8}>
                    <LegionsProEchartsBox title="title"></LegionsProEchartsBox>
                </ProCol>
                <ProCol ySpan={24} span={8}>
                    <LegionsProEchartsBox title="title"></LegionsProEchartsBox>
                </ProCol>
                <ProCol ySpan={24} span={8}>
                    <LegionsProEchartsBox title="title"></LegionsProEchartsBox>
                </ProCol>
            </ProRow>
        </LegionsProEchartsLayout>
    }
}

ReactDOM.render(<LayoutFullDemo/>, mountNode);
```

<style>
    .code-box-demo{
        height: 800px;
    }
    .code-box-demo > div {
        height: 100%!important
    }
</style>
