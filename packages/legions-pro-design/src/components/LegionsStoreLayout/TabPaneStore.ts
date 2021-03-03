/** @format */

import { action, observable, StoreModules } from 'legions/store';
import { getStorageItem, setStorageItems } from 'legions-utils-tool/storage';
import LegionsStore from '../LegionsStore';
import LegionsModels from '../LegionsModels';
import { computed } from 'mobx';
import { observableViewModel } from 'legions/store-utils';
/** Tabs 页签打开缓存数据*/
import LegionsCore from '../LegionsCore';
import { RegExChk, validatorType } from 'legions-utils-tool/regex';
import { ProxySanbox } from './ProxySanbox';
import { TabPaneUIView } from './TabPaneUIView';
import { IResourceEvent,ITriggerEventPrams,IStoreBaseMeta } from '../LegionsStore/interface';
import { IPanes } from './interface';

@StoreModules
export default class TabPaneViewStore extends LegionsStore.StoreBase {
  static meta: IStoreBaseMeta = {
    ...LegionsStore.StoreBase.meta,
    eventScopes: [
      LegionsStore.CollapsedResource,
      LegionsStore.MenuPanesStorageResource,
      LegionsStore.BreadCrumbsResourceEven,
    ],
  };
  constructor(context) {
    super(context);
    this.proxySanbox = new ProxySanbox(this.history)
  }

  proxySanbox: ProxySanbox = null;
  /**
   *
   * 组件UI数据
   * @memberof TabPaneViewStore
   */
  @observable viewUIModel = observableViewModel<TabPaneUIView>(
    new TabPaneUIView()
  );
  /**
   * 用于同步菜单栏是否收缩状态
   *
   * @memberof TabPaneViewStore
   */
  @observable collapsed = false;

  /**  Tabs 页签打开缓存数据*/
  @observable panes: Array<IPanes> = getStorageItem(LegionsCore.StorageKeysDataSet.panesStorageKeys, []);
  /**  当前标签页,默认首页*/
  @observable activeKey = getStorageItem(LegionsCore.StorageKeysDataSet.activeKeyStorageKeys, '');

  @observable breadcrumbMenu: string[] = getStorageItem(
    LegionsCore.StorageKeysDataSet.breadcrumbStorageKeys,
    []
  );
  @action addTabPanes(panes:IPanes, menuList: Array<InstanceType<typeof LegionsModels.MenuEntity>>) {
    let index = this.panes.findIndex(item => item.key === panes.key);
    const oldpane = this.panes.find((item) => item.key === this.activeKey);
    let currMenu = menuList.find(item => item.key === panes.key);
    this.updateBreadcrumbs(panes, menuList);
    if (index < 0) {
      let appName = '';
      let appEntiy = '';
      let appRootId = '';
      let experimentalStyleIsolation = true;
      let isMerge = false;
      if (currMenu && currMenu.sandbox) {
        appName = currMenu.sandbox['appName'];
        appEntiy = currMenu.sandbox['appEntiy'];
        appRootId = currMenu.sandbox['appRootId'];
        experimentalStyleIsolation = currMenu.sandbox['experimentalStyleIsolation'];
        isMerge = currMenu.sandbox['isMerge'];
      }
      else if (panes&&panes.sandbox) {
        appName = panes.sandbox['appName'];
        appEntiy = panes.sandbox['appEntiy'];
        appRootId = panes.sandbox['appRootId'];
        experimentalStyleIsolation = panes.sandbox['experimentalStyleIsolation'];
        isMerge = panes.sandbox['isMerge'];
      }
      this.panes.push({
        key: panes.key,
        keyPath: panes.keyPath || (currMenu ? currMenu.deep.reverse() : []),
        path: currMenu ? currMenu.path : panes.path,
        title: currMenu ? currMenu.title : panes.title,
        activeRouter: currMenu ? currMenu.path : panes.path,
        loadingMode: currMenu ? currMenu.loadingMode : panes['loadingMode'] ? panes['loadingMode'] : 'iframe',
        sandbox: {
          appName,
          appEntiy,
          appRootId,
          experimentalStyleIsolation,
          isMerge,
        },
        params: panes.params || {},
      });
      this.viewUIModel.updateTimestamp(panes.key.toString());
      this.proxySanbox.switchTabPaneSanboxMicroApp(oldpane, this.panes[this.panes.length - 1], ProxySanbox.SanboxTabActionMode.add)
    } else {
      this.panes[index].keyPath = panes.keyPath;
      this.panes[index].path = currMenu ? currMenu.path : panes.path;
      this.panes[index].activeRouter = currMenu ? currMenu.path : panes.path;
      this.panes[index].params = panes.params ? panes.params : this.panes[index].params;
      if (panes.forceRefresh) {
        this.viewUIModel.updateTimestamp(panes.key.toString());
      }
      this.proxySanbox.switchTabPaneSanboxMicroApp(oldpane, this.panes[index])
    }
    this.panes = this.panes.slice(); //

    this.setActiveKey(panes.key);
    setStorageItems(LegionsCore.StorageKeysDataSet.panesStorageKeys, this.panes); //同步缓存
  }

