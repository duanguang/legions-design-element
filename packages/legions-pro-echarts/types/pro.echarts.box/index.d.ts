import React from 'react';
import './index.less';
declare class IProps {
    style?: React.CSSProperties;
    className?: string;
    title?: React.ReactNode;
}
/** 可视化界面容器盒子占位块 */
export default class LegionsProEchartsBox extends React.Component<IProps> {
    static defaultProps: Readonly<IProps>;
    render(): JSX.Element;
}
export {};
