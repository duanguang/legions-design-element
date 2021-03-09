/*
 * @Author: duanguang
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:12:50
 * @LastEditors: duanguang
 * @Description: 饼图组件
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsChartCard/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { prefixCls } from '../core';
import React from 'react';
import { bind, clear } from 'size-sensor';
import './style/index.less';

export class LegionsProEchartsHeaderProps{
    /** 主题 */
    theme?: 'default' = 'default';
    /** 容器类名 */
    className?: string = '';
    /** 外层样式 */
    style?: React.CSSProperties = {};
}
/** 卡片组件 */
export default class LegionsProEchartsHeader extends React.Component<LegionsProEchartsHeaderProps>{
    static defaultProps: Readonly<LegionsProEchartsHeaderProps> = new LegionsProEchartsHeaderProps()
    // @ts-ignore
    ele: HTMLDivElement = null;
    state = { scale: 1 }
    componentDidMount() {
        bind(this.ele, () => {
            let scale = this.ele.parentElement!.offsetHeight / 55
            this.setState({scale: scale > 1 ? 1 : scale})
        })
    }
    componentWillUnmount() {
        clear(this.ele)
    }
    render() {
        const { theme, children, className, style } = this.props;
        const mStyle: React.CSSProperties = {
            ...style,
            transform: `scale(${this.state.scale})`,
        }
        return (
            <div
                ref={(e: HTMLDivElement) => { this.ele = e }}
                className={`${prefixCls}-header ${className}`}
                style={mStyle}
            >
                <div className="pro-header-top"></div>
                <div className="pro-header-bottom"></div>
                <div className="pro-header-content">
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    <i className="pro-header-icon"/>
                    {children}
                </div>
            </div>
        )
    }
}
