/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: charts demo合集
 */
import { LegionsProEchartsChartGauge, LegionsProEchartsChartRadar } from 'components';
import { mockService } from 'examples/services/mockService';
import React from 'react';
import LegionsProEchartsBox from '../../../components/LegionsProEchartsBox';
import LegionsProEchartsChartBar from '../../../components/LegionsProEchartsChartBar';
import LegionsProEchartsChartCard from '../../../components/LegionsProEchartsChartCard';
import LegionsProEchartsChartLine from '../../../components/LegionsProEchartsChartLine';
import LegionsProEchartsChartPie from '../../../components/LegionsProEchartsChartPie';
import LegionsProEchartsLayout from '../../../components/LegionsProEchartsLayout';
import LegionsProEchartsLiquidFill from '../../../components/LegionsProEchartsLiquidFill';
import ChartsPieDemo from './charts.pie';
const { ProRow, ProCol } = LegionsProEchartsLayout;
export class LegionsProEchartsChartPieDemo extends React.Component {
    //@ts-ignore
    chartsRef: echarts.ECharts = null;
    //@ts-ignore
    lineAutoRef: echarts.ECharts = null;
    //@ts-ignore
    lineAutoMethod: IExtendsOption = null;
    // @ts-ignore
    pieMethod: IExtendsOption = null;
    liquidFillValue = 0.6;

    render() {
        return (
            <LegionsProEchartsLayout gutter={6}>
                <ProRow>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="饼图" height="240px">
                            <LegionsProEchartsChartPie
                                data={[
                                    { value: 5210, name: '保税跨境', selected: true, itemStyle: { color: '#407fcc' } },
                                    { value: 9610, name: '跨境直邮', selected: true, itemStyle: { color: '#00D2FF' } },
                                ]}
                            ></LegionsProEchartsChartPie>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <ChartsPieDemo></ChartsPieDemo>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="折线图" height="240px">
                            <LegionsProEchartsChartLine
                                option={{
                                    xAxis: {
                                        data: ['A','B','C','D','E','F','G','H','I','J'],
                                    },
                                    series: [{
                                        name: '进口', stack: '总量',
                                        data: [11.43, 13.58, 25.47, 38.45, 31.58, 26.45, 20.09, 34.42, 11.43, 42.56],
                                    }]
                                }}
                            ></LegionsProEchartsChartLine>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="折线图自动托管数据" height="240px">
                            <LegionsProEchartsChartLine
                                request={mockService.lineData}
                            ></LegionsProEchartsChartLine>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
                <ProRow>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="柱状图" height="240px">
                            <LegionsProEchartsChartBar
                                option={{
                                    xAxis: {
                                        data: ['A','B','C','D'],
                                    },
                                    series: [{
                                        name: '进口', stack: '总量',
                                        data: [41.1,30.4,65.1,53.3]
                                    }]
                                }}
                            ></LegionsProEchartsChartBar>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="柱状图数据自动托管" height="240px">
                            <LegionsProEchartsChartBar request={mockService.barData}></LegionsProEchartsChartBar>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox height="240px">
                            <LegionsProEchartsLiquidFill data={[0.5, 0.4, 0.4, 0.4]}></LegionsProEchartsLiquidFill>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox height="240px">
                            <LegionsProEchartsChartCard total={126} title={'本月新增审核企业'}></LegionsProEchartsChartCard>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
                <ProRow>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="雷达图" height="350px">
                            <LegionsProEchartsChartRadar
                                option={{
                                    radar: {
                                        indicator: [
                                            { name: '销售', max: 6500},
                                            { name: '管理', max: 16000},
                                            { name: '信息技术', max: 30000},
                                            { name: '客服', max: 38000},
                                            { name: '研发', max: 52000},
                                            { name: '市场', max: 25000},
                                        ]
                                    },
                                    series: [{
                                        data : [
                                            {
                                                value : [4300, 10000, 28000, 35000, 50000, 19000],
                                                name : '预算分配'
                                            },
                                            {
                                                value : [5000, 14000, 28000, 31000, 42000, 21000],
                                                name : '实际开销'
                                            }
                                        ]
                                    }]
                                }}
                            ></LegionsProEchartsChartRadar>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="仪表盘" height="350px">
                            <LegionsProEchartsChartGauge
                                option={{
                                    series: [{
                                        data: [{
                                            value: 50,
                                            name: '速度'
                                        }]
                                    }]
                                }}
                            ></LegionsProEchartsChartGauge>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
            </LegionsProEchartsLayout>
        );
    }
}
