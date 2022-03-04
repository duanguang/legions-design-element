/*
 * @Author: duanguang
 * @Date: 2020-12-31 10:34:43
 * @LastEditTime: 2022-03-02 13:39:28
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProLayout/store/MenuStore.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

/** @format */

import LegionsStore from '../../LegionsStore';
import { legionsStoreInterface } from '../../LegionsStore/interface';
import { observable,action,StoreModules } from 'legions/store';
import { getStorageItem } from 'legions-utils-tool/storage';
import { observablePromise,observableViewModel } from 'legions/store-utils';
import TabPaneViewStore from './TabPaneStore';
import { computed } from 'mobx'
import { MenuViewStore } from './MenuViewStore';
import { legionsProLayoutInterface } from '../interface'
import { TypeMenuModel } from '../model';
import { storageKeysData } from '../constant.storageKeys';
interface IContext {
  TabPaneApp: TabPaneViewStore;
}
@StoreModules
export default class MenuStore extends LegionsStore.StoreBase<IContext> {
  static meta: legionsStoreInterface['storeBaseMeta'] = {
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
  constructor(context) {
    super(context);
    this._menuList = this._plainMenuList();
  }
  private _menuList: (options?: {
    loadedMenuTransformData?: (menuList: legionsProLayoutInterface['menuList']) => void
    list?: legionsProLayoutInterface['menuList']
  }) => legionsProLayoutInterface['menuList'];
  /** 菜单由层级改为平级*/
  private _plainMenuList(): (options: {
    loadedMenuTransformMenuItem?: (menuList: legionsProLayoutInterface['menuList']) => void
    list?: legionsProLayoutInterface['menuList']
  }) => legionsProLayoutInterface['menuList'] {
    //菜单由层级改为平级
    const plainMenu: legionsProLayoutInterface['menuList'] = [];
    const func = (options: {
      loadedMenuTransformData?: (menuList: legionsProLayoutInterface['menuList']) => void
      list: legionsProLayoutInterface['menuList']
    }) => {
      if (plainMenu.length <= 0) {
        this._cycleMenuList(plainMenu,options.list);
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
   * 菜单由多层嵌套层级改为平级
   * @param arr 
   * @param list 
   * @returns 
   */
  private _cycleMenuList(arr: legionsProLayoutInterface['menuList'],list: legionsProLayoutInterface['menuList'] = []) {
    list.map(item => {
      arr.push(item);
      if (item.children.length) {
        this._cycleMenuList(arr,item.children);
      }
    });
    return arr;
  }
  /**
   * 设置选中菜单缓存值，用于持久化
   */
  private _updateSelectedStorage() {
    localStorage.setItem(
      storageKeysData.SELECTED_STORAGE_KEY,
      JSON.stringify(this.selectedKeys)
    );
  }

  /**
   * 清空当前展开,选中的菜单项缓存值
   * 
   */
   @action private _clearStorage() {
    localStorage.removeItem(storageKeysData.OPENKEYS_STORAGE_KEY);
    localStorage.removeItem(storageKeysData.SELECTED_STORAGE_KEY);
  }
  /** 菜单组件涉及到数据Model */
  public viewModel = observableViewModel<MenuViewStore>(new MenuViewStore());

  /** 菜单展开选项值集合 */
  @observable.ref openKeys: string[] = getStorageItem(storageKeysData.OPENKEYS_STORAGE_KEY,[]);

  @observable _ob_menu_request = observablePromise<TypeMenuModel>(null);

  /** 选中菜单项数据 */
  @observable selectedKeys = getStorageItem(storageKeysData.SELECTED_STORAGE_KEY,[]);

  /**一级菜单节点数据*/
  @observable rootSubmenuKeys: { key: string; depth: string }[] = [];

  /** 查询末级菜单选项集合 */
  @computed get computedLastStageMenuItemList(): legionsProLayoutInterface['menuList'] {
    if (this._ob_menu_request.isResolved) {
      return this.getAllMenuList().filter((item) => item.children.length === 0)
    }
    return []
  }

  /** 获取全部菜单数据 */
  getAllMenuList(list?: legionsProLayoutInterface['menuList'],loadedMenuTransformData?: (menuList: legionsProLayoutInterface['menuList']) => void) {
    return this._menuList({
      list,
      loadedMenuTransformData
    });
  }

  /**
   * 查询指定菜单选项
   * @param  key 菜单key
   */
  getMenuByKey(key: string) {
    const menuList = this._menuList()
    return menuList.find((item) => item['key'] === key)
  }
  /**
   * 菜单折叠触发器
   *
   * @param {legionsProLayoutInterface['triggerEventPrams']} payload
   */
  triggerSyncCollapsedEvent(payload: legionsProLayoutInterface['triggerEventPrams']) {
    this.context.dispatch(LegionsStore.CollapsedResource.created,payload);
  }
  /** 清理菜单及页签缓存数据触发器 */
  triggerClearStorageEvent() {
    this.context.dispatch(LegionsStore.MenuPanesStorageResource.removed,{});
  }
  /*
   * 设置菜单面包屑信息(点击tabs页签切换)
   * @param  panesKeyPath
   */
  triggerSetBreadCrumbsEven(router?: Array<legionsProLayoutInterface['router']>) {
    this.context.dispatch(LegionsStore.BreadCrumbsResourceEven.created,{
      menuList: this._menuList(),
      router,
    });
  }
  /** 调用接口查询菜单数据 */
  @action getMenuList(func: () => Promise<any>) {
    this._ob_menu_request = observablePromise(func());
  }
  /** 当前展开的 SubMenu 菜单项 key 数组  */
  @action expand(openKeys: string[]) {
    this.openKeys = openKeys;
  }

  /**
   * 菜单展开收起
   *
   * @memberof MenuStore
   */
  @action openChange = (openKeys: string[]) => {
    this.openKeys = openKeys;
    localStorage.setItem(storageKeysData.OPENKEYS_STORAGE_KEY,JSON.stringify(this.openKeys));
  };

  @action updateSelected(selected: string[]) {
    this.selectedKeys = selected;
    this._updateSelectedStorage();
  }
  /** 设置根节点菜单项信息 */
  @action setRootSubMenu(key: string,depth: string) {
    let index = this.rootSubmenuKeys.findIndex(item => item.key === key);
    if (index < 0) {
      this.rootSubmenuKeys.push({ key,depth });
    }
  }
  /** 打开默认菜单页签 */
  @action openAppoint(
    panes: Pick<legionsProLayoutInterface['panes'],'key' | 'keyPath' | 'path' | 'title'>
  ) {
    this.context.TabPaneApp.openAppoint(panes,this._menuList());
  }
  

  @action private onEvent(event: legionsStoreInterface<{ collapsed: boolean }>["resourceEvent"]) {
    if (event.name === LegionsStore.MenuPanesStorageResource.removed.name) {
      this._clearStorage();
    }
    if (event.name === LegionsStore.CollapsedResource.created.name) {
      this.viewModel.logoWidth = 125;
      if (this.viewModel.collapsed) {
        this.viewModel.logoWidth = 80;
      }
    }
  }
}
