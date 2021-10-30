/**
  *  legions-pro-design v0.0.8-beta.1
  * (c) 2021 duanguang
  * @license MIT
  */
import LegionsStore from '../LegionsStore';
import { observable as observable$1, action as action$1, StoreModules } from 'legions/store';
import { observableViewModel } from 'legions/store-utils';
import { observable, computed, action, runInAction, extendObservable } from 'mobx';
import LegionsCore from '../LegionsCore';
import { pagingQueryProcessing } from 'legions-lunar';
import { cloneDeep } from 'lodash';
import { SelectDatabaseDB } from '../db';
import LegionsModels from '../LegionsModels';
import { shortHash } from 'legions-lunar/object-hash';

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
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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

var TabsItemView = /** @class */ (function () {
    function TabsItemView(key) {
        /** 每个tab拥有的自己独立的from实体 */
        this.formInstance = null;
        this.keys = '';
        this._style = {};
        this._className = '';
        this._closable = void 0;
        this._disabled = void 0;
        this.keys = key;
    }
    Object.defineProperty(TabsItemView.prototype, "computedStyle", {
        get: function () {
            return { style: this._style };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsItemView.prototype, "computedClassName", {
        get: function () {
            if (this._className) {
                return { className: this._className };
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsItemView.prototype, "computedClosable", {
        get: function () {
            if (this._closable !== void 0) {
                return { closable: this._closable };
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsItemView.prototype, "computedDisabled", {
        get: function () {
            if (this._disabled !== void 0) {
                return { disabled: this._disabled };
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    TabsItemView.prototype.setStyle = function (style) {
        this._style = style;
    };
    TabsItemView.prototype.setClassName = function (className) {
        this._className = className;
    };
    TabsItemView.prototype.setClosable = function (closable) {
        this._closable = closable;
    };
    TabsItemView.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TabsItemView.prototype, "_style", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], TabsItemView.prototype, "_className", void 0);
    __decorate([
        observable,
        __metadata("design:type", Boolean)
    ], TabsItemView.prototype, "_closable", void 0);
    __decorate([
        observable,
        __metadata("design:type", Boolean)
    ], TabsItemView.prototype, "_disabled", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TabsItemView.prototype, "computedStyle", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TabsItemView.prototype, "computedClassName", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TabsItemView.prototype, "computedClosable", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TabsItemView.prototype, "computedDisabled", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TabsItemView.prototype, "setStyle", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TabsItemView.prototype, "setClassName", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], TabsItemView.prototype, "setClosable", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], TabsItemView.prototype, "setDisabled", null);
    return TabsItemView;
}());
var TabsFormView = /** @class */ (function () {
    function TabsFormView(uid) {
        this._uid = '';
        /** 当前活跃的tab项 */
        this.activeTabKey = null;
        /** 内部变量，外部请勿直接调用 */
        this._tabsMap = observable.map();
        this.activeTabKey = "" + shortHash(new Date().getTime()) + 0;
        this._uid = uid;
        this._tabsMap.set(this.activeTabKey, new TabsItemView(this.activeTabKey));
    }
    Object.defineProperty(TabsFormView.prototype, "_computedTabs", {
        /** tabs项数 内部私有变量 */
        get: function () {
            var e_1, _a;
            var value = [];
            try {
                for (var _b = __values(this._tabsMap.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    value.push(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsFormView.prototype, "size", {
        get: function () {
            return this._tabsMap.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsFormView.prototype, "entries", {
        get: function () {
            return this._tabsMap.entries();
        },
        enumerable: false,
        configurable: true
    });
    TabsFormView.prototype._geKeys = function (key) {
        var keys = "" + key + shortHash("" + key + this._uid);
        return keys;
    };
    TabsFormView.prototype.getTabs = function (key) {
        var keys = this._geKeys(key);
        if (this._tabsMap.has(keys)) {
            return this._tabsMap.get(keys);
        }
        return this._tabsMap.get(key);
    };
    TabsFormView.prototype.hasTabs = function (key) {
        var keys = this._geKeys(key);
        if (this._tabsMap.has(keys)) {
            return true;
        }
        if (this._tabsMap.has(key)) {
            return true;
        }
        return false;
    };
    TabsFormView.prototype.getTabsKeys = function () {
        return this._tabsMap.keys();
    };
    TabsFormView.prototype.clearTabs = function () {
        this.activeTabKey = '';
        this._tabsMap.clear();
    };
    /**
     * 删除tab
     * @param {string} key map中对应key值
     */
    TabsFormView.prototype.delTabsMap = function (key) {
        this._tabsMap.delete(key);
    };
    /**
     * 添加tab页签
     *
     * 内部私有方法
     */
    TabsFormView.prototype._addTabsMap = function (options) {
        var uid = '';
        var option = options || {};
        var isSwitchTabKey = option.isSwitchTabKey === void 0 ? true : option.isSwitchTabKey;
        var key = option.key || '';
        if (key) { // 如果设定了固定key，则生成
            uid = "TabPane" + key + shortHash("" + key + this._uid);
        }
        else { // 随机生成
            uid = "TabPane" + shortHash(new Date().getTime()) + this._tabsMap.size;
        }
        if (!this._tabsMap.has(uid)) {
            this._tabsMap.set(uid, new TabsItemView("" + uid));
        }
        isSwitchTabKey && (this.activeTabKey = uid);
        /** 等待ui记载完毕根据托运责任设置订单服务类型 */
        setTimeout(function () {
            /** ui渲染完毕，执行回调 */
            option.callback && option.callback();
        }, 100);
        return uid;
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TabsFormView.prototype, "_uid", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], TabsFormView.prototype, "activeTabKey", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TabsFormView.prototype, "_tabsMap", void 0);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], TabsFormView.prototype, "_computedTabs", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TabsFormView.prototype, "size", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TabsFormView.prototype, "entries", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TabsFormView.prototype, "getTabs", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TabsFormView.prototype, "hasTabs", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TabsFormView.prototype, "getTabsKeys", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TabsFormView.prototype, "clearTabs", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TabsFormView.prototype, "delTabsMap", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TabsFormView.prototype, "_addTabsMap", null);
    return TabsFormView;
}());

var HlFormView = /** @class */ (function () {
    function HlFormView() {
        /**
         * 需要进行回车，上下键操作的组件钩子列表(不包含禁用的组件)
         *
         * @memberof HlFormView
         */
        this._elementList = observable$1.map();
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
        this.formfields = observable$1.map();
        /** 自定义表单元素配置项 */
        this._customFormFields = observable$1.map();
        /** 待执行渲染的组件元素队列
         *
         * 执行完后移出队列
         */
        this.renderNodeQueue = observable$1.map();
        /**
         * 需要进行回车，上下键操作的组件钩子列表keys
         *
         * @private
         * @memberof HlFormView
         */
        this._allElementList = [];
        /**
         *
         * 所有组件错误信息
         * @memberof HlFormView
         */
        this._errorListView = observable$1.map();
        this.formfields.observe(function (chan) {
        });
    }
    Object.defineProperty(HlFormView.prototype, "computedAllElementList", {
        get: function () {
            return this._allElementList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlFormView.prototype, "computedFormFields", {
        /** 表单元素配置项
         * 渲染formItem
         */
        get: function () {
            var e_1, _a;
            var value = [];
            try {
                for (var _b = __values(this.formfields.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    value.push(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlFormView.prototype, "computedAllFormFields", {
        /** 表单元素配置项
         * 包含自定义render 里面子元素配置项
         */
        get: function () {
            var e_2, _a, e_3, _b;
            var value = [];
            try {
                for (var _c = __values(this.formfields.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    value.push(item);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var _e = __values(this._customFormFields.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    value.push(item);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlFormView.prototype, "computedFormSize", {
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
    /** 修改表单尺寸 */
    HlFormView.prototype.updateFormSize = function (size) {
        var _this = this;
        this.size = size;
        this.computedAllFormFields.map(function (item) {
            var name = item.iAntdProps.name;
            if (!_this.renderNodeQueue.has(name)) {
                _this.renderNodeQueue.set(name, name);
            }
        });
    };
    /**
     *
     * 收集组件钩子keys
     * @param {string} keys
     * @memberof HlFormView
     */
    HlFormView.prototype._addAllElementKeys = function (keys) {
        var index = this._allElementList.findIndex(function (item) { return item === keys; });
        if (index < 0) {
            this._allElementList.push(keys);
            this._allElementList = this._allElementList.slice();
        }
    };
    /** 查询表单元素字段配置信息 */
    HlFormView.prototype.getFormItemField = function (key) {
        var item = this.computedAllFormFields.find(function (item) { return item.iAntdProps.uuid === key || item.iAntdProps.id === key; });
        if (item) {
            if (this.formfields.has(item.iAntdProps.id)) {
                return {
                    //@ts-ignore
                    value: this.formfields.get(item.iAntdProps.id),
                    type: 'normal',
                };
            }
            else if (this._customFormFields.has(item.iAntdProps.id)) {
                return {
                    //@ts-ignore
                    value: this._customFormFields.get(item.iAntdProps.id),
                    type: 'custom',
                };
            }
        }
        return null;
    };
    /** 移除指定表单选项 */
    HlFormView.prototype.removeFormItem = function (key) {
        var item = this.computedAllFormFields.find(function (item) { return item.iAntdProps.uuid === key || item.iAntdProps.id === key; });
        if (item) {
            var id = item.iAntdProps.id;
            if (this.formfields.has(id)) {
                return this.formfields.delete(id);
            }
            else if (this._customFormFields.has(id)) {
                return this._customFormFields.delete(id);
            }
        }
        return false;
    };
    /** 清空表单配置项 */
    HlFormView.prototype.clearFormItem = function () {
        this.formfields.clear();
        this._customFormFields.clear();
    };
    /** 初始化表单配置项元素 */
    HlFormView.prototype._initFormItemField = function (key, value, type) {
        if (type === void 0) { type = 'normal'; }
        if (type === 'normal') {
            if (!this.formfields.has(key)) {
                this.formfields.set(key, value);
            }
        }
        else if (type === 'custom') {
            if (!this._customFormFields.has(key)) {
                this._customFormFields.set(key, value);
            }
        }
    };
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "_elementList", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "focusUid", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "enableEnterSwitch", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", String)
    ], HlFormView.prototype, "size", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "formfields", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "_customFormFields", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "renderNodeQueue", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "_allElementList", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HlFormView.prototype, "_errorListView", void 0);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "computedAllElementList", null);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "computedFormFields", null);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "computedAllFormFields", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlFormView.prototype, "computedFormSize", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "updateFormSize", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "_addAllElementKeys", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Object)
    ], HlFormView.prototype, "getFormItemField", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "removeFormItem", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "clearFormItem", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, String]),
        __metadata("design:returntype", void 0)
    ], HlFormView.prototype, "_initFormItemField", null);
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
        observable$1,
        __metadata("design:type", String)
    ], ErrorViewModel.prototype, "uid", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", String)
    ], ErrorViewModel.prototype, "validateStatus", void 0);
    return ErrorViewModel;
}());
var HLFormLocalView = /** @class */ (function () {
    function HLFormLocalView() {
        this._selectOptions = observable$1.map();
        this._selectView = observable$1.map();
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
    HLFormLocalView.prototype._initControlsSort = function (sorts) {
        var _this = this;
        sorts.map(function (value) {
            var _index = _this._controlsSort.findIndex(function (item) { return item === value; });
            if (_index < 0) {
                _this._controlsSort.push(value);
            }
        });
    };
    HLFormLocalView.prototype._updateControlsSort = function (sorts) {
        this._controlsSort = sorts;
    };
    HLFormLocalView.prototype.setDragSort = function (sort) {
        this._isDragSort = sort;
    };
    HLFormLocalView.prototype._initSelectOptions = function (keys, autoQuery) {
        this._selectOptions.set(keys, [
            {
                keywords: '',
                // @ts-ignore
                obData: observable$1.map(),
            },
        ]);
    };
    HLFormLocalView.prototype._initSelectView = function (keys, autoQuery, options) {
        this._selectView.set(keys, {
            paging: options.paging,
            remote: options.remote,
            autoQuery: autoQuery,
            pageIndex: 1,
            pageSize: options.pageSize || 30,
            keywords: options.keywords || '',
            tableNameDb: options.tableNameDb,
            currValue: { total: 0, data: observable$1.map() },
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
            var server_1 = new LegionsCore.LegionsFetch();
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
                        options.callback && options.callback(value);
                        return {
                            responseData: value,
                            mappingEntity: autoQuery.mappingEntity,
                        };
                    },
                };
                var headers = {};
                if (autoQuery.token) {
                    headers = { 'api-cookie': autoQuery.token };
                }
                if (autoQuery.method === 'post') {
                    return server_1.post(__assign({ url: autoQuery.ApiUrl, parameter: params, headers: __assign(__assign({}, autoQuery.options), headers), model: LegionsModels.SelectKeyValue }, model));
                }
                else if (autoQuery.method === 'get') {
                    return server_1.get(__assign({ url: autoQuery.ApiUrl, parameter: params, headers: __assign(__assign({}, autoQuery.options), headers), model: LegionsModels.SelectKeyValue }, model));
                }
            };
            var data = this._selectOptions.get(name); // 查询指定下拉组件数据
            var currValue_1 = this._selectView.get(name);
            if (data) {
                // 如果数据存在
                var item_1 = data.find(function (entity) { return entity.keywords === keyWords_1; }); // 查询指定下拉组件指定关键词数据
                if (!item_1) {
                    /** 如果输入关键词不存在搜索数据，则往map初始化一个此关键词的搜索数据 */
                    data.push({
                        keywords: keyWords_1,
                        // @ts-ignore
                        obData: observable$1.map(),
                    });
                    this._selectOptions.set(name, data);
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
                                                var newCurrValue = _this._selectView.get(name);
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
                        data: observable$1.map(),
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
        observable$1,
        __metadata("design:type", Object)
    ], HLFormLocalView.prototype, "_selectOptions", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HLFormLocalView.prototype, "_selectView", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], HLFormLocalView.prototype, "_isDragSort", void 0);
    __decorate([
        observable$1,
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
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "_initControlsSort", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "_updateControlsSort", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "setDragSort", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "_initSelectOptions", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", void 0)
    ], HLFormLocalView.prototype, "_initSelectView", null);
    __decorate([
        action$1,
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
        _this.HLFormContainer = observable$1.map();
        _this.HLFormLocalDataContainer = observable$1.map();
        _this._TabsFormDataMap = observable$1.map();
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
    ProFormStore.prototype.add = function (uid, options) {
        var otherView = { form: options.form, uid: uid, formRef: options.formRef };
        var formView = new HlFormView();
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
        this.HLFormContainer.get(uid)._elementList.clear();
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
        var e_4, _a;
        var store = this.get(formUid);
        if (store && store.enableEnterSwitch) {
            /*  const elementListKeys = store.elementList.keys() */
            var elementListKeys_1 = [];
            try {
                for (var _b = __values(store._elementList.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    elementListKeys_1.push(item);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
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
                        var nextElement = store._elementList.get(nextElementKey);
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
                    var el = store._elementList.get(item);
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
    ProFormStore.prototype.updateFormInputData = function (formUid, formFields) {
        var view = this.HLFormContainer.get(formUid);
        if (view) {
            if (typeof view.InputDataModelClass === 'function') {
                // @ts-ignore
                view.InputDataModel = new view.InputDataModelClass(__assign(__assign({}, view.InputDataModel), formFields));
            }
            else {
                view.InputDataModel = __assign(__assign({}, view.InputDataModel), formFields);
            }
            Object.keys(formFields).map(function (key) {
                if (!view.renderNodeQueue.has(key)) {
                    view.renderNodeQueue.set(key, key);
                }
            });
        }
    };
    ProFormStore.prototype.addTabsForm = function (uid) {
        var formView = new TabsFormView(uid);
        this._TabsFormDataMap.set(uid, observableViewModel(formView));
    };
    ProFormStore.prototype.deleteTabsForm = function (uid) {
        this._TabsFormDataMap.delete(uid);
    };
    ProFormStore.prototype.getTabsForm = function (uid) {
        return this._TabsFormDataMap.get(uid);
    };
    ProFormStore.meta = __assign({}, LegionsStore.StoreBase.meta);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], ProFormStore.prototype, "HLFormContainer", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], ProFormStore.prototype, "HLFormLocalDataContainer", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], ProFormStore.prototype, "_TabsFormDataMap", void 0);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "add", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, HlFormView]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "init", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "delete", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "get", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "addLocalData", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "deleteLocalData", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "getLocalData", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "clearAllElement", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "updateFormInputData", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "addTabsForm", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "deleteTabsForm", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProFormStore.prototype, "getTabsForm", null);
    ProFormStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], ProFormStore);
    return ProFormStore;
}(LegionsStore.StoreBase));

var LegionsStoreForm = ProFormStore;

export default LegionsStoreForm;
