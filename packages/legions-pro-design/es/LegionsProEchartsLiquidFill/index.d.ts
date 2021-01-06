/// <reference types="echarts" />
import React from 'react';
import { LegionsEchartsAutoQueryParams, LegionsProEchartsPropsTypes } from '../interface/interface';
import echarts from 'echarts/lib/echarts';
import { observablePromise } from 'brain-store-utils';
import './liquidFill';
export declare class LegionsProEchartsLiquidFillProps extends LegionsProEchartsPropsTypes<IOptions> {
    /** 数据 */
    data?: echarts.EChartOption.SeriesPie.DataObject[];
    /** 配置项 */
    option?: IOptions;
    /** 请求托管 */
    autoQuery?: LegionsEchartsAutoQueryParams;
}
interface IOptions extends Omit<echarts.EChartOption, 'series'> {
    series?: echarts.EChartOption.Series[];
}
declare class ViewModel {
    /** 请求托管response */
    response: observablePromise.PramsResult<any>;
}
/** 水滴波纹组件 */
export declare class LegionsProEchartsLiquidFill extends React.Component<LegionsProEchartsLiquidFillProps> {
    static defaultProps: Readonly<LegionsProEchartsLiquidFillProps>;
    viewModel: import("brain-store-utils").ViewModel<ViewModel> & import("brain-store-utils").Proxify<ViewModel>;
    /** 自动接管接口返回数据 */
    get responseData(): echarts.EChartOption.SeriesPie.DataObject[];
    /** 配置项 */
    get option(): IOptions;
    componentDidMount(): void;
    /** 获取数据 */
    getData(): void;
    render(): JSX.Element;
}
export {};
