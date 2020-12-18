/// <reference types="echarts" />
import React from 'react';
import echarts from 'echarts/lib/echarts';
export declare class LegionsProEchartsChartPieDemo extends React.Component {
    chartsRef: echarts.ECharts;
    liquidFillValue: number;
    lineOptions: echarts.EChartOption;
    barOptions: echarts.EChartOption;
    liquidFillOptions: echarts.EChartOption;
    render(): JSX.Element;
}
