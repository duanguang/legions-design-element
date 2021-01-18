/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { StoreBase } from '../index';
import { observable, action, StoreModules } from 'legions/store';
import { observablePromise, observableViewModel } from 'legions/store-utils';
import { computed } from 'mobx';
import { LegionsFetch } from '../../core';
import { cloneDeep } from 'lodash';

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

/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:49:31
 * @LastEditTime: 2021-01-07 18:01:29
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.query.conditions/HlQueryConditionView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var HlQueryConditionView = /** @class */ (function () {
    function HlQueryConditionView() {
        /**
         *
         * 搜索条件左侧组件集合
         * @private
         * @type {React.ReactNode[]}
         * @memberof HlQueryConditionView
         */
        this.queryLeftComponent = null;
        /**
         * 搜索条件右侧组件集合
         *
         * @private
         * @type {React.ReactNode[]}
         * @memberof HlQueryConditionView
         */
        this.queryRightComponent = null;
        /**
         * 动态排版区域组件
         *
         * @private
         * @type {JSX.Element}
         * @memberof HlQueryConditionView
         */
        this.queryContentComponent = null;
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
         * @memberof HlQueryConditionView
         */
        this.widthContainer = document.body.clientWidth;
        /**
         *
         * 搜索条件组件数据模型
         * @private
         * @type {Object}
         * @memberof HlQueryConditionView
         */
        this.vmModel = null;
        this.size = 'default';
        this.selectOptions = observable.map();
    }
    Object.defineProperty(HlQueryConditionView.prototype, "computedQuery", {
        get: function () {
            return this.query;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlQueryConditionView.prototype, "computedVmModel", {
        get: function () {
            return JSON.parse(this.vmModel);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlQueryConditionView.prototype, "computedLeftComponent", {
        /**
         * 搜索条件右侧组件集合
         *
         * @readonly
         * @memberof HlQueryConditionView
         */
        get: function () {
            return this.queryLeftComponent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlQueryConditionView.prototype, "computedContentComponent", {
        /**
         * 动态排布区域组件
         *
         * @readonly
         * @memberof HlQueryConditionView
         */
        get: function () {
            return this.queryContentComponent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlQueryConditionView.prototype, "computedRightComponent", {
        /**
         *
         * 搜索左侧组件集合
         * @readonly
         * @memberof HlQueryConditionView
         */
        get: function () {
            return this.queryRightComponent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlQueryConditionView.prototype, "computedSize", {
        get: function () {
            return this.size;
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
    HlQueryConditionView.prototype.setVmModel = function (model) {
        this.vmModel = JSON.stringify(model);
    };
    HlQueryConditionView.prototype.setLeftComponent = function (left) {
        if (left === void 0) { left = null; }
        this.queryLeftComponent = left;
    };
    HlQueryConditionView.prototype.setRightComponent = function (right) {
        if (right === void 0) { right = null; }
        this.queryRightComponent = right;
    };
    HlQueryConditionView.prototype.setContentComponent = function (content) {
        if (content === void 0) { content = null; }
        this.queryContentComponent = content;
    };
    HlQueryConditionView.prototype.setQuery = function (query) {
        this.query = query;
    };
    HlQueryConditionView.prototype.setSize = function (size) {
        this.size = size;
    };
    HlQueryConditionView.prototype.dispatchRequest = function (name, autoQuery, options) {
        if (options === void 0) { options = { pageIndex: 1, pageSize: 30 }; }
        if (autoQuery) {
            var server_1 = new LegionsFetch();
            /* const keyWords = options.keyWords || '' */
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
                if (autoQuery.method === 'post') {
                    return server_1.post({
                        url: autoQuery.ApiUrl,
                        parameter: params,
                        headerOption: __assign(__assign({}, autoQuery.options), { 'api-cookie': autoQuery.token }),
                        //@ts-ignore
                        model: autoQuery.model,
                    });
                }
                else if (autoQuery.method === 'get') {
                    return server_1.get({
                        url: autoQuery.ApiUrl,
                        parameter: params,
                        headerOption: __assign(__assign({}, autoQuery.options), { 'api-cookie': autoQuery.token }),
                        //@ts-ignore
                        model: autoQuery.model,
                    });
                }
            };
            this.selectOptions.set(name, {
                obData: observablePromise(apiServer()),
            });
        }
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlQueryConditionView.prototype, "query", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlQueryConditionView.prototype, "tranQuery", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlQueryConditionView.prototype, "queryLeftComponent", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlQueryConditionView.prototype, "queryRightComponent", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlQueryConditionView.prototype, "queryContentComponent", void 0);
    __decorate([
        observable,
        __metadata("design:type", Number)
    ], HlQueryConditionView.prototype, "domHeight", void 0);
    __decorate([
        observable,
        __metadata("design:type", Number)
    ], HlQueryConditionView.prototype, "widthContainer", void 0);
    __decorate([
        observable.ref,
        __metadata("design:type", String)
    ], HlQueryConditionView.prototype, "vmModel", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], HlQueryConditionView.prototype, "size", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], HlQueryConditionView.prototype, "selectOptions", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlQueryConditionView.prototype, "computedQuery", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlQueryConditionView.prototype, "computedVmModel", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlQueryConditionView.prototype, "computedLeftComponent", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlQueryConditionView.prototype, "computedContentComponent", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlQueryConditionView.prototype, "computedRightComponent", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HlQueryConditionView.prototype, "computedSize", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HlQueryConditionView.prototype, "setVmModel", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HlQueryConditionView.prototype, "setLeftComponent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HlQueryConditionView.prototype, "setRightComponent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HlQueryConditionView.prototype, "setContentComponent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HlQueryConditionView.prototype, "setQuery", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], HlQueryConditionView.prototype, "setSize", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", void 0)
    ], HlQueryConditionView.prototype, "dispatchRequest", null);
    return HlQueryConditionView;
}());

/*
 * @Author: duanguang
 * @Date: 2020-12-29 16:44:16
 * @LastEditTime: 2021-01-07 16:55:34
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.query.conditions/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var ProQueryConditionStore = /** @class */ (function (_super) {
    __extends(ProQueryConditionStore, _super);
    function ProQueryConditionStore(context) {
        var _this = _super.call(this, context) || this;
        _this.HlQueryConditionContainer = observable.map();
        return _this;
    }
    ProQueryConditionStore.prototype.add = function (uid) {
        this.HlQueryConditionContainer.set(uid, observableViewModel(new HlQueryConditionView()));
    };
    ProQueryConditionStore.prototype.delete = function (uid) {
        this.HlQueryConditionContainer.delete(uid);
    };
    ProQueryConditionStore.prototype.get = function (uid) {
        return this.HlQueryConditionContainer.get(uid);
    };
    ProQueryConditionStore.meta = __assign({}, StoreBase.meta);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProQueryConditionStore.prototype, "HlQueryConditionContainer", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProQueryConditionStore.prototype, "add", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProQueryConditionStore.prototype, "delete", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProQueryConditionStore.prototype, "get", null);
    ProQueryConditionStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], ProQueryConditionStore);
    return ProQueryConditionStore;
}(StoreBase));

export { ProQueryConditionStore };
