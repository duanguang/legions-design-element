import { Component } from 'react';
import './zoomable.less';
interface IProps {
}
interface IState {
    isdrawing: number;
    direction: string;
    width: number;
    height: number;
    position: {
        x: number;
        y: number;
    };
    coordinate: {
        x: number;
        y: number;
    };
    change: {
        x: number;
        y: number;
    };
    reverseX: boolean;
    reverseY: boolean;
}
declare class Content extends Component<IProps, IState> {
    constructor(props: any);
    componentDidMount(): void;
    defaultSize(defaultSize: any, min: any, max: any): any;
    boxStyle(props: any): {
        padding: string;
    };
    render(): JSX.Element;
}
export default Content;
