/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: charts demo合集
 */
import React from 'react';
import LegionsProEchartsLayout from '../../../components/LegionsProEchartsLayout';
import { ChartsBarDemo1, ChartsBarDemo2 } from './charts.bar';
import { ChartsCardDemo1 } from './charts.card';
import { ChartsGaugeDemo1 } from './charts.gauge';
import { ChartsLineDemo1, ChartsLineDemo2 } from './charts.line';
import { ChartsLiquidFillDemo1 } from './charts.liquidFill';
import { MapSimpleDemo } from './charts.map';
import { ChartsPieDemo1, ChartsPieDemo2 } from './charts.pie';
import { ChartsRadarDemo1 } from './charts.radar';
import WordCloudDemo from './charts.wordCloud';
const { ProRow, ProCol } = LegionsProEchartsLayout;
export class LegionsProEchartsChartPieDemo extends React.Component {
    render() {
        return (
            <LegionsProEchartsLayout gutter={6}>
                <ProRow>
                    <ProCol span={6}>
                        <ChartsPieDemo1/>
                    </ProCol>
                    <ProCol span={6}>
                        <ChartsPieDemo2/>
                    </ProCol>
                    <ProCol span={6}>
                        <ChartsLineDemo1/>
                    </ProCol>
                    <ProCol span={6}>
                        <ChartsLineDemo2/>
                    </ProCol>
                </ProRow>
                <ProRow>
                    <ProCol span={6}>
                        <ChartsBarDemo1/>
                    </ProCol>
                    <ProCol span={6}>
                        <ChartsBarDemo2/>
                    </ProCol>
                    <ProCol span={6}>
                        <ChartsLiquidFillDemo1/>
                    </ProCol>
                    <ProCol span={6}>
                        <ChartsCardDemo1/>
                    </ProCol>
                </ProRow>
                <ProRow>
                    <ProCol span={6}>
                        <ChartsRadarDemo1/>
                    </ProCol>
                    <ProCol span={6}>
                        <ChartsGaugeDemo1/>
                    </ProCol>
                    <ProCol span={12}>
                        <WordCloudDemo></WordCloudDemo>
                    </ProCol>
                </ProRow>
                <ProRow>
                    <ProCol span={24}>
                        <MapSimpleDemo/>
                    </ProCol>
                </ProRow>
            </LegionsProEchartsLayout>
        );
    }
}
