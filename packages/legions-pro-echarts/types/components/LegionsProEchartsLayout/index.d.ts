import React from 'react';
import './style/index.less';
declare class IProps {
    style?: React.CSSProperties;
    className?: string;
    /** 是否只显示一屏
     *
     * false 超出出现滚动条
     *
     * true  铺满一屏
     */
    isFullScreen?: boolean;
    /** 背景色填满整个body */
    isFillFullScreen?: Boolean;
}
export declare class LegionsProEchartsLayout extends React.Component<IProps> {
    static defaultProps: Readonly<IProps>;
    computedLayoutWrapStyles(): React.CSSProperties;
    render(): JSX.Element;
}
export {};
