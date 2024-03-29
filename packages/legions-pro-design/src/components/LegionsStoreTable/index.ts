/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:35:17
 * @LastEditTime: 2021-08-09 23:42:17
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreTable/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/** @format */

import LegionsStore from '../LegionsStore';
import ReactDOM from 'react-dom';
/* import {
  findDOMNode,
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode,
} from 'react-dom'; */
import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { shortHash } from 'legions-lunar/object-hash';
import { ProTableView } from './ProTableView';
import { ProTableLocalView } from './ProTableLocalView';
import {IStoreBaseMeta} from '../LegionsStore/interface';
import { ObservableMap } from 'mobx';
import { PageListEntity } from './pageListEntity';
import { ViewModel } from 'brain-store-utils/types/create-view-model';

type Proxify<T> = {
  [P in keyof T]: T[P];
  //[P in keyof T]: Proxy<T[P]>;
};
@StoreModules
export default class LegionsStoreTable extends LegionsStore.StoreBase {
  static meta: IStoreBaseMeta = {
    ...LegionsStore.StoreBase.meta,
  };
  static pageListEntity = PageListEntity;
  constructor(context) {
    super(context);
  }
  userInfo: {
    userName: string
    userUid: string;
    companyName?: string,
    companyUid?: string,
  } = null;
  /**
   * 数据生命周期，表格组件卸载之前
   *
   * @memberof HLTableStore
   */
  @observable TableContainer = observable.map<string,
    ViewModel<ProTableView> & Proxify<ProTableView>
  >();
  @observable TableContainerModules = observable.map<string>();

  /**
   *
   *  数据生命周期，应用重新数据前有效
   * @memberof HLTableStore
   */
  @observable HlTableLocalStateContainer = observable.map<string,
    ViewModel<ProTableLocalView> & Proxify<ProTableLocalView>
  >();
  @action add(uid: string, modulesName: string, timeuid: string) {
    /* this.TableContainer.set(uid,observableViewModel<ProTableView>(new ProTableView())) */
    const view = new ProTableView(modulesName, timeuid,this.userInfo);
    this.addContainerModules(modulesName);
    this.TableContainer.set(uid, observableViewModel<ProTableView>(view));
  }
  @action init(uid: string, options: ProTableView) {
    const store = this.TableContainer.get(uid);
    store.pageIndex = options.pageIndex || 1;
    store.pageSize = options.pageSize || 20;
    if (options.isAdaptiveHeight !== void 0) {
      store.isAdaptiveHeight = options.isAdaptiveHeight;
    }
  }
  @action delete(uid: string) {
    this.TableContainer.delete(uid);
  }
  @action deleteTableModules(modulesName: string) {
    this.TableContainerModules.delete(modulesName);
  }
  @action get(uid: string) {
    return this.TableContainer.get(uid);
  }
  @action addContainerModules(modulesName: string) {
    if (modulesName) {
      if (!this.TableContainerModules.has(modulesName)) {
        this.TableContainerModules.set(
          modulesName,
          `${shortHash(modulesName)}`
        );
      }
    }
  }

  /**
   * 添加本地数据
   *
   *  内部方法，外部请勿使用
   * @param {string} uid
   * @memberof HLTableStore
   */
  @action _addLocalState(uid: string) {
    const view = new ProTableLocalView();
    this.HlTableLocalStateContainer.set(
      uid,
      observableViewModel<ProTableLocalView>(view)
    );
  }
  @action _deleteLocalState(uid: string) {
    this.HlTableLocalStateContainer.delete(uid);
  }
  @action getLocalState(uid: string) {
    return this.HlTableLocalStateContainer.get(uid);
  }
}
