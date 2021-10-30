/**
  *  legions-pro-design v0.0.8
  * (c) 2021 duanguang
  * @license MIT
  */
import LegionsStore from '../LegionsStore';
import { observable, action, StoreModules } from 'legions/store';
import { observablePromise, observableViewModel } from 'legions/store-utils';
import { computed } from 'mobx';
import LegionsCore from '../LegionsCore';
import { cloneDeep } from 'lodash';
import LegionsModels from '../LegionsModels';
import { runScriptsSdk } from 'legions-thirdparty-plugin';
import { getStorageItem, setStorageItems } from 'legions-utils-tool/storage';

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

/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:49:31
 * @LastEditTime: 2021-09-28 00:17:00
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreConditions/conditionView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var ConditionView = /** @class */ (function () {
    function ConditionView(uid) {
        if (uid === void 0) { uid = ''; }
        this.uid = '';
        /**
         * 查询条件
         *
         * @type {Object}
         * @memberof ConditionView
         */
        this.query = observable.map();
        /**
         * 组件在 dom 树的真实高度
         * 自动获取的
         *  请勿组件外部不要修改这个值
         *
         * @type {number}
         * @memberof HlQueryConditionView
         */
        this.domHeight = 45;
        /**
         *
         * 容器宽度
         * @type {number}
         * @memberof ConditionView
         */
        this.widthContainer = document.body.clientWidth;
        /**
         *
         * 搜索条件组件数据模型
         * @private
         * @type {Object}
         * @memberof ConditionView
         */
        this.vmModel = null;
        this.size = 'default';
        this.selectOptions = observable.map();
        this.uid = uid;
    }
    Object.defineProperty(ConditionView.prototype, "computedQuery", {
        get: function () {
            var e_1, _a;
            var value = [];
            try {
                for (var _b = __values(this.query.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    Object.defineProperty(ConditionView.prototype, "computedVmModel", {
        get: function () {
            return JSON.parse(this.vmModel);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionView.prototype, "computedSize", {
        get: function () {
            return this.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionView.prototype, "compuedResolution", {
        /**
         * xs: 宽度<768px 响应式栅格，可为栅格数或一个包含其他属性的对象
         *
         * sm:宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象
         *
         * md: 宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
         *
         * lg: 宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
         *
         * xl:宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
         */
        get: function () {
            var width = this.widthContainer;
            if (width >= 1600) { /** 宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
                return 'xl';
            }
            else if (width >= 1200 && width < 1600) { /**宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
                return 'lg';
            }
            else if (width >= 992 && width < 1200) { /**宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
                return 'md';
            }
            else if (width >= 768 && width < 992) { /**宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
                return 'sm';
            }
            else if (width < 768) {
                return 'xs';
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *  更新数据模型
     *
     * @param {Object} model
     * @memberof HlQueryConditionView
     */
    ConditionView.prototype._setVmModel = function (model) {
        this.vmModel = JSON.stringify(model);
    };
    ConditionView.prototype._clearQuery = function () {
        this.query.clear();
    };
    ConditionView.prototype._firstInitQuery = function (query) {
        var caches = JSON.parse(getStorageItem(this.uid, '[]'));
        console.log(caches, 'caches');
        var newQuery = [];
        query.map(function (item) {
            newQuery.push(void 0);
        });
        if (caches.length) {
            caches = caches.filter(function (item) { return query.find(function (id) { return id.containerProps.uuid == item; }); });
            caches.map(function (item, _index) {
                var itmIndex = query.findIndex(function (w) { return item === w.containerProps.uuid; });
                if (_index === itmIndex) {
                    newQuery[_index] = query[_index];
                }
                else {
                    if (itmIndex > -1) {
                        var cacheQueryItem = query[itmIndex];
                        if (cacheQueryItem) {
                            newQuery[_index] = cacheQueryItem;
                        }
                    }
                }
            });
        }
    };
    ConditionView.prototype._initQuery = function (query, options) {
        var _this = this;
        var caches = [];
        query.map(function (item) {
            var id = item.containerProps.uuid;
            if (!_this.query.has(id)) {
                _this.query.set(id, item);
            }
        });
        if (options && options.isCache) {
            if (!runScriptsSdk.plugins.dexie) {
                setStorageItems(this.uid, JSON.stringify(caches));
            }
        }
    };
    /** 改变搜索条件配置数据 */
    ConditionView.prototype._setQueryState = function (name, callback) {
        var item = this._getQueryItem(name);
        if (item) {
            //@ts-ignore
            callback && callback(item);
            if (this.query.has(item.containerProps.uuid)) {
                this.query.set(item.containerProps.uuid, cloneDeep(item));
            }
        }
    };
    ConditionView.prototype._getQueryItem = function (name) {
        var item = this.computedQuery.find(function (item) { return item.containerProps.name === name; });
        if (item) {
            return this.query.get(item.containerProps.uuid);
        }
        else {
            if (this.query.has(name)) {
                return this.query.get(name);
            }
        }
        return null;
    };
    ConditionView.prototype._setSize = function (size) {
        this.size = size;
    };
    ConditionView.prototype._dispatchRequest = function (name, autoQuery, options) {
        if (options === void 0) { options = { pageIndex: 1, pageSize: 30 }; }
        if (autoQuery) {
            var server_1 = new LegionsCore.LegionsFetch();
            //@ts-ignore
            var apiServer = function () {
                var pageIndex = options.pageIndex, pageSize = options.pageSize, _a = options.keyWords, keyWords = _a === void 0 ? '' : _a, props = __rest(options, ["pageIndex", "pageSize", "keyWords"]);
                var params = cloneDeep(autoQuery.params(options.pageIndex, options.pageSize, keyWords, props));
                delete params.pageIndex;
                delete params.pageSize;
                delete params.defaultKeyWords;
                var headers = {};
                if (autoQuery.token) {
                    if (typeof autoQuery.token === 'string') {
                        headers = { 'api-cookie': autoQuery.token };
                    }
                    else if (typeof autoQuery.token === 'function') {
                        headers = { 'api-cookie': autoQuery.token() };
                    }
                }
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
                if (autoQuery.method === 'post') {
                    return server_1.post(__assign({ url: autoQuery.ApiUrl, parameter: params, headers: __assign(__assign({}, autoQuery.options), headers), model: LegionsModels.SelectKeyValue }, model));
                }
                else if (autoQuery.method === 'get') {
                    return server_1.get(__assign({ url: autoQuery.ApiUrl, parameter: params, headers: __assign(__assign({}, autoQuery.options), headers), model: LegionsModels.SelectKeyValue }, model));
                }
            };
            this.selectOptions.set(name, {
                obData: observablePromise(apiServer()),
            });
        }
    };
    /** 移除指定搜索条件项  */
    ConditionView.prototype._removeQuery = function (uuid) {
        return this.query.delete(uuid);
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ConditionView.prototype, "uid", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ConditionView.prototype, "query", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ConditionView.prototype, "tranQuery", void 0);
    __decorate([
        observable,
        __metadata("design:type", Number)
    ], ConditionView.prototype, "domHeight", void 0);
    __decorate([
        observable,
        __metadata("design:type", Number)
    ], ConditionView.prototype, "widthContainer", void 0);
    __decorate([
        observable.ref,
        __metadata("design:type", Object)
    ], ConditionView.prototype, "vmModel", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ConditionView.prototype, "size", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ConditionView.prototype, "selectOptions", void 0);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], ConditionView.prototype, "computedQuery", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ConditionView.prototype, "computedVmModel", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ConditionView.prototype, "computedSize", null);
    __decorate([
        computed,
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], ConditionView.prototype, "compuedResolution", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_setVmModel", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_clearQuery", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_firstInitQuery", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_initQuery", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Function]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_setQueryState", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_getQueryItem", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_setSize", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_dispatchRequest", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_removeQuery", null);
    return ConditionView;
}());

/*
 * @Author: duanguang
 * @Date: 2020-12-29 16:44:16
 * @LastEditTime: 2021-08-09 23:31:08
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreConditions/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var LegionsStoreConditions = /** @class */ (function (_super) {
    __extends(LegionsStoreConditions, _super);
    function LegionsStoreConditions(context) {
        var _this = _super.call(this, context) || this;
        _this.viewModelQuery = observableViewModel(new ConditionView());
        _this.ConditionContainer = observable.map();
        return _this;
    }
    LegionsStoreConditions.prototype.add = function (uid) {
        this.viewModelQuery = observableViewModel(new ConditionView(uid));
        this.ConditionContainer.set(uid, this.viewModelQuery);
    };
    LegionsStoreConditions.prototype.delete = function (uid) {
        this.ConditionContainer.delete(uid);
    };
    LegionsStoreConditions.prototype.get = function (uid) {
        return this.ConditionContainer.get(uid);
    };
    LegionsStoreConditions.meta = __assign({}, LegionsStore.StoreBase.meta);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], LegionsStoreConditions.prototype, "viewModelQuery", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], LegionsStoreConditions.prototype, "ConditionContainer", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreConditions.prototype, "add", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreConditions.prototype, "delete", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreConditions.prototype, "get", null);
    LegionsStoreConditions = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], LegionsStoreConditions);
    return LegionsStoreConditions;
}(LegionsStore.StoreBase));

export default LegionsStoreConditions;
