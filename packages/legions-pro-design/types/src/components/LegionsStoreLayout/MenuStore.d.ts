/** @format */
import LegionsStore from '../LegionsStore';
import { IStoreBaseMeta } from '../LegionsStore/interface';
import LegionsModels from '../LegionsModels';
import TabPaneViewStore from './TabPaneStore';
import { IResourceEvent, ITriggerEventPrams } from '../LegionsStore/interface';
import { MenuViewStore } from './MenuViewStore';
import { IRouter } from '../interface/router';
import { IPanes } from './interface';
interface IContext {
    TabPaneApp: TabPaneViewStore;
}
export default class MenuStore extends LegionsStore.StoreBase<IContext> {
    static meta: IStoreBaseMeta;
    private menuList;
    constructor(context: any);
    /** 菜单组件涉及到数据Model */
    viewModel: import("brain-store-utils/types/create-view-model").ViewModel<MenuViewStore> & {
        logoWidth: number;
        skin: string;
        SkinList: import("./interface").ISkinModel;
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
    obMenuList: import("legions/store-utils").ObservablePromiseModel<import("../LegionsModels/pro.menu.model").MenuContainerEntity>;
    /** 选中菜单项数据 */
    selectedKeys: any[];
    /**一级菜单节点数据*/
    rootSubmenuKeys: {
        key: string;
        depth: string;
    }[];
    /** 查询末级菜单选项集合 */
    get computedLastStageMenuItemList(): InstanceType<typeof LegionsModels.MenuEntity>[];
    /**
     * 菜单由层级改为平级
     *
     * @private
     * @returns
     * @memberof MenuStore
     */
    private plainMenuList;
    /**
     *  菜单由多层嵌套层级改为平级
     *
     * @private
     * @param {Array<MenuEntity>} arr
     * @param {Array<MenuEntity>} [list=[]]
     * @returns
     * @memberof MenuStore
     */
    private cycleMenuList;
    /**
     * 设置选中菜单缓存值，用于持久化
     *
     * @memberof MenuViewStore
     */
    private updateSelectedStorage;
    /** 获取全部菜单数据 */
    getAllMenuList(list?: Array<InstanceType<typeof LegionsModels.MenuEntity>>, loadedMenuTransformData?: (menuList: InstanceType<typeof LegionsModels.MenuEntity>[]) => void): import("../LegionsModels/pro.menu.model").MenuEntity[];
    /**
     * 查询指定菜单选项
     *
     * @param {string} key 通过菜单key
     * @memberof MenuStore
     */
    getMenuByKey(key: string): import("../LegionsModels/pro.menu.model").MenuEntity;
    /**
     * 菜单折叠触发器
     *
     * @param {ITriggerEventPrams} payload
     * @memberof MenuStore
     */
    triggerSyncCollapsedEvent(payload: ITriggerEventPrams): void;
    /** 清理菜单及页签缓存数据触发器 */
    triggerClearStorageEvent(): void;
    /**
     *
     * 设置菜单面包屑信息(点击tabs页签切换)
     * @param {{ keyPath: string[] }} panesKeyPath
     * @memberof MenuStore
     */
    triggerSetBreadCrumbsEven(router?: Array<IRouter>): void;
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
    openDefault(panes: Pick<IPanes, 'key' | 'keyPath' | 'path' | 'title'>): void;
    /**
     * 清空当前展开的菜单项缓存值
     *
     * 清除当前选中的菜单项缓存值
     */
    clearStorage(): void;
    onEvent(event: IResourceEvent<{
        collapsed: boolean;
    }>): void;
}
export {};
