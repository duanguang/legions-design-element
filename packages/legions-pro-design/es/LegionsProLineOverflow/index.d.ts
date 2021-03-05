import React, { Component } from 'react';
import './style/index.less';
interface IProps {
    width?: number | string;
    text: string | React.ReactNode;
}
export default class LegionsProLineOverflow extends Component<IProps> {
    static defaultProps: IProps;
    render(): JSX.Element;
}
export {};
