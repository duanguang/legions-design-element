/*
 * @Author: duanguang
 * @Date: 2020-12-29 10:18:01
 * @LastEditTime: 2021-03-08 18:50:13
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreForm/proFormStore.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';

import LegionsStore from '../LegionsStore';
import {IStoreBaseMeta} from '../LegionsStore/interface';
import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel, observablePromise } from 'legions/store-utils';
import { ViewModel } from 'brain-store-utils';
import {
    WrappedFormUtils,
    IAntdRule,
    IAntdSelectOption,
  } from '../interface/antd';
import { computed, extendObservable, runInAction, ObservableMap } from 'mobx';
import LegionsCore from '../LegionsCore';
import { pagingQueryProcessing } from 'legions-lunar';
import { cloneDeep } from 'lodash';
import { IElementList, IErrorView, ISelectAutoQuery, ISelectOptions,ISelectDatabaseDB, ISyncSelectDataBase,IObservableMap, IProFormFields, IProUpdateFormFields } from './interface';
import { SelectDatabaseDB } from '../db';
import LegionsModels from '../LegionsModels';
import { merge } from 'lodash';
import { TabsFormView } from './tabsView';
/* import { DexieUtils } from '../utils/dexie'; */

type Proxify<T> = {
  [P in keyof T]: T[P];
  //[P in keyof T]: Proxy<T[P]>;
};



export class HlFormView {
  constructor() {
    this.formfields.observe((chan) => {
    })
  }
  /**
   * 需要进行回车，上下键操作的组件钩子列表(不包含禁用的组件)
   *
   * @memberof HlFormView
   */
  @observable elementList: IObservableMap<
    string,
    IElementList
  > = observable.map();

  /* @observable addEventListener=false */
  /**
   * 用来存放下一个应该聚焦的组件元素uid值
   *
   * @memberof HlFormView
   */
  @observable focusUid = '';


  /**
   *
   * 是否启用回车或者上下键进行元素切换
   * @memberof HlFormView
   */
  @observable enableEnterSwitch = false;

  @observable private size: 'default' | 'small' | 'table' = 'default';
  @observable private formfields: IObservableMap<
  string,
  IProFormFields['componentModel']
    > = observable.map();
  /** 自定义表单元素配置项 */
  @observable private customFormFields: IObservableMap<
  string,
  IProFormFields['componentModel']
> = observable.map();
  
  /** 待执行渲染的组件元素队列
   * 
   * 执行完后移出队列
   */
  @observable renderNodeQueue:IObservableMap<
  string,
  string
> = observable.map();
  /**
   * 需要进行回车，上下键操作的组件钩子列表keys
   *
   * @private
   * @memberof HlFormView
   */
  @observable private allElementList = [];
  /**
   *
   * 错误信息组件节点集合
   * @memberof HlFormView
   */
  @observable errorReactNodeList: IObservableMap<
    string,
    ViewModel<ErrorViewModel> & Proxify<ErrorViewModel>
  > = observable.map();

  /**
   *
   * 所有组件错误信息
   * @memberof HlFormView
   */
  @observable errorListView: IObservableMap<
    string,
    IErrorView[]
  > = observable.map();

  /**
   * 错误信息组件节点集合 只读
   *
   * @returns
   * @memberof HlFormView
   */
  @computed get computedErrorReactNodeList(): HlFormView['errorReactNodeList'] {
    return this.errorReactNodeList;
  }

  @computed get computedAllElementList(): string[] {
    return this.allElementList;
  }

