import React from 'react';
import './style/index.less';
declare class IProps {
    /** 主题 */
    theme?: 'default';
    /** 容器类名 */
    className?: string;
    /** 外层样式 */
    style?: React.CSSProperties;
}
/** 卡片组件 */
export default class LegionsProEchartsHeader extends React.Component<IProps> {
    static defaultProps: Readonly<IProps>;
    ele: HTMLDivElement;
    state: {
        scale: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
