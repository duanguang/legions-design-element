/**
  *  legions-pro-design v0.0.28
  * (c) 2022 duanguang
  * @license MIT
  */
import React from 'react';
import './style/index.less';
import { Radio, DatePicker, Select, Input, Checkbox, Icon, Tooltip, InputNumber, Button, Col, Row } from 'antd';
import moment from 'moment';
import { bind, observer } from 'legions/store-react';
import LegionsProSelect from '../LegionsProSelect';
import LegionsStore from '../LegionsStore';
import { observable, action, StoreModules, getInjector } from 'legions/store';
import { observableViewModel } from 'legions/store-utils';
import { computed } from 'mobx';
import { cloneDeep, isNumber } from 'lodash';
import { runScriptsSdk } from 'legions-thirdparty-plugin';
import { getStorageItem, setStorageItems } from 'legions-utils-tool/storage';
import { shortHash } from 'legions-lunar/object-hash';
import { findDOMNode } from 'react-dom';
import { debounce } from 'legions-utils-tool/debounce';
import { LegionsLabeledValue } from 'legions-lunar/model';
import { isArray, isObject } from 'legions-utils-tool/type.validation';
import LegionsProDragger from '../LegionsProDragger';

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:49:31
 * @LastEditTime: 2022-03-07 16:29:14
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/store/conditionView.ts
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
        /** 下拉选择器接口请求数据 */
        this._select_data = observable.map();
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
            caches = caches.filter(function (item) { return query.find(function (id) { return id.container.uuid == item; }); });
            caches.map(function (item, _index) {
                var itmIndex = query.findIndex(function (w) { return item === w.container.uuid; });
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
            var id = item.container.uuid;
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
            if (this.query.has(item.container.uuid)) {
                this.query.set(item.container.uuid, cloneDeep(item));
            }
        }
    };
    ConditionView.prototype._getQueryItem = function (name) {
        var item = this.computedQuery.find(function (item) { return item.container.name === name; });
        if (item) {
            return this.query.get(item.container.uuid);
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
    /** 移除指定搜索条件项  */
    ConditionView.prototype._removeQuery = function (uuid) {
        return this.query.delete(uuid);
    };
    /** 设置下拉数据 */
    ConditionView.prototype._setSelectData = function (key, value) {
        this._select_data.set(key, value);
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
    ], ConditionView.prototype, "_select_data", void 0);
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
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_removeQuery", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ConditionView.prototype, "_setSelectData", null);
    return ConditionView;
}());

/*
 * @Author: duanguang
 * @Date: 2020-12-29 16:44:16
 * @LastEditTime: 2022-03-05 21:48:49
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/store/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var StoreConditions = /** @class */ (function (_super) {
    __extends(StoreConditions, _super);
    function StoreConditions(context) {
        var _this = _super.call(this, context) || this;
        _this.viewModelQuery = observableViewModel(new ConditionView());
        _this.ConditionContainer = observable.map();
        return _this;
    }
    StoreConditions.prototype.add = function (uid) {
        this.viewModelQuery = observableViewModel(new ConditionView(uid));
        this.ConditionContainer.set(uid, this.viewModelQuery);
    };
    StoreConditions.prototype.delete = function (uid) {
        this.ConditionContainer.delete(uid);
    };
    StoreConditions.prototype.get = function (uid) {
        return this.ConditionContainer.get(uid);
    };
    StoreConditions.meta = __assign({}, LegionsStore.StoreBase.meta);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], StoreConditions.prototype, "viewModelQuery", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], StoreConditions.prototype, "ConditionContainer", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], StoreConditions.prototype, "add", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], StoreConditions.prototype, "delete", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], StoreConditions.prototype, "get", null);
    StoreConditions = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], StoreConditions);
    return StoreConditions;
}(LegionsStore.StoreBase));

