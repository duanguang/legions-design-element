/// <reference types="react" />
import * as echarts from 'echarts/core';
import { TitleComponentOption, GridComponentOption, TooltipComponentOption, LegendComponentOption } from 'echarts/components';
/**
 * onChartReady抛出实体
 * @export
 * @interface ProEchartsInstance
 */
export interface LegionsProEchartsInstance {
    echarts?: echarts.EChartsType;
    methods?: {
        onSearch: <T = any>(option?: T) => void;
    };
}
/**
 * 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
 */
export declare type LegionsProEchartsOption<P = TitleComponentOption> = echarts.ComposeOption<TitleComponentOption | LegendComponentOption | GridComponentOption | TooltipComponentOption | P>;
/**
 * echarts核心组件基础属性
 * @export
 * @class LegionsProEchartsPropsTypes
 * @template EchartOption
 */
export declare class LegionsProEchartsPropsTypes<P = TitleComponentOption> {
    /** echarts对象注入,只有在自定义导入echarts时使用 */
    echarts?: typeof echarts | undefined;
    /** 配置项 */
    option?: LegionsProEchartsOption<P>;
    /** 事件集合 */
    onEvents?: {
        [k: string]: Function;
    };
    /** 是否显示加载状态 */
    loading?: boolean;
    /** loading状态配置 */
    loadingOption?: Object;
    /** 初始化附加参数 */
    opts?: Parameters<typeof echarts.init>[2];
    /** 初始化主题 */
    theme?: Parameters<typeof echarts.init>[1];
    /** 容器样式 */
    style?: React.CSSProperties;
    /** 容器类名 */
    className?: string;
    /** setOption时的附加配置项 */
    setOptionConfig?: LegionsProEchartsOption<P>;
    /** 由上层觉得是否需要setOption, 类似shouldComponentUpdate。默认为 true */
    shouldSetOption?: (prevProps: LegionsProEchartsPropsTypes<P>, currProps: LegionsProEchartsPropsTypes<P>) => boolean;
    /** echarts 实例化完成后执行并抛出实例 */
    onChartReady?: (instance: LegionsProEchartsInstance) => void;
    /** 请求托管 */
    request?: (searchParams?: any) => Promise<LegionsProEchartsOption<P>>;
}
export { echarts };
