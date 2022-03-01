/** @format */

import { action,observable,StoreModules } from 'legions/store';
import { getStorageItem,setStorageItems } from 'legions-utils-tool/storage';
import LegionsStore from '../../LegionsStore';
import { legionsStoreInterface } from '../../LegionsStore/interface';
import { observableViewModel } from 'legions/store-utils';
import { RegExChk,validatorType } from 'legions-utils-tool/regex';
import { ProxySanbox } from './ProxySanbox';
import { TabPaneViewData } from './TabPaneViewData';
import { legionsProLayoutInterface } from '../interface'
import { storageKeysData } from '../constant.storageKeys';
@StoreModules
export default class TabPaneViewStore extends LegionsStore.StoreBase {
  static meta: legionsStoreInterface['storeBaseMeta'] = {
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
  /**  页签组件视图数据 */
  @observable viewData = observableViewModel<TabPaneViewData>(
    new TabPaneViewData()
  );
  /**  用于同步菜单栏是否收缩状态 */
  @observable collapsed = false;

  /**  Tabs 页签打开缓存数据*/
  @observable panes: Array<legionsProLayoutInterface['panes']> = getStorageItem(storageKeysData.panesStorageKeys,[]);
  /**  当前标签页,默认首页*/
  @observable activeKey = getStorageItem(storageKeysData.activeKeyStorageKeys,'');

  @observable breadcrumbMenu: string[] = getStorageItem(
    storageKeysData.breadcrumbStorageKeys,
    []
  );
  private remove(targetKey) {
    let activeKey = this.activeKey;
    let lastIndex;
    this.panes.forEach((pane,i) => {
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
      setStorageItems(storageKeysData.panesStorageKeys,this.panes);
    }
  }
  /** 同步设置面包屑导航信息*/
  private updateBreadcrumbs(panes: legionsProLayoutInterface['panes'],menuList: legionsProLayoutInterface['menuList']) {
    this.breadcrumbMenu = []; //清空面包屑导航
    const keyPath = panes.keyPath as string[]
    keyPath.map(items => {
      let entity = menuList.find(item => item.key === items);
      if (entity) {
        this.breadcrumbMenu.push(entity.title);
      } else if (panes.title) {
        this.breadcrumbMenu.push(panes.title);
      }
    });
    this.breadcrumbMenu = this.breadcrumbMenu.reverse().slice(); //处理头部面包屑导航数据
    setStorageItems(storageKeysData.breadcrumbStorageKeys,this.breadcrumbMenu); //同步持久化
  }
  @action addTabPanes(panes: legionsProLayoutInterface['panes'],menu_list: legionsProLayoutInterface['menuList']) {
    let _index = this.panes.findIndex(item => item.key === panes.key);
    /** 在打开新页签时，拉出上一次活动页签数据 */
    let pre_pane = this.panes.find((item) => item.key === this.activeKey);
    let curr_menu = menu_list.find(item => item.key === panes.key);
    if (_index < 0) {
      let appName = '';
      let appEntiy = '';
      let appRootId = '';
      let experimentalStyleIsolation = true;
      let isMerge = false;
      if (curr_menu?.sandbox) {
        appName = curr_menu.sandbox['appName'];
        appEntiy = curr_menu.sandbox['appEntiy'];
        appRootId = curr_menu.sandbox['appRootId'];
        experimentalStyleIsolation = curr_menu.sandbox['experimentalStyleIsolation'];
        isMerge = curr_menu.sandbox['isMerge'];
      }
      else if (panes && panes.sandbox) {
        appName = panes.sandbox['appName'];
        appEntiy = panes.sandbox['appEntiy'];
        appRootId = panes.sandbox['appRootId'];
        experimentalStyleIsolation = panes.sandbox['experimentalStyleIsolation'];
        isMerge = panes.sandbox['isMerge'];
      }
      this.panes.push({
        key: panes.key,
        keyPath: panes.keyPath || (curr_menu ? curr_menu.deep.reverse() : []),
        path: curr_menu?.path || panes.path,
        title: curr_menu?.title || panes.title,
        activeRouter: curr_menu?.path || panes.path,
        loadingMode: curr_menu?.loadingMode || panes['loadingMode'] || 'iframe',
        sandbox: {
          appName,
          appEntiy,
          appRootId,
          experimentalStyleIsolation,
          isMerge,
        },
        params: panes.params || {},
      });
      this.viewData.updateTimestamp(panes.key.toString());
      this.proxySanbox.switchTabPaneSanboxMicroApp(pre_pane,this.panes[this.panes.length - 1],ProxySanbox.SanboxTabActionMode.add)
    } else {
      this.panes[_index].keyPath = panes.keyPath;
      this.panes[_index].path = curr_menu?.path || panes.path;
      this.panes[_index].activeRouter = curr_menu?.path || panes.path;
      this.panes[_index].params = panes.params ? panes.params : this.panes[_index].params;
      if (panes.forceRefresh) {
        this.viewData.updateTimestamp(panes.key.toString());
      }
      this.proxySanbox.switchTabPaneSanboxMicroApp(pre_pane,this.panes[_index])
    }
    this.panes = this.panes.slice(); //
    this.updateBreadcrumbs(panes,menu_list);
    this.setActiveKey(panes.key);
    setStorageItems(storageKeysData.panesStorageKeys,this.panes); //同步缓存
  }

  /**
   * 打开指定菜单
   * @param defaultItem 即将打开菜单页签数据
   * @param menuList 菜单项数据集
   */
  @action openAppoint(
    defaultItem: Pick<legionsProLayoutInterface['panes'],'key' | 'keyPath' | 'path' | 'title'>,
    menuList: legionsProLayoutInterface['menuList']
  ) {
    let index = this.panes.findIndex(item => item.key === defaultItem.key);
    let curr_menu = menuList.find(item => item.key === defaultItem.key);
    if (index < 0) {
      // 如未查到页签打开缓存记录,则按照新页签打开方式处理
      let sandbox = {
        appName: '',
        appEntiy: '',
        appRootId: '',
        experimentalStyleIsolation: false,
        isMerge: true,
      }
      if (curr_menu?.sandbox) {
        sandbox.appName = curr_menu.sandbox['appName']
        sandbox.appEntiy = curr_menu.sandbox['appEntiy']
        sandbox.appRootId = curr_menu.sandbox['appRootId']
        sandbox.experimentalStyleIsolation = curr_menu.sandbox['experimentalStyleIsolation']
        sandbox.isMerge = curr_menu.sandbox['isMerge']
      }
      this.panes.push({
        key: defaultItem.key,
        keyPath: defaultItem.keyPath,
        path: defaultItem.path,
        title: defaultItem.title,
        activeRouter: defaultItem.path,
        loadingMode: curr_menu ? curr_menu['loadingMode'] : 'iframe',
        sandbox,
      });
      this.viewData.updateTimestamp(defaultItem.key.toString());
    } else {
      // 如存在打开记录，则更新页签相关信息
      this.panes[index].path = defaultItem.path;
      this.panes[index].keyPath = defaultItem.keyPath;
      this.panes[index].activeRouter = defaultItem.path;
      this.panes[index].title = defaultItem.title;
    }
    this.panes = this.panes.slice(); //
    //@ts-ignore
    this.updateBreadcrumbs({ keyPath: curr_menu?.deep || [] },menuList);
    setStorageItems(storageKeysData.panesStorageKeys,this.panes); //同步缓存
    this.setActiveKey(defaultItem.key);
  }

  /**
   * 设置默认展开菜单信息
   * @param defaultItem 默认打开菜单项数据
   * @param menuList 菜单项数据集
   */
  @action setDefaultTabPanes(defaultItem: {
    key: string;
    keyPath: string[];
  },menuList: legionsProLayoutInterface['menuList']) {
    let index = this.panes.findIndex(item => item.key === defaultItem.key);
    let curr_menu = menuList.find(item => item.key === defaultItem.key);
    if (index < 0) {
      let sandbox = {
        appName: '',
        appEntiy: '',
        appRootId: '',
        experimentalStyleIsolation: false,
        isMerge: true,
      }
      if (curr_menu && curr_menu.sandbox) {
        sandbox.appName = curr_menu.sandbox['appName']
        sandbox.appEntiy = curr_menu.sandbox['appEntiy']
        sandbox.appRootId = curr_menu.sandbox['appRootId']
        sandbox.experimentalStyleIsolation = curr_menu.sandbox['experimentalStyleIsolation']
        sandbox.isMerge = curr_menu.sandbox['isMerge']
      }
      this.panes.push({
        key: defaultItem.key,
        keyPath: defaultItem.keyPath,
        path: curr_menu?.path,
        title: curr_menu?.title,
        activeRouter: curr_menu?.path,
        loadingMode: curr_menu ? curr_menu['loadingMode'] : 'iframe',
        sandbox,
      });
      //@ts-ignore
      this.updateBreadcrumbs({ keyPath: curr_menu?.deep || [] },menuList);
      this.viewData.updateTimestamp(defaultItem.key.toString());
      setStorageItems(storageKeysData.panesStorageKeys,this.panes); //同步缓存
      this.panes = this.panes.slice(); //
      this.setActiveKey(defaultItem.key);
    }
  }
  /**
   * 设置活动页签
   * @param activeKey 
   */
  @action setActiveKey(activeKey: string) {
    this.activeKey = activeKey;
    setStorageItems(storageKeysData.activeKeyStorageKeys,this.activeKey);
    setStorageItems(storageKeysData.selectedStorageKeys,this.activeKey);
  }
  /**
   * 新增和删除页签
   *
   * @param {any} targetKey  页签id
   * @param {any} action 操作类型 remove,add
   */
  @action update(targetKey: string | string[],action) {
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



  /**
   * 同步状态，主要用于当菜单手收起和展开时，执行的一些副作用
   *
   */
  @action syncCollapsed(collapsed) {
    this.collapsed = collapsed;
  }

  @action clearStorage() {
    localStorage.removeItem(storageKeysData.panesStorageKeys);
    localStorage.removeItem(storageKeysData.activeKeyStorageKeys);
    localStorage.removeItem(storageKeysData.selectedStorageKeys);
    localStorage.removeItem(storageKeysData.breadcrumbStorageKeys);
  }
  /**
   * 同步菜单缓存信息
   * @param menuList 
   */
  @action syncTabPanes(menuList: legionsProLayoutInterface['menuList']) {
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
          isMerge: false,
        };
      }
      return item;
    });
    setStorageItems(storageKeysData.panesStorageKeys,this.panes); //同步缓存
  }
  @action onEvent(event: legionsStoreInterface<legionsProLayoutInterface['triggerEventPrams']>['resourceEvent']) {
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
          item,
          event.payload.menuList
        );
        if (
          //@ts-ignore
          RegExChk(validatorType.path,item.path) &&
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
}
