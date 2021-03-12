import { RowProps } from 'antd/lib/grid/row';
import { ColProps } from 'antd/lib/grid/col';
import React from 'react';
import './style/index.less';
declare class ProColProps {
    style?: React.CSSProperties;
    className?: string;
    /** 竖向栅格占位格数，仅在父窗口有固定高度的情况下生效 */
    ySpan?: number;
}
declare class ProRowProps {
    style?: React.CSSProperties;
    className?: string;
    /** 竖向栅格占位格数，仅在父窗口有固定高度的情况下生效 */
    ySpan?: number;
}
declare class LayoutProps {
    style?: React.CSSProperties;
    className?: string;
    /** 是否只显示一屏 false:超出出现滚动条, true:铺满一屏 */
    isFullScreen?: boolean;
    /** 背景色填满整个body */
    isFillFullScreen?: boolean;
    /** 子元素上下左右间隔 */
    gutter?: number;
    /** gutter遍历的深度，默认5级children */
    gutterDeep?: number;
}
/** Col拓展，支持竖向栅格布局 */
declare class ProCol extends React.Component<ProColProps & ColProps> {
    static defaultProps: Readonly<ProColProps>;
    render(): JSX.Element;
}
/** Row拓展，支持竖向栅格布局 */
declare class ProRow extends React.Component<ProRowProps & RowProps> {
    static defaultProps: Readonly<ProRowProps>;
    render(): JSX.Element;
}
export default class LegionsProEchartsLayout extends React.Component<LayoutProps> {
    static defaultProps: Readonly<LayoutProps>;
    static ProRow: typeof ProRow;
    static ProCol: typeof ProCol;
    computedLayoutWrapStyles(): React.CSSProperties;
    /** 劫持子元素，设置元素间距 */
    computedChildren(children: React.ReactElement<any>[], deep?: number): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    render(): JSX.Element;
}
export {};
