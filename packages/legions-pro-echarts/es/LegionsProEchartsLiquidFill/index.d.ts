import 'echarts-liquidfill';
import React from 'react';
import { LegionsProEchartsPropsTypes } from '../interface';
export declare class LegionsProEchartsLiquidFillProps extends LegionsProEchartsPropsTypes<any> {
    /** 数据 */
    data?: Object;
}
export default class LegionsProEchartsLiquidFill extends React.Component<LegionsProEchartsLiquidFillProps> {
    static defaultProps: Readonly<LegionsProEchartsLiquidFillProps>;
    /** 配置项 */
    private get option();
    render(): JSX.Element;
}