  /** 表单元素配置项
   * 渲染formItem
   */
  @computed get computedFormFields():IProFormFields['componentModel'][] {
      const value: IProFormFields['componentModel'][] = [];
      for (let item of this.formfields.values()) {
        value.push(item);
      }
      return value
  }
  /** 表单元素配置项
   * 包含自定义render 里面子元素配置项
   */
  @computed get computedAllFormFields():IProFormFields['componentModel'][] {
      const value: IProFormFields['componentModel'][] = [];
      for (let item of this.formfields.values()) {
        value.push(item);
      }
      for (let item of this.customFormFields.values()) {
        value.push(item);
      }
      return value
  }
  /**
   * 获取全部错误信息
   *
   * @readonly
   * @memberof HlFormView
   */
  @computed get computedErrorListView() {
    const keys = this.errorListView.keys();
    const data: Array<IErrorView> = [];
    for (let item of keys) {
      this.errorListView.get(item).map(entity => {
        data.push(entity);
      });
    }
    return data;
  }

  /**
   * 表单展示风格 舒适,迷你,紧凑
   *
   * @readonly
   * @memberof HlFormView
   */
  @computed get computedFormSize() {
    return this.size;
  }


  /** 修改表单尺寸 */
  @action updateFormSize(size: 'default' | 'small' | 'table') {
    this.size = size;
    this.computedAllFormFields.map((item) => {
      const name = item.iAntdProps.name
      if (!this.renderNodeQueue.has(name)) {
         this.renderNodeQueue.set(name,name)
      }
    })
  }
  /**
   *  添加错误信息和组件元素的关联关系，可通过组件name查出错误信息组件UID
   *
   * @param {string} componentCode 组件元素名称 对应iAntdProps.name值 唯一，不然会出现问题
   * @param {string} errorUid // 错误信息组件生成的唯一uid
   * @memberof HlFormView
   */
  @action collectErrorReactNode(componentCode: string, errorUid: string) {
    let errorViewModel = new ErrorViewModel();
    errorViewModel.uid = errorUid;
    this.errorReactNodeList.set(
      componentCode,
      observableViewModel<ErrorViewModel>(errorViewModel)
    );
  }
  /**
   * 设置错误信息，通过错误信息组件UID作为数据的主键
   *
   * @param {string} componentCode 组件元素名称 对应iAntdProps.name值 唯一，不然会出现问题
   * @param {string} [errorListView] 错误信息
   * @memberof HlFormView
   */
  @action setErrorErrorReactNodeList(
    componentCode: string,
    errorListView: Array<IErrorView>
  ) {
    if (this.computedErrorReactNodeList.has(componentCode)) {
      /*  const canBeSubmit = errorListView.filter((item) => item.type === 'canBeSubmit')
             const has = canBeSubmit.every((item) => item.status === 1) */
      /* if (!has) {
             this.computedErrorReactNodeList.get(componentCode).validateStatus ='error'
         } */
      errorListView.forEach(item => {
        if (item.status !== 1) {
          this.computedErrorReactNodeList.get(componentCode).validateStatus =
            'error';
        }
      });
      this.errorListView.set(
        this.computedErrorReactNodeList.get(componentCode).uid,
        errorListView
      );
    }
  }

