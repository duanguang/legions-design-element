/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: charts demo合集
 */
import { Button } from 'antd';
import echarts from 'echarts/lib/echarts';
import { StockModeContainerEntity } from 'examples/models/mockEntity';
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
    lineOptions: echarts.EChartOption = {
        legend: {
            data: ['出口', '进口'],
        },
        xAxis: {
            data: ['202001', '202002', '202003', '202004', '202005', '202006', '202007', '202008', '202009', '202010'],
        },
        series: [
            {
                name: '出口',
                type: 'line',
                stack: '总量',
                symbolSize: 5,
                // tslint:disable-next-line: no-magic-numbers
                data: [10.32, 12.43, 26.45, 20.09, 34.42, 11.43, 13.58, 25.47, 38.45, 31.58],
                itemStyle: {
                    normal: {
                        label: { show: true },
                    },
                },
            },
            {
                name: '进口',
                type: 'line',
                stack: '总量',
                symbolSize: 5,
                // tslint:disable-next-line: no-magic-numbers
                data: [11.43, 13.58, 25.47, 38.45, 31.58, 26.45, 20.09, 34.42, 11.43, 42.56],
                itemStyle: {
                    normal: {
                        color: '#ff9933',
                        label: { show: true, color: '#ff9933' },
                        lineStyle: {
                            color: '#ff9933',
                        },
                    },
                },
            },
        ],
    };
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
    liquidFillOptions: echarts.EChartOption = {
        title: [
            {
                text: (this.liquidFillValue * 100).toFixed(0) + '{a|%}',
            },
        ],
        series: [
            {
                data: [
                    {
                        name: '流量统计',
                        value: 0.8,
                    },
                    this.liquidFillValue,
                    this.liquidFillValue,
                    this.liquidFillValue,
                ],
                label: {
                    show: false,
                },
            },
        ],
    };

    render() {
        return (
            <LegionsProEchartsLayout gutter={6}>
                <ProRow>
                    <Button
                        onClick={() => {

                        }}>
                        饼图数据刷新测试
                    </Button>
                </ProRow>
                <ProRow>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="饼图" height="240px">
                            <LegionsProEchartsChartPie
                                option={{
                                    legend: {
                                        bottom: 20,
                                        itemWidth: 12,
                                        itemHeight: 5,
                                    },
                                    series: [
                                        {
                                            radius: ['28%', '40%'],
                                            center: ['50%', '40%'],
                                            data: [
                                                { value: 5210, name: '保税跨境', selected: true, itemStyle: { color: '#407fcc' } },
                                                { value: 9610, name: '跨境直邮', selected: true, itemStyle: { color: '#00D2FF' } },
                                            ],
                                        },
                                    ],
                                }}
                                onChartReady={(instance) => {
                                    this.chartsRef = instance;
                                }}></LegionsProEchartsChartPie>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox height="240px" title="饼图数据自动托管">
                            <LegionsProEchartsChartPie
                                option={{
                                    legend: {
                                        bottom: 20,
                                        itemWidth: 12,
                                        itemHeight: 5,
                                    },
                                }}
                                onChartReady={(instance) => {
                                    this.chartsRef = instance;
                                }}
                                ></LegionsProEchartsChartPie>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="折线图" height="240px">
                            <LegionsProEchartsChartLine option={this.lineOptions}></LegionsProEchartsChartLine>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="折线图自动托管数据" height="240px">
                            <LegionsProEchartsChartLine
                                option={{
                                    xAxis: {
                                        data: [
                                            '202001',
                                            '202002',
                                            '202003',
                                            '202004',
                                            '202005',
                                            '202006',
                                            '202007',
                                            '202008',
                                            '202009',
                                            '202010',
                                        ],
                                    },
                                }}
                                onChartReady={(instance) => {
                                    this.lineAutoRef = instance;
                                }}
                                autoQuery={{
                                    model: StockModeContainerEntity,
                                    url: 'https://gateway.hoolinks.com/api/gateway',
                                    method: 'post',
                                    params: { pageSize: 3000, pageNo: 1 },
                                    headerOption: {
                                        'api-target': 'https://uat-api.hoolinks.com/scmjg/dcl/exports-goods-model/list',
                                        'api-cookie':
                                            'SESSION=31c6b99d-a132-4dbf-9975-3b41160a340d; HL-Access-Token=YzMxMGM2MmMtYmU0NS00YzVjLWI0YzktM2QzNGNkZDczMWUx; UCTOKEN=YzMxMGM2MmMtYmU0NS00YzVjLWI0YzktM2QzNGNkZDczMWUx;',
                                    },
                                    responseTransform: (response: observablePromise.PramsResult<StockModeContainerEntity>) => {
                                        if (response.isResolved && response.value.success) {
                                            return {
                                                series: response.value.result.records.slice(0, 2).map((item, index) => {
                                                    return {
                                                        name: item.id.toString(),
                                                        type: 'line',
                                                        stack: '总量',
                                                        symbolSize: 5,
                                                        // tslint:disable-next-line: no-magic-numbers
                                                        data: [10.32, 12.43, 26.45, 20.09, 34.42, 11.43, 13.58, 25.47, 38.45, 31.58].map(
                                                            (item) => item + index,
                                                        ),
                                                        itemStyle: {
                                                            normal: {
                                                                label: { show: true },
                                                            },
                                                        },
                                                    };
                                                }),
                                            };
                                        }
                                        return {};
                                    },
                                }}></LegionsProEchartsChartLine>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
                <ProRow>
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
                                }}
                                autoQuery={{
                                    model: StockModeContainerEntity,
                                    url: 'https://gateway.hoolinks.com/api/gateway',
                                    method: 'post',
                                    params: { pageSize: 3000, pageNo: 1 },
                                    headerOption: {
                                        'api-target': 'https://uat-api.hoolinks.com/scmjg/dcl/exports-goods-model/list',
                                        'api-cookie':
                                            'SESSION=31c6b99d-a132-4dbf-9975-3b41160a340d; HL-Access-Token=YzMxMGM2MmMtYmU0NS00YzVjLWI0YzktM2QzNGNkZDczMWUx; UCTOKEN=YzMxMGM2MmMtYmU0NS00YzVjLWI0YzktM2QzNGNkZDczMWUx;',
                                    },
                                    responseTransform: (response: observablePromise.PramsResult<StockModeContainerEntity>) => {
                                        if (response.isResolved && response.value.success) {
                                            return {
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
                                                    { type: 'bar', barWidth: '10%', barGap: '25%', barCategoryGap: '5%' },
                                                ],
                                            };
                                        }
                                        return {};
                                    },
                                }}></LegionsProEchartsChartBar>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox height="240px">
                            <LegionsProEchartsChartCard total={126} title={'本月新增审核企业'}></LegionsProEchartsChartCard>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox height="240px">
                            <LegionsProEchartsLiquidFill option={this.liquidFillOptions}></LegionsProEchartsLiquidFill>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
                <ProRow>
                    <ProCol span={6}>
                        <ChartsPieDemo></ChartsPieDemo>
                    </ProCol>
                </ProRow>
            </LegionsProEchartsLayout>
        );
    }
}
