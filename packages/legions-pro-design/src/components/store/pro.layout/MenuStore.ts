/*
 * @Author: duanguang
 * @Date: 2020-12-31 10:34:43
 * @LastEditTime: 2021-01-04 10:17:35
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.layout/MenuStore.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

 /** @format */

import StoreBase, { IStoreBaseMeta } from '../StoreBase';
import { observable, action, resource } from 'legions/store';
import { getStorageItem, setStorageItems } from 'legions-utils-tool/storage';
import { observablePromise, observableViewModel } from 'legions/store-utils';
import { MenuContainerEntity, MenuEntity } from '../../models/pro.menu.model';
import TabPaneViewStore from './TabPaneStore';
import {
  CollapsedResource,
  MenuPanesStorageResource,
  IResourceEvent,
  BreadCrumbsResourceEven,
  ITriggerEventPrams,
} from '../event/resourceEvent';
import {
  OPENKEYS_STORAGE_KEY,
  SELECTED_STORAGE_KEY,
} from '../../core';
import { IPanes,IRouter } from '../../interface/pro.store';
import { ExportTaskEntity } from '../../models/pro.task.model';
import {computed} from 'mobx'
interface IContext {
  TabPaneApp: TabPaneViewStore;
}
interface ISkinModel {
  [propName: string]: {
    color: string;
    skin: string;
    logoSkin: string;
    theme: 'light' | 'dark';
    width: number;
    /** 菜单收起时宽度 */
    collapsedWidth: number;
  };
}

class MenuViewStore {
  /**
   * logo 宽度
   *
   * @memberof MenuViewStore
   */
  @observable logoWidth = 125;

  /**
   *
   *皮肤方案
   * @memberof MenuViewStore
   */
  @observable skin = '0';

  /**
   * 皮肤列表数据
   *
   * @type {ISkinModel}
   * @memberof MenuViewStore
   */
  @observable SkinList: ISkinModel = {
    '0': {
      color: '#484C72',
      skin: 'legions-pro-menu-them-dark-green',
      logoSkin: 'legions-pro-menu-them-dark-green-logo',
      theme: 'dark',
      width: 170,
      collapsedWidth:65,
    },
    '1': {
      skin: 'legions-pro-menu-them-light-blue',
      color: '#212D32',
      logoSkin: 'legions-pro-menu-them-light-blue-logo',
      theme: 'dark',
      width: 170,
      collapsedWidth:65,
    },
    '2': {
      skin: 'legions-pro-menu-them-2',
      color: '#fff',
      logoSkin: 'legions-pro-menu-them-2-logo',
      theme: 'light',
      width: 160,
      collapsedWidth:65,
    },
    '3': {
      skin: 'legions-pro-menu-them-blue',
      color: '#015EA3',
      logoSkin: 'legions-pro-menu-them-blue-logo',
      theme: 'dark',
      width: 160,
      collapsedWidth:40,
    },
  };

  /**
   * true 折叠
   * 
   * false 展开
   *菜单左右方向展开收起
   * @memberof MenuViewStore
   */
  @observable collapsed = false; //

  @observable exportTaskList: ExportTaskEntity[] = [];

   /** 是否固定侧边菜单 */
  @observable fixedSiderMenu = true;
  
  /** 是否固定头部区域 */
  @observable fixedHeader = true;

  getSkinInfos() {
    return this.SkinList[this.skin]
  }
}
export default class MenuStore extends StoreBase<IContext> {
  static meta: IStoreBaseMeta = {
    ...StoreBase.meta,
    className: 'MenuStore',
    eventScopes: [
      CollapsedResource,
      MenuPanesStorageResource,
      BreadCrumbsResourceEven,
    ],
    contextTypes: {
      TabPaneApp: TabPaneViewStore,
    },
  };
  private menuList: (options?: {
    loadedMenuTransformData?: (menuList: MenuEntity[]) => void
    list?: Array<MenuEntity>
  })=>MenuEntity[];
  constructor(context) {
    super(context);
    this.menuList = this.plainMenuList();
  }

  /** 菜单组件涉及到数据Model */
  public viewModel = observableViewModel<MenuViewStore>(new MenuViewStore());

  /** 菜单展开选项值集合 */
  @observable.ref openKeys: string[] = getStorageItem(OPENKEYS_STORAGE_KEY, []);

  @observable obMenuList = observablePromise<MenuContainerEntity<MenuEntity>>();

  /** 选中菜单项数据 */
  @observable selectedKeys = getStorageItem(SELECTED_STORAGE_KEY, []);

  /**一级菜单节点数据*/
  @observable rootSubmenuKeys: { key: string; depth: string }[] = [];

  /** 查询末级菜单选项集合 */
  @computed get computedLastStageMenuItemList(): MenuEntity[] {
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
    loadedMenuTransformMenuItem?: (menuList: MenuEntity[]) => void
    list?: Array<MenuEntity>
  }) => MenuEntity[] {
    //菜单由层级改为平级
    const plainMenu: Array<MenuEntity> = [];
    const func = (options: {
      loadedMenuTransformData?: (menuList: MenuEntity[]) => void
      list: Array<MenuEntity>
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
  private cycleMenuList(arr: Array<MenuEntity>, list: Array<MenuEntity> = []) {
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
      SELECTED_STORAGE_KEY,
      JSON.stringify(this.selectedKeys)
    );
  }
  /** 获取全部菜单数据 */
  getAllMenuList(list?: Array<MenuEntity>,loadedMenuTransformData?: (menuList: MenuEntity[])=>void) {
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
    this.context.dispatch(CollapsedResource.created, payload);
  }
  /** 清理菜单及页签缓存数据触发器 */
  triggerClearStorageEvent() {
    this.context.dispatch(MenuPanesStorageResource.removed, {});
  }
  /**
   *
   * 设置菜单面包屑信息(点击tabs页签切换)
   * @param {{ keyPath: string[] }} panesKeyPath
   * @memberof MenuStore
   */
  triggerSetBreadCrumbsEven(router?: Array<IRouter>) {
    this.context.dispatch(BreadCrumbsResourceEven.created, {
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
    localStorage.setItem(OPENKEYS_STORAGE_KEY, JSON.stringify(this.openKeys));
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
    localStorage.removeItem(OPENKEYS_STORAGE_KEY);
    localStorage.removeItem(SELECTED_STORAGE_KEY);
  }
 
  @action onEvent(event: IResourceEvent<{ collapsed: boolean }>) {
    if (event.name === MenuPanesStorageResource.removed.name) {
      this.clearStorage();
    }
    if (event.name === CollapsedResource.created.name) {
      this.viewModel.logoWidth = 125;
      if (this.viewModel.collapsed) {
        this.viewModel.logoWidth = 80;
      }
    }
  }
  
  
}
