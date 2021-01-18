/*
 * @Author: duanguang
 * @Date: 2020-12-29 10:26:57
 * @LastEditTime: 2021-01-18 16:14:02
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/interface/form.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { ValidateCallback } from 'antd/lib/form/Form';
import { HlLabeledValue } from 'legions-lunar/model';
import  {
  ILocalViewModelHlFormStore,
  IViewModelHlFormStore,
  IErrorView,
} from '../../store/pro.form/interface';
import {ProFormStore} from '../../store/pro.form'
export type {IErrorView}

export interface InstanceForm {
  store: ProFormStore;

  /**
   * 只读数据，请勿篡改
   *
   * 表单临时数据UID
   *
   * 根据时间戳生成，每次初始化表单组件都会产生新的值
   * @type {string}
   * @memberof InstanceForm
   */
  readonly uid: string;

  /**
   * 表单UI临时数据
   *
   * 组件卸载时清理
   *
   * 与uid绑定，即通过uid查询得到
   * @type {IViewModelHlFormStore}
   * @memberof InstanceForm
   */
  viewModel: IViewModelHlFormStore;

  /**
   *
   * 表单UI持久化数据模型
   *
   * 组件卸载后不会清理
   * @memberof InstanceForm
   */
  localViewModel: ILocalViewModelHlFormStore;
  /**
   * 只读数据，请勿篡改
   *
   * uid 的值绝对唯一，且每次初始生成表单都是相同值
   *
   * 用于调取localViewModel 数据模型数据
   * @memberof HLForm
   */
  readonly freezeUid: string;
  /**
   * 只读数据，请勿篡改
   *
   * 未加密的freezeUid 值
   *
   * 有需要用到明文值时，可以使用
   * @memberof HLForm
   */
  readonly decryptionFreezeUid: string;
  onIgnoreError?: (item: IErrorView) => void;
  /**
   * 暴露一些组件操作方法
   *
   * @memberof InstanceHlTable
   */
  methods?: IMethods;
  that?: React.Component;
  /** 校验并获取一组输入域的值与 Error */
  /*  validateFields(fieldNames: Array<string>, options: Object, callback: ValidateCallback): any;
   validateFields(fieldNames: Array<string>, callback: ValidateCallback): any;
   validateFields(options: Object, callback: ValidateCallback): any; */
  validateFields?(callback: ValidateCallback): any;
}
interface IMethods {
  /**
   * 下拉远程搜索函数
   *
   * @memberof IMethods
   */
  onSelectSearch?: (
    /**
     * 下拉组件name 值 (IAntdProps.name)
     *
     */
    name: string,
    params: {
      pageIndex: number;
      pageSize?: number;
      keywords?: string;
    } & Object
  ) => void;
  /** 表格表单变更数据行编辑及保存状态
   * 表格表单中使用 */
  updateRecordEditData?: (record: Object) => void;
  /** 查询指定下拉组件数据项 */
  getQuerySelectOption?: (
    /** 下拉组件name值，对应container.component.JsonProperty.name */ name: string,
    /** 下拉选项key值*/ optionKey: string
  ) => { readonly option: HlLabeledValue };
}
