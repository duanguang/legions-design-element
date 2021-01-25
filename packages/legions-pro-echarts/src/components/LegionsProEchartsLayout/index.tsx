import Row, { RowProps } from 'antd/lib/grid/row';
import Col, { ColProps } from 'antd/lib/grid/col';
import React from 'react';
import './style/index.less';
const proLayoutPrefix = 'legions-pro-echarts'

class ProColProps {
    style?: React.CSSProperties = {};
    className?: string = '';
    /** 竖向栅格占位格数，仅在父窗口有固定高度的情况下生效 */
    ySpan?: number = 0;
}

class ProRowProps {
    style?: React.CSSProperties = {};
    className?: string = `${proLayoutPrefix}-row`;
    /** 竖向栅格占位格数，仅在父窗口有固定高度的情况下生效 */
    ySpan?: number = 0;
}

class LayoutProps {
    style?: React.CSSProperties = {};
    className?: string = '';
    /** 是否只显示一屏 false:超出出现滚动条, true:铺满一屏*/
    isFullScreen?: boolean = false;
    /** 背景色填满整个body */
    isFillFullScreen?: boolean = true;
    /** 子元素上下间隔 */
    gutter?: number = 0;
    /** gutter遍历的深度，默认5级children */
    gutterDeep?: number = 5;
}

/** Col拓展，支持竖向栅格布局 */
class ProCol extends React.Component<ProColProps & ColProps> {
    static defaultProps: Readonly<ProColProps> = new ProColProps()
    render() {
        const { style, ySpan, ...props } = this.props
        const mStyle: React.CSSProperties = {
            height: ySpan ? `${(ySpan! / 24) * 100}%` : style!.height,
            ...style,
        }
        return (
            <Col style={mStyle} {...props}>{this.props.children}</Col>
        )
    }
}

/** Row拓展，支持竖向栅格布局 */
class ProRow extends React.Component<ProRowProps & RowProps> {
    static defaultProps: Readonly<ProRowProps> = new ProRowProps()
    render() {
        const { style, ySpan, ...props } = this.props
        const mStyle: React.CSSProperties = {
            height: ySpan ? `${(ySpan! / 24) * 100}%` : style!.height,
            ...style,
        }
        return (
            <Row style={mStyle} {...props}>{this.props.children}</Row>
        )
    }
}
export default  class LegionsProEchartsLayout extends React.Component<LayoutProps> {
    static defaultProps: Readonly<LayoutProps> = new LayoutProps()
    static ProRow: typeof ProRow = ProRow;
    static ProCol: typeof ProCol = ProCol;

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
    /** 劫持子元素，设置元素间距 */
    computedChildren(children: React.ReactElement<any>[], deep: number = 1) {
        let { gutter, gutterDeep } = this.props;
        let newChildren: React.ReactElement<any>[] = []
        let newProps = {}
        return React.Children.map(children as React.ReactElement<any>[], (item: React.ReactElement<any>, index) => {
            try {
                if (!item || !item.props || !gutter || deep < gutterDeep!) {
                    return item
                }
                /** 向下查找并处理ProRow元素 */
                if (item.props.children) {
                    newChildren = this.computedChildren(item.props.children, deep + 1);
                }
                /** 遇到ProRow元素，设置gutter属性 */
                if (item.props.className && item.props.className.indexOf(`${proLayoutPrefix}-row`) > -1) {
                    newProps = {...newProps, gutter: item.props.gutter || gutter}
                }
                /** 深度deep === 1时，设置每一行的上下间距，除最后一行 */
                if (index !== React.Children.count(children) - 1 && deep === 1) {
                    newProps = {...newProps, style: {...item.props.style, paddingBottom: gutter}}
                }
            } catch (error) {
                console.error(error)
            }
            return React.cloneElement(item, newProps, newChildren);
        })
    }
    render() {
        const { className, children } = this.props
        return (
            <div style={this.computedLayoutWrapStyles()} className={`${proLayoutPrefix}-layout ${className}`}>
                {this.computedChildren(children as React.ReactElement<any>[])}
            </div>
        )
    }
}
