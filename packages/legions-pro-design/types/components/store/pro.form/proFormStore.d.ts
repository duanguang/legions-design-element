/// <reference types="react" />
import { StoreBase } from '../index';
import { IStoreBaseMeta } from '../interface';
import { ViewModel } from 'brain-store-utils';
import { WrappedFormUtils, IAntdSelectOption } from '../../interface/antd';
import { ObservableMap } from 'mobx';
import { IElementList, IErrorView, ISelectAutoQuery, ISelectOptions, IObservableMap } from './interface';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export interface IFormState {
    /**
     *
     * 组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见 组件移除
     * @type {Boolean}
     * @memberof IFormState
     */
    visible?: Boolean;
    /**
     *
     * 组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见
     * 注意此隐藏只是隐藏dom 设置display:'none'，元素依然存在只是不可见，如果元素有附加验证规则，则
     * @type {Boolean}
     * @memberof IFormState
     */
    display?: Boolean;
    /**
     * 组件可编辑状态 false 可编辑， 否则不可编辑
     *
     * @type {boolean}
     * @memberof IFormState
     */
    disabled?: boolean;
}
export declare class HlFormView {
    /**
     * 需要进行回车，上下键操作的组件钩子列表(不包含禁用的组件)
     *
     * @memberof HlFormView
     */
    elementList: IObservableMap<string, IElementList>;
    /**
     * 用来存放下一个应该聚焦的组件元素uid值
     *
     * @memberof HlFormView
     */
    focusUid: string;
    /**
     *
     * 是否启用回车或者上下键进行元素切换
     * @memberof HlFormView
     */
    enableEnterSwitch: boolean;
    private size;
    /**
     * 收集到节点数量，私有变量，主要用于当前后两次收集到节点数量不一致时，这是可以强制清空队列，重新收集，保证收集节点顺序
     *
     * @memberof HlFormView
     */
    nodeCount: number;
    /**
     * 表单元素集合
     *
     * @type {any[]}
     * @memberof HlFormView
     */
    controls: any[];
    /**
     * 需要进行回车，上下键操作的组件钩子列表keys
     *
     * @private
     * @memberof HlFormView
     */
    private allElementList;
    /**
     *
     * 错误信息组件节点集合
     * @memberof HlFormView
     */
    errorReactNodeList: IObservableMap<string, ViewModel<ErrorViewModel> & Proxify<ErrorViewModel>>;
    /**
     *
     * 所有组件错误信息
     * @memberof HlFormView
     */
    errorListView: IObservableMap<string, IErrorView[]>;
    /**
     *
     * 表单数据状态
     * @private
     * @type {(ObservableMap<IFormState>| ObservableMap<string,IFormState>)}
     * @memberof HlFormView
     */
    private formState;
    /**
     * 错误信息组件节点集合 只读
     *
     * @returns
     * @memberof HlFormView
     */
    get computedErrorReactNodeList(): HlFormView['errorReactNodeList'];
    get computedAllElementList(): string[];
    /**
     * 获取全部错误信息
     *
     * @readonly
     * @memberof HlFormView
     */
    get computedErrorListView(): IErrorView[];
    /**
     * 表单展示风格 舒适,迷你,紧凑
     *
     * @readonly
     * @memberof HlFormView
     */
    get styleSize(): "default" | "small" | "table";
    /**
     *
     * 表单状态数据
     * @readonly
     * @memberof HlFormView
     */
    get computedFormState(): IObservableMap<string, IFormState>;
    updateStyleSize(size: 'default' | 'small' | 'table'): void;
    /**
     *  添加错误信息和组件元素的关联关系，可通过组件name查出错误信息组件UID
     *
     * @param {string} componentCode 组件元素名称 对应iAntdProps.name值 唯一，不然会出现问题
     * @param {string} errorUid // 错误信息组件生成的唯一uid
     * @memberof HlFormView
     */
    collectErrorReactNode(componentCode: string, errorUid: string): void;
    /**
     * 设置错误信息，通过错误信息组件UID作为数据的主键
     *
     * @param {string} componentCode 组件元素名称 对应iAntdProps.name值 唯一，不然会出现问题
     * @param {string} [errorListView] 错误信息
     * @memberof HlFormView
     */
    setErrorErrorReactNodeList(componentCode: string, errorListView: Array<IErrorView>): void;
    /**
     *
     * 忽略错误信息
     * @param {string} componentCode 组件元素name
     * @param {number} id 组件元素唯一id 对应errorListView的key
     * @memberof HlFormView
     */
    handleIgnore(componentCode: string, id: number): void;
    /**
     *
     * 收集组件钩子keys
     * @param {string} keys
     * @memberof HlFormView
     */
    addAllElementKeys(keys: string): void;
    /**
     * 初始化表单组件数据，组件内部方法，请勿调用
     *
     * @param {string} name
     * @memberof HlFormView
     */
    initFormState(name: string): void;
    /**
     *
     * 设置表单组件状态
     * @param {string} name
     * @param {IFormState} state
     * @memberof HlFormView
     */
    setFormState(name: string, state: IFormState): void;
}
export interface IOtherView {
    form: WrappedFormUtils;
    /**
     *表单输入信息数据模型
     *
     * @type {Object}
     * @memberof IOtherView
     */
    InputDataModel?: Object;
    /**
     * 表单输入数据类实例模型
     *
     * @type {Function}
     * @memberof IOtherView
     */
    InputDataModelClass?: Function;
    uid: string;
}
export declare class ErrorViewModel {
    uid: string;
    /**
     *
     * 样式名称
     * @memberof ErrorViewModel
     */
    validateStatus: '' | 'error';
}
export declare class HLFormLocalView {
    selectOptions: IObservableMap<string, ISelectOptions[]>;
    selectView: IObservableMap<string, {
        paging: boolean;
        remote: boolean;
        autoQuery: ISelectAutoQuery;
        pageIndex: number;
        pageSize: number;
        keywords: string;
        tableNameDb: string;
        currValue: {
            total: number;
            data: ObservableMap<IAntdSelectOption[]>;
        };
    }>;
    /**
     * 是否开启拖拽排序
     *
     * @memberof HLFormLocalView
     */
    private _isDragSort;
    private _controlsSort;
    /**
     * 当前表单元素拖拽排序状态
     *
     * @readonly
     * @memberof HLFormLocalView
     */
    get dragSortState(): boolean;
    get computedControlsSort(): string[];
    updateControlsSort(sorts: string[]): void;
    setDragSort(sort: boolean): void;
    initSelectOptions(keys: string, autoQuery: ISelectAutoQuery): void;
    initSelectView(keys: string, autoQuery: ISelectAutoQuery, options: {
        paging: boolean;
        remote: boolean;
        keywords: string;
        pageSize: number;
        tableNameDb: string;
    }): void;
    /**
     *
     * 对数据进行转换，用于绑定组件的数据结构
     * @private
     * @param {ISelectOptions} item
     * @param {ISelectAutoQuery} autoQuery
     * @returns
     * @memberof HLFormLocalView
     */
    private tranSelectOptions;
    private tranSelectOptionsFromDd;
    private getSelectDataDbBase;
    /**
     * 同步数据到indexdb
     *
     * @private
     * @param {ISelectOptions} item
     * @param {ISyncSelectDataBase['options']} options
     * @memberof HLFormLocalView
     */
    private syncSelectDataDbBase;
    dispatchRequest(name: string, autoQuery: ISelectAutoQuery, options?: {
        pageIndex: number;
        pageSize?: number;
        keyWords?: string;
    }): void;
}
export default class ProFormStore extends StoreBase {
    static meta: IStoreBaseMeta;
    constructor(context: any);
    /**
     *
     * 表单数据模型集合
     * @memberof HLFormStore
     */
    HLFormContainer: IObservableMap<string, ViewModel<HlFormView> & Proxify<HlFormView> & IOtherView>;
    HLFormLocalDataContainer: IObservableMap<string, ViewModel<HLFormLocalView> & Proxify<HLFormLocalView>>;
    /**
     *
     * 添加表单临时性数据
     * @param {string} uid
     * @param {WrappedFormUtils} form
     * @param {*} [InputDataModel]
     * @memberof HLFormStore
     */
    add(uid: string, form: WrappedFormUtils, InputDataModel?: any): void;
    init(uid: string, options: HlFormView): void;
    delete(uid: string): void;
    get(uid: string): ViewModel<HlFormView> & Proxify<HlFormView> & IOtherView;
    /**
     * 添加表单持久化数据
     *
     * @param {string} uid
     * @memberof HLFormStore
     */
    addLocalData(uid: string): void;
    deleteLocalData(uid: string): void;
    getLocalData(uid: string): ViewModel<HLFormLocalView> & Proxify<HLFormLocalView>;
    /**
     * 清空所有收集的组件元素
     *
     * @param {string} uid
     * @memberof HLFormStore
     */
    clearAllElement(uid: string): void;
    /**
     *
     *
     * @param {FormElement} formElementUid  FormElement 组件生成的唯一uid
     * @param {string} formUid 表单UID
     * @param {string} [nextElementName] 下一个组件name
     * @memberof AbstractForm
     */
    nextElement(formElementUid: string, formUid: string, nextElementName?: string): void;
    /**
     * 当表单数据变化同步生效表单store数据
     *
     * @param {string} formUid 表单uid
     * @param {object} formFields 数据源
     * @param {React.Component} parentRef 表单父级组件实例 this
     * @memberof HLFormStore
     */
    updateFormInputData(formUid: string, formFields: object, parentRef?: React.Component): void;
}
export {};
