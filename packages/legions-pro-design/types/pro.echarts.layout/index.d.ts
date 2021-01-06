import React from 'react';
import './index.less';
declare class IProps {
    style?: React.CSSProperties;
    className?: string;
}
export default class LegionsProEchartsLayout extends React.Component<IProps> {
    static defaultProps: Readonly<IProps>;
    render(): JSX.Element;
}
export {};