  /**
   * 打开指定菜单并同步更新缓存信息(tabs缓存，活动页签缓存,菜单面包屑缓存)
   *
   * @param {{key:string;keyPath?:string;path:string}} defaultItem
   * @param {Array<MenuEntity>} menuList
   * @memberof TabPaneViewStore
   */
  @action openDefault(
    defaultItem: Pick<IPanes, 'key' | 'keyPath' | 'path' | 'title'>,
    menuList: Array<InstanceType<typeof LegionsModels.MenuEntity>>
  ) {
    let index = this.panes.findIndex(item => item.key === defaultItem.key);
    let currMenu = menuList.find(item => item.key === defaultItem.key);
    this.updateBreadcrumbs({ keyPath: currMenu.deep }, menuList);
    if (index < 0) {
      this.panes.push({
        key: defaultItem.key,
        keyPath: defaultItem.keyPath,
        path: defaultItem.path,
        title: currMenu && currMenu.title,
        activeRouter: defaultItem.path,
        loadingMode: currMenu ? currMenu['loadingMode']:'iframe',
        sandbox: {
          appName:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['appName'],
          appEntiy:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['appEntiy'],
          appRootId:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['appRootId'],
          experimentalStyleIsolation:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['experimentalStyleIsolation'],
          isMerge:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['isMerge'],
        },
      });
      this.viewUIModel.updateTimestamp(defaultItem.key.toString());
    } else {
      this.panes[index].path = defaultItem.path;
      this.panes[index].activeRouter = defaultItem.path;
    }
    setStorageItems(LegionsCore.StorageKeysDataSet.panesStorageKeys, this.panes); //同步缓存
    this.panes = this.panes.slice(); //
    this.setActiveKey(defaultItem.key);
  }

