import { LineSeriesOption } from 'echarts/charts';
import React from 'react';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsLineProps extends LegionsProEchartsPropsTypes<LineSeriesOption> {
}
export default class LegionsProEchartsLine extends React.Component<LegionsProEchartsLineProps> {
    static defaultProps: Readonly<LegionsProEchartsLineProps>;
    /** 配置项 */
    get option(): LegionsProEchartsOption<LineSeriesOption>;
    render(): JSX.Element;
}
