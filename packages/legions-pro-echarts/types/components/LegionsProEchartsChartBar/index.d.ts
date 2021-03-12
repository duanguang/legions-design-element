import { BarSeriesOption } from 'echarts/charts';
import React from 'react';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsChartBarProps extends LegionsProEchartsPropsTypes<BarSeriesOption> {
    /** 数据 */
    data?: BarSeriesOption['data'];
}
export default class LegionsProEchartsChartBar extends React.Component<LegionsProEchartsChartBarProps> {
    static defaultProps: Readonly<LegionsProEchartsChartBarProps>;
    /** 配置项 */
    get option(): LegionsProEchartsOption<BarSeriesOption>;
    render(): JSX.Element;
}