var ConditionSelectModel = /** @class */ (function () {
    function ConditionSelectModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionSelectModel;
}());
var ConditionTextNumberModel = /** @class */ (function () {
    function ConditionTextNumberModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionTextNumberModel;
}());
var ConditionRadioButtonModel = /** @class */ (function () {
    function ConditionRadioButtonModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionRadioButtonModel;
}());
var ConditionTextAreaModel = /** @class */ (function () {
    function ConditionTextAreaModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionTextAreaModel;
}());
var ConditionTextModel = /** @class */ (function () {
    function ConditionTextModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionTextModel;
}());
var ConditionDateModel = /** @class */ (function () {
    function ConditionDateModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionDateModel;
}());
var ConditionSearchModel = /** @class */ (function () {
    function ConditionSearchModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionSearchModel;
}());
var ConditionRangePickerModel = /** @class */ (function () {
    function ConditionRangePickerModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionRangePickerModel;
}());
var ConditionCheckBoxModel = /** @class */ (function () {
    function ConditionCheckBoxModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionCheckBoxModel;
}());
var ConditionGroupCheckBoxModel = /** @class */ (function () {
    function ConditionGroupCheckBoxModel(container, props) {
        this.container = container;
        this.props = props;
    }
    return ConditionGroupCheckBoxModel;
}());
var ProConditionsBase = /** @class */ (function () {
    function ProConditionsBase(options) {
        this.global = null;
        this.mobxStore = null;
        this.configs = {
            text: this.renderTextConfig.bind(this),
            checkBox: this.renderCheckBoxConfig.bind(this),
            groupCheckBox: this.renderGroupCheckBoxConfig.bind(this),
            rangePicker: this.renderRangePickerConfig.bind(this),
            date: this.renderDateConfig.bind(this),
            select: this.renderSelectConfig.bind(this),
            textNumber: this.renderTextNumberConfig.bind(this),
            radioButton: this.renderRadioButtonConfig.bind(this),
            textArea: this.renderTextAreaConfig.bind(this),
            search: this.renderSearchConfig.bind(this),
        };
        // super()
        if (options) {
            if (options.global) {
                this.global = options.global;
            }
            if (options.store) ;
            if (typeof options.store === 'function' && options.store.meta) {
                var stores = getInjector();
                this.mobxStore = stores.getState(options.store);
            }
        }
    }
    ProConditionsBase.prototype.createUid = function (name) {
        var timeId = new Date().getTime();
        var uid = name + "-" + shortHash("" + timeId + name);
        return uid;
    };
    ProConditionsBase.prototype.createContainerProps = function (props) {
        var id = props.name;
        if (!this[id]) {
            return __assign(__assign({}, props), { uuid: this.createUid(id) });
        }
        return this[id]['container'];
    };
    ProConditionsBase.prototype.getConditionsConfig = function (componentConfigKey) {
        return this[componentConfigKey];
    };
    ProConditionsBase.prototype.renderConfig = function (type, options) {
        //@ts-ignore
        return this.configs[type](options);
    };
    ProConditionsBase.prototype.renderSelectConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionSelectModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderTextNumberConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionTextNumberModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderRadioButtonConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionRadioButtonModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderTextAreaConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionTextAreaModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderTextConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionTextModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderDateConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionDateModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderRangePickerConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionRangePickerModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderCheckBoxConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionCheckBoxModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderGroupCheckBoxConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionGroupCheckBoxModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    ProConditionsBase.prototype.renderSearchConfig = function (options) {
        var id = options.container.name;
        this[id] = new ConditionSearchModel(this.createContainerProps(options.container), options.props);
        return this[id];
    };
    return ProConditionsBase;
}());

