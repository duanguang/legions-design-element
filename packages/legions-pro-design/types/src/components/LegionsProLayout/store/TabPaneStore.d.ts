/** @format */
import LegionsStore from '../../LegionsStore';
import { legionsStoreInterface } from '../../LegionsStore/interface';
import { ProxySanbox } from './ProxySanbox';
import { TabPaneViewData } from './TabPaneViewData';
import { legionsProLayoutInterface } from '../interface';
export default class TabPaneViewStore extends LegionsStore.StoreBase {
    static meta: legionsStoreInterface['storeBaseMeta'];
    constructor(context: any);
    proxySanbox: ProxySanbox;
    /**  页签组件视图数据 */
    viewData: import("brain-store-utils/types/create-view-model").ViewModel<TabPaneViewData> & {
        tabPanesTimestamp: import("mobx").ObservableMap<string, any>;
        updateTimestamp: (panesKey: string, timeStamp?: number) => void;
    };
    /**  用于同步菜单栏是否收缩状态 */
    collapsed: boolean;
    /**  Tabs 页签打开缓存数据*/
    panes: Array<legionsProLayoutInterface['panes']>;
    /**  当前标签页,默认首页*/
    activeKey: string;
    breadcrumbMenu: string[];
    private remove;
    /** 同步设置面包屑导航信息*/
    private updateBreadcrumbs;
    addTabPanes(panes: legionsProLayoutInterface['panes'], menu_list: legionsProLayoutInterface['menuList']): void;
    popstateAsyncData(panes: legionsProLayoutInterface['panes'], menuList: legionsProLayoutInterface['menuList']): void;
    /**
     * 打开指定菜单
     * @param defaultItem 即将打开菜单页签数据
     * @param menuList 菜单项数据集
     */
    openAppoint(defaultItem: Pick<legionsProLayoutInterface['panes'], 'key' | 'keyPath' | 'path' | 'title'>, menuList: legionsProLayoutInterface['menuList']): void;
    /**
     * 设置默认展开菜单信息
     * @param defaultItem 默认打开菜单项数据
     * @param menuList 菜单项数据集
     */
    setDefaultTabPanes(defaultItem: {
        key: string;
        keyPath: string[];
    }, menuList: legionsProLayoutInterface['menuList']): void;
    /**
     * 设置活动页签
     * @param activeKey
     */
    setActiveKey(activeKey: string): void;
    /**
     * 新增和删除页签
     *
     * @param {any} targetKey  页签id
     * @param {any} action 操作类型 remove,add
     */
    update(targetKey: string | string[], action: any): void;
    /**
     * 同步状态，主要用于当菜单手收起和展开时，执行的一些副作用
     *
     */
    syncCollapsed(collapsed: any): void;
    clearStorage(): void;
    /**
     * 同步菜单缓存信息
     * @param menuList
     */
    syncTabPanes(menuList: legionsProLayoutInterface['menuList']): void;
    onEvent(event: legionsStoreInterface<legionsProLayoutInterface['triggerEventPrams']>['resourceEvent']): void;
}
