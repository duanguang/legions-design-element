/** @format */
import LegionsStore from '../../LegionsStore';
import { legionsStoreInterface } from '../../LegionsStore/interface';
import TabPaneViewStore from './TabPaneStore';
import { MenuViewStore } from './MenuViewStore';
import { legionsProLayoutInterface } from '../interface';
interface IContext {
    TabPaneApp: TabPaneViewStore;
}
export default class MenuStore extends LegionsStore.StoreBase<IContext> {
    static meta: legionsStoreInterface['storeBaseMeta'];
    constructor(context: any);
    private _menuList;
    /** 菜单由层级改为平级*/
    private _plainMenuList;
    /**
     * 菜单由多层嵌套层级改为平级
     * @param arr
     * @param list
     * @returns
     */
    private _cycleMenuList;
    /**
     * 设置选中菜单缓存值，用于持久化
     */
    private _updateSelectedStorage;
    /**
     * 清空当前展开,选中的菜单项缓存值
     *
     */
    private _clearStorage;
    /** 菜单组件涉及到数据Model */
    viewModel: import("brain-store-utils/types/create-view-model").ViewModel<MenuViewStore> & {
        logoWidth: number;
        skin: string;
        SkinList: import("../interface").skinModelInterface;
        collapsed: boolean;
        fixedSiderMenu: boolean;
        fixedHeader: boolean;
        getSkinInfos: () => {
            color: string;
            skin: string;
            logoSkin: string;
            theme: "dark" | "light";
            width: number;
            collapsedWidth: number;
        };
    };
    /** 菜单展开选项值集合 */
    openKeys: string[];
    _ob_menu_request: import("legions/store-utils").ObservablePromiseModel<import("../model").MenuModel>;
    /** 选中菜单项数据 */
    selectedKeys: any[];
    /**一级菜单节点数据*/
    rootSubmenuKeys: {
        key: string;
        depth: string;
    }[];
    /** 查询末级菜单选项集合 */
    get computedLastStageMenuItemList(): legionsProLayoutInterface['menuList'];
    /** 获取全部菜单数据 */
    getAllMenuList(list?: legionsProLayoutInterface['menuList'], loadedMenuTransformData?: (menuList: legionsProLayoutInterface['menuList']) => void): import("../model").MenuBaseModel[];
    /**
     * 查询指定菜单选项
     * @param  key 菜单key
     */
    getMenuByKey(key: string): import("../model").MenuBaseModel;
    /**
     * 菜单折叠触发器
     *
     * @param {legionsProLayoutInterface['triggerEventPrams']} payload
     */
    triggerSyncCollapsedEvent(payload: legionsProLayoutInterface['triggerEventPrams']): void;
    /** 清理菜单及页签缓存数据触发器 */
    triggerClearStorageEvent(): void;
    triggerSetBreadCrumbsEven(router?: Array<legionsProLayoutInterface['router']>): void;
    /** 调用接口查询菜单数据 */
    getMenuList(func: () => Promise<any>): void;
    /** 当前展开的 SubMenu 菜单项 key 数组  */
    expand(openKeys: string[]): void;
    /**
     * 菜单展开收起
     *
     * @memberof MenuStore
     */
    openChange: (openKeys: string[]) => void;
    updateSelected(selected: string[]): void;
    /** 设置根节点菜单项信息 */
    setRootSubMenu(key: string, depth: string): void;
    /** 打开默认菜单页签 */
    openAppoint(panes: Pick<legionsProLayoutInterface['panes'], 'key' | 'keyPath' | 'path' | 'title'>): void;
    private onEvent;
}
export {};
