import PropTypes from 'prop-types';
import { Component } from 'react';
import { IProDraggerProps } from './interface';
export default class LegionsProDragger extends Component<IProDraggerProps> {
    static propTypes: {
        options: PropTypes.Requireable<object>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        tag: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        style: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        options: {};
        tag: string;
        style: {};
    };
    node: any;
    sortable: any;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: any): boolean;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
