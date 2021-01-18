import React from 'react';
import './style/index.less';
interface IAttrs {
    /**
     *
     * 画笔颜色
     * @type {string}
     * @memberof IAttrs
     */
    stroke: string;
    /**
     * 画笔粗细大小
     *
     * @type {number}
     * @memberof IAttrs
     */
    'stroke-width': number;
    /**
     * 画笔锚点坐标
     *
     * @type {any[]}
     * @memberof IAttrs
     */
    path: any[];
    fill: string;
}
interface IProps {
    width: number;
    height: number;
    attr: {
        "stroke": string;
        opacity: number;
        "stroke-width": number;
    };
    /**
     * 需要生成图片的html 元素
     *
     * 默认document.body
     *
     * @memberof IProps
     */
    onRenderhtml2canvas?: () => HTMLElement;
    /**
     *
     * html2canvas 函数执行参数
     * @type {Object}
     * @memberof IProps
     */
    html2canvasOptions?: Object;
    onReady: (value: {
        methods: {
            /**
             *
             * 绘制画板
             *
             * 通过画板坐标自动绘制画板
             */
            onDrawScrawl: (value: IAttrs[]) => void;
            clear: () => void;
            /**
             * 获取画笔所有轨迹数据
             *
             */
            getLocationPath: () => IAttrs[];
        };
    }) => void;
    /**
     * 保存画板时触发
     *
     * @memberof IProps
     */
    onSubmit?: (locationAttrs: IAttrs[], Image: HTMLImageElement, canvas: HTMLCanvasElement) => void;
    /**
     * 在画板显示及隐藏时触发
     *
     * @memberof IProps
     */
    onVisible?: (visible: boolean) => void;
    /**
     * 父级容器节点样式名称
     *
     * 传了此样式，坐标读取传入的元素节点
     *
     * @type {string}
     * @memberof IAttrs
     */
    parentElement?: string;
}
declare class ViewModel {
    chochooseColor: 'red' | 'violet' | 'black' | 'blue' | 'green' | 'yellow';
    /**
     * 画笔属性
     *
     * @memberof ViewModel
     */
    brushColor: {
        "stroke": string;
        "stroke-width": number;
        opacity: number;
    };
    /**
     *
     * 画板是否可见
     * @type {boolean}
     * @memberof ViewModel
     */
    visible: boolean;
    /**
     *
     * 待还原队列
     * @type {[]}
     * @memberof ViewModel
     */
    redoQueue: [];
    get colorStyle(): {
        className: string;
        value: string;
    } | {
        className: string;
        value: string;
    } | {
        className: string;
        value: string;
    } | {
        className: string;
        value: string;
    } | {
        className: string;
        value: string;
    } | {
        className: string;
        value: string;
    };
}
export default class LegionsProScrawl extends React.Component<IProps> {
    offset: {
        x: number;
        y: number;
    };
    paper: any;
    set: any[];
    path: Object;
    d: any[];
    moving: boolean;
    viewMoDel: import("brain-store-utils").ViewModel<ViewModel> & import("brain-store-utils").Proxify<ViewModel>;
    constructor(props: any);
    static defaultProps: {
        width: number;
        height: number;
        attr: {
            stroke: string;
            opacity: number;
            "stroke-width": number;
        };
        modulesName: string;
        isNormalFlow: boolean;
    };
    componentDidMount(): void;
    initLocalPath(value: IAttrs[]): void;
    handleToImage(): void;
    handleStart(x: any, y: any, e: any): void;
    handleMove(dx: any, dy: any, x: any, y: any, e: any): void;
    handleEnd(e: any): void;
    clear(): void;
    handleChooseColor(value: 'red' | 'violet' | 'black' | 'blue' | 'green' | 'yellow'): void;
    handleVisible(): void;
    /**
     * 撤销最后一条记录
     *
     * @returns
     * @memberof HLScrawl
     */
    handleUndo(): void;
    handleRedo(): void;
    onChange: (value: any) => void;
    render(): JSX.Element;
}
export {};
