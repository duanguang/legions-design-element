/// <reference types="echarts" />
import React from 'react';
import { LegionsEchartsAutoQueryParams, LegionsProEchartsPropsTypes } from '../interface/interface';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import { observablePromise } from 'brain-store-utils';
export declare class LegionsProEchartsPieProps extends LegionsProEchartsPropsTypes {
    /** 数据 */
    data?: echarts.EChartOption.SeriesPie.DataObject[];
    /** 配置项 */
    option?: echarts.EChartOption;
    /** 请求托管 */
    autoQuery?: LegionsEchartsAutoQueryParams;
}
declare class ViewModel {
    /** 请求托管response */
    response: observablePromise.PramsResult<any>;
}
/** 饼图组件 */
export declare class LegionsProEchartsChartPie extends React.Component<LegionsProEchartsPieProps> {
    static defaultProps: Readonly<LegionsProEchartsPieProps>;
    viewModel: import("brain-store-utils").ViewModel<ViewModel> & import("brain-store-utils").Proxify<ViewModel>;
    /** 自动接管接口返回数据 */
    get responseData(): echarts.EChartOption.SeriesPie.DataObject[];
    /** 配置项 */
    get option(): echarts.EChartOption;
    componentDidMount(): void;
    /** 获取数据 */
    getData(): void;
    render(): JSX.Element;
}
export {};
