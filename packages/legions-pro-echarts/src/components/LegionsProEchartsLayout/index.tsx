import { Row } from 'antd';
import React from 'react';
import './style/index.less';
class IProps {
    style?: React.CSSProperties = {};
    className?: string = '';
    /** 是否只显示一屏
     * 
     * false 超出出现滚动条
     * 
     * true  铺满一屏
     */
    isFullScreen?: boolean = false;

    /** 背景色填满整个body */
    isFillFullScreen?: Boolean = true;
}
const proLayoutPrefix = 'legions-pro-echarts'
export  class LegionsProEchartsLayout extends React.Component<IProps> {
    static defaultProps: Readonly<IProps> = new IProps()

    computedLayoutWrapStyles() {
        const { style,isFullScreen,isFillFullScreen } = this.props;
        let fullScreenStles: React.CSSProperties = {...style};
        if (isFullScreen) {
            fullScreenStles={...style,height:'100vh',overflow:'hidden'}
        }
        else if (isFillFullScreen) {
            const clientHeight= document.body.clientHeight
            fullScreenStles={...fullScreenStles,minHeight:`${clientHeight}px`}
        }
        return fullScreenStles;
    }
    render() {
        const { style,className,isFullScreen } = this.props
        return (
            <div style={this.computedLayoutWrapStyles()} className={`${proLayoutPrefix}-layout ${className ? className : ''}`}>
                <Row type='flex' justify="start">
                    {this.props.children}
                </Row>
            </div>
        )
    }
}