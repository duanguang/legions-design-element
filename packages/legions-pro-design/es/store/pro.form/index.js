/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import { StoreBase } from '../index';
import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel } from 'legions/store-utils';
import { computed, runInAction, extendObservable } from 'mobx';
import { LegionsFetch } from '../../core';
import { pagingQueryProcessing } from 'legions-lunar';
import { cloneDeep } from 'lodash';
import { SelectDatabaseDB } from '../../db';
import { SelectKeyValue } from '../../models';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

var HlFormView = /** @class */ (function () {
    function HlFormView() {
        /**
         * 需要进行回车，上下键操作的组件钩子列表(不包含禁用的组件)
         *
         * @memberof HlFormView
         */
        this.elementList = observable.map();
        /* @observable addEventListener=false */
        /**
         * 用来存放下一个应该聚焦的组件元素uid值
         *
         * @memberof HlFormView
         */
        this.focusUid = '';
        /**
         *
         * 是否启用回车或者上下键进行元素切换
         * @memberof HlFormView
         */
        this.enableEnterSwitch = false;
        this.size = 'default';
        /**
         * 收集到节点数量，私有变量，主要用于当前后两次收集到节点数量不一致时，这是可以强制清空队列，重新收集，保证收集节点顺序
         *
         * @memberof HlFormView
         */
        this.nodeCount = 0;
        /**
         * 表单元素集合
         *
         * @type {any[]}
         * @memberof HlFormView
         */
        this.controls = [];
        /**
         * 需要进行回车，上下键操作的组件钩子列表keys
         *
         * @private
         * @memberof HlFormView
         */
        this.allElementList = [];
        /**
         *
         * 错误信息组件节点集合
         * @memberof HlFormView
         */
        this.errorReactNodeList = observable.map();
        /**
         *
         * 所有组件错误信息
         * @memberof HlFormView
         */
        this.errorListView = observable.map();
        /**
         *
         * 表单数据状态
         * @private
         * @type {(ObservableMap<IFormState>| ObservableMap<string,IFormState>)}
         * @memberof HlFormView
         */
        this.formState = observable.map();
    }
    Object.defineProperty(HlFormView.prototype, "computedErrorReactNodeList", {
        /**
         * 错误信息组件节点集合 只读
         *
         * @returns
         * @memberof HlFormView
         */
        get: function () {
            return this.errorReactNodeList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlFormView.prototype, "computedAllElementList", {
        get: function () {
            return this.allElementList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlFormView.prototype, "computedErrorListView", {
        /**
         * 获取全部错误信息
         *
         * @readonly
         * @memberof HlFormView
         */
        get: function () {
            var e_1, _a;
            var keys = this.errorListView.keys();
            var data = [];
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var item = keys_1_1.value;
                    this.errorListView.get(item).map(function (entity) {
                        data.push(entity);
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            /* keys.map((item) => {
                    this.errorListView.get(item).map((entity) => {
                        data.push(entity)
                    })
                }) */
            return data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlFormView.prototype, "styleSize", {
        /**
         * 表单展示风格 舒适,迷你,紧凑
         *
         * @readonly
         * @memberof HlFormView
         */
        get: function () {
            return this.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlFormView.prototype, "computedFormState", {
        /**
         *
         * 表单状态数据
         * @readonly
         * @memberof HlFormView
         */
        get: function () {
            return this.formState;
        },
        enumerable: false,
        configurable: true
    });
    HlFormView.prototype.updateStyleSize = function (size) {
        this.size = size;
    };
    /**
     *  添加错误信息和组件元素的关联关系，可通过组件name查出错误信息组件UID
     *
     * @param {string} componentCode 组件元素名称 对应iAntdProps.name值 唯一，不然会出现问题
     * @param {string} errorUid // 错误信息组件生成的唯一uid
     * @memberof HlFormView
     */
    HlFormView.prototype.collectErrorReactNode = function (componentCode, errorUid) {
        var errorViewModel = new ErrorViewModel();
        errorViewModel.uid = errorUid;
        this.errorReactNodeList.set(componentCode, observableViewModel(errorViewModel));
    };
    /**
     * 设置错误信息，通过错误信息组件UID作为数据的主键
     *
     * @param {string} componentCode 组件元素名称 对应iAntdProps.name值 唯一，不然会出现问题
     * @param {string} [errorListView] 错误信息
     * @memberof HlFormView
     */
    HlFormView.prototype.setErrorErrorReactNodeList = function (componentCode, errorListView) {
        var _this = this;
        if (this.computedErrorReactNodeList.has(componentCode)) {
            /*  const canBeSubmit = errorListView.filter((item) => item.type === 'canBeSubmit')
                   const has = canBeSubmit.every((item) => item.status === 1) */
            /* if (!has) {
                   this.computedErrorReactNodeList.get(componentCode).validateStatus ='error'
               } */
            errorListView.forEach(function (item) {
                if (item.status !== 1) {
                    _this.computedErrorReactNodeList.get(componentCode).validateStatus =
                        'error';
                }
            });
            this.errorListView.set(this.computedErrorReactNodeList.get(componentCode).uid, errorListView);
        }
    };
    /**
     *
     * 忽略错误信息
     * @param {string} componentCode 组件元素name
     * @param {number} id 组件元素唯一id 对应errorListView的key
     * @memberof HlFormView
     */
    HlFormView.prototype.handleIgnore = function (componentCode, id) {
        if (this.errorReactNodeList.get(componentCode)) {
            var uid = this.errorReactNodeList.get(componentCode).uid;
            if (this.errorListView.get(uid)) {
                var canBeSubmit = this.errorListView
                    .get(uid)
                    .filter(function (item) { return item.type === 'canBeSubmit' && item.key === id; });
                var AllcanBeSubmit = this.errorListView
                    .get(uid)
                    .every(function (item) { return item.type === 'canBeSubmit'; });
                var entity = canBeSubmit.find(function (items) { return items.componentCode === componentCode; });
                var view = this.computedErrorReactNodeList.get(componentCode);
                if (entity && entity.status === 2) {
                    entity.status = 1;
                    var has = this.errorListView
                        .get(uid)
                        .every(function (item) { return item.status === 1; });
                    if (AllcanBeSubmit && has) {
                        view.validateStatus = '';
                    }
                    else {
                        view.validateStatus = 'error';
                    }
                }
            }
        }
    };
    /**
     *
     * 收集组件钩子keys
     * @param {string} keys
     * @memberof HlFormView
     */
    HlFormView.prototype.addAllElementKeys = function (keys) {
        var index = this.allElementList.findIndex(function (item) { return item === keys; });
        if (index < 0) {
            this.allElementList.push(keys);
            this.allElementList = this.allElementList.slice();
        }
    };
    /**
     * 初始化表单组件数据，组件内部方法，请勿调用
     *
     * @param {string} name
     * @memberof HlFormView
     */
    HlFormView.prototype.initFormState = function (name, defaultValue) {
        if (!this.formState.has(name)) {
            var value = {
                visible: true,
                display: true,
                disabled: false,
            };
            if (defaultValue) {
                value = __assign(__assign({}, value), defaultValue);
            }
            this.formState.set(name, value);
        }
    };
    /**
     *
     * 设置表单组件状态
     * @param {string} name
     * @param {IFormState} state
     * @memberof HlFormView
     */
    HlFormView.prototype.setFormState = function (name, state) {
        if (this.formState.has(name)) {
            this.formState.set(name, Object.assign(this.formState.get(name), state));
        }
        else {
            var defaultObject = {
                visible: true,
                display: true,
                disabled: false,
            };
            this.formState.set(name, Object.assign(defaultObject, state));
        }
    };
    /**
     *
     * 设置表单组件状态
     * @param {string} name
     * @param {IFormState} state
     * @memberof HlFormView
     */
    HlFormView.prototype.getFormState = function (name) {
        if (this.formState.has(name)) {
            return this.formState.get(name);
        }
        else {
            return null;
        }
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "elementList", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "focusUid", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "enableEnterSwitch", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], HlFormView.prototype, "size", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "nodeCount", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], HlFormView.prototype, "controls", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "allElementList", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "errorReactNodeList", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "errorListView", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "formState", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "computedErrorReactNodeList", null);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "computedAllElementList", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "computedErrorListView", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "styleSize", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "computedFormState", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "updateStyleSize", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "collectErrorReactNode", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Array]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "setErrorErrorReactNodeList", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "handleIgnore", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "addAllElementKeys", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "initFormState", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "setFormState", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Object)
    ], HlFormView.prototype, "getFormState", null);
    return HlFormView;
}());
var ErrorViewModel = /** @class */ (function () {
    function ErrorViewModel() {
        this.uid = '';
        /**
         *
         * 样式名称
         * @memberof ErrorViewModel
         */
        this.validateStatus = '';
    }
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ErrorViewModel.prototype, "uid", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ErrorViewModel.prototype, "validateStatus", void 0);
    return ErrorViewModel;
}());
var HLFormLocalView = /** @class */ (function () {
    function HLFormLocalView() {
        this.selectOptions = observable.map();
        this.selectView = observable.map();
        /**
         * 是否开启拖拽排序
         *
         * @memberof HLFormLocalView
         */
        this._isDragSort = false;
        this._controlsSort = [];
    }
    Object.defineProperty(HLFormLocalView.prototype, "dragSortState", {
        /**
         * 当前表单元素拖拽排序状态
         *
         * @readonly
         * @memberof HLFormLocalView
         */
        get: function () {
            return this._isDragSort;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HLFormLocalView.prototype, "computedControlsSort", {
        get: function () {
            return this._controlsSort;
        },
        enumerable: false,
        configurable: true
    });
    HLFormLocalView.prototype.updateControlsSort = function (sorts) {
        this._controlsSort = sorts;
    };
    HLFormLocalView.prototype.setDragSort = function (sort) {
        this._isDragSort = sort;
    };
    HLFormLocalView.prototype.initSelectOptions = function (keys, autoQuery) {
        this.selectOptions.set(keys, [
            {
                keywords: '',
                // @ts-ignore
                obData: observable.map(),
            },
        ]);
    };
    HLFormLocalView.prototype.initSelectView = function (keys, autoQuery, options) {
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
    };
    /**
     *
     * 对数据进行转换，用于绑定组件的数据结构
     * @private
     * @param {ISelectOptions} item
     * @param {ISelectAutoQuery} autoQuery
     * @returns
     * @memberof HLFormLocalView
     */
    HLFormLocalView.prototype.tranSelectOptions = function (item, autoQuery) {
        var oldList = new Map();
        var total = 0;
        for (var i = 1; i <= item.obData.size; i++) {
            //@ts-ignore
            var data = item.obData.get(i.toString());
            if (data && data.isResolved) {
                var tranObj = autoQuery.transform(data);
                oldList.set(i.toString(), tranObj.data);
                total = tranObj.total;
            }
        }
        return {
            total: total,
            // @ts-ignore
            data: oldList,
        };
    };
    HLFormLocalView.prototype.tranSelectOptionsFromDd = function (value) {
        if (value && Array.isArray(value) && value.length) {
            var oldList_1 = new Map();
            var total_1 = 0;
            value.map(function (item) {
                oldList_1.set(item.pageIndex.toString(), JSON.parse(item.value));
                total_1 = item.total;
            });
            return {
                total: total_1,
                // @ts-ignore
                data: oldList_1,
            };
        }
        return null;
    };
    HLFormLocalView.prototype.getSelectDataDbBase = function (options) {
        var dbBase = null;
        var name = options.name;
        SelectDatabaseDB.initTable(options.tableNameDb).then(function () {
            dbBase = new SelectDatabaseDB(options.tableNameDb);
            if (dbBase && dbBase.selectItem) {
                dbBase.selectItem
                    .where({
                    keywords: options.keyWords,
                    modulesKeys: "" + options.tableNameDb + name,
                })
                    .toArray()
                    .then(function (result) {
                    options.callback && options.callback(result);
                });
            }
        });
    };
    /**
     * 同步数据到indexdb
     *
     * @private
     * @param {ISelectOptions} item
     * @param {ISyncSelectDataBase['options']} options
     * @memberof HLFormLocalView
     */
    HLFormLocalView.prototype.syncSelectDataDbBase = function (item, options) {
        var dbBase = null;
        var name = options.name;
        SelectDatabaseDB.initTable(options.tableNameDb).then(function () {
            dbBase = new SelectDatabaseDB(options.tableNameDb);
            if (dbBase && dbBase.selectItem) {
                var _loop_1 = function (i) {
                    //@ts-ignore
                    var data = item.obData.get(i.toString());
                    if (data && data.isResolved) {
                        var tranObj_1 = options.autoQuery.transform(data);
                        dbBase.selectItem
                            .get({
                            keywords: options.keyWords,
                            modulesKeys: "" + options.tableNameDb + name,
                            pageIndex: i,
                        })
                            .then(function (result) {
                            if (result) {
                                dbBase.selectItem.update(result.id, __assign(__assign({}, result), {
                                    total: tranObj_1.total,
                                    value: JSON.stringify(tranObj_1.data),
                                }));
                            }
                            else {
                                dbBase.selectItem.add({
                                    modulesKeys: "" + options.tableNameDb + name,
                                    keywords: options.keyWords,
                                    pageIndex: i,
                                    value: JSON.stringify(tranObj_1.data),
                                    total: options.total,
                                });
                            }
                        });
                    }
                };
                for (var i = 1; i <= item.obData.size; i++) {
                    _loop_1(i);
                }
            }
        });
    };
    HLFormLocalView.prototype.dispatchRequest = function (name, autoQuery, options) {
        var _this = this;
        if (options === void 0) { options = { pageIndex: 1, pageSize: 30 }; }
        if (autoQuery) {
            /*  const server = new HttpService({ token: autoQuery.token }); */
            var server_1 = new LegionsFetch();
            var keyWords_1 = options.keyWords || '';
            //@ts-ignore
            var apiServer = function () {
                var pageIndex = options.pageIndex, pageSize = options.pageSize, _a = options.keyWords, keyWords = _a === void 0 ? '' : _a, props = __rest(options, ["pageIndex", "pageSize", "keyWords"]);
                var params = cloneDeep(autoQuery.params(options.pageIndex, options.pageSize, keyWords, props));
                delete params.pageIndex;
                delete params.pageSize;
                delete params.defaultKeyWords;
                if (autoQuery.requestBeforeTransformParams) {
                    params = autoQuery.requestBeforeTransformParams(__assign(__assign({}, params), { pageIndex: options.pageIndex, pageSize: options.pageSize }));
                }
                var model = {
                    onBeforTranform: function (value) {
                        return {
                            responseData: value,
                            mappingEntity: autoQuery.mappingEntity,
                        };
                    },
                };
                if (autoQuery.method === 'post') {
                    return server_1.post(__assign({ url: autoQuery.ApiUrl, parameter: params, headers: __assign(__assign({}, autoQuery.options), { 'api-cookie': autoQuery.token }), model: SelectKeyValue }, model));
                }
                else if (autoQuery.method === 'get') {
                    return server_1.get(__assign({ url: autoQuery.ApiUrl, parameter: params, headers: __assign(__assign({}, autoQuery.options), { 'api-cookie': autoQuery.token }), model: SelectKeyValue }, model));
                }
            };
            var data = this.selectOptions.get(name); // 查询指定下拉组件数据
            var currValue_1 = this.selectView.get(name);
            if (data) {
                // 如果数据存在
                var item_1 = data.find(function (entity) { return entity.keywords === keyWords_1; }); // 查询指定下拉组件指定关键词数据
                if (!item_1) {
                    /** 如果输入关键词不存在搜索数据，则往map初始化一个此关键词的搜索数据 */
                    data.push({
                        keywords: keyWords_1,
                        // @ts-ignore
                        obData: observable.map(),
                    });
                    this.selectOptions.set(name, data);
                    item_1 = data.find(function (entity) { return entity.keywords === keyWords_1; });
                }
                if (item_1) {
                    //@ts-ignore
                    if (item_1.obData.has(options.pageIndex.toString())) {
                        /** 如果输入关键词存在历史搜索数据，先调出历史数据加载，提升加载速度
                         * 加载完历史搜索记录，再去请求数据更新替换历史数据，用户界面无感知刷新数据
                         */
                        if (currValue_1) {
                            // @ts-ignore
                            // currValue.currValue= this.tranSelectOptions(item,autoQuery)
                            var hisDbData = this.tranSelectOptions(item_1, autoQuery);
                            for (var i = 1; i <= hisDbData.data.size; i++) {
                                currValue_1.currValue.data.set(
                                //@ts-ignore
                                i.toString(), hisDbData.data.get(i.toString()));
                            }
                            currValue_1.currValue.total = hisDbData.total;
                        }
                    }
                    else {
                        if (currValue_1) {
                            this.getSelectDataDbBase({
                                tableNameDb: currValue_1.tableNameDb,
                                name: name,
                                pageIndex: options.pageIndex,
                                keyWords: keyWords_1,
                                callback: function (value) {
                                    if (value && Array.isArray(value) && value.length) {
                                        var dbData_1 = _this.tranSelectOptionsFromDd(value);
                                        if (dbData_1) {
                                            runInAction(function () {
                                                var newCurrValue = _this.selectView.get(name);
                                                for (var i = 1; i <= dbData_1.data.size; i++) {
                                                    //@ts-ignore
                                                    if (!newCurrValue.currValue.data.has(i.toString())) {
                                                        newCurrValue.currValue.data.set(
                                                        //@ts-ignore
                                                        i.toString(), dbData_1.data.get(i.toString()));
                                                    }
                                                }
                                                newCurrValue.currValue.total = dbData_1.total;
                                            });
                                        }
                                    }
                                },
                            });
                        }
                    }
                    if (currValue_1) {
                        currValue_1.pageIndex = options.pageIndex;
                        currValue_1.pageSize = options.pageSize;
                        currValue_1.keywords = options.keyWords;
                    }
                    /** 输入关键词有无历史搜索数据，都会去请求接口，存在历史数据线调取历史数据 */
                    var store = extendObservable({
                        keyWords: keyWords_1,
                        // @ts-ignore
                        data: observable.map(),
                    }, {});
                    for (var i = 1; i <= item_1.obData.size; i++) {
                        /**
                         * 调出输入关键词历史搜索数据
                         */
                        //@ts-ignore
                        var newData = item_1.obData.get(i.toString());
                        if (newData && newData.isResolved) {
                            //@ts-ignore
                            store.data.set(i.toString(), newData);
                        }
                    }
                    store = pagingQueryProcessing({
                        store: store,
                        servicePromise: apiServer,
                        keyWords: keyWords_1,
                        mapItemKeys: options.pageIndex.toString(),
                        callback: function (value) {
                            item_1.obData.set(
                            //@ts-ignore
                            options.pageIndex.toString(), 
                            //@ts-ignore
                            value.data.get(options.pageIndex.toString()));
                            item_1.keywords = keyWords_1;
                            if (autoQuery.transform) {
                                if (currValue_1) {
                                    var newsCurrValue = _this.tranSelectOptions(item_1, autoQuery);
                                    for (var i = 1; i <= newsCurrValue.data.size; i++) {
                                        currValue_1.currValue.data.set(
                                        //@ts-ignore
                                        i.toString(), newsCurrValue.data.get(i.toString()));
                                    }
                                    currValue_1.currValue.total = newsCurrValue.total;
                                    _this.syncSelectDataDbBase(item_1, {
                                        autoQuery: autoQuery,
                                        keyWords: keyWords_1,
                                        tableNameDb: currValue_1.tableNameDb,
                                        name: name,
                                        total: currValue_1.currValue.total,
                                    });
                                }
                            }
                        },
                    });
                }
            }
        }
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HLFormLocalView.prototype, "selectOptions", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HLFormLocalView.prototype, "selectView", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HLFormLocalView.prototype, "_isDragSort", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], HLFormLocalView.prototype, "_controlsSort", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HLFormLocalView.prototype, "dragSortState", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HLFormLocalView.prototype, "computedControlsSort", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "updateControlsSort", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "setDragSort", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "initSelectOptions", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "initSelectView", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "dispatchRequest", null);
    return HLFormLocalView;
}());
var ProFormStore = /** @class */ (function (_super) {
    __extends(ProFormStore, _super);
    function ProFormStore(context) {
        var _this = _super.call(this, context) || this;
        /**
         *
         * 表单数据模型集合
         * @memberof HLFormStore
         */
        _this.HLFormContainer = observable.map();
        _this.HLFormLocalDataContainer = observable.map();
        return _this;
    }
    /**
     *
     * 添加表单临时性数据
     * @param {string} uid
     * @param {WrappedFormUtils} form
     * @param {*} [InputDataModel]
     * @memberof HLFormStore
     */
    ProFormStore.prototype.add = function (uid, form, InputDataModel) {
        var otherView = { form: form, uid: uid };
        var formView = new HlFormView();
        if (InputDataModel && typeof InputDataModel === 'function') {
            /* otherView = Object.assign(otherView,{ InputDataModel: new InputDataModel(),InputDataModelClass: InputDataModel }) */
            otherView = Object.assign(otherView, {
                InputDataModelClass: InputDataModel,
            });
            /* formView = Object.assign(formView,{ InputDataModel: new InputDataModel() })
                  formView = observable(formView); */
            formView = extendObservable(formView, {
                InputDataModel: new InputDataModel(),
            });
        }
        this.HLFormContainer.set(uid, Object.assign(observableViewModel(formView), otherView));
    };
    ProFormStore.prototype.init = function (uid, options) {
        var store = this.HLFormContainer.get(uid);
    };
    ProFormStore.prototype.delete = function (uid) {
        this.HLFormContainer.delete(uid);
    };
    ProFormStore.prototype.get = function (uid) {
        return this.HLFormContainer.get(uid);
    };
    /**
     * 添加表单持久化数据
     *
     * @param {string} uid
     * @memberof HLFormStore
     */
    ProFormStore.prototype.addLocalData = function (uid) {
        var formView = new HLFormLocalView();
        /* if (InputDataModel && typeof InputDataModel === 'function') {
                otherView = Object.assign(otherView,{InputDataModelClass: InputDataModel })
                formView = extendObservable(formView,{
                    InputDataModel: new InputDataModel()
                })
            }
            this.HLFormLocalDataContainer.set(uid, Object.assign(observableViewModel<HLFormLocalView>(formView), otherView)) */
        this.HLFormLocalDataContainer.set(uid, observableViewModel(formView));
    };
    ProFormStore.prototype.deleteLocalData = function (uid) {
        this.HLFormLocalDataContainer.delete(uid);
    };
    ProFormStore.prototype.getLocalData = function (uid) {
        return this.HLFormLocalDataContainer.get(uid);
    };
    /**
     * 清空所有收集的组件元素
     *
     * @param {string} uid
     * @memberof HLFormStore
     */
    ProFormStore.prototype.clearAllElement = function (uid) {
        this.HLFormContainer.get(uid).elementList.clear();
    };
    /**
     *
     *
     * @param  formElementUid  FormElement 组件生成的唯一uid
     * @param {string} formUid 表单UID
     * @param {string} [nextElementName] 下一个组件name
     * @memberof AbstractForm
     */
    ProFormStore.prototype.nextElement = function (formElementUid, formUid, nextElementName) {
        var e_2, _a;
        var store = this.get(formUid);
        if (store && store.enableEnterSwitch) {
            /*  const elementListKeys = store.elementList.keys() */
            var elementListKeys_1 = [];
            try {
                for (var _b = __values(store.elementList.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    elementListKeys_1.push(item);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            /**  解决日期组件回车被阻止冒泡，导致回车键没法切换到下一个元素*/
            elementListKeys_1.map(function (item, index) {
                if (!nextElementName) {
                    /**  当没有指定时，默认选择下一个*/
                    if (formElementUid === item) {
                        var nextUid = index + 1;
                        if (elementListKeys_1.length <= nextUid) {
                            /**  如果当前是最后一个，则下一个默认回到数组第0位*/
                            nextUid = 0;
                        }
                        var nextElementKey = elementListKeys_1[nextUid];
                        var nextElement = store.elementList.get(nextElementKey);
                        var result = nextElement.element instanceof HTMLCollection;
                        if (nextElement && result && nextElement.element.length) {
                            if (nextElement.elementTabindex &&
                                nextElement.elementTabindex instanceof HTMLCollection &&
                                nextElement.elementTabindex.length) {
                                // @ts-ignore
                                nextElement.elementTabindex[0].focus &&
                                    //@ts-ignore
                                    nextElement.elementTabindex[0].focus(); //主要用于解决select 框 聚焦后边框线无法高亮
                            }
                            store.focusUid = nextElementKey;
                            nextElement.element[0].focus && nextElement.element[0].focus();
                        }
                    }
                }
                else {
                    var el = store.elementList.get(item);
                    if (el && el.elementKey === nextElementName) {
                        var result = el.element instanceof HTMLCollection;
                        if (result && el.element.length) {
                            store.focusUid = item;
                            el.element[0].focus && el.element[0].focus();
                        }
                    }
                }
            });
        }
    };
    /**
     * 当表单数据变化同步生效表单store数据
     *
     * @param {string} formUid 表单uid
     * @param {object} formFields 数据源
     * @param {React.Component} parentRef 表单父级组件实例 this
     * @memberof HLFormStore
     */
    ProFormStore.prototype.updateFormInputData = function (formUid, formFields, parentRef) {
        var view = this.HLFormContainer.get(formUid);
        if (view && typeof view.InputDataModelClass === 'function') {
            // @ts-ignore
            view.InputDataModel = new view.InputDataModelClass(__assign(__assign({}, view.InputDataModel), formFields));
            if (parentRef && parentRef.forceUpdate) {
                parentRef.forceUpdate();
            }
        }
    };
    ProFormStore.meta = __assign({}, StoreBase.meta);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProFormStore.prototype, "HLFormContainer", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProFormStore.prototype, "HLFormLocalDataContainer", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "add", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, HlFormView]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "init", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "delete", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "get", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "addLocalData", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "deleteLocalData", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "getLocalData", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "clearAllElement", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, React.Component]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "updateFormInputData", null);
    ProFormStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], ProFormStore);
    return ProFormStore;
}(StoreBase));

export { ProFormStore };
