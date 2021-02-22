/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: 基础布局，超过滚动条
 */
import { LegionsProEchartsBox, LegionsProEchartsLayout } from 'components';
import LegionsProEchartsChartPie from 'components/LegionsProEchartsChartPie';
import React from 'react';
const { ProRow, ProCol } = LegionsProEchartsLayout;
export class LayoutBaseDemo extends React.Component{
    render() {
        return <LegionsProEchartsLayout gutter={6}>
            <ProRow>
                <ProCol span={12}>
                    <ProRow>
                        <ProCol span={12}>
                            <LegionsProEchartsBox title="title" height="200px" style={{paddingBottom: 6}}>
                                <LegionsProEchartsChartPie
                                    option={{
                                        legend: {
                                            bottom: 20,
                                            itemWidth: 12,
                                            itemHeight: 5,
                                        },
                                        series: [{
                                            radius: ['28%','40%'],
                                            center: ['50%','40%'],
                                            data:[
                                                { value: 5210,name: '保税跨境',selected: true,itemStyle: { color: '#407fcc' } },
                                                { value: 9610,name: '跨境直邮',selected: true,itemStyle: { color: '#00D2FF' } },
                                            ]
                                        }],
                                    }}
                                ></LegionsProEchartsChartPie>
                            </LegionsProEchartsBox>
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
