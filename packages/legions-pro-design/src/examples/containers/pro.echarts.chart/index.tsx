import React from 'react';
import echarts from 'echarts/lib/echarts';
import { LegionsProEchartsChartPie } from '../../../components/LegionsProEchartsChartPie';
import {LegionsProEchartsLayout} from '../../../components/LegionsProEchartsLayout';
import { LegionsProEchartsChartLine } from '../../../components/LegionsProEchartsChartLine';
import {LegionsProEchartsBox} from '../../../components/LegionsProEchartsBox';
import { LegionsProEchartsChartBar } from '../../../components/LegionsProEchartsChartBar';
import { LegionsProEchartsChartCard } from '../../../components/LegionsProEchartsChartCard';
import { Col,Row } from 'antd';
import { LegionsProEchartsCol } from '../../../components/LegionsProEchartsCol';
import {
    LegionsProEchartsLiquidFill
} from '../../../components/LegionsProEchartsLiquidFill';
export class LegionsProEchartsChartPieDemo extends React.Component {
    //@ts-ignore
    chartsRef: echarts.ECharts = null;
    liquidFillValue=0.6
    lineOptions: echarts.EChartOption = {
        legend: {
            data: ['出口','进口'],
        },
        xAxis: {
            data: ['202001','202002','202003','202004','202005','202006','202007','202008','202009','202010'],

        },
        series: [
            {
                name: '出口',
                type: 'line',
                stack: '总量',
                symbolSize: 5,
                // tslint:disable-next-line: no-magic-numbers
                data: [10.32,12.43,26.45,20.09,34.42,11.43,13.58,25.47,38.45,31.58],
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
                data: [11.43,13.58,25.47,38.45,31.58,26.45,20.09,34.42,11.43,42.56],
                itemStyle: {
                    normal: {
                        color: '#ff9933',
                        label: { show: true,color: '#ff9933' },
                        lineStyle: {
                            color: '#ff9933',
                        },
                    },
                },
            },
        ]
    } 
    barOptions: echarts.EChartOption = {
        /*  xAxis: {
            data: ['10月', '11月', '12月', '01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月'],
        },
        series: [
            {
                data: [500, 740, 880, 600, 180, 280, 380, 680, 530, 260, 380, 220],
                type: 'bar',
                barWidth:'10%'
            },
        ], */
        dataset: {
            dimensions: ['product','2015','2016','2017'],
            source: [
                { product: 'Matcha Latte','2015': 43.3,'2016': 85.8,'2017': 93.7 },
                { product: 'Milk Tea','2015': 83.1,'2016': 73.4,'2017': 55.1 },
                { product: 'Cheese Cocoa','2015': 86.4,'2016': 65.2,'2017': 82.5 },
                { product: 'Walnut Brownie','2015': 72.4,'2016': 53.9,'2017': 39.1 }
            ]
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
                barGap: '15%'
            },
            { type: 'bar',barWidth: '10%',barGap: '25%',barCategoryGap: '5%',}
        ]
    }
    liquidFillOptions: echarts.EChartOption = {
        title: [{
            text:(this.liquidFillValue * 100).toFixed(0) + '{a|%}',
        }],
        series: [{
            data: [{
                name: '流量统计',
               value:0.8,
            },this.liquidFillValue,this.liquidFillValue,this.liquidFillValue],
            label: {
                show:false,
            }
        }]
    }
    render() {
        return <LegionsProEchartsLayout>
            <LegionsProEchartsCol xs={{
                span:24
            }} sm={6} md={8} lg={5} xl={5} >
                <LegionsProEchartsBox
                    style={{ height: '240px',paddingBottom: 10,paddingTop: 5 }}
                    title="饼图1">
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
                            }],
                        }}
                        data={[
                            { value: 5210,name: '保税跨境',selected: true,itemStyle: { color: '#407fcc' } },
                            { value: 9610,name: '跨境直邮',selected: true,itemStyle: { color: '#00D2FF' } },
                        ]}
                        onChartReady={(instance: echarts.ECharts) => {
                            this.chartsRef = instance;
                        }}
                    ></LegionsProEchartsChartPie>
                </LegionsProEchartsBox>
            </LegionsProEchartsCol>
            <LegionsProEchartsCol xs={24} sm={{
                span: 8,
                offset:1,
            }} md={{span:7,offset:1}} lg={{span:6,offset:1}} xl={{span:6,offset:1}}>
                <LegionsProEchartsBox
                    style={{ height: '240px',paddingBottom: 5 }}
                    title="折线图">
                    <LegionsProEchartsChartLine option={this.lineOptions}></LegionsProEchartsChartLine>
                </LegionsProEchartsBox>
            </LegionsProEchartsCol>
            <LegionsProEchartsCol xs={24} sm={{span:8,offset:1}} md={{span:7,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}}>
                <LegionsProEchartsBox
                    style={{ height: '240px',paddingBottom: 5 }}
                    title="柱状图">
                    <LegionsProEchartsChartBar option={this.barOptions}></LegionsProEchartsChartBar>
                </LegionsProEchartsBox>
            </LegionsProEchartsCol>
            <LegionsProEchartsCol xs={24} sm={{span:8}} md={{span:6}} lg={{span:5,offset:1}} xl={{span:5,offset:1}}>
                <LegionsProEchartsBox
                    style={{ height: '240px',paddingBottom: 5 }}
                    >
                    <LegionsProEchartsChartCard total={126} title={'本月新增审核企业'}></LegionsProEchartsChartCard>
                </LegionsProEchartsBox>
            </LegionsProEchartsCol>
            <LegionsProEchartsCol xs={24} sm={{span:8}} md={{span:6}} lg={{span:5,offset:1}} xl={{span:5,offset:1}}>
                <LegionsProEchartsBox
                    style={{ height: '260px',paddingBottom: 5 }}
                    >
                    <LegionsProEchartsLiquidFill option={this.liquidFillOptions}></LegionsProEchartsLiquidFill>
                </LegionsProEchartsBox>
            </LegionsProEchartsCol>
        </LegionsProEchartsLayout>
    }
}