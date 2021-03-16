/// <reference types="echarts" />
/// <reference types="react" />
import echarts from 'echarts/lib/echarts';
import { HeadersPrams } from 'legions/fetch';
import { observablePromise } from 'brain-store-utils';
declare type TEchartOption = echarts.EChartOption;
export declare class LegionsProEchartsPropsTypes<EchartOption = TEchartOption> {
    /** 配置项 */
    option?: TEchartOption;
    onEvents?: object;
    /** 是否显示加载状态 */
    loading?: boolean;
    loadingOption?: echarts.EChartsLoadingOption;
    /** 初始化附加参数 */
    opts?: Parameters<typeof echarts.init>[2];
    /** 初始化主题 */
    theme?: Parameters<typeof echarts.init>[1];
    /** 容器样式 */
    style?: React.CSSProperties;
    /** 容器类名 */
    className?: string;
    /** setOption时的附加配置项 */
    setOptionConfig?: echarts.EChartsOptionConfig;
    /** 由上层觉得是否需要setOption, 类似shouldComponentUpdate。默认为 true */
    shouldSetOption?: (prevProps: LegionsProEchartsPropsTypes, currProps: LegionsProEchartsPropsTypes) => boolean;
    /** echarts 实例化完成后执行并抛出实例 */
    onChartReady?: (instance: echarts.ECharts) => void;
}
export declare class LegionsEchartsAutoQueryParams {
    /** 数据模型 */
    model: any;
    /** 请求地址 */
    url?: string;
    /** 请求方法, 默认get */
    method?: 'get' | 'post';
    /** 接口请求参数 */
    params?: Object;
    /** headers 参数 */
    headerOption?: HeadersPrams & Object;
    /** 返回结果转化 */
    responseTransform: (response: observablePromise.PramsResult<any>) => echarts.EChartOption.SeriesPie.DataObject[];
}
/**
 *  使用 typescript 有时候需要重写一个库提供的 interface 的某个属性，但是重写 interface 有可能会导致冲突：
 *  原理是，将 类型 T 的所有 K 属性置为 any，
 然后自定义 K 属性的类型，
 由于任何类型都可以赋予 any，所以不会产生冲突
*/
export declare type Weaken<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? any : T[P];
};
export {};