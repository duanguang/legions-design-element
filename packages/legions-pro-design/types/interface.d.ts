/// <reference types="echarts" />
import echarts from 'echarts/lib/echarts';
export declare class LegionsProEchartsPropsTypes {
    /** 配置项 */
    option?: echarts.EChartOption;
    onEvents: object;
    /** 是否显示加载状态 */
    loading?: boolean;
    loadingOption: echarts.EChartsLoadingOption;
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
