/// <reference types="echarts" />
import 'echarts/lib/chart/map';
import echarts from 'echarts/lib/echarts';
import React from 'react';
import { LegionsProEchartsPropsTypes } from '../interface';
import 'echarts-gl';
export declare class LegionsProEchartsMapProps extends LegionsProEchartsPropsTypes {
    /** 数据 */
    data?: echarts.EChartOption.SeriesMap.DataObject[];
    /** 配置项 */
    option?: echarts.EChartOption;
}
export declare class LegionsProEchartsMap extends React.Component<LegionsProEchartsMapProps> {
    static readonly initData: echarts.EChartOption.SeriesMap.DataObject[];
    static countryNameZh: any;
    timeAction: boolean;
    state: {
        data: echarts.EChartOption.SeriesMap.DataObject[];
    };
    chartsRef: echarts.ECharts;
    static defaultProps: Readonly<LegionsProEchartsMapProps>;
    componentWillMount(): void;
    componentDidMount(): void;
    highlightSelect(dataIndex?: number): void;
    render(): JSX.Element;
}
