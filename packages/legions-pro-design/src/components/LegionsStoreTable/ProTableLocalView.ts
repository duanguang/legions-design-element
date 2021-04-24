/*
 * @Author: duanguang
 * @Date: 2021-01-07 17:21:19
 * @LastEditTime: 2021-04-14 14:58:40
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreTable/ProTableLocalView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { observable, action, StoreModules } from 'legions/store';
import LegionsCore from '../LegionsCore';
import { cloneDeep } from 'lodash';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ITableAutoQuery } from './interface';
import { PageListEntity } from './pageListEntity';
import {
  computed,
} from 'mobx';
export class ProTableLocalView {
  /**
   *
   * 表格接口数据
   * @memberof HLTableLocalView
   */
  @observable obState = observablePromise<PageListEntity<any>>();

  @observable _obStateMap= observable.map<string,
    {
      data: any[];
      total: number;
    }
  >()

  /** 查询数据状态
   * 
   * 在loading动画展示时使用
   */
  @observable private _loading = false;

  /** http 请求状态 */
  @observable private _request: 'none' | 'pending' | 'complete' = 'none';

  /** 数据请求状态 */
  @computed get computedLoading() {
    return this._loading;
  }
  /** http 请求状态 */
  @computed get computedRequest() {
    return this._request;
  }
  /** 更新动画状态,组件内部私有方法 */
  @action _setLoadingState(_loading: boolean) {
    this._loading = _loading;
  }
  /** 更新http请求接口状态,组件内部私有方法  */
  @action _setRequestState(request: 'none' | 'pending' | 'complete') {
    this._request = request;
  }
  @action dispatchRequest(
    autoQuery: ITableAutoQuery,
    options: {
      pageIndex: number;
      pageSize: number;
      isShowLoading: boolean;
    }
  ) {
    if (autoQuery) {
      const server = new LegionsCore.LegionsFetch();
      //@ts-ignore
      const apiServer = () => {
        let params = cloneDeep(
          autoQuery.params(options.pageIndex, options.pageSize)
        );
        // @ts-ignore
        let model: any = {};
        if (autoQuery.mappingEntity) {
          model = {
            model: PageListEntity,
            onBeforTranform: (value) => {
              return {
                responseData: value,
                mappingEntity:autoQuery['mappingEntity'],
              }
            }
          }
        }
        let headers = {};
        if (autoQuery.token) {
            if (typeof autoQuery.token === 'string') {
                headers={'api-cookie': autoQuery.token}
            }
            else if (typeof autoQuery.token === 'function') {
                headers={'api-cookie': autoQuery.token()}
            }
        }
        if (autoQuery.method === 'post') {
          return server.post<PageListEntity<any>, any>({
            url: autoQuery.ApiUrl,
            parameter: params,
            headers: { ...autoQuery.options, ...headers },
            ...model,
          });
        } else if (autoQuery.method === 'get') {
          return server.get<PageListEntity<any>, any>({
            url: autoQuery.ApiUrl,
            parameter: params,
            headers: {
              ...autoQuery.options,
              ...headers
            },
            ...model,
          });
        }
      };
      if (options.isShowLoading) {
        this._setLoadingState(true);
      }
      this._request = 'none';
      // @ts-ignore
      this.obState = observablePromise<{}>(apiServer());
      this._request = 'pending';
    }
  }
}
