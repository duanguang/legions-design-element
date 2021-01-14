/*
 * @Author: duanguang
 * @Date: 2021-01-07 17:21:19
 * @LastEditTime: 2021-01-14 14:26:57
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.table/ProTableLocalView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { observable, action, StoreModules } from 'legions/store';
import { LegionsFetch } from '../../core';
import { cloneDeep } from 'lodash';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ITableAutoQuery } from './interface';
import  LegionsProTable  from '../../LegionsProTable';
import { PageListEntity } from '../../LegionsProTable/pageListEntity';

export class ProTableLocalView {
  /**
   *
   * 表格接口数据
   * @memberof HLTableLocalView
   */
  @observable obState = observablePromise<PageListEntity<any>>();

  @observable loading = false;
  @action dispatchRequest(
    autoQuery: ITableAutoQuery,
    options: {
      pageIndex: number;
      pageSize: number;
    }
  ) {
    if (autoQuery) {
      const server = new LegionsFetch();
      //@ts-ignore
      const apiServer = () => {
        let params = cloneDeep(
          autoQuery.params(options.pageIndex, options.pageSize)
        );
        const model = {
          //@ts-ignore
          model: LegionsProTable.ProTableBaseClass.pageListEntity,
          onBeforTranform: (value) => {
            let tranformData = {};
            if (autoQuery.modelConfig.tranformData) {
              tranformData={tranformData:autoQuery.modelConfig.tranformData}
            }
            return {
              model: autoQuery.modelConfig.model,
              responseData: value,
              filtersListData: autoQuery.modelConfig.filtersListData,
              ...tranformData
            }
          }
        }
        if (autoQuery.method === 'post') {
          return server.post<PageListEntity<any>, any>({
            url: autoQuery.ApiUrl,
            parameter: params,
            headers: { ...autoQuery.options, 'api-cookie': autoQuery.token },
            ...model,
          });
        } else if (autoQuery.method === 'get') {
          return server.get<PageListEntity<any>, any>({
            url: autoQuery.ApiUrl,
            parameter: params,
            headers: {
              ...autoQuery.options,
              'api-cookie': autoQuery.token,
            },
            ...model,
          });
        }
      };
      // @ts-ignore
      this.obState = observablePromise<{}>(apiServer());
    }
  }
}