  /**
   *
   * 忽略错误信息
   * @param {string} componentCode 组件元素name
   * @param {number} id 组件元素唯一id 对应errorListView的key
   * @memberof HlFormView
   */
  @action handleIgnore(componentCode: string, id: number) {
    if (this.errorReactNodeList.get(componentCode)) {
      const uid = this.errorReactNodeList.get(componentCode).uid;
      if (this.errorListView.get(uid)) {
        const canBeSubmit = this.errorListView
          .get(uid)
          .filter(item => item.type === 'canBeSubmit' && item.key === id);
        const AllcanBeSubmit = this.errorListView
          .get(uid)
          .every(item => item.type === 'canBeSubmit');
        const entity = canBeSubmit.find(
          items => items.componentCode === componentCode
        );
        const view = this.computedErrorReactNodeList.get(componentCode);

        if (entity && entity.status === 2) {
          entity.status = 1;
          const has = this.errorListView
            .get(uid)
            .every(item => item.status === 1);
          if (AllcanBeSubmit && has) {
            view.validateStatus = '';
          } else {
            view.validateStatus = 'error';
          }
        }
      }
    }
  }
  /**
   *
   * 收集组件钩子keys
   * @param {string} keys
   * @memberof HlFormView
   */
  @action addAllElementKeys(keys: string) {
    const index = this.allElementList.findIndex(item => item === keys);
    if (index < 0) {
      this.allElementList.push(keys);
      this.allElementList = this.allElementList.slice();
    }
  }
  /** 查询表单元素字段配置信息 */
  @action getFormItemField<T extends IProFormFields['componentModel']>(key: string):{value:T,type:'normal' | 'custom'} {
    if (this.formfields.has(key)) {
      return {
        //@ts-ignore
        value: this.formfields.get(key),
        type:'normal',
      };   
    }
    else if (this.customFormFields.has(key)) {
      return {
        //@ts-ignore
        value: this.customFormFields.get(key),
        type:'custom',
      };
    }
    return null;
  }
  /** 初始化表单配置项元素 */
  @action _initFormItemField(key: string,value: IProFormFields['componentModel'],type: 'normal' | 'custom'='normal') {
    if (type === 'normal') {
      if (!this.formfields.has(key)) {
        this.formfields.set(key,value);
      }
    }
    else if (type === 'custom') {
      if (!this.customFormFields.has(key)) {
        this.customFormFields.set(key,value);
      }
    }
  }
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
  formRef:React.Component
}
export class ErrorViewModel {
  @observable uid: string = '';

  /**
   *
   * 样式名称
   * @memberof ErrorViewModel
   */
  @observable validateStatus: '' | 'error' = '';
}


export class HLFormLocalView {
  @observable selectOptions: IObservableMap<
    string,
    ISelectOptions[]
  > = observable.map();

  @observable selectView: IObservableMap<
    string,
    {
      paging: boolean;
      remote: boolean;
      autoQuery: ISelectAutoQuery;
      pageIndex: number;
      pageSize: number;
      keywords: string;
      tableNameDb: string;
      currValue: { total: number; data: ObservableMap<IAntdSelectOption[]> };
    }
  > = observable.map();

  /**
   * 是否开启拖拽排序
   *
   * @memberof HLFormLocalView
   */
  @observable private _isDragSort = false;

  @observable private _controlsSort: string[] = [];
  /**
   * 当前表单元素拖拽排序状态
   *
   * @readonly
   * @memberof HLFormLocalView
   */
  @computed get dragSortState() {
    return this._isDragSort;
  }
  @computed get computedControlsSort() {
    return this._controlsSort;
  }
  @action updateControlsSort(sorts: string[]) {
    this._controlsSort = sorts;
  }
  @action setDragSort(sort: boolean) {
    this._isDragSort = sort;
  }
  @action initSelectOptions(keys: string, autoQuery: ISelectAutoQuery) {
    this.selectOptions.set(keys, [
      {
        keywords: '',
        // @ts-ignore
        obData: observable.map<
          observablePromise.PramsResult<any>
        >(),
      },
    ]);
  }
  @action initSelectView(
    keys: string,
    autoQuery: ISelectAutoQuery,
    options: {
      paging: boolean;
      remote: boolean;
      keywords: string;
      pageSize: number;
      tableNameDb: string;
    }
  ) {
    this.selectView.set(keys, {
      paging: options.paging,
      remote: options.remote,
      autoQuery: autoQuery,
      pageIndex: 1,
      pageSize: options.pageSize || 30,
      keywords: options.keywords || '',
      tableNameDb: options.tableNameDb,
      currValue: { total: 0, data: observable.map() },
    });
  }