var RadioButton = Radio.Button;
var RadioGroup = Radio.Group;
var RangePicker = DatePicker.RangePicker;
var Option = Select.Option;
var TextArea = Input.TextArea;
var baseCls = "legions-pro-query";
var LegionsProConditions = /** @class */ (function (_super) {
    __extends(LegionsProConditions, _super);
    // @ts-ignore
    /* MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    observer= null */
    function LegionsProConditions(props) {
        var _this = _super.call(this, props) || this;
        _this.resize = debounce(function () {
            var queryDom = document.querySelector("." + _this.uid);
            if (queryDom && findDOMNode(queryDom) && _this.viewStore) {
                _this.viewStore.widthContainer = findDOMNode(queryDom).clientWidth;
            }
        }, 500);
        _this.timeId = new Date().getTime();
        _this.uid = "Query" + shortHash(_this.timeId);
        _this.queryPrams = {};
        _this.state = {
            collapsed: _this.props.defaultCollapsed,
        };
        if (_this.props['uniqueUid']) {
            _this.uid = "Query" + shortHash(_this.props['uniqueUid']);
        }
        else {
            _this.uid = "Query" + _this.props.store.ConditionContainer.size + shortHash("" + _this.timeId + _this.props.store.ConditionContainer.size);
            if (_this.props.store.ConditionContainer.has(_this.uid)) {
                _this.timeId = new Date().getTime();
                _this.uid = "Query" + _this.props.store.ConditionContainer.size + shortHash("" + _this.timeId + _this.props.store.ConditionContainer.size);
            }
        }
        return _this;
    }
    Object.defineProperty(LegionsProConditions.prototype, "viewStore", {
        //@ts-ignore
        get: function () {
            return this.props.store.ConditionContainer.get(this.uid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProConditions.prototype, "vmModel", {
        get: function () {
            return this.viewStore.computedVmModel;
        },
        enumerable: false,
        configurable: true
    });
    LegionsProConditions.prototype.componentWillMount = function () {
        var _this = this;
        if (!this.props.store.ConditionContainer.has(this.uid)) {
            this.props.store.add(this.uid);
            this.initVModel();
            this.viewStore._initQuery(this.props.query);
        }
        this.viewStore._setSize(this.props.size);
        this.props.onReady && this.props.onReady({
            store: this.props.store, uid: this.uid, viewModel: this.viewStore,
            methods: {
                reset: function () {
                    _this.handleReset();
                },
                addQuery: function (list) {
                    _this.initVModel(list);
                    _this.viewStore._initQuery(list);
                    _this.dispatchRequest(list);
                },
                removeQuery: function (uuid) {
                    return _this.viewStore._removeQuery(uuid);
                },
                setFieldsValues: function (name, callback) {
                    _this.setFieldsValues(name, callback);
                },
                getQuerySelectOption: function (name, option_key) {
                    var selectConfigs = _this.props.query.filter(function (item) { return item instanceof ConditionSelectModel; });
                    var index = selectConfigs.findIndex(function (item) { return item.container.name === name; });
                    var newData = [];
                    var curr_item = new LegionsLabeledValue();
                    if (index > -1) {
                        var item = selectConfigs[index].props;
                        newData = item.options;
                        if (item.request) {
                            var data = _this.viewStore._select_data.get(name);
                            if (data) {
                                newData = data.data;
                            }
                        }
                        var option = newData.find(function (item) { return item.value === option_key; });
                        curr_item = __assign(__assign({}, curr_item), option);
                    }
                    return {
                        curr_item: curr_item,
                        data: newData,
                    };
                },
                onSelectRequest: function (name, params) { return __awaiter(_this, void 0, void 0, function () {
                    var selectConfigs, index, props;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                selectConfigs = this.props.query.filter(function (item) { return item instanceof ConditionSelectModel && item.props['request']; });
                                index = selectConfigs.findIndex(function (item) { return item.container.name === name; });
                                if (!(index > -1)) return [3 /*break*/, 2];
                                props = selectConfigs[index].props;
                                return [4 /*yield*/, this._dispatchFetch(props, params)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2: return [2 /*return*/, {
                                    data: [],
                                    total: 0,
                                }];
                        }
                    });
                }); }
            }
        });
    };
    LegionsProConditions.prototype.componentDidMount = function () {
        var queryDom = document.querySelector("." + this.uid);
        var store = this.props.store.get(this.uid);
        if (queryDom && store) {
            this.onDidMount();
            window.addEventListener && window.addEventListener('resize', this.resize.bind(this));
        }
        this.dispatchRequest();
    };
    LegionsProConditions.prototype.componentWillReceiveProps = function (nextProps) {
    };
    LegionsProConditions.prototype.componentWillUnmount = function () {
        if (!this.props['uniqueUid']) {
            this.props.store.delete(this.uid);
        }
        window.removeEventListener && window.removeEventListener('resize', this.resize.bind(this));
    };
    LegionsProConditions.prototype.componentDidUpdate = function () {
        this.onDidMount();
    };
    LegionsProConditions.prototype._dispatchFetch = function (props, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (props === null || props === void 0 ? void 0 : props.request(params))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LegionsProConditions.prototype.dispatchRequest = function (query) {
        if (query === void 0) { query = this.props.query; }
        return __awaiter(this, void 0, void 0, function () {
            var select_fetch;
            var _this = this;
            return __generator(this, function (_a) {
                select_fetch = query.filter(function (item) { return item instanceof ConditionSelectModel && item.props['request']; });
                return [2 /*return*/, select_fetch.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                        var props, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    props = item.props;
                                    return [4 /*yield*/, this._dispatchFetch(props)];
                                case 1:
                                    result = _a.sent();
                                    this.viewStore._setSelectData(item.container.name, result);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    LegionsProConditions.prototype.onDidMount = function () {
        var queryDom = document.querySelector("." + this.uid);
        var store = this.props.store.get(this.uid);
        if (queryDom && store) {
            if (findDOMNode(queryDom).clientHeight) {
                store.domHeight = findDOMNode(queryDom).clientHeight;
                store.widthContainer = findDOMNode(queryDom).clientWidth;
                this.props.onDidMount && this.props.onDidMount({ uid: this.uid, height: store.domHeight });
            }
        }
    };
    LegionsProConditions.prototype.setFieldsValues = function (name, callback) {
        this.viewStore._setQueryState(name, function (value) {
            callback(value);
        });
    };
    LegionsProConditions.prototype.mapPrams = function (item, data, prams) {
        var _a;
        var jsonProperty = ((_a = item.props) === null || _a === void 0 ? void 0 : _a.jsonProperty) || item.container.name;
        if (Array.isArray(jsonProperty) && jsonProperty.length === 2) {
            if (item instanceof ConditionRangePickerModel) {
                var startTime = data && data[0] || '';
                var endTime = data && data[1] || '';
                var format = item.props.transformFormat || 'YYYY-MM-DD';
                prams[jsonProperty[0].trim()] = startTime && moment(startTime).format(format);
                prams[jsonProperty[1].trim()] = endTime && moment(endTime).format(format);
            }
            else if (item instanceof ConditionSelectModel) {
                if (item.props.labelInValue) {
                    var key = '';
                    var label = '';
                    if (Array.isArray(data)) {
                        prams[item.container.name] = data;
                    }
                    else {
                        key = data && data['key'] || '';
                        label = data && data['label'] || '';
                        prams[jsonProperty[0].trim()] = key;
                        prams[jsonProperty[1].trim()] = label;
                    }
                }
                else {
                    prams[jsonProperty[0].trim()] = data;
                }
            }
            else {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('if the components is not Select Or RangePicker, "jsonProperty" should be string without "[]" ');
                }
            }
        }
        else {
            prams[jsonProperty] = data;
        }
        return prams;
    };
    LegionsProConditions.prototype.initVModel = function (query) {
        var _this = this;
        if (query === void 0) { query = this.props.query; }
        var data = {};
        var prams = {};
        query.map(function (item) {
            var name = item.container.name;
            if (!(item instanceof ConditionSearchModel)) {
                if (isArray(item.props.defaultValue)) {
                    if (item instanceof ConditionRangePickerModel) {
                        data[name] = item.props.defaultValue.map(function (m) {
                            if (moment.isMoment(m)) {
                                return moment(m).format(item.props.format || 'YYYY-MM-DD HH:mm:ss');
                            }
                            return m;
                        });
                    }
                    else {
                        data[name] = __spread(item.props.defaultValue);
                    }
                }
                else {
                    var defaultValue = item.props.defaultValue;
                    var value = item.props.value;
                    if (item instanceof ConditionCheckBoxModel) {
                        defaultValue = item.props.defaultChecked;
                        value = item.props.checked || item.props.value;
                    }
                    var newValue = null;
                    if (item instanceof ConditionDateModel) {
                        var format = item.props.format || 'YYYY-MM-DD HH:mm:ss';
                        if (moment.isMoment(defaultValue)) {
                            newValue = moment(defaultValue).format(format);
                        }
                        else if (moment.isMoment(value)) {
                            newValue = moment(value).format(format);
                        }
                        data[name] = newValue;
                    }
                    else if (item instanceof ConditionRangePickerModel) {
                        data[name] = ['', ''];
                    }
                    else {
                        data[name] = defaultValue || value;
                    }
                }
                prams = _this.mapPrams(item, data[name], prams);
            }
        });
        this.queryPrams = prams;
        this.viewStore._setVmModel(data);
    };
    /**
     * 把组件元素结果映射至查询条件
     *
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.mapQueryValue = function () {
        var _this = this;
        var computedQuery = this.viewStore.computedQuery;
        var prams = this.queryPrams;
        computedQuery.map(function (item) {
            if (!(item instanceof ConditionSearchModel)) {
                prams = _this.mapPrams(item, _this.vmModel[item.container.name], prams);
            }
        });
        this.queryPrams = prams;
    };
    LegionsProConditions.prototype.reset = function () {
        var _this = this;
        var data = this.vmModel;
        /* let data = {...this.viewStore.computedVmModel} */
        var computedQuery = this.viewStore.computedQuery;
        Object.keys(data).forEach(function (key) {
            var entity = computedQuery.find(function (item) { return item.container.name === key; });
            if (entity && !(entity instanceof ConditionSearchModel) && !entity.props.isNotReset) {
                if (entity.props.onReset) {
                    data[key] = entity.props.onReset(key, data[key]);
                }
                else {
                    var defaultValue_1 = entity.props.defaultValue;
                    var format = entity.props['format'] || 'YYYY-MM-DD';
                    if (moment.isMoment(defaultValue_1)) {
                        data[key] = moment(defaultValue_1).format(format);
                    }
                    else if (Array.isArray(defaultValue_1) && defaultValue_1.length >= 2) {
                        data[key] = [moment(defaultValue_1[0]).format(format), moment(defaultValue_1[1]).format(format)];
                    }
                    else if (entity instanceof ConditionCheckBoxModel) {
                        data[key] = entity.props.defaultChecked;
                        defaultValue_1 = data[key];
                    }
                    else {
                        data[key] = defaultValue_1 || '';
                    }
                    _this.setFieldsValues(entity.container.name, function (value) {
                        if (value instanceof ConditionCheckBoxModel) {
                            value.props.checked = defaultValue_1;
                        }
                        else {
                            value.props['value'] = defaultValue_1;
                        }
                    });
                }
            }
        });
        this.viewStore._setVmModel(data);
        this.mapQueryValue();
    };
    LegionsProConditions.prototype.handleChangeDate = function (component, datas, dateString) {
        var name = component.container.name;
        var data = this.vmModel;
        this.setFieldsValues(name, function (value) {
            value.props['value'] = datas;
        });
        data[name] = dateString;
        if (component instanceof ConditionDateModel) {
            component.props.onChange && component.props.onChange.call(this, {
                date: datas,
                dateString: dateString
            }, {
                state: cloneDeep(data),
                parameter: cloneDeep(this.queryPrams),
            }, this.viewStore);
        }
        else if (component instanceof ConditionRangePickerModel) {
            component.props.onChange && component.props.onChange.call(this, {
                date: datas,
                dateString: dateString
            }, {
                state: cloneDeep(data),
                parameter: cloneDeep(this.queryPrams),
            }, this.viewStore);
        }
        this.viewStore._setVmModel(data);
    };
    LegionsProConditions.prototype.handleChangeChx = function (component, even) {
        var value = even.target.checked;
        var data = this.vmModel;
        var name = component.container.name;
        data[name] = value;
        this.setFieldsValues(name, function (values) {
            values.props.checked = value;
        });
        component.props.onChange && component.props.onChange.call(this, even, {
            state: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.viewStore._setVmModel(data);
    };
    LegionsProConditions.prototype.handleSelectSearch = function (component, value) {
        var props = component.props;
        props.onSearch && props.onSearch(value);
    };
    LegionsProConditions.prototype.handleChangeSelect = function (component, value, packingValue) {
        var props = component.props;
        var name = component.container.name;
        var data = this.vmModel;
        data[name] = value;
        this.setFieldsValues(name, function (value) {
            value.props.value = data[name];
        });
        props.onChange && props.onChange.call(this, value, {
            state: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
            packingValue: packingValue,
        }, this.viewStore);
        this.viewStore._setVmModel(data);
    };
    /**
     * 重置数据
     *
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleReset = function () {
        this.reset();
        this.mapQueryValue();
        var item = this.viewStore.computedQuery.find(function (item) { return item instanceof ConditionSearchModel; });
        if (item && item instanceof ConditionSearchModel) {
            item.props.onReset && item.props.onReset.call(this, cloneDeep(this.queryPrams), this.viewStore);
        }
    };
    /**
     * 搜索事件
     *
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleSearch = function () {
        this.mapQueryValue();
        var item = this.viewStore.computedQuery.find(function (item) { return item instanceof ConditionSearchModel; });
        if (item && item instanceof ConditionSearchModel) {
            item.props.onSearch && item.props.onSearch.call(this, cloneDeep(this.queryPrams), this.viewStore);
        }
    };
    /**
     * 回车搜索
     *
     * @param {Function} onEnter
     * @memberof QueryConditions
     */
    LegionsProConditions.prototype.handleEnter = function (com) {
        var onEnter = com.props['onEnter'];
        onEnter && onEnter.call(this, {
            state: cloneDeep(this.vmModel),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.handleSearch();
    };
    LegionsProConditions.prototype.handleToggle = function () {
        var _this = this;
        var onToggle = function (toggle) {
            var queryDom = document.querySelector("." + _this.uid);
            var height = findDOMNode(queryDom).clientHeight;
            _this.viewStore.domHeight = height;
            _this.props.onCollapse && _this.props.onCollapse(toggle, _this.viewStore);
            _this.props.onDidMount && _this.props.onDidMount({ height: height, uid: _this.uid });
        };
        if (this.state.collapsed) {
            this.setState({
                collapsed: false
            }, function () {
                onToggle(false);
            });
        }
        else {
            this.setState({
                collapsed: true
            }, function () {
                onToggle(true);
            });
        }
    };
    LegionsProConditions.prototype.formatTrim = function (str) {
        if (str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        }
        return str;
    };
    LegionsProConditions.prototype.handleChange = function (component, even) {
        var value = even;
        var name = component.container.name;
        var props = component.props;
        if (typeof even === 'object') {
            value = even.target.value;
        }
        var data = this.vmModel;
        data[name] = value;
        if (component instanceof ConditionTextModel) {
            data[name] = this.formatTrim(value);
        }
        this.setFieldsValues(name, function (value) {
            value.props['value'] = data[name];
        });
        props['onChange'] && props.onChange.call(this, even, {
            viewState: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.viewStore._setVmModel(data);
    };
    LegionsProConditions.prototype.handleGroupChxBox = function (component, checkedValue) {
        var data = this.vmModel;
        var name = component.container.name;
        data[name] = checkedValue;
        this.setFieldsValues(name, function (value) {
            value.props.value = checkedValue;
        });
        component.props.onChange && component.props.onChange.call(this, checkedValue, {
            state: cloneDeep(data),
            parameter: cloneDeep(this.queryPrams),
        }, this.viewStore);
        this.viewStore._setVmModel(data);
    };
    LegionsProConditions.prototype.renderComponent = function (component) {
        if (component instanceof ConditionTextAreaModel) {
            return this.renderInputTextArea(component);
        }
        else if (component instanceof ConditionTextModel) {
            return this.renderInput(component);
        }
        else if (component instanceof ConditionSelectModel) {
            return this.renderSelect(component);
        }
        else if (component instanceof ConditionDateModel) {
            return this.renderDate(component);
        }
        else if (component instanceof ConditionRangePickerModel) {
            return this.renderDateRange(component);
        }
        else if (component instanceof ConditionCheckBoxModel) {
            return this.renderChxBox(component);
        }
        else if (component instanceof ConditionTextNumberModel) {
            return this.renderInputNumber(component);
        }
        else if (component instanceof ConditionRadioButtonModel) {
            return this.renderRadioButton(component);
        }
        else if (component instanceof ConditionSearchModel) {
            return this.renderSearch(component);
        }
        else if (component instanceof ConditionGroupCheckBoxModel) {
            return this.renderGroupChxBox(component);
        }
        else {
            throw new Error("\n            ProConditions: Unknown query. query = " + JSON.stringify(component));
        }
    };
    LegionsProConditions.prototype.renderGroupChxBox = function (component) {
        var props = component.props, container = component.container;
        var defaultValue = props.defaultValue, visable = props.visable, display = props.display, _a = props.value, value = _a === void 0 ? defaultValue : _a, prop = __rest(props, ["defaultValue", "visable", "display", "value"]);
        return React.createElement(Checkbox.Group, __assign({}, prop, { value: value, onChange: this.handleGroupChxBox.bind(this, component) }));
    };
    LegionsProConditions.prototype.renderInput = function (component) {
        var _this = this;
        var props = component.props, container = component.container;
        var placeholder = props.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var defaultValue = props.defaultValue, _a = props.value, value = _a === void 0 ? defaultValue : _a, visable = props.visable, display = props.display, prop = __rest(props, ["defaultValue", "value", "visable", "display"]);
        var suffix = value ? React.createElement(Icon, { type: "close-circle", onClick: function () {
                var state = _this.vmModel;
                state[container.name] = '';
                _this.setFieldsValues(container.name, function (value) {
                    value.props.value = '';
                });
                _this.viewStore._setVmModel(state);
                _this.mapQueryValue();
            } }) : null;
        return (React.createElement(Tooltip, { trigger: "focus", title: (this.formatTrim(value)) ? React.createElement("pre", null, value.replace('↵', ',')) : null, placement: "topLeft" },
            React.createElement(Input, __assign({ maxLength: '50', suffix: suffix }, prop, { value: value, onPressEnter: this.handleEnter.bind(this, component), onChange: this.handleChange.bind(this, component), placeholder: placeholder }))));
    };
    LegionsProConditions.prototype.renderInputTextArea = function (component) {
        var props = component.props;
        var placeholder = props.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var defaultValue = props.defaultValue, _a = props.value, value = _a === void 0 ? defaultValue : _a, visable = props.visable, display = props.display, prop = __rest(props, ["defaultValue", "value", "visable", "display"]);
        var themProps = __rest(prop, ["onReset"]);
        var onEnter = props.onEnter;
        return (React.createElement(Tooltip, { overlayClassName: "legions-pro-query-tooltip", trigger: "focus", title: (this.formatTrim(value)) ? React.createElement("pre", null, value.replace('↵', ',')) : null, placement: "topLeft" },
            React.createElement(TextArea, __assign({ maxLength: 1500, autosize: { minRows: 1, maxRows: 1 } }, themProps, { value: value, onPressEnter: this.handleEnter.bind(this, onEnter), onChange: this.handleChange.bind(this, component), placeholder: placeholder }))));
    };
    LegionsProConditions.prototype.renderSelect = function (component) {
        var _a;
        var props = component.props, container = component.container;
        var jsonProperty = props.jsonProperty;
        if (process.env.NODE_ENV !== 'production') {
            if (Array.isArray(jsonProperty) && !props.labelInValue) {
                console.error('LegionsProCondition的Select组件未开启labelInValue时,参数jsonProperty建议不要使用带,(逗号)的字符串格式');
                console.error('when the Select components of the LegionsProCondition is not used "labelInValue", "jsonProperty" should be string without "," ');
            }
        }
        var placeholder = props.placeholder;
        var newData = props.options;
        var defaultValue = props.defaultValue, visable = props.visable, display = props.display, _b = props.value, value = _b === void 0 ? defaultValue : _b, prop = __rest(props, ["defaultValue", "visable", "display", "value"]);
        var firstActiveValue = newData.length > 0 ? ["" + ((_a = newData[0]) === null || _a === void 0 ? void 0 : _a.key)] : '';
        var data = this.viewStore._select_data.get(container.name);
        if (data && prop.request) {
            newData = data.data;
        }
        return (
        // @ts-ignore mode 为tags时，可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配
        React.createElement("div", null,
            React.createElement(LegionsProSelect
            // notFoundContent={prop.loading? <Spin size="small" /> : null}
            , __assign({}, prop, { style: { width: '100%' }, placeholder: placeholder, onSearch: this.handleSelectSearch.bind(this, component), onChange: this.handleChangeSelect.bind(this, component), value: value, options: newData, allowClear: true, showSearch: true, defaultActiveFirstOption: true, optionFilterProp: "children" }))));
    };
    LegionsProConditions.prototype.renderDate = function (component) {
        var props = component.props;
        var placeholder = props.placeholder;
        var defaultValue = props.defaultValue, visable = props.visable, display = props.display, _a = props.value, value = _a === void 0 ? defaultValue : _a, prop = __rest(props, ["defaultValue", "visable", "display", "value"]);
        return (React.createElement(DatePicker, __assign({}, prop, { style: { width: '100%' }, placeholder: placeholder, value: value, onChange: this.handleChangeDate.bind(this, component) })));
    };
    LegionsProConditions.prototype.renderDateRange = function (component) {
        var props = component.props;
        var defaultValue = props.defaultValue, visable = props.visable, display = props.display, _a = props.value, value = _a === void 0 ? defaultValue : _a, prop = __rest(props, ["defaultValue", "visable", "display", "value"]);
        var placeholder = { placeholder: ['', ''] };
        if (props.placeholder) {
            placeholder = { placeholder: props.placeholder };
        }
        return (React.createElement(RangePicker, __assign({ allowClear: true }, prop, { value: value, onChange: this.handleChangeDate.bind(this, component) }, placeholder)));
    };
    LegionsProConditions.prototype.renderChxBox = function (component) {
        var props = component.props;
        var visable = props.visable, display = props.display, value = props.value, defaultChecked = props.defaultChecked, prop = __rest(props, ["visable", "display", "value", "defaultChecked"]);
        return (React.createElement(Checkbox, __assign({}, prop, { defaultChecked: defaultChecked, onChange: this.handleChangeChx.bind(this, component) }), props.label));
    };
    LegionsProConditions.prototype.renderInputNumber = function (component) {
        var _this = this;
        var props = component.props;
        var defaultValue = props.defaultValue, display = props.display, visable = props.visable, prop = __rest(props, ["defaultValue", "display", "visable"]);
        var placeholder = props.placeholder;
        if (this.viewStore && this.viewStore.computedSize === 'small') {
            placeholder = '';
        }
        var onEnter = props.onEnter;
        /* const vmValue  = this.viewStore.computedVmModel[JsonProperty.name] */
        return (React.createElement(InputNumber, __assign({}, prop, { onKeyDown: function (value) {
                if (value && value['key'] && value['key'] === 'Enter') {
                    _this.handleEnter.call(_this, onEnter);
                }
            }, defaultValue: defaultValue, style: { width: '100%' }, onChange: this.handleChange.bind(this, component), placeholder: placeholder })));
    };
    LegionsProConditions.prototype.renderRadioButton = function (component) {
        var props = component.props, container = component.container;
        var defaultValue = props.defaultValue, display = props.display, options = props.options, visable = props.visable, prop = __rest(props, ["defaultValue", "display", "options", "visable"]);
        var newData = options;
        return (React.createElement(RadioGroup, __assign({}, prop, { style: { width: '100%' }, defaultValue: defaultValue, onChange: this.handleChange.bind(this, component) }), newData && newData.map(function (item) {
            return (React.createElement(RadioButton, { key: item.value + "-" + container.name, disabled: item.disabled, value: item.value }, item.label));
        })));
    };
    LegionsProConditions.prototype.renderSearch = function (component) {
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "legions-pro-query-search" },
                React.createElement(Button, { type: "primary", icon: 'search', onClick: this.handleSearch.bind(this) }, component.props.searchText || '搜索'),
                React.createElement(Button, { className: "query-reset-btn", type: "primary", ghost: true, icon: "sync", onClick: this.handleReset.bind(this) }, component.props.resetText || '重置'),
                React.createElement(Button, { type: "primary", ghost: true, icon: this.state.collapsed ? 'down' : 'up', onClick: this.handleToggle.bind(this) }, this.state.collapsed ? '收起' : '展开')));
    };
    LegionsProConditions.prototype.renderLabel = function (component) {
        if (!(component instanceof ConditionSearchModel) && !(component instanceof ConditionCheckBoxModel) && !(component instanceof ConditionGroupCheckBoxModel)) {
            var label = component.props.label;
            var name_1 = component.container.name;
            return (this.viewStore.computedSize !== 'small' ? React.createElement(Col, { className: "legions-pro-query-label" },
                React.createElement("label", { htmlFor: name_1, title: label, style: { lineHeight: '28px', right: '0px' } }, label)) :
                React.createElement("label", { htmlFor: name_1, title: label, style: {
                        marginLeft: '5px', marginRight: '3px',
                        position: 'absolute', zIndex: 999, background: '#fff',
                        height: '20px', lineHeight: '20px',
                        color: '#999', top: '-11px', fontSize: 10,
                        WebkitTransform: 'scale(0.9)'
                    } },
                    label,
                    ":"));
        }
        return null;
    };
    LegionsProConditions.prototype.getQueryItemSpan = function (item) {
        var _this = this;
        /** 直接从query组件传入的全局col属性计算 */
        var parentColCompute = function () {
            var col = _this.props.col;
            if (isNumber(col)) {
                return col * (item.container.colNum || 1);
            }
            else {
                return col[_this.viewStore.compuedResolution] * (item.container.colNum || 1);
            }
        };
        // 如果子项有传递col属性，则取子项配置，没有则取组件props中的col属性
        if (item.container.col) {
            var Resolution = item.container.col[this.viewStore.compuedResolution];
            if (isNumber(Resolution)) {
                return Resolution;
            }
            else if (isObject(Resolution)) {
                return Resolution['span'];
            }
            else {
                return parentColCompute();
            }
        }
        else {
            return parentColCompute();
        }
    };
    LegionsProConditions.prototype.renderSearchComponent = function () {
        var searchItem = this.viewStore.computedQuery.find(function (item) { return item instanceof ConditionSearchModel; });
        var show = [];
        if (searchItem && !Array.isArray(searchItem)) {
            show.push(searchItem);
        }
        return this.renderQueryComponent(show);
    };
    LegionsProConditions.prototype.renderShowComponent = function (hide) {
        var _this = this;
        var searchItem = this.viewStore.computedQuery.find(function (item) { return item instanceof ConditionSearchModel; });
        var searchSpan = 0;
        if (searchItem && !Array.isArray(searchItem)) {
            searchSpan = this.getQueryItemSpan(searchItem);
        }
        var unUsedSpan = 24 - searchSpan;
        var show = [];
        this.viewStore.computedQuery.filter(function (item) { return !(item instanceof ConditionSearchModel); }).map(function (item) {
            var currSpan = _this.getQueryItemSpan(item);
            var visable = item.props['visable'];
            visable = visable === void 0 ? true : visable;
            if (unUsedSpan >= currSpan && visable) {
                show.push(item);
                unUsedSpan = unUsedSpan - currSpan;
            }
            else {
                hide.push(item);
            }
        });
        return this.renderQueryComponent(show);
    };
    LegionsProConditions.prototype.renderCollapsed = function (list) {
        var show = [];
        list.map(function (item) {
            var visable = item.props['visable'];
            visable = visable === void 0 ? true : visable;
            if (visable) {
                show.push(item);
            }
        });
        return this.renderQueryComponent(show);
    };
    LegionsProConditions.prototype.renderQueryComponent = function (list) {
        var _this = this;
        return list.map(function (item) {
            var _a = item.container.col || {}, offset = _a.offset, pull = _a.pull, push = _a.push, md = _a.md, xl = _a.xl, lg = _a.lg, sm = _a.sm, xs = _a.xs, col = __rest(_a, ["offset", "pull", "push", "md", "xl", "lg", "sm", "xs"]);
            var span = _this.getQueryItemSpan(item);
            var colspan = { span: span };
            var uid = item.container.uuid;
            var _b = item.container, _c = _b.className, className = _c === void 0 ? '' : _c, _d = _b.style, style = _d === void 0 ? {} : _d, onClick = _b.onClick;
            var click = {};
            if (onClick) {
                click['onClick'] = onClick.bind(_this, { uid: uid, name: item.container.name });
            }
            return React.createElement(Col, __assign({}, col, colspan, click, { className: "legions-pro-query-item " + className, "data-id": uid, "data-name": item.container.name, key: uid, style: __assign({}, style) }),
                _this.renderLabel(item),
                React.createElement("div", { style: { lineHeight: '28px' }, className: "legions-pro-query-field" }, _this.renderComponent(item)));
        });
    };
    LegionsProConditions.prototype.renderContent = function () {
        var hide = [];
        return React.createElement(React.Fragment, null,
            this.renderShowComponent(hide),
            this.renderSearchComponent(),
            this.state.collapsed && this.renderCollapsed(hide));
    };
    LegionsProConditions.prototype.render = function () {
        var _this = this;
        var _a = this.props.draggerProps, draggerProps = _a === void 0 ? {} : _a;
        var _b = draggerProps.options, onChange = draggerProps.onChange, prop = __rest(draggerProps, ["options", "onChange"]);
        return (React.createElement(Row, { className: baseCls + " " + this.uid, gutter: 8, type: "flex" }, this.props.isDragSort ? React.createElement(LegionsProDragger, __assign({ options: __assign(__assign({ animation: 150 }, draggerProps.options), { group: {
                    name: 'ProConditions',
                    pull: true,
                    put: true,
                } }), onChange: function (items, sort, evt) {
                /* const dataId = evt.item.attributes['data-id'];
                const dataName = evt.item.attributes['data-name']; */
                var query = [];
                if (items.length && items.length === _this.viewStore.computedQuery.length) { // 内部拖拽排序
                    items.map(function (item) {
                        var view = _this.viewStore.computedQuery.find(function (s) { return s.container.uuid === item; });
                        if (view) {
                            query.push(view);
                        }
                    });
                    _this.viewStore._clearQuery();
                    _this.viewStore._initQuery(query);
                }
                if (typeof onChange === 'function') {
                    onChange(items, sort, evt);
                }
            } }, prop), this.renderContent()) : this.renderContent()));
    };
    /* search =debounce((options,val)=>{
       options&&options.props.onSearch&&options.props.onSearch(val)
    },200) */
    LegionsProConditions.ProConditionsBase = ProConditionsBase;
    LegionsProConditions.ConditionSelectModel = ConditionSelectModel;
    LegionsProConditions.ConditionTextNumberModel = ConditionTextNumberModel;
    LegionsProConditions.ConditionRadioButtonModel = ConditionRadioButtonModel;
    LegionsProConditions.ConditionTextAreaModel = ConditionTextAreaModel;
    LegionsProConditions.ConditionTextModel = ConditionTextModel;
    LegionsProConditions.ConditionDateModel = ConditionDateModel;
    LegionsProConditions.ConditionSearchModel = ConditionSearchModel;
    LegionsProConditions.ConditionRangePickerModel = ConditionRangePickerModel;
    LegionsProConditions.ConditionCheckBoxModel = ConditionCheckBoxModel;
    LegionsProConditions.ConditionGroupCheckBoxModel = ConditionGroupCheckBoxModel;
    LegionsProConditions.defaultProps = {
        size: 'default',
        col: 6,
        defaultCollapsed: true,
    };
    LegionsProConditions = __decorate([
        bind({ store: StoreConditions }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProConditions);
    return LegionsProConditions;
}(React.Component));

/*
 * @Author: duanguang
 * @Date: 2021-01-04 16:30:32
 * @LastEditTime: 2021-04-02 10:20:29
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

export default LegionsProConditions;
