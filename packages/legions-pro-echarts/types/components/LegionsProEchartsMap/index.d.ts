/// <reference types="echarts" />
/// <reference types="node" />
import 'echarts/lib/chart/map';
import echarts from 'echarts/lib/echarts';
import React from 'react';
import { LegionsProEchartsPropsTypes } from '../interface/interface';
import 'echarts-gl';
export declare class LegionsProEchartsMapProps extends LegionsProEchartsPropsTypes {
    /** 数据 */
    data?: echarts.EChartOption.SeriesMap.DataObject[];
    /** 配置项 */
    option?: echarts.EChartOption;
}
interface IState {
    data?: echarts.EChartOption.SeriesMap.DataObject[];
}
export declare class LegionsProEchartsMap extends React.Component<LegionsProEchartsMapProps, IState> {
    static readonly initData: echarts.EChartOption.SeriesMap.DataObject[];
    static countryNameZh: any;
    timeAction: boolean;
    state: {
        data: echarts.EChartOption.SeriesMap.DataObject[];
    };
    timeId: NodeJS.Timeout | null;
    chartsRef: echarts.ECharts;
    static defaultProps: Readonly<LegionsProEchartsMapProps>;
    get option(): echarts.EChartOption;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: LegionsProEchartsMapProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    highlightSelect(dataIndex?: number): void;
    render(): JSX.Element;
}
export {};
