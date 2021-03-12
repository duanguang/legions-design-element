import React from 'react';
import './style/index.less';
declare class IProps {
    /** 标题 */
    title?: React.ReactNode;
    /** 高度 */
    height?: React.ReactText;
    /** 宽度 */
    width?: React.ReactText;
    /** 外层样式 */
    style?: React.CSSProperties;
    /** 内层conent样式 */
    contentStyle?: React.CSSProperties;
    /** 外层容器类名 */
    className?: string;
}
/** 可视化界面容器盒子占位块 */
export default class LegionsProEchartsBox extends React.Component<IProps> {
    static defaultProps: Readonly<IProps>;
    render(): JSX.Element;
}
export {};