  /**
   * 设置默认展开菜单信息同步缓存(tabs缓存，活动页签缓存,菜单面包屑缓存)
   *
   * @param {*} defaultItem
   * @param {Array<MenuEntity>} menuList
   * @memberof TabPaneViewStore
   */
  @action setDefaultTabPanes(defaultItem, menuList: Array<InstanceType<typeof LegionsModels.MenuEntity>>) {
    let index = this.panes.findIndex(item => item.key === defaultItem.key);
    let currMenu = menuList.find(item => item.key === defaultItem.key);
    this.updateBreadcrumbs({ keyPath: currMenu.deep }, menuList);
    if (index < 0) {
      this.panes.push({
        key: defaultItem.key,
        keyPath: defaultItem.keyPath,
        path: currMenu && currMenu.path,
        title: currMenu && currMenu.title,
        activeRouter: currMenu && currMenu.path,
        loadingMode: currMenu ? currMenu['loadingMode']:'iframe',
        sandbox: {
          appName:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['appName'],
          appEntiy:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['appEntiy'],
          appRootId: (currMenu && currMenu.sandbox) && currMenu.sandbox['appRootId'],
          experimentalStyleIsolation:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['experimentalStyleIsolation'],
          isMerge:(currMenu&&currMenu.sandbox)&&currMenu.sandbox['isMerge'],
        },
      });
      this.viewUIModel.updateTimestamp(defaultItem.key.toString());
      setStorageItems(LegionsCore.StorageKeysDataSet.panesStorageKeys, this.panes); //同步缓存
      this.panes = this.panes.slice(); //
      this.setActiveKey(defaultItem.key);
    }
  }
  /**
   * 设置活动页签
   *
   * @param {*} activeKey
   * @memberof TabPaneViewStore
   */
  @action setActiveKey(activeKey: string) {
    this.activeKey = activeKey;
    setStorageItems(LegionsCore.StorageKeysDataSet.activeKeyStorageKeys, this.activeKey);
    setStorageItems(LegionsCore.StorageKeysDataSet.selectedStorageKeys, this.activeKey);
  }
  /**
   * 新增和删除页签
   *
   * @param {any} targetKey  页签id
   * @param {any} action 操作类型 remove,add
   * @memberof TabPaneViewStore
   */
  @action update(targetKey: string | string[], action) {
    if (action === 'remove') {
      if (typeof targetKey === 'string') {
        this.remove(targetKey);
      } else if (targetKey && Array.isArray(targetKey)) {
        targetKey.map(item => {
          this.remove(item);
        });
      }
    }
  }
  private remove(targetKey) {
    //私有方法

    let activeKey = this.activeKey;
    let lastIndex;
    this.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.panes.filter(pane => pane.key !== targetKey);
    /**  当页签数量等于1时，则不允许删除最后一个页签*/
    if (panes.length > 0) {
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key;
      } else {
        /**  当页签为-1时，即从左至右一次关闭页签时，总是把后一个设为活动页签*/
        lastIndex = 0;
        activeKey = panes[lastIndex].key;
      }
      this.panes = panes;
      this.setActiveKey(activeKey);
      setStorageItems(LegionsCore.StorageKeysDataSet.panesStorageKeys, this.panes);
    }
  }

  /**
   * 同步设置面包屑导航信息
   *
   * @private
   * @param {*} panes
   * @param {Array<MenuEntity>} menuList
   * @memberof TabPaneViewStore
   */
  private updateBreadcrumbs(panes, menuList: Array<InstanceType<typeof LegionsModels.MenuEntity>>) {
    this.breadcrumbMenu = []; //清空面包屑导航
    panes.keyPath.map(items => {
      let entity = menuList.find(item => item.key === items);
      if (entity) {
        this.breadcrumbMenu.push(entity.title);
      } else if (panes.title) {
        this.breadcrumbMenu.push(panes.title);
      }
    });
    this.breadcrumbMenu = this.breadcrumbMenu.reverse().slice(); //处理头部面包屑导航数据
    setStorageItems(LegionsCore.StorageKeysDataSet.breadcrumbStorageKeys, this.breadcrumbMenu); //同步持久化
  }
  /**
   * 同步状态，主要用于当菜单手收起和展开时，执行的一些副作用
   *
   * @memberof TabPaneViewStore
   */
  @action syncCollapsed(collapsed) {
    this.collapsed = collapsed;
  }

  @action clearStorage() {
    localStorage.removeItem(LegionsCore.StorageKeysDataSet.panesStorageKeys);
    localStorage.removeItem(LegionsCore.StorageKeysDataSet.activeKeyStorageKeys);
    localStorage.removeItem(LegionsCore.StorageKeysDataSet.selectedStorageKeys);
    localStorage.removeItem(LegionsCore.StorageKeysDataSet.breadcrumbStorageKeys);
  }

  @action onEvent(event: IResourceEvent<ITriggerEventPrams>) {
    if (LegionsStore.CollapsedResource.created.name === event.name) {
      this.collapsed = event.payload.collapsed; // 当菜单折叠状态变更时，同步更新
    }
    if (LegionsStore.MenuPanesStorageResource.removed.name === event.name) {
      // 移除缓存信息
      this.clearStorage();
    }
    if (LegionsStore.BreadCrumbsResourceEven.created.name === event.name) {
      const item = this.panes.find(item => item.key === this.activeKey); // 当移除页签时，重新设置面包屑导航信息
      if (item) {
        this.updateBreadcrumbs(
          { keyPath: item.keyPath as string[] },
          event.payload.menuList
        );
        if (
          //@ts-ignore
          RegExChk(validatorType.path, item.path) &&
          item.path.indexOf('#') > -1
        ) {
          let _path = item.path.split('#');
          let _router = event.payload.router || [];
          if (_path.length > 1) {
            let _index = _router.findIndex(item => item.path === _path[1]);
            if (_index > -1) {
              window.location.hash = _path[1];
            }
          }
        }
      }
    }
  }

  /**
   * 同步菜单缓存信息
   *
   * @param {Array<MenuEntity>} menuList
   * @memberof TabPaneViewStore
   */
  @action syncTabPanes(menuList: Array<InstanceType<typeof LegionsModels.MenuEntity>>) {
    this.panes = this.panes.map(item => {
      let entity = menuList.find(menu => menu.key === item.key);
      if (entity) {
        item.path = entity.path;
        item.activeRouter = entity.path;
        item.title = entity.title;
        item['loadingMode'] = entity['loadingMode'];
        item['sandbox'] = entity['sandbox'] || {
          appName: '',
          appEntiy: '',
          appRootId: '',
          experimentalStyleIsolation: true,
          isMerge:false,
        };
      }
      return item;
    });
    setStorageItems(LegionsCore.StorageKeysDataSet.panesStorageKeys, this.panes); //同步缓存
  }
}
