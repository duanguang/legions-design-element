/*
 * @Author: duanguang
 * @Date: 2021-01-07 17:21:19
 * @LastEditTime: 2022-03-04 00:07:35
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreTable/ProTableLocalView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import {  StoreModules } from 'legions/store';
import LegionsCore from '../LegionsCore';
import { cloneDeep } from 'lodash';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ITableAutoQuery } from './interface';
import { PageListEntity } from './pageListEntity';
import {
  computed,
  observable, action,
} from 'mobx';
export class ProTableLocalView {

  /** 查询数据状态
   * 
   * 在loading动画展示时使用
   */
  @observable private _loading = false;


  /** 数据请求状态 */
  @computed get computedLoading() {
    return this._loading;
  }
  /** 更新动画状态,组件内部私有方法 */
  @action _setLoadingState(_loading: boolean) {
    this._loading = _loading;
  }
}
