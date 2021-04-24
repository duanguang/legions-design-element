import { GaugeSeriesOption } from 'echarts/charts';
import React from 'react';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsGaugeProps extends LegionsProEchartsPropsTypes<GaugeSeriesOption> {
}
/** 仪表盘组件 */
export default class LegionsProEchartsGauge extends React.PureComponent<LegionsProEchartsGaugeProps> {
    static defaultProps: Readonly<LegionsProEchartsGaugeProps>;
    /** 配置项 */
    get option(): LegionsProEchartsOption<GaugeSeriesOption>;
    render(): JSX.Element;
}
