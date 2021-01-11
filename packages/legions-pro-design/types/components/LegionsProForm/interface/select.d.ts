import { IProSelectProps } from '../../LegionsProSelect/interface';
import { observablePromise } from 'legions/store-utils';
import { WrappedFormUtils, IAntdProps, IAntdFormItemProps, IAntdRule, IAntdSelectOption } from '../../interface/antd';
import { InstanceFormElement } from './formElement';
import { IErrorView, InstanceForm } from './form';
declare type HeadersPrams = {
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded';
};
export interface IFormSelectProps extends IProSelectProps, IAntdFormItemProps {
    /**
     *
     * select 需要绑定的数据
     * @type {IAntdSelectOption[]}
     * @memberof IFormSelectProps
     */
    options: IAntdSelectOption[];
    optGroups?: Array<IOptGroupProps>;
    firstActiveValue?: string[] | string;
    /**
     * 自动托管下拉请求
     *
     * 注意此功能要配合远程搜索使用，即要开启remote = true
     * @type {ISelectAutoQuery}
     * @memberof IFormSelectProps
     */
    autoQuery?: ISelectAutoQuery;
}
export declare class LabelWithHLSelectModel {
    iAntdProps: IAntdProps;
    iFormWithSelect: IFormSelectProps;
    rules?: IAntdRule[];
    constructor(iAntdProps: IAntdProps, iFormWithSelect: IFormSelectProps, rules?: IAntdRule[]);
}
export interface ISelectAutoQuery<Model = {}> {
    /**
     * 查询参数
     *
     * @memberof ISelectAutoQuery
     */
    params: (pageIndex: number, pageSize: number, keyWords: string) => Object & {
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
    transform: (value: observablePromise.PramsResult<Model>) => {
        total: number;
        data: IAntdSelectOption[];
    };
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
export interface IOptGroupProps {
    label: string | JSX.Element;
    key?: string;
}
export interface IFormWithSelectProps {
    iAntdProps: IAntdProps;
    form: WrappedFormUtils;
    rules?: IAntdRule[];
    iFormWithSelect: IFormSelectProps;
    /**
     * 表单生成的唯一uid
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
    formStore?: InstanceForm;
}
export interface IFormSelectWrapError {
    formItemName: string;
    formHLSelectRef: InstanceFormElement;
    formUid: string;
    onIgnoreError?: (item: IErrorView) => void;
}
export {};