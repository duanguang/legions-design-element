/*
 * @Author: duanguang
 * @Date: 2020-12-31 10:34:43
 * @LastEditTime: 2021-03-02 18:45:14
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreLayout/MenuStore.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

 /** @format */

import LegionsStore from '../LegionsStore';
import { IStoreBaseMeta } from '../LegionsStore/interface';
import { observable, action, resource, StoreModules } from 'legions/store';
import { getStorageItem, setStorageItems } from 'legions-utils-tool/storage';
import { observablePromise, observableViewModel } from 'legions/store-utils';
import LegionsModels from '../LegionsModels';
import TabPaneViewStore from './TabPaneStore';
import { IResourceEvent,ITriggerEventPrams } from '../LegionsStore/interface';
import LegionsCore from '../LegionsCore';
import {computed} from 'mobx'
import { MenuViewStore } from './MenuViewStore';
import {IRouter} from '../interface/router'
import { IPanes} from './interface';
interface IContext {
  TabPaneApp: TabPaneViewStore;
}
@StoreModules
export default class MenuStore extends LegionsStore.StoreBase<IContext> {
  static meta: IStoreBaseMeta = {
    ...LegionsStore.StoreBase.meta,
    eventScopes: [
      LegionsStore.CollapsedResource,
      LegionsStore.MenuPanesStorageResource,
      LegionsStore.BreadCrumbsResourceEven,
    ],
    contextTypes: {
      TabPaneApp: TabPaneViewStore,
    },
  };
  private menuList: (options?: {
    loadedMenuTransformData?: (menuList:InstanceType<typeof LegionsModels.MenuEntity> []) => void
    list?: Array<InstanceType<typeof LegionsModels.MenuEntity>>
  })=>InstanceType<typeof LegionsModels.MenuEntity>[];
  constructor(context) {
    super(context);
    this.menuList = this.plainMenuList();
  }

  /** 菜单组件涉及到数据Model */
  public viewModel = observableViewModel<MenuViewStore>(new MenuViewStore());

  /** 菜单展开选项值集合 */
  @observable.ref openKeys: string[] = getStorageItem(LegionsCore.StorageKeysDataSet.OPENKEYS_STORAGE_KEY, []);

  @observable obMenuList = observablePromise<InstanceType<typeof LegionsModels.MenuContainerEntity>>();

  /** 选中菜单项数据 */
  @observable selectedKeys = getStorageItem(LegionsCore.StorageKeysDataSet.SELECTED_STORAGE_KEY, []);

  /**一级菜单节点数据*/
  @observable rootSubmenuKeys: { key: string; depth: string }[] = [];

  /** 查询末级菜单选项集合 */
  @computed get computedLastStageMenuItemList(): InstanceType<typeof LegionsModels.MenuEntity>[] {
    if (this.obMenuList.isResolved) {
      return this.getAllMenuList().filter((item) => item.children.length === 0)
    }
    return []
  }
  /**
   * 菜单由层级改为平级
   *
   * @private
   * @returns
   * @memberof MenuStore
   */
  private plainMenuList(): (options: {
    loadedMenuTransformMenuItem?: (menuList: InstanceType<typeof LegionsModels.MenuEntity>[]) => void
    list?: Array<InstanceType<typeof LegionsModels.MenuEntity>>
  }) => InstanceType<typeof LegionsModels.MenuEntity>[] {
    //菜单由层级改为平级
    const plainMenu: Array<InstanceType<typeof LegionsModels.MenuEntity>> = [];
    const func = (options: {
      loadedMenuTransformData?: (menuList: InstanceType<typeof LegionsModels.MenuEntity>[]) => void
      list: Array<InstanceType<typeof LegionsModels.MenuEntity>>
    }) => {
      if (plainMenu.length <= 0) {
        this.cycleMenuList(plainMenu,options.list);
        if (options.loadedMenuTransformData) {
          options.loadedMenuTransformData(plainMenu)
        }
        return plainMenu
      }
      return plainMenu;
    };
    return func;
  }

