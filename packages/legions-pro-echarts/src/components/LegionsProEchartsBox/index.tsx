/*
 * @Author: duanguang
 * @Date: 2020-12-11 09:29:53
 * @LastEditTime: 2020-12-18 16:27:29
 * @LastEditors: duanguang
 * @Description: 可视化界面容器盒子占位块
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsBox/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { prefixCls } from '../core';
import React from 'react';
import './style/index.less';
class IProps {
    /** 标题 */
    title?: React.ReactNode = void 0;
    /** 高度 */
    height?: React.ReactText = '100%';
    /** 宽度 */
    width?: React.ReactText = 'auto';
    style?: React.CSSProperties = {};
    className?: string = '';
}
/** 可视化界面容器盒子占位块 */
export default class LegionsProEchartsBox extends React.Component<IProps> {
    static defaultProps: Readonly<IProps> = new IProps()

    render() {
        const {style, className, title, height, width} = this.props;
        const mStyle: React.CSSProperties = {
            height,
            width,
            ...style,
        }
        return (
            <div style={mStyle} className={`${prefixCls}-box-wrap ${className}`}>
                <div className={`${prefixCls}-box`} style={{height: '100%', paddingTop: title ? '36px' : void 0}}>
                    { title && <div className="pro-box-title"><span>{title}</span></div> }
                    <div className="pro-box-topLeft"></div>
                    <div className="pro-box-topRight"></div>
                    <div className="pro-box-botLeft"></div>
                    <div className="pro-box-botRight"></div>
                    <div className="pro-box-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
