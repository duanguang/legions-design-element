/// <reference types="echarts" />
import React from 'react';
import { LegionsEchartsAutoQueryParams, LegionsProEchartsPropsTypes } from '../interface/interface';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
export declare class LegionsProEchartsCardProps extends LegionsProEchartsPropsTypes {
    /** 数据 */
    data?: echarts.EChartOption.SeriesPie.DataObject[];
    /** 配置项 */
    option?: echarts.EChartOption;
    /** 请求托管 */
    autoQuery?: LegionsEchartsAutoQueryParams;
    title?: string;
    total?: number;
}
/** 饼图组件 */
export declare class LegionsProEchartsChartCard extends React.Component<LegionsProEchartsCardProps> {
    static defaultProps: Readonly<LegionsProEchartsCardProps>;
    componentDidMount(): void;
    render(): JSX.Element;
}
