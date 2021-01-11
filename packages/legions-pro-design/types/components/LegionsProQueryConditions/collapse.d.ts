import React from "react";
interface IDidMount {
    /**
     *
     * 组件真实高度
     * @type {number}
     */
    height: number;
    /**
     *
     * 组件唯一UID
     * @type {string}
     */
    uid: string;
}
interface IProps {
    onToggle?: (visible: boolean, height: number) => void;
    /**
     *
     * 组件完成渲染时执行，有DOM结构，执行的钩子函数
     * @memberof IProps
     */
    onDidMount?: (value: IDidMount) => void;
    parentUid: string;
    /**
     * 容器宽度
     *
     * @type {number}
     * @memberof IProps
     */
    widthContainer: number;
    /**
     *
     * 默认是否展开
     * @type {boolean}
     * @memberof IProps
     */
    defaultToggle: boolean;
    ondragger?: (item: any[], key: string) => React.ReactElement;
}
interface IState {
    vmVisible: boolean;
    visibleLeft: boolean;
}
/**
 * 请勿外部使用，只用于搜索条件组件
 *
 * @export
 * @class CollapseUtil
 * @extends {React.Component<IProps, IState>}
 */
export default class CollapseUtil extends React.Component<IProps, IState> {
    constructor(props: any);
    componentWillMount(): void;
    componentDidMount(): void;
    getContentNodeWidth(): number;
    /**
     * 计算节点总宽度
     *
     * @param {any} items 节点集合
     * @returns
     * @memberof CollapseUtil
     */
    getNodeWidth(items: any): number;
    /**
     * 计算solt-letf 宽度
     *
     * @returns
     * @memberof CollapseUtil
     */
    getLeftNodeWidth(): number;
    /**
     * 计算solt-show 宽度
     *
     * @returns
     * @memberof CollapseUtil
     */
    getRightNodeWidth(): number;
    get isShowCollapse(): boolean;
    /**
 * 渲染折叠按钮
 *
 * @param {any} content
 * @returns
 * @memberof CollapseUtil
 */
    renderCollapse(content: any[]): JSX.Element[];
    handleToggle(): void;
    /**
   *
   *
   * @param {any} newItems
   * @param {any} component
   * @param {any} bodyWidth
   * @memberof CollapseUtil
   */
    getNodeItem(newItems: any, component: any[], bodyWidth: number): void;
    /**
   * 统计需要隐藏部分节点数据
   *
   * @param {any} items
   * @param {any} bodyWidth
   * @returns
   * @memberof CollapseUtil
   */
    renderRight(items: any, bodyWidth: number): {};
    /**
   * 渲染隐藏部分节点组件
   *
   * @param {any} component
   * @param {any} isShow
   * @returns
   * @memberof CollapseUtil
   */
    renderContent(component: any, isShow: any): any[];
    renderItems(bodyWidth: any): {
        left: any[];
        content: any[];
    };
    slots(): {
        left: any;
        right: any;
        content: any;
    };
    draggerContent: (component: any) => any[];
    render(): JSX.Element;
}
export {};
