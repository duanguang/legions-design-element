import React from 'react';
interface IProps {
    value: string;
    /**
     * 二维码的宽和高，单位是px，只允许生成正方形二维码

     *
     *
     * @type {number}
     * @memberof IProps
     */
    size?: number;
    /**
     *
     * 背景色
     * @type {string}
     * @memberof IProps
     */
    bgColor?: string;
    /**
     * 前景色
     *
     * @type {string}
     * @memberof IProps
     */
    fgColor?: string;
    /**
     * 码正中间图片的url，只支持配置正方形图片
     *
     * @type {string}
     * @memberof IProps
     */
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
}
interface IState {
}
export default class LegionsProQrCode extends React.Component<IProps, IState> {
    constructor(props: IProps);
    static defaultProps: {
        size: number;
        bgColor: string;
        fgColor: string;
        value: string;
    };
    shouldComponentUpdate(nextProps: any): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    utf16to8(str: any): any;
    update(): void;
    render(): React.DetailedReactHTMLElement<{
        style: {
            height: number;
            width: number;
        };
        height: number;
        width: number;
        ref: string;
    }, HTMLElement>;
}
export {};
