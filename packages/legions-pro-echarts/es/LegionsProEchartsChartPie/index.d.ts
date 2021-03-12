import { PieSeriesOption } from 'echarts/charts';
import React from 'react';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsPieProps extends LegionsProEchartsPropsTypes<PieSeriesOption> {
    /** 数据 */
    data?: PieSeriesOption['data'];
}
/** 饼图组件 */
export default class LegionsProEchartsChartPie extends React.PureComponent<LegionsProEchartsPieProps> {
    static defaultProps: Readonly<LegionsProEchartsPieProps>;
    /** 配置项 */
    get option(): LegionsProEchartsOption<PieSeriesOption>;
    render(): JSX.Element;
}
