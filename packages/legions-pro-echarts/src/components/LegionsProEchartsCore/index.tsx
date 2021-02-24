import * as echarts from 'echarts/core';
import { isEqual, pick } from 'lodash';
import React, { Component } from 'react';
import { bind, clear } from 'size-sensor';
import { LegionsProEchartsPropsTypes } from '../interface';
interface ILegionsProEchartsReactCore extends LegionsProEchartsPropsTypes {
    echarts: typeof echarts
}
export default class LegionsProEchartsCore<P = {}> extends Component<LegionsProEchartsPropsTypes & P> {
    static defaultProps: Readonly<LegionsProEchartsPropsTypes> = new LegionsProEchartsPropsTypes()
    echartsLib: typeof echarts;
    echartsElement: HTMLDivElement;
    constructor(props: ILegionsProEchartsReactCore&P) {
        super(props);
        this.echartsLib = props.echarts;
        // @ts-ignore
        this.echartsElement = null;
    }
    componentDidMount() {
        this.rerender();
    }
    componentDidUpdate(prevProps) {
        /* 判断是否需要 setOption，由开发者自己来确定。默认为 true */
        if (typeof this.props.shouldSetOption === 'function' && !this.props.shouldSetOption(prevProps,this.props)) {
            return;
        }
        /* 以下属性修改的时候，需要销售实例之后再重建 */
        /* 1. 切换 theme 的时候 */
        /* 2. 修改 opts 的时候 */
        /* 3. 修改 onEvents 的时候，这样可以取消所有之前绑定的事件 issue #151 */
        if (
            !isEqual(prevProps.theme,this.props.theme) ||
            !isEqual(prevProps.opts,this.props.opts) ||
            !isEqual(prevProps.onEvents,this.props.onEvents
            )
        ) {
            /* 销毁实例 */
            this.dispose();
            /* 重建实例 */
            this.rerender();
            return;
        }

        /* 当这些属性保持不变的时候，不 setOption */
        const pickKeys = ['option','loading','loadingOption'];
        if (isEqual(pick(this.props,pickKeys),pick(prevProps,pickKeys))) {
            return;
        }

        /* 样式修改的时候，可能会导致大小变化，所以触发一下resize */
        if (!isEqual(prevProps.style,this.props.style) || !isEqual(prevProps.className,this.props.className)) {
            try {
                const echartObj = this.renderEchartDom();
                echartObj.resize();
            } catch (e) {
                console.warn(e);
            }
        }
    }
    renderEchartDom = () => {
        /* 获取Echarts实例，没有则初始化 */
        const echartObj = this.echartsLib.getInstanceByDom(this.echartsElement) || this.echartsLib.init(this.echartsElement, this.props.theme, this.props.opts);
        /* 初始配置 */
        echartObj.setOption(this.props.option || {},{ ...this.props.setOptionConfig });
        /* 是否显示lading状态 */
        if (this.props.loading) {
            echartObj.showLoading(void 0, this.props.loadingOption)
        }else {
            echartObj.hideLoading();
        }
        return echartObj
    };
    rerender = () => {
        const { onEvents,onChartReady } = this.props;
        const echartObj = this.renderEchartDom();
        this.bindEvents(echartObj,onEvents || {});
        // @ts-ignore on chart ready
        if (typeof onChartReady === 'function' && this.props.onChartReady) this.props.onChartReady(echartObj);
        // on resize
        if (this.echartsElement) {
            bind(this.echartsElement,() => {
                try {
                    echartObj.resize();
                } catch (e) {
                    console.warn(e);
                }
            });
        }
    };
    // bind the events
    bindEvents = (instance,events) => {
        const _bindEvent = (eventName,func) => {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && typeof func === 'function') {
                // binding event
                // instance.off(eventName); // 已经 dispose 在重建，所以无需 off 操作
                instance.on(eventName,(param) => {
                    func(param,instance);
                });
            }
        };

        // loop and bind
        for (const eventName in events) {
            if (Object.prototype.hasOwnProperty.call(events,eventName)) {
                _bindEvent(eventName,events[eventName]);
            }
        }
    };
    /** 销毁实例 */
    dispose = () => {
        if (this.echartsElement) {
            try {
                clear(this.echartsElement);
            } catch (e) {
                console.warn(e);
            }
            echarts.dispose(this.echartsElement);
        }
    };
    render() {
        const { style,className } = this.props;
        const newStyle = { height: '100%', ...style };
        return (
            <div
                ref={(e: HTMLDivElement) => { this.echartsElement = e }}
                style={newStyle}
                className={`legions-pro-echarts ${className}`}
            />
        )
    }
}
