/** @format */
import { StoreBase } from '../index';
import { MenuEntity } from '../../models';
import { ProxySanbox } from './ProxySanbox';
import { TabPaneUIView } from './TabPaneUIView';
import { IResourceEvent, ITriggerEventPrams, IStoreBaseMeta } from '../interface';
import { IPanes } from './interface';
export default class TabPaneViewStore extends StoreBase {
    static meta: IStoreBaseMeta;
    constructor(context: any);
    proxySanbox: ProxySanbox;
    /**
     *
     * 组件UI数据
     * @memberof TabPaneViewStore
     */
    viewUIModel: import("brain-store-utils").ViewModel<TabPaneUIView> & import("brain-store-utils").Proxify<TabPaneUIView>;
    /**
     * 用于同步菜单栏是否收缩状态
     *
     * @memberof TabPaneViewStore
     */
    collapsed: boolean;
    /**  Tabs 页签打开缓存数据*/
    panes: Array<IPanes>;
    /**  当前标签页,默认首页*/
    activeKey: string;
    breadcrumbMenu: string[];
    addTabPanes(panes: IPanes, menuList: Array<MenuEntity>): void;
    /**
     * 打开指定菜单并同步更新缓存信息(tabs缓存，活动页签缓存,菜单面包屑缓存)
     *
     * @param {{key:string;keyPath?:string;path:string}} defaultItem
     * @param {Array<MenuEntity>} menuList
     * @memberof TabPaneViewStore
     */
    openDefault(defaultItem: Pick<IPanes, 'key' | 'keyPath' | 'path' | 'title'>, menuList: Array<MenuEntity>): void;
    /**
     * 设置默认展开菜单信息同步缓存(tabs缓存，活动页签缓存,菜单面包屑缓存)
     *
     * @param {*} defaultItem
     * @param {Array<MenuEntity>} menuList
     * @memberof TabPaneViewStore
     */
    setDefaultTabPanes(defaultItem: any, menuList: Array<MenuEntity>): void;
    /**
     * 设置活动页签
     *
     * @param {*} activeKey
     * @memberof TabPaneViewStore
     */
    setActiveKey(activeKey: string): void;
    /**
     * 新增和删除页签
     *
     * @param {any} targetKey  页签id
     * @param {any} action 操作类型 remove,add
     * @memberof TabPaneViewStore
     */
    update(targetKey: string | string[], action: any): void;
    private remove;
    /**
     * 同步设置面包屑导航信息
     *
     * @private
     * @param {*} panes
     * @param {Array<MenuEntity>} menuList
     * @memberof TabPaneViewStore
     */
    private updateBreadcrumbs;
    /**
     * 同步状态，主要用于当菜单手收起和展开时，执行的一些副作用
     *
     * @memberof TabPaneViewStore
     */
    syncCollapsed(collapsed: any): void;
    clearStorage(): void;
    onEvent(event: IResourceEvent<ITriggerEventPrams>): void;
    /**
     * 同步菜单缓存信息
     *
     * @param {Array<MenuEntity>} menuList
     * @memberof TabPaneViewStore
     */
    syncTabPanes(menuList: Array<MenuEntity>): void;
}
