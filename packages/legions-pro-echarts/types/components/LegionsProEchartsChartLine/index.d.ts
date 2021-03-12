import { LineSeriesOption } from 'echarts/charts';
import React from 'react';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsChartLineProps extends LegionsProEchartsPropsTypes<LineSeriesOption> {
}
export default class LegionsProEchartsChartLine extends React.Component<LegionsProEchartsChartLineProps> {
    static defaultProps: Readonly<LegionsProEchartsChartLineProps>;
    /** 配置项 */
    get option(): LegionsProEchartsOption<LineSeriesOption>;
    render(): JSX.Element;
}
