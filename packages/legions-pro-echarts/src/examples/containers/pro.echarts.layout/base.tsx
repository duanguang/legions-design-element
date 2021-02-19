/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: 基础布局，超过滚动条
 */
import { LegionsProEchartsBox, LegionsProEchartsLayout } from 'components';
import React from 'react';
const { ProRow, ProCol } = LegionsProEchartsLayout;
export class LayoutBaseDemo extends React.Component{
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
                            <LegionsProEchartsBox title="title" height="400px"></LegionsProEchartsBox>
                        </ProCol>
                    </ProRow>
                </ProCol>
                <ProCol span={12}>
                    <LegionsProEchartsBox title="title" height="600px"></LegionsProEchartsBox>
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
                    <LegionsProEchartsBox title="title" height="600px"></LegionsProEchartsBox>
                </ProCol>
                <ProCol span={12}>
                    <LegionsProEchartsBox title="title" height="600px"></LegionsProEchartsBox>
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
