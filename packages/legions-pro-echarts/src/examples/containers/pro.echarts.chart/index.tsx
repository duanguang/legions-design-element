/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: charts demo合集
 */
import { Button } from 'antd';
import echarts from 'echarts/lib/echarts';
import { StockModeContainerEntity } from 'examples/models/mockEntity';
import { mockService } from 'examples/services/mockService';
import { observablePromise } from 'legions/store-utils';
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
    barOptions: echarts.EChartOption = {
        dataset: {
            dimensions: ['product', '2015', '2016', '2017'],
            source: [
                { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
                { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
                { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
                { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 },
            ],
        },
        series: [
            {
                type: 'bar',
                barWidth: '10%',
                barGap: '0',
                barCategoryGap: '15px',
            },
            {
                type: 'bar',
                barWidth: '10%',
                barGap: '15%',
            },
            { type: 'bar', barWidth: '10%', barGap: '25%', barCategoryGap: '5%' },
        ],
    };

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
                                data={[11.43, 13.58, 25.47, 38.45, 31.58, 26.45, 20.09, 34.42, 11.43, 42.56]}
                                option={{series: [{name: '进口', stack: '总量'}]}}
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
                        <LegionsProEchartsBox height="240px">
                            <LegionsProEchartsLiquidFill data={[0.5, 0.4, 0.4, 0.4]}></LegionsProEchartsLiquidFill>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox height="240px" title="柱状图">
                            <LegionsProEchartsChartBar
                                option={{
                                    ...this.barOptions,
                                    toolbox: { feature: {} },
                                }}></LegionsProEchartsChartBar>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="柱状图数据自动托管" height="240px">
                            <LegionsProEchartsChartBar
                                option={{
                                    dataset: {
                                        source: [
                                            ['product', '2012', '2013', '2014', '2015'],
                                            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
                                            ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
                                            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4],
                                        ],
                                    },
                                }}></LegionsProEchartsChartBar>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox height="240px">
                            <LegionsProEchartsChartCard total={126} title={'本月新增审核企业'}></LegionsProEchartsChartCard>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
            </LegionsProEchartsLayout>
        );
    }
}