  /**
   *
   * 对数据进行转换，用于绑定组件的数据结构
   * @private
   * @param {ISelectOptions} item
   * @param {ISelectAutoQuery} autoQuery
   * @returns
   * @memberof HLFormLocalView
   */
  private tranSelectOptions(item: ISelectOptions, autoQuery: ISelectAutoQuery) {
    let oldList = new Map();
    let total = 0;
    for (let i = 1; i <= item.obData.size; i++) {
       //@ts-ignore
      const data = item.obData.get(i.toString());
      if (data && data.isResolved) {
        const tranObj = autoQuery.transform(data);
        oldList.set(i.toString(), tranObj.data);
        total = tranObj.total;
      }
    }
    return {
      total,
      // @ts-ignore
      data: oldList,
    };
  }
  private tranSelectOptionsFromDd(value: ISelectDatabaseDB[]) {
    if (value && Array.isArray(value) && value.length) {
      let oldList = new Map();
      let total = 0;
      value.map(item => {
        oldList.set(item.pageIndex.toString(), JSON.parse(item.value));
        total = item.total;
      });
      return {
        total,
        // @ts-ignore
        data: oldList,
      };
    }
    return null;
  }
  private getSelectDataDbBase(options: ISyncSelectDataBase['query']) {
    let dbBase: SelectDatabaseDB = null;
    const name = options.name;
    SelectDatabaseDB.initTable(options.tableNameDb).then(() => {
      dbBase = new SelectDatabaseDB(options.tableNameDb);
      if (dbBase && dbBase.selectItem) {
        dbBase.selectItem
          .where({
            keywords: options.keyWords,
            modulesKeys: `${options.tableNameDb}${name}`,
          })
          .toArray()
          .then(result => {
            options.callback && options.callback(result);
          });
      }
    });
  }
  /**
   * 同步数据到indexdb
   *
   * @private
   * @param {ISelectOptions} item
   * @param {ISyncSelectDataBase['options']} options
   * @memberof HLFormLocalView
   */
  private syncSelectDataDbBase(
    item: ISelectOptions,
    options: ISyncSelectDataBase['options']
  ) {
    let dbBase: SelectDatabaseDB = null;
    const name = options.name;
    SelectDatabaseDB.initTable(options.tableNameDb).then(() => {
      dbBase = new SelectDatabaseDB(options.tableNameDb);
      if (dbBase && dbBase.selectItem) {
        for (let i = 1; i <= item.obData.size; i++) {
          //@ts-ignore
          const data = item.obData.get(i.toString());
          if (data && data.isResolved) {
            const tranObj = options.autoQuery.transform(data);
            dbBase.selectItem
              .get({
                keywords: options.keyWords,
                modulesKeys: `${options.tableNameDb}${name}`,
                pageIndex: i,
              })
              .then(result => {
                if (result) {
                  dbBase.selectItem.update(result.id, {
                    ...result,
                    ...{
                      total: tranObj.total,
                      value: JSON.stringify(tranObj.data),
                    },
                  });
                } else {
                  dbBase.selectItem.add({
                    modulesKeys: `${options.tableNameDb}${name}`,
                    keywords: options.keyWords,
                    pageIndex: i,
                    value: JSON.stringify(tranObj.data),
                    total: options.total,
                  });
                }
              });
          }
        }
      }
    });
  }
  @action dispatchRequest(
    name: string,
    autoQuery: ISelectAutoQuery,
    options: {
      pageIndex: number;
      pageSize?: number;
      keyWords?: string;
      /** 接口请求完成触发 */
      callback?: (value:any) => void;
    } = { pageIndex: 1, pageSize: 30 }
  ) {
    if (autoQuery) {
     /*  const server = new HttpService({ token: autoQuery.token }); */
      const server = new LegionsCore.LegionsFetch();
      const keyWords = options.keyWords || '';
      
      //@ts-ignore
      const apiServer = () => {
        const { pageIndex, pageSize, keyWords = '', ...props } = options;
        let params = cloneDeep(
          autoQuery.params(options.pageIndex, options.pageSize, keyWords, props)
        );
        delete params.pageIndex;
        delete params.pageSize;
        delete params.defaultKeyWords;
        if (autoQuery.requestBeforeTransformParams) {
          params = autoQuery.requestBeforeTransformParams({
            ...params,
            pageIndex: options.pageIndex,
            pageSize: options.pageSize,
          });
        }
        let model = {
          onBeforTranform: (value) => {
            options.callback && options.callback(value);
            return {
              responseData: value,
              mappingEntity:autoQuery.mappingEntity,
            }
          },
        }
        let headers = {};
        if (autoQuery.token) {
            headers={'api-cookie': autoQuery.token}
        }
        if (autoQuery.method === 'post') {
          return server.post<any, any>({
            url: autoQuery.ApiUrl,
            parameter: params,
            headers: { ...autoQuery.options,...headers },
            model:LegionsModels.SelectKeyValue,
              ...model,
          });
        } else if (autoQuery.method === 'get') {
          return server.get<any, any>({
            url: autoQuery.ApiUrl,
            parameter: params,
            headers: { ...autoQuery.options,...headers },
            model:LegionsModels.SelectKeyValue,
            ...model,
          });
        }
      };
      const data = this.selectOptions.get(name); // 查询指定下拉组件数据
      const currValue = this.selectView.get(name);
      if (data) {
        // 如果数据存在
        let item = data.find(entity => entity.keywords === keyWords); // 查询指定下拉组件指定关键词数据
        if (!item) {
          /** 如果输入关键词不存在搜索数据，则往map初始化一个此关键词的搜索数据 */
          data.push({
            keywords: keyWords,
            // @ts-ignore
            obData: observable.map<
              observablePromise.PramsResult<any>
            >(),
          });
          this.selectOptions.set(name, data);
          item = data.find(entity => entity.keywords === keyWords);
        }
        
        if (item) {
           //@ts-ignore
          if (item.obData.has(options.pageIndex.toString())) {
            /** 如果输入关键词存在历史搜索数据，先调出历史数据加载，提升加载速度
             * 加载完历史搜索记录，再去请求数据更新替换历史数据，用户界面无感知刷新数据
             */
            if (currValue) {
              // @ts-ignore
              // currValue.currValue= this.tranSelectOptions(item,autoQuery)
              const hisDbData = this.tranSelectOptions(item, autoQuery);
              for (let i = 1; i <= hisDbData.data.size; i++) {
                currValue.currValue.data.set(
                   //@ts-ignore
                  i.toString(),
                  hisDbData.data.get(i.toString())
                );
              }
              currValue.currValue.total = hisDbData.total;
            }
          } else {
            if (currValue) {
              this.getSelectDataDbBase({
                tableNameDb: currValue.tableNameDb,
                name,
                pageIndex: options.pageIndex,
                keyWords,
                callback: value => {
                  if (value && Array.isArray(value) && value.length) {
                    const dbData = this.tranSelectOptionsFromDd(value);
                    if (dbData) {
                      runInAction(() => {
                        const newCurrValue = this.selectView.get(name);
                        for (let i = 1; i <= dbData.data.size; i++) {
                           //@ts-ignore
                          if (!newCurrValue.currValue.data.has(i.toString())) {
                            newCurrValue.currValue.data.set(
                               //@ts-ignore
                              i.toString(),
                              dbData.data.get(i.toString())
                            );
                          }
                        }
                        newCurrValue.currValue.total = dbData.total;
                      });
                    }
                  }
                },
              });
            }
          }
         
          if (currValue) {
            currValue.pageIndex = options.pageIndex;
            currValue.pageSize = options.pageSize;
            currValue.keywords = options.keyWords;
          }
          
          /** 输入关键词有无历史搜索数据，都会去请求接口，存在历史数据线调取历史数据 */

          let store = extendObservable({
            keyWords: keyWords,
            // @ts-ignore
            data: observable.map<
              observablePromise.PramsResult<any>
            >(),
          },{});
          for (let i = 1; i <= item.obData.size; i++) {
            /**
             * 调出输入关键词历史搜索数据
             */
             //@ts-ignore
            const newData = item.obData.get(i.toString());
            if (newData && newData.isResolved) {
               //@ts-ignore
              store.data.set(i.toString(), newData);
            }
          }
          
          store = pagingQueryProcessing<any>({
            store: store,
            servicePromise: apiServer,
            keyWords: keyWords,
            mapItemKeys: options.pageIndex.toString(),
            callback: value => {
              item.obData.set(
                 //@ts-ignore
                options.pageIndex.toString(),
                 //@ts-ignore
                value.data.get(options.pageIndex.toString())
              );
              item.keywords = keyWords;
              if (autoQuery.transform) {
                if (currValue) {
                  const newsCurrValue = this.tranSelectOptions(item, autoQuery);
                  for (let i = 1; i <= newsCurrValue.data.size; i++) {
                    currValue.currValue.data.set(
                       //@ts-ignore
                      i.toString(),
                      newsCurrValue.data.get(i.toString())
                    );
                  }
                  currValue.currValue.total = newsCurrValue.total;
                  this.syncSelectDataDbBase(item, {
                    autoQuery,
                    keyWords,
                    tableNameDb: currValue.tableNameDb,
                    name,
                    total: currValue.currValue.total,
                  });
                }
              }
            },
          });
        } else {
        }
      }
    }
  }
}