  /**
   *  菜单由多层嵌套层级改为平级
   *
   * @private
   * @param {Array<MenuEntity>} arr
   * @param {Array<MenuEntity>} [list=[]]
   * @returns
   * @memberof MenuStore
   */
  private cycleMenuList(arr: Array<InstanceType<typeof LegionsModels.MenuEntity>>, list: Array<InstanceType<typeof LegionsModels.MenuEntity>> = []) {
    list.map(item => {
      arr.push(item);
      if (item.children.length) {
        this.cycleMenuList(arr, item.children);
      }
    });
    return arr;
  }
  /**
   * 设置选中菜单缓存值，用于持久化
   *
   * @memberof MenuViewStore
   */
  private updateSelectedStorage() {
    localStorage.setItem(
      LegionsCore.StorageKeysDataSet.SELECTED_STORAGE_KEY,
      JSON.stringify(this.selectedKeys)
    );
  }
  /** 获取全部菜单数据 */
  getAllMenuList(list?: Array<InstanceType<typeof LegionsModels.MenuEntity>>,loadedMenuTransformData?: (menuList: InstanceType<typeof LegionsModels.MenuEntity>[])=>void) {
    return this.menuList({
      list,
      loadedMenuTransformData
    });
  }
  
  /**
   * 查询指定菜单选项
   *
   * @param {string} key 通过菜单key
   * @memberof MenuStore
   */
  getMenuByKey(key: string) {
    const menuList = this.menuList()
    return menuList.find((item) => item['key'] === key)
  }
  /**
   * 菜单折叠触发器
   *
   * @param {ITriggerEventPrams} payload
   * @memberof MenuStore
   */
  triggerSyncCollapsedEvent(payload: ITriggerEventPrams) {
    this.context.dispatch(LegionsStore.CollapsedResource.created, payload);
  }
  /** 清理菜单及页签缓存数据触发器 */
  triggerClearStorageEvent() {
    this.context.dispatch(LegionsStore.MenuPanesStorageResource.removed, {});
  }
  /**
   *
   * 设置菜单面包屑信息(点击tabs页签切换)
   * @param {{ keyPath: string[] }} panesKeyPath
   * @memberof MenuStore
   */
  triggerSetBreadCrumbsEven(router?: Array<IRouter>) {
    this.context.dispatch(LegionsStore.BreadCrumbsResourceEven.created, {
      menuList: this.menuList(),
      router,
    });
  }
  /** 调用接口查询菜单数据 */
  @action getMenuList(func: () => Promise<any>) {
    this.obMenuList = observablePromise(func());
  }
  /** 当前展开的 SubMenu 菜单项 key 数组  */
  @action expand(openKeys:string[]) {
    this.openKeys = openKeys;
  }

  /**
   * 菜单展开收起
   *
   * @memberof MenuStore
   */
  @action openChange = (openKeys: string[]) => {
    this.openKeys = openKeys;
    localStorage.setItem(LegionsCore.StorageKeysDataSet.OPENKEYS_STORAGE_KEY, JSON.stringify(this.openKeys));
  };

  @action updateSelected(selected:string[]) {
    this.selectedKeys = selected;
    this.updateSelectedStorage();
  }
  /** 设置根节点菜单项信息 */
  @action setRootSubMenu(key: string, depth: string) {
    let index = this.rootSubmenuKeys.findIndex(item => item.key === key);
    if (index < 0) {
      this.rootSubmenuKeys.push({ key, depth });
    }
  }
  /** 打开默认菜单页签 */
  @action openDefault(
    panes: Pick<IPanes, 'key' | 'keyPath' | 'path' | 'title'>
  ) {
    this.context.TabPaneApp.openDefault(panes, this.menuList());
  }
  /**
   * 清空当前展开的菜单项缓存值
   * 
   * 清除当前选中的菜单项缓存值
   */
  @action clearStorage() {
    localStorage.removeItem(LegionsCore.StorageKeysDataSet.OPENKEYS_STORAGE_KEY);
    localStorage.removeItem(LegionsCore.StorageKeysDataSet.SELECTED_STORAGE_KEY);
  }
 
  @action onEvent(event: IResourceEvent<{ collapsed: boolean }>) {
    if (event.name === LegionsStore.MenuPanesStorageResource.removed.name) {
      this.clearStorage();
    }
    if (event.name === LegionsStore.CollapsedResource.created.name) {
      this.viewModel.logoWidth = 125;
      if (this.viewModel.collapsed) {
        this.viewModel.logoWidth = 80;
      }
    }
  }
  
  
}
