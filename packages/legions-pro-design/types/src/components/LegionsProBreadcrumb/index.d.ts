import React from 'react';
import './style/index.less';
interface IProps {
    value: Array<IValue>;
}
interface IValue {
    name: string;
    url?: string;
}
export default class LegionsProBreadcrumb extends React.Component<IProps> {
    renderCrumbItem(): JSX.Element[];
    render(): JSX.Element;
}
export {};
