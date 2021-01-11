/*
 * @Author: duanguang
 * @Date: 2021-01-07 17:21:19
 * @LastEditTime: 2021-01-07 18:04:38
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
export class ProTableLocalView {
  /**
   *
   * 表格接口数据
   * @memberof HLTableLocalView
   */
  @observable obState = observablePromise<any>();

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
        if (autoQuery.method === 'post') {
          return server.post<typeof autoQuery.model, any>({
            url: autoQuery.ApiUrl,
            parameter: params,
            headers: { ...autoQuery.options, 'api-cookie': autoQuery.token },
            //@ts-ignore
            model: autoQuery.model,
          });
        } else if (autoQuery.method === 'get') {
          return server.get<typeof autoQuery.model, any>({
            url: autoQuery.ApiUrl,
            parameter: params,
            headerOption: {
              ...autoQuery.options,
              'api-cookie': autoQuery.token,
            },
            //@ts-ignore
            model: autoQuery.model,
          });
        }
      };
      // @ts-ignore
      this.obState = observablePromise<{}>(apiServer());
    }
  }
}
