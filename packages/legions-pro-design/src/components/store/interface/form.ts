import ProFormStore from '../pro.form';
import { observableViewModel, observablePromise } from 'legions/store-utils';

import { ISelectDatabaseDB } from '../../services/pro.form/interface';
import { ObservableMap } from 'mobx';
import {
  WrappedFormUtils,
  IAntdRule,
  IAntdSelectOption,
} from '../../interface/antd';
export { IErrorView } from '../../LegionsProForm/interface';
export { ProFormStore };
export {ISelectDatabaseDB}
/*
 * @Author: duanguang
 * @Date: 2020-12-29 10:33:54
 * @LastEditTime: 2020-12-29 10:40:08
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/interface/form.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
export interface InstanceFormElement {
  store: ProFormStore;
  uid: string;
}
export interface IElementList {
  /**
   * 组件元素name ,要求唯一，防止冲突
   *
   * @type {string}
   * @memberof IElementList
   */
  elementKey: string;

  /**
   *
   *  回车队列组件DOM元素
   * @type {*}
   * @memberof IElementList
   */
  element: any;

  /**
   *
   * 指定跳转元素 key , 如果不指定，默认跳转下一个
   * @type {string}
   * @memberof IElementList
   */
  nextElementKey?: string | { formUid: string; nextElementKey: string };

  /**
   *
   * 存放设置了tabindex dom元素
   * 主要用途 如下拉选择组件input聚焦后，边框线没有高亮，因为下拉框聚点是设置在一个div上面，所以此时还需要把div也聚焦
   * @type {*}
   * @memberof IElementList
   */
  elementTabindex?: any;

  /**
   *
   * 禁用状态组件不纳入收集
   * @type {boolean}
   * @memberof IElementList
   */
  disabled?: boolean;
}
export interface ISyncSelectDataBase {
  options: {
    autoQuery: ISelectAutoQuery;
    keyWords: string;
    name: string;
    tableNameDb: string;
    total: number;
  };
  query: {
    tableNameDb: string;
    name: string;
    pageIndex: number;
    keyWords: string;
    callback: (value: ISelectDatabaseDB[]) => void;
  };
}

type HeadersPrams = {
  'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
};
export interface ISelectAutoQuery<Model = {}> {
  /**
   * 查询参数
   *
   * @memberof ISelectAutoQuery
   */
  params: (
    pageIndex: number,
    pageSize: number,
    keyWords: string,
    other?: Object
  ) => Object & {
    /**
     * 表单下拉组件通过此参数获取页码
     *
     * 传入到接口时，会自动移除
     *
     * @type {number}
     */
    pageIndex: number;
    /**
     * 表单下拉组件通过此参数获取页大小
     *
     * 传入到接口时，会自动移除
     *
     * @type {number}
     */
    pageSize: number;
    /**
     *
     * 默认搜索关键词
     *
     * 只在表单组件初次装载有效
     * @type {string}
     */
    defaultKeyWords?: string;
  };

  /**
   *  发送请求前转换条件函数
   *
   * @memberof ISelectAutoQuery
   */
  requestBeforeTransformParams?: (value: ISelectAutoQuery['params']) => Object;

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
   * @memberof ISelectAutoQuery
   */
  options?: HeadersPrams & Object;

  /**
   *
   * 数据模型
   *
   * 一般用于定义接口返回结构
   * @type {Model}
   * @memberof ISelectAutoQuery
   */
  model: Model;

  /**
   * 下拉数据绑定前转换绑定数据结构
   *
   * 当外部数据不确定时，此时我们需要一个适配器转换从接口中取到的数据，用于绑定下拉选项
   * @memberof ISelectAutoQuery
   */
  transform: (
    value: observablePromise.PramsResult<any>
  ) => { total: number; data: IAntdSelectOption[] };
  /**
   *
   * 授权信息令牌
   *
   * 一般用作权限验证
   * @type {string}
   * @memberof ISelectAutoQuery
   */
  token: string;
}
export interface ISelectOptions {
  keywords: string;
  // @ts-ignore
  obData: ObservableMap<observablePromise.PramsResult<any>>;
}
