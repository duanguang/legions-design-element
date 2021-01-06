/// <reference types="echarts" />
import React from 'react';
import { LegionsEchartsAutoQueryParams, LegionsProEchartsPropsTypes } from '../interface/interface';
import echarts from 'echarts/lib/echarts';
import { observablePromise } from 'brain-store-utils';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/toolbox';
export declare class LegionsProEchartsChartBarProps extends LegionsProEchartsPropsTypes {
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
export declare class LegionsProEchartsChartBar extends React.Component<LegionsProEchartsChartBarProps> {
    static defaultProps: Readonly<LegionsProEchartsChartBarProps>;
    viewModel: import("brain-store-utils").ViewModel<ViewModel> & import("brain-store-utils").Proxify<ViewModel>;
    /** 自动接管接口返回数据 */
    get responseData(): echarts.EChartOption.SeriesPie.DataObject[];
    /** 配置项 */
    get option(): echarts.EChartOption;
    render(): JSX.Element;
}
export {};
