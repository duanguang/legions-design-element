/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: 全屏布局，只显示一屏，超出隐藏
 */
import { LegionsProEchartsBox, LegionsProEchartsHeader, LegionsProEchartsLayout } from 'components';
import React from 'react';
const { ProRow, ProCol } = LegionsProEchartsLayout;
export class LayoutFullDemo extends React.Component{
    render() {
        return <LegionsProEchartsLayout isFullScreen gutter={6}>
            <ProRow ySpan={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LegionsProEchartsHeader>当年出口国家报关单量世界地图</LegionsProEchartsHeader>
            </ProRow>
            <ProRow ySpan={16}>
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
            <ProRow ySpan={6}>
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
