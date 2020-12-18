/// <reference types="echarts" />
import { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { LegionsProEchartsPropsTypes } from '../interface/interface';
interface ILegionsProEchartsReactCore extends LegionsProEchartsPropsTypes {
    echarts: typeof echarts;
}
export declare class LegionsProEchartsCore<P = {}> extends Component<LegionsProEchartsPropsTypes & P> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes>;
    echartsLib: typeof echarts;
    echartsElement: HTMLDivElement | HTMLCanvasElement;
    constructor(props: ILegionsProEchartsReactCore & P);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    /** 获取Echarts实例，没有则初始化 */
    getEchartsInstance: () => echarts.ECharts;
    renderEchartDom: () => echarts.ECharts;
    rerender: () => void;
    bindEvents: (instance: any, events: any) => void;
    /** 销毁实例 */
    dispose: () => void;
    render(): JSX.Element;
}
export {};
