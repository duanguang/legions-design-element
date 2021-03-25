import { RadarSeriesOption } from 'echarts/charts';
import React from 'react';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsRadarProps extends LegionsProEchartsPropsTypes<RadarSeriesOption> {
}
/** 雷达组件 */
export default class LegionsProEchartsRadar extends React.PureComponent<LegionsProEchartsRadarProps> {
    static defaultProps: Readonly<LegionsProEchartsRadarProps>;
    /** 配置项 */
    get option(): LegionsProEchartsOption<RadarSeriesOption>;
    render(): JSX.Element;
}