@StoreModules
export default class ProFormStore extends LegionsStore.StoreBase {
  static meta: IStoreBaseMeta = {
    ...LegionsStore.StoreBase.meta,
  };
  constructor(context) {
    super(context);
  }

  /**
   *
   * 表单数据模型集合
   * @memberof HLFormStore
   */
  @observable HLFormContainer: IObservableMap<
    string,
    ViewModel<HlFormView> & Proxify<HlFormView> & IOtherView
  > = observable.map();
  @observable HLFormLocalDataContainer: IObservableMap<
    string,
    ViewModel<HLFormLocalView> & Proxify<HLFormLocalView>
  > = observable.map();

  @observable _TabsFormDataMap:IObservableMap<
  string,
  ViewModel<TabsFormView> & Proxify<TabsFormView>
>= observable.map();

  /**
   *
   * 添加表单临时性数据
   * @param {string} uid
   * @param {WrappedFormUtils} form
   * @param {*} [InputDataModel]
   * @memberof HLFormStore
   */
  @action add(uid: string,options:{
    form?: WrappedFormUtils,InputDataModel?: any,
    formRef:React.Component
  }) {
    let otherView: IOtherView = { form:options.form, uid,formRef:options.formRef };
    let formView = new HlFormView();
    if (options.InputDataModel && typeof options.InputDataModel === 'function') {
      /* otherView = Object.assign(otherView,{ InputDataModel: new InputDataModel(),InputDataModelClass: InputDataModel }) */
      otherView = Object.assign(otherView, {
        InputDataModelClass: options.InputDataModel,
      });
      /* formView = Object.assign(formView,{ InputDataModel: new InputDataModel() })
            formView = observable(formView); */
      formView = extendObservable(formView, {
        InputDataModel: new options.InputDataModel(),
      });
    }
    this.HLFormContainer.set(
      uid,
      Object.assign(observableViewModel<HlFormView>(formView), otherView)
    );
  }
  @action init(uid: string, options: HlFormView) {
    const store = this.HLFormContainer.get(uid);
  }
  @action delete(uid: string) {
    this.HLFormContainer.delete(uid);
  }
  @action get(uid: string) {
    return this.HLFormContainer.get(uid);
  }
  /**
   * 添加表单持久化数据
   *
   * @param {string} uid
   * @memberof HLFormStore
   */
  @action addLocalData(uid: string) {
    let formView = new HLFormLocalView();
    /* if (InputDataModel && typeof InputDataModel === 'function') {
            otherView = Object.assign(otherView,{InputDataModelClass: InputDataModel })
            formView = extendObservable(formView,{
                InputDataModel: new InputDataModel()
            })
        }
        this.HLFormLocalDataContainer.set(uid, Object.assign(observableViewModel<HLFormLocalView>(formView), otherView)) */
    this.HLFormLocalDataContainer.set(
      uid,
      observableViewModel<HLFormLocalView>(formView)
    );
  }
  @action deleteLocalData(uid: string) {
    this.HLFormLocalDataContainer.delete(uid);
  }
  @action getLocalData(uid: string) {
    return this.HLFormLocalDataContainer.get(uid);
  }
  /**
   * 清空所有收集的组件元素
   *
   * @param {string} uid
   * @memberof HLFormStore
   */
  @action clearAllElement(uid: string) {
    this.HLFormContainer.get(uid).elementList.clear();
  }
  /**
   *
   *
   * @param  formElementUid  FormElement 组件生成的唯一uid
   * @param {string} formUid 表单UID
   * @param {string} [nextElementName] 下一个组件name
   * @memberof AbstractForm
   */
  nextElement(
    formElementUid: string,
    formUid: string,
    nextElementName?: string
  ) {
    const store = this.get(formUid);
    if (store && store.enableEnterSwitch) {
      /*  const elementListKeys = store.elementList.keys() */
      const elementListKeys: string[] = [];
      for (let item of store.elementList.keys()) {
        elementListKeys.push(item);
      }
      /**  解决日期组件回车被阻止冒泡，导致回车键没法切换到下一个元素*/

      elementListKeys.map((item, index) => {
        if (!nextElementName) {
          /**  当没有指定时，默认选择下一个*/
          if (formElementUid === item) {
            let nextUid = index + 1;
            if (elementListKeys.length <= nextUid) {
              /**  如果当前是最后一个，则下一个默认回到数组第0位*/
              nextUid = 0;
            }

            const nextElementKey = elementListKeys[nextUid];
            const nextElement = store.elementList.get(nextElementKey);
            const result = nextElement.element instanceof HTMLCollection;
            if (nextElement && result && nextElement.element.length) {
              if (
                nextElement.elementTabindex &&
                nextElement.elementTabindex instanceof HTMLCollection &&
                nextElement.elementTabindex.length
              ) {
                // @ts-ignore
                nextElement.elementTabindex[0].focus &&
                  //@ts-ignore
                  nextElement.elementTabindex[0].focus(); //主要用于解决select 框 聚焦后边框线无法高亮
              }
              store.focusUid = nextElementKey;
              nextElement.element[0].focus && nextElement.element[0].focus();
            }
          }
        } else {
          const el = store.elementList.get(item);
          if (el && el.elementKey === nextElementName) {
            const result = el.element instanceof HTMLCollection;
            if (result && el.element.length) {
              store.focusUid = item;
              el.element[0].focus && el.element[0].focus();
            }
          }
        }
      });
    }
  }

  /**
   * 当表单数据变化同步生效表单store数据
   *
   * @param {string} formUid 表单uid
   * @param {object} formFields 数据源
   * @param {React.Component} parentRef 表单父级组件实例 this
   * @memberof HLFormStore
   */
  @action updateFormInputData(
    formUid: string,
    formFields: object,
  ) {
    const view = this.HLFormContainer.get(formUid);
    if (view && typeof view.InputDataModelClass === 'function') {
      // @ts-ignore
      view.InputDataModel = new view.InputDataModelClass({
        ...view.InputDataModel,
        ...formFields,
      });
      Object.keys(formFields).map((key) => {
        if (!view.renderNodeQueue.has(key)) {
          view.renderNodeQueue.set(key,key)
        }
      })
    }
  }

  @action addTabsForm(uid: string) {
    let formView = new TabsFormView(uid);
    this._TabsFormDataMap.set(
      uid,
      observableViewModel<TabsFormView>(formView)
    );
  }
  @action deleteTabsForm(uid: string) {
    this._TabsFormDataMap.delete(uid);
  }
  @action getTabsForm(uid: string) {
    return this._TabsFormDataMap.get(uid);
  }
}
