import './zoomable.less';
import React, { Component } from 'react';
interface IProps {
    style?: React.CSSProperties;
    className?: string;
    /** default 0  主体相对移动X轴 */
    defaultPositionX?: number;
    /** default 0  主体相对移动Y轴 */
    defaultPositionY?: number;
    zoomable?: {
        used: boolean;
        /** default all 可拉伸方向 */
        direction?: ["top", "right-top", "right", "right-bottom", "bottom", "left-bottom", "left", "left-top"];
        /** default 2 外围可拉伸范围 */
        borderWidth?: number;
        width: {
            min: number;
            max: number;
        };
        height: {
            min: number;
            max: number;
        };
        /** 拉伸开始时调用,param{direction:方向,position:位置{x,y},width:宽度,height:高度} */
        onZoomStart?: () => void;
        /** 拉伸进行中调用,param同上 */
        onZooming: () => void;
        /** 拉伸结束时调用,param同上 */
        onZoomEnd: () => void;
    };
}
interface IState {
    positionX: number;
    positionY: number;
}
declare class Zoomable extends Component<IProps, IState> {
    constructor(props: any);
    componentDidMount(): void;
    changePosition(x: any, y: any): void;
    render(): JSX.Element;
}
export default Zoomable;
