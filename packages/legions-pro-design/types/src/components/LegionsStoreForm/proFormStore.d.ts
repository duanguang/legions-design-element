import React from 'react';
import LegionsStore from '../LegionsStore';
import { IStoreBaseMeta } from '../LegionsStore/interface';
import { ViewModel } from 'brain-store-utils/types/create-view-model';
import { WrappedFormUtils, IAntdSelectOption } from '../interface/antd';
import { ObservableMap } from 'mobx';
import { IElementList, IErrorView, ISelectAutoQuery, ISelectOptions, IObservableMap, IProFormFields } from './interface';
import { TabsFormView } from './tabsView';
declare type Proxify<T> = {
    [P in keyof T]: T[P];
};
export declare class HlFormView {
    constructor();
    /**
     * 需要进行回车，上下键操作的组件钩子列表(不包含禁用的组件)
     *
     * @memberof HlFormView
     */
    _elementList: IObservableMap<string, IElementList>;
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
    private formfields;
    /** 自定义表单元素配置项 */
    private _customFormFields;
    /** 待执行渲染的组件元素队列
     *
     * 执行完后移出队列
     */
    renderNodeQueue: IObservableMap<string, string>;
    /**
     * 需要进行回车，上下键操作的组件钩子列表keys
     *
     * @private
     * @memberof HlFormView
     */
    private _allElementList;
    /**
     *
     * 所有组件错误信息
     * @memberof HlFormView
     */
    _errorListView: IObservableMap<string, IErrorView[]>;
    get computedAllElementList(): string[];
    /** 表单元素配置项
     * 渲染formItem
     */
    get computedFormFields(): IProFormFields['componentModel'][];
    /** 表单元素配置项
     * 包含自定义render 里面子元素配置项
     */
    get computedAllFormFields(): IProFormFields['componentModel'][];
    /**
     * 表单展示风格 舒适,迷你,紧凑
     *
     * @readonly
     * @memberof HlFormView
     */
    get computedFormSize(): "small" | "table" | "default";
    /** 修改表单尺寸 */
    updateFormSize(size: 'default' | 'small' | 'table'): void;
    /**
     *
     * 收集组件钩子keys
     * @param {string} keys
     * @memberof HlFormView
     */
    _addAllElementKeys(keys: string): void;
    /** 查询表单元素字段配置信息 */
    getFormItemField<T extends IProFormFields['componentModel']>(key: string): {
        value: T;
        type: 'normal' | 'custom';
    };
    /** 移除指定表单选项 */
    removeFormItem(key: string): boolean;
    /** 清空表单配置项 */
    clearFormItem(): void;
    /** 初始化表单配置项元素 */
    _initFormItemField(key: string, value: IProFormFields['componentModel'], type?: 'normal' | 'custom'): void;
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
    formRef: React.Component;
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
    _selectOptions: IObservableMap<string, ISelectOptions[]>;
    _selectView: IObservableMap<string, {
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
    _initControlsSort(sorts: string[]): void;
    _updateControlsSort(sorts: string[]): void;
    setDragSort(sort: boolean): void;
    _initSelectOptions(keys: string, autoQuery: ISelectAutoQuery): void;
    _initSelectView(keys: string, autoQuery: ISelectAutoQuery, options: {
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
        /** 接口请求完成触发 */
        callback?: (value: any) => void;
    }): void;
}
export default class ProFormStore extends LegionsStore.StoreBase {
    static meta: IStoreBaseMeta;
    constructor(context: any);
    /**
     *
     * 表单数据模型集合
     * @memberof HLFormStore
     */
    HLFormContainer: IObservableMap<string, ViewModel<HlFormView> & Proxify<HlFormView> & IOtherView>;
    HLFormLocalDataContainer: IObservableMap<string, ViewModel<HLFormLocalView> & Proxify<HLFormLocalView>>;
    _TabsFormDataMap: IObservableMap<string, ViewModel<TabsFormView> & Proxify<TabsFormView>>;
    /**
     *
     * 添加表单临时性数据
     * @param {string} uid
     * @param {WrappedFormUtils} form
     * @param {*} [InputDataModel]
     * @memberof HLFormStore
     */
    add(uid: string, options: {
        form?: WrappedFormUtils;
        InputDataModel?: any;
        formRef: React.Component;
    }): void;
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
     * @param  formElementUid  FormElement 组件生成的唯一uid
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
    updateFormInputData(formUid: string, formFields: object): void;
    addTabsForm(uid: string): void;
    deleteTabsForm(uid: string): void;
    getTabsForm(uid: string): ViewModel<TabsFormView> & Proxify<TabsFormView>;
}
export {};
