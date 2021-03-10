import * as echarts from 'echarts/core';
import { Component } from 'react';
import { LegionsProEchartsPropsTypes } from '../interface';
export default class LegionsProEchartsCore<P> extends Component<LegionsProEchartsPropsTypes<P>> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes<any>>;
    echartsLib: typeof echarts;
    echartsElement: HTMLDivElement;
    echartObj: echarts.ECharts;
    constructor(props: LegionsProEchartsPropsTypes<P>);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    renderEchartDom: () => echarts.ECharts;
    rerender: () => void;
    bindEvents: (instance: any, events: any) => void;
    /** 销毁实例 */
    dispose: () => void;
    render(): JSX.Element;
}
