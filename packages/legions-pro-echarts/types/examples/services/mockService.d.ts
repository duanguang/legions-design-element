import { BarSeriesOption, LineSeriesOption, PieSeriesOption } from "echarts/charts";
import { LegionsProEchartsOption } from 'components/interface';
/** 饼图数据模拟 */
export declare const pieData: (a: number) => Promise<LegionsProEchartsOption<PieSeriesOption>>;
/** 折线图数据模拟 */
export declare const lineData: () => Promise<LegionsProEchartsOption<LineSeriesOption>>;
/** 柱状图数据模拟 */
export declare const barData: () => Promise<LegionsProEchartsOption<BarSeriesOption>>;
export declare const mockService: {
    pieData: (a: number) => Promise<LegionsProEchartsOption<PieSeriesOption>>;
    lineData: () => Promise<LegionsProEchartsOption<LineSeriesOption>>;
    barData: () => Promise<LegionsProEchartsOption<BarSeriesOption>>;
};
