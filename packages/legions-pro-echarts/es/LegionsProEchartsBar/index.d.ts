import { BarSeriesOption } from 'echarts/charts';
import React from 'react';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsBarProps extends LegionsProEchartsPropsTypes<BarSeriesOption> {
    /** 数据 */
    data?: BarSeriesOption['data'];
}
export default class LegionsProEchartsBar extends React.Component<LegionsProEchartsBarProps> {
    static defaultProps: Readonly<LegionsProEchartsBarProps>;
    /** 配置项 */
    get option(): LegionsProEchartsOption<BarSeriesOption>;
    render(): JSX.Element;
}
