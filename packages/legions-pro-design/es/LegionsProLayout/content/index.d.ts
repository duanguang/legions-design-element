import React from "react";
import LegionsStoreLayout from "../../LegionsStoreLayout";
import { IPanes } from '../../LegionsStoreLayout/interface';
import { IUserInfo } from '../../interface';
export interface ClickParam {
    key: string;
    keyPath: Array<string>;
    item: any;
    domEvent: any;
}
export interface IRouter {
    path: string;
    key?: string;
    component: any;
}
interface IProps extends IUserInfo {
    store?: InstanceType<typeof LegionsStoreLayout.TabPaneViewStore>;
    menuStore?: InstanceType<typeof LegionsStoreLayout.MenuStore>;
    router: Array<IRouter>;
    /**
     * 是否启用页签
     *
     * @type {boolean}
     * @memberof IProps
     */
    isEnabledTabs: boolean;
    domainUrl?: string;
    /**
     *
     *404 url or path
     * @type {string}
     * @memberof IProps
     */
    notFoundUrl: string;
    /** 布局布局位置
     *  fixedSider 主要为了兼容历史固定侧边方案  过渡性方案
     */
    fixedLayoutPosition?: 'fixedSider' | 'fixedSiderHeader';
}
declare class ViewModels {
    iframeHeight: number;
    contentHeight: number;
    dropdown: import("mobx").ObservableMap<string, {
        visible: boolean;
        uid: string;
        tabkey: string;
        isAddContextmenu: boolean;
    }>;
}
interface IState {
}
export default class ContentPart extends React.Component<IProps, IState> {
    history: any;
    viewModel: import("brain-store-utils/types/create-view-model").ViewModel<ViewModels> & {
        iframeHeight: number;
        contentHeight: number;
        dropdown: import("mobx").ObservableMap<string, {
            visible: boolean;
            uid: string;
            tabkey: string;
            isAddContextmenu: boolean;
        }>;
    };
    setIframe: () => void;
    constructor(props: any);
    static defaultProps: {
        fixedLayoutPosition: string;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    updateConentMinHeight(): void;
    /** 添加页签悬浮窗 */
    addContextmenu(): void;
    /** 移除全部页签悬浮窗 */
    removeAllContextmenu(): void;
    /** 移除页签悬浮窗dom 元素 */
    removeContextmenu(itemKey: any): void;
    handleContextmenu(tabkey: any, even: any): void;
    /** 在页签元素之外单击关闭悬浮窗 */
    handleOutside(item: any): void;
    handleDropMenuItemClick(tabkey: string, even: any): void;
    /** 渲染页签悬浮窗元素 */
    renderDropMenuElement(tabkey: string): JSX.Element;
    renderTabPaneElement(): JSX.Element[];
    renderContentElement(pane: IPanes): any;
    /**
     * 渲染页签标题
     *
     * @param {any} title 标题名称
     * @param {any} activeKey 选中页签key
     * @param {any} currKey //当前页签key
     * @returns
     * @memberof ContentPart
     */
    renderTitleElement(title: string, activeKey: string, currKey: string): JSX.Element;
    renderLayoutContentElement(): JSX.Element;
    computedContentClassProps(): {};
    computedTabBarStyles(): React.CSSProperties;
    /**
     * 修改页签活动状态
     *
     * @param {*} activeKey
     * @memberof ContentPart
     */
    handleChange: (activeKey: string) => void;
    /**
     *
     * 页签编辑行为
     * @param {*} targetKey
     * @param {*} action
     * @memberof ContentPart
     */
    handleEdit: (targetKey: string | string[], action: string) => void;
    render(): JSX.Element;
}
export {};
