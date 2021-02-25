/*
 * @Author: duanguang
 * @Date: 2020-12-10 15:31:01
 * @LastEditTime: 2020-12-18 16:17:58
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/interface/interface.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { observablePromise } from 'brain-store-utils';
import * as echarts from 'echarts/core';
import { HeadersPrams } from 'legions/fetch';
import {
    TitleComponentOption,
    GridComponentOption,
    TooltipComponentOption,
    LegendComponentOption,
} from 'echarts/components';

/**
 * onChartReady抛出实体
 * @export
 * @interface ProEchartsInstance
 */
export interface LegionsProEchartsInstance {
    echarts?: echarts.EChartsType;
    methods?: {
        onSearch: <T=any>(option?: T)=>void
    };
}

/**
 * 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
 */
export type LegionsProEchartsOption<P=TitleComponentOption> = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | GridComponentOption | TooltipComponentOption | P
>;

/**
 * echarts核心组件基础属性
 * @export
 * @class LegionsProEchartsPropsTypes
 * @template EchartOption
 */
export class LegionsProEchartsPropsTypes<P=TitleComponentOption> {
    /** echarts对象注入,只有在自定义导入echarts时使用 */
    echarts?: typeof echarts | undefined
    /** 配置项 */
    option?: LegionsProEchartsOption<P>;
    /** 事件集合 */
    onEvents?: {[k: string]: Function} = {};
    /** 是否显示加载状态 */
    loading?: boolean = false;
    /** loading状态配置 */
    loadingOption?: Object = {maskColor: 'rgba(0, 0, 0, 0.2)', color: '#8dd5f5', textColor: '#fff', text: ''};
    /** 初始化附加参数 */
    opts?: Parameters<typeof echarts.init>[2] = {};
    /** 初始化主题 */
    theme?: Parameters<typeof echarts.init>[1];
    /** 容器样式 */
    style?: React.CSSProperties = {};
    /** 容器类名 */
    className?: string = '';
    /** setOption时的附加配置项 */
    setOptionConfig?: LegionsProEchartsOption<P>;
    /** 由上层觉得是否需要setOption, 类似shouldComponentUpdate。默认为 true */
    shouldSetOption?: (
        prevProps: LegionsProEchartsPropsTypes<P>,
        currProps: LegionsProEchartsPropsTypes<P>
    ) => boolean = () => true;
    /** echarts 实例化完成后执行并抛出实例 */
    onChartReady?: (instance: LegionsProEchartsInstance) => void = () => {};
    /** 请求托管 */
    request?: (searchParams?: any) => Promise<LegionsProEchartsOption<P>>
}

/**
 * 请求自动托管参数
 * @export
 * @class LegionsEchartsAutoQueryParams
 */
export class LegionsEchartsAutoQueryParams {
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
    responseTransform: (response: observablePromise.PramsResult<any>) => LegionsProEchartsOption = () => echarts;
}

export { echarts };
