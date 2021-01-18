/*
 * @Author: duanguang
 * @Date: 2021-01-07 17:17:41
 * @LastEditTime: 2021-01-14 15:39:46
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.table/interface/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { ObservableMap } from 'mobx';
import { observableViewModel,observablePromise } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import { ProTableView } from '../ProTableView';
import { ProTableLocalView } from '../ProTableLocalView';
import { PageListEntity } from '../../../LegionsProTable/pageListEntity';
import { request } from 'legions/request';
import { ClassOf } from 'legions-lunar/types/api/typescript';
export interface ITableColumnConfig {
  /** 当传入的title不为string类型时，可传label作为checkbox的label展示 */
  label?: string;
  /** 默认不选中 不选中：true 选中：false
   *  当列缓存数据为空时，才会生效
   *  列缓存数据不为空时，优先生效缓存中保存的数据
   * 当功能迭代时，新增了列信息，由于系统无法判断哪些是新增数据，古如需要生效列信息，需要手动拖动列数据，进行一次缓存刷新
   */
  noChecked?: boolean;

  /**
   *
   * 是否允许导出,默认导出
   * @type {boolean}
   * @memberof ITableColumnConfig
   */
  isExport?: boolean;
}
export interface IShowColumns {
  dataIndex: string;
  title: string;
}
export interface IScroll {
  x?: string | number | boolean;
  y?: string | number | boolean;
}
// @ts-ignore
export interface IObservableMap<K, V> extends ObservableMap<K, V> {}
export interface IObservableMap<K, V> extends ObservableMap<V> {}
type HeadersPrams = {
  'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
};
export interface ITableAutoQuery<Model = {}> {
  /**
   * 查询参数
   *
   * @type {Object}
   */
  params?: (pageIndex: number, pageSize: number) => Object;

  /**
   * 请求接口
   *
   * @type {string}
   */
  ApiUrl: string;
  method: 'get' | 'post';

  /**
   * headers 参数
   *
   * @type {(HeadersPrams & Object)}
   * @memberof IAutoQuery
   */
  options?: HeadersPrams & { [key: string]: string }&request.HeadersPrams;

  /**
   * 数据模型配置
   *
   * @type {Model}
   * @memberof IAutoQuery
   */
  model: {
    /** 埋点配置项，暂时不用 */
    model?: ClassOf<Model>,
    /** 映射数据至===>result */
    mappingEntity: (that: PageListEntity<Model>,responseData: any) => void;
  }|Model;

  /**
   *
   * 授权令牌，一般泛指接口权限
   * @type {string}
   * @memberof IAutoQuery
   */
  token: string;

  /**
   * 表格绑定数据前转换符合表格数据结构的数据
   *
   * @memberof IAutoQuery
   */
  transform: (
    value: observablePromise.PramsResult<PageListEntity<Model>>
  ) => {
    total: number;
    data: Array<any>;
  };

  /**
   * 在表格组件装载时是否默认自动发送请求
   *
   * 不传入或者等于true 时发送请求
   * @type {boolean}
   * @memberof ITableAutoQuery
   */
  isDefaultLoad?: boolean;
  debug?: boolean;
}
type Proxify<T> = {
  [P in keyof T]: T[P];
  //[P in keyof T]: Proxy<T[P]>;
};
export declare type IViewModelProTableStore = ViewModel<ProTableView> &
  Proxify<ProTableView>;
export declare type ILocalViewModelProTableStore = ViewModel<
  ProTableLocalView
> &
  Proxify<ProTableLocalView>;
