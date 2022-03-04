/**
  *  legions-pro-design v0.0.25
  * (c) 2022 duanguang
  * @license MIT
  */
import React from 'react';
import ReactDOM, { unmountComponentAtNode, findDOMNode, unstable_renderSubtreeIntoContainer } from 'react-dom';
import { message, Menu, Button, Icon, Dropdown, Row, Col, Table } from 'antd';
import './style/index.less';
import { bind, observer } from 'legions/store-react';
import LegionsStore from '../LegionsStore';
import { observable as observable$1, action as action$1, StoreModules } from 'legions/store';
import { observableViewModel } from 'legions/store-utils';
import { shortHash } from 'legions-lunar/object-hash';
import { isObservableArray, observable, computed, action, runInAction, toJS } from 'mobx';
import LegionsModels from '../LegionsModels';
import { editTableColumns, queryTableColumns } from '../services';
import { mobxVersion } from 'brain-store-utils';
import { compare } from 'legions-utils-tool/object.utils';
import { warningOnce } from 'legions-utils-tool';
import { debounce } from 'legions-utils-tool/debounce';
import moment from 'moment';
import LegionsProTableCustomColumns from '../LegionsProTableCustomColumns';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
import { runScriptsSdk } from 'legions-thirdparty-plugin';

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

var ProTableView = /** @class */ (function () {
    function ProTableView(modulesName, uid, user) {
        var _this = this;
        this.userInfo = null;
        this.uid = '';
        /**
         * table 页码
         *
         * @memberof ProTableView
         */
        this.pageIndex = 1;
        /**
         * table 页大小
         *
         * @memberof ProTableView
         */
        this.pageSize = 20;
        /**
         * 行选中数据
         *
         * @memberof ProTableView
         */
        this.selectedRowKeys = [];
        /**
         *
         * 展开行数据
         * @memberof ProTableView
         */
        this._expandRow = '';
        /**
         *
         * 表格行选中方式
         * @memberof ProTableView
         */
        this._type = null;
        /**
         * 表格行单击选中方式
         *
         * @memberof ProTableView
         */
        this._rowSelectionClickType = null;
        /**
         * 表格列配置
         *
         * @memberof ModalView
         */
        this.columns = null;
        /**
         * 用于显示列信息列表  table组件内部处理，外部请勿修改数据
         *
         * @type {IShowColumns[]}
         * @memberof ProTableView
         */
        this.showColumns = [];
        /**
         * 隐藏的列信息 ，不显示
         *
         * @private
         * @type {IShowColumns[]}
         * @memberof ProTableView
         */
        this.unShowColumns = [];
        /**
         * 显示列缓存键名
         *
         * @private
         * @memberof ProTableView
         */
        this.localStorageShowColumnsKeys = '';
        /**
         * 服务端存储列设置信息
         *
         * @private
         * @memberof ProTableView
         */
        this._obTableListCustom = new LegionsModels.TableColumnsContainerEntity();
        /**
         *
         * table 模块名称，如果设置此值，请保持绝对唯一
         * 要求唯一原因，会根据此名称生成hash用作自定义列缓存信息键名
         * @type {string}
         * @memberof ProTableView
         */
        this.tableModulesName = '';
        /**
         * table 列表数据渲染后的dom 高度，这个数据时根据真实数据得到，请勿人为修改
         *
         * @memberof ProTableView
         */
        this.tableBodyDomClientHeight = 0;
        /**
         * 当外部组件跟table 处于同一容器组件，存储每个组件高度值
         *
         * @memberof ProTableView
         */
        // @ts-ignore
        this.bodyExternalContainer = observable.map();
        /**
         * table 高度是否自适应
         *
         * @memberof ProTableView
         */
        this.isAdaptiveHeight = false;
        /**
         * 存储动态添加表格行的数据
         *
         * @type {any[]}
         * @memberof ProTableView
         */
        this.tempDynamicAddData = [];
        /**
         * 需要圈定的table 容器 高度 ，默认document.body.clientHeight 取，可以动态设置
         *
         * @memberof ProTableView
         */
        this.bodyContainerHeight = document.body.clientHeight;
        /**
         * 内部判定使用，私有变量，外部请勿修改
         *
         * @type {boolean}
         * @memberof ProTableView
         */
        this._pagination = true;
        /**
         * 外部容器需要扣除的
         *
         * @memberof ProTableView
         */
        this.bodyExternalHeight = 0;
        /**
         * 用于渲染的表格数据,私有变量，外部请勿操作
         *
         * @memberof ProTableView
         */
        this._renderData = [];
        this.total = 0;
        /**
         * 查询条件
         * @memberof ProTableView
         */
        this.queryParams = null;
        /**
         *
         * 是否开启行单击选中数据，内部私有数据，请勿调用
         *
         * 默认值 true(开启)
         * @memberof ProTableView
         */
        this._isOpenRowChange = true;
        /** 是否开启行选中功能，比如开启checkbox ，radio */
        this._isOpenRowSelection = true;
        /**
         * 表格容器宽度,私有变量
         *
         * @memberof ProTableView
         */
        this._tableContainerWidth = 0;
        this._uniqueKey = '';
        this.bodyExternalContainer.observe(function (chan) {
            runInAction(function () {
                if (mobxVersion === 'v4') {
                    // @ts-ignore
                    if (_this.bodyExternalContainer.values().length) {
                        // @ts-ignore
                        var total = _this.bodyExternalContainer
                            .values()
                            //@ts-ignore
                            .reduce(function (total, currentValue) {
                            return {
                                height: total.height + currentValue.height,
                            };
                        });
                        _this.bodyExternalHeight = total.height;
                    }
                }
                else if (mobxVersion === 'v3') {
                    var values_1 = [];
                    _this.bodyExternalContainer.forEach(function (item, key) {
                        values_1.push(item);
                    });
                    if (values_1.length) {
                        var total = values_1.reduce(function (total, currentValue) {
                            return {
                                height: total.height + currentValue.height,
                            };
                        });
                        _this.bodyExternalHeight = total.height;
                    }
                }
            });
        });
        runInAction(function () {
            _this.tableModulesName = modulesName || '';
            _this.uid = uid;
            _this.userInfo = user;
        });
    }
    Object.defineProperty(ProTableView.prototype, "computedUid", {
        get: function () {
            return this.uid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableView.prototype, "computedSelectedRows", {
        /**
        * 行选中详细数据
        */
        get: function () {
            var _this = this;
            if ((Array.isArray(this._renderData) || isObservableArray(this._renderData)) && this._renderData.length) {
                //@ts-ignore
                var newSelectedRows = this._renderData.filter(function (v) { return _this.selectedRowKeys.includes(v[_this._uniqueKey]); });
                return newSelectedRows;
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableView.prototype, "calculateBody", {
        get: function () {
            var bodyStyle = {};
            var paginationHeight = this._pagination ? 64 : 0;
            var maxHeight = this.bodyContainerHeight - this.bodyExternalHeight - paginationHeight;
            if (bodyStyle['maxHeight']) {
                if (bodyStyle['maxHeight'] !== maxHeight) {
                    bodyStyle['maxHeight'] = maxHeight.toString() + "px";
                    bodyStyle['minHeight'] = maxHeight.toString() + "px";
                    bodyStyle = Object.assign({}, bodyStyle);
                }
            }
            else {
                bodyStyle['maxHeight'] = maxHeight.toString() + "px";
                bodyStyle['minHeight'] = maxHeight.toString() + "px";
                bodyStyle = Object.assign({}, bodyStyle);
            }
            return bodyStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableView.prototype, "computedShowColumns", {
        /**
         * 显示列
         *
         * @readonly
         * @memberof ProTableView
         */
        get: function () {
            return this.showColumns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableView.prototype, "computedUnShowColumns", {
        /**
         * 隐藏列
         *
         * @readonly
         * @memberof ProTableView
         */
        get: function () {
            return this.unShowColumns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableView.prototype, "computedStorageShowColumnsKeys", {
        /**
         *
         * 显示列缓存键名
         * @readonly
         * @memberof ProTableView
         */
        get: function () {
            return this.localStorageShowColumnsKeys;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableView.prototype, "computedRenderColumns", {
        /**
         * 需要显示的table 列信息
         *
         * @readonly
         * @memberof ProTableView
         */
        get: function () {
            var _this = this;
            var setTableContainerWidth = function () {
                var table = document.querySelector("." + _this.uid);
                if (table && table.getElementsByClassName('ant-table-body')) {
                    var tableBody = table.getElementsByClassName('ant-table-body');
                    if (tableBody &&
                        tableBody instanceof HTMLCollection &&
                        tableBody.length) {
                        var width_1 = tableBody[0].clientWidth;
                        return width_1;
                    }
                }
                return 0;
            };
            if (this.computedShowColumns.length) {
                var renderColumns_1 = [];
                this.computedShowColumns.map(function (item) {
                    var entity = _this.columns.find(function (m) { return m.dataIndex === item.dataIndex; });
                    if (entity) {
                        renderColumns_1.push(entity);
                    }
                });
                var res_1 = renderColumns_1.reduce(function (total, currentValue) {
                    return {
                        width: parseInt(total.width, 10) +
                            parseInt(currentValue.width, 10),
                    };
                }, { width: 0 });
                if (this._tableContainerWidth > res_1['width']) {
                    // 当前分辨率如果足够放下表格列信息，则不需要固定列，删除固定列配置
                    renderColumns_1 = [];
                    this.computedShowColumns.map(function (item) {
                        var entity = _this.columns.find(function (m) { return m.dataIndex === item.dataIndex; });
                        if (entity) {
                            var newEntity = __assign({}, entity);
                            delete newEntity['fixed'];
                            renderColumns_1.push(newEntity);
                        }
                    });
                }
                return renderColumns_1;
            }
            var columns = this.columns
                ? this.columns.filter(function (item) { return !item.noChecked; })
                : [];
            var res = columns.reduce(function (total, currentValue) {
                return {
                    width: parseInt(total.width, 10) +
                        parseInt(currentValue.width, 10),
                };
            }, { width: 0 });
            var width = this._tableContainerWidth || setTableContainerWidth();
            if (width >= res['width']) {
                return columns.map(function (item) {
                    delete item['fixed'];
                    return item;
                });
            }
            return columns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableView.prototype, "tableXAutoWidth", {
        /**
         * 表格x轴长度计算 scroll{x:计算}
         *
         * @readonly
         * @memberof ProTableView
         */
        get: function () {
            if (this.computedRenderColumns) {
                var res = this.computedRenderColumns.reduce(function (total, currentValue) {
                    return {
                        width: parseInt(total.width, 10) +
                            parseInt(currentValue.width, 10),
                    };
                }, { width: 0 });
                return res.width;
            }
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableView.prototype, "computedTotal", {
        get: function () {
            return this.total;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * 根据源数据对显示和隐藏列进行过滤
     * @memberof ProTableView
     */
    ProTableView.prototype._filterColumns = function () {
        var _this = this;
        this.unShowColumns = [];
        if (this._obTableListCustom &&
            this._obTableListCustom.success &&
            this._obTableListCustom.result &&
            this._obTableListCustom.result.modulesUid ===
                this.computedStorageShowColumnsKeys &&
            this._obTableListCustom.result.customColumns.length) {
            localStorage.setItem(this.computedStorageShowColumnsKeys, JSON.stringify(this._obTableListCustom.result.customColumns)); // 同步服务端列配置数据到缓存
        }
        this.showColumns =
            JSON.parse(localStorage.getItem(this.computedStorageShowColumnsKeys)) ||
                [];
        if (this.showColumns.length === 0) {
            this.columns.map(function (item) {
                if (!item.noChecked) {
                    var index = _this.showColumns.findIndex(function (entity) { return entity.dataIndex === item.dataIndex; });
                    if (index < 0) {
                        _this.showColumns.push({
                            dataIndex: item.dataIndex,
                            title: item.label || item.title,
                        });
                        localStorage.setItem(_this.computedStorageShowColumnsKeys, JSON.stringify(_this.showColumns));
                    }
                }
                _this.unShowColumns.push({
                    dataIndex: item.dataIndex,
                    title: item.label || item.title,
                }); // 全部列
            });
        }
        else {
            this.columns.map(function (item) {
                _this.unShowColumns.push({
                    dataIndex: item.dataIndex,
                    title: item.label || item.title,
                }); // 全部列
            });
        }
    };
    /**
     * 从显示列移除
     *
     * @param {string[]} Columns
     * @memberof ProTableView
     */
    ProTableView.prototype._moveRightShowColumns = function (Columns) {
        var _this = this;
        this.showColumns = [];
        Columns.map(function (item) {
            var entity = _this.columns.find(function (model) { return model.dataIndex === item; });
            if (entity) {
                _this.showColumns.push({
                    dataIndex: entity.dataIndex,
                    title: entity.label || entity.title,
                });
            }
        });
    };
    /**
     * 从显示列接收移除的列
     *
     * @param {string[]} Columns
     * @memberof ProTableView
     */
    ProTableView.prototype._moveLeftShowColumns = function (Columns) {
        var _this = this;
        this.unShowColumns = [];
        Columns.map(function (item) {
            var entity = _this.columns.find(function (model) { return model.dataIndex === item; });
            if (entity) {
                _this.unShowColumns.push({
                    dataIndex: entity.dataIndex,
                    title: entity.label || entity.title,
                });
            }
        });
    };
    /**
     * 对显示列进行排序
     *
     * @param {*} Columns
     * @memberof ProTableView
     */
    ProTableView.prototype._orderSortRightShowColumns = function (Columns) {
        var _this = this;
        this.showColumns = [];
        Columns.map(function (item) {
            var entity = _this.columns.find(function (model) { return model.dataIndex === item; });
            if (entity) {
                _this.showColumns.push({
                    dataIndex: entity.dataIndex,
                    title: entity.label || entity.title,
                });
            }
        });
    };
    /**
     *
     * 对隐藏列排序
     * @param {string[]} Columns
     * @memberof ProTableView
     */
    ProTableView.prototype._orderSortLeftShowColumns = function (Columns) {
        var _this = this;
        this.unShowColumns = [];
        Columns.map(function (item) {
            var entity = _this.columns.find(function (model) { return model.dataIndex === item; });
            if (entity) {
                _this.unShowColumns.push({
                    dataIndex: entity.dataIndex,
                    title: entity.label || entity.title,
                });
            }
        });
    };
    ProTableView.prototype._setLocalStorageShowColumnsKeys = function (modulesName, uid) {
        var userUid = '';
        try {
            if (this.userInfo && this.userInfo.userUid) {
                userUid = this.userInfo.userUid;
            }
        }
        catch (e) { }
        if (modulesName) {
            this.localStorageShowColumnsKeys = "" + shortHash("" + modulesName + userUid);
            this.tableModulesName = "" + modulesName;
        }
        else if (!modulesName && uid) {
            this.localStorageShowColumnsKeys = "" + shortHash("" + uid + userUid);
            this.tableModulesName = "" + uid;
        }
    };
    /**
     * 获取显示列缓存信息
     *
     * @memberof ProTableView
     */
    ProTableView.prototype._getLocalStorageShowColumns = function () {
        var order = localStorage.getItem(this.computedStorageShowColumnsKeys);
        if (order) {
            return JSON.parse(order);
        }
        return [];
    };
    /**
     *
     * 设置显示列缓存信息并同步到服务端
     * @memberof ProTableView
     */
    ProTableView.prototype._setLocalStorageShowColumns = function (url) {
        if (this.computedStorageShowColumnsKeys) {
            localStorage.setItem(this.computedStorageShowColumnsKeys, JSON.stringify(this.computedShowColumns));
            var body = this.computedShowColumns.map(function (item) {
                return { dataIndex: item.dataIndex, title: item.title };
            });
            this._editTableColumns(this.computedStorageShowColumnsKeys, body, url);
        }
    };
    /**
     * 同步自定义列信息到服务端
     *
     * @param {string} modulesUid
     * @param {Parameters<typeof editTableColumns>[1]} customColumns
     * @memberof ProTableView
     */
    ProTableView.prototype._editTableColumns = function (modulesUid, customColumns, url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, editTableColumns(modulesUid, customColumns, url)];
                    case 1:
                        _a._obTableListCustom = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询自定义列配置数据
     *
     * @param {string} modulesUid
     * @memberof ProTableView
     */
    ProTableView.prototype._queryTableColumns = function (modulesUid, url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, queryTableColumns(modulesUid, url)];
                    case 1:
                        _a._obTableListCustom = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProTableView.prototype.setTotal = function (total) {
        this.total = total;
    };
    /**
     *
     * 开启或者取消单击行选中
     * @param {boolean} isOpenRowChange
     * @memberof ProTableView
     */
    ProTableView.prototype.updateOpenRowChange = function (isOpenRowChange) {
        this._isOpenRowChange = isOpenRowChange;
    };
    /**
     *
     * 开启或者取消行选中
     * @param {boolean} isOpenRowChange
     */
    ProTableView.prototype.updateOpenRowSelection = function (isOpenRowSelection) {
        this._isOpenRowSelection = isOpenRowSelection;
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "userInfo", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "uid", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "computedUid", null);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "pageIndex", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "pageSize", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ProTableView.prototype, "selectedRowKeys", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "_expandRow", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ProTableView.prototype, "_type", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ProTableView.prototype, "_rowSelectionClickType", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ProTableView.prototype, "columns", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ProTableView.prototype, "showColumns", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ProTableView.prototype, "unShowColumns", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "localStorageShowColumnsKeys", void 0);
    __decorate([
        observable,
        __metadata("design:type", void 0)
    ], ProTableView.prototype, "_obTableListCustom", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ProTableView.prototype, "tableModulesName", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "tableBodyDomClientHeight", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "bodyExternalContainer", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "isAdaptiveHeight", void 0);
    __decorate([
        observable.ref,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "bodyStyle", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ProTableView.prototype, "tempDynamicAddData", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "bodyContainerHeight", void 0);
    __decorate([
        observable,
        __metadata("design:type", Boolean)
    ], ProTableView.prototype, "_pagination", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "bodyExternalHeight", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "_renderData", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "total", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "queryParams", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "_isOpenRowChange", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "_isOpenRowSelection", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "_tableContainerWidth", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableView.prototype, "_uniqueKey", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "computedSelectedRows", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "calculateBody", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "computedShowColumns", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "computedUnShowColumns", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "computedStorageShowColumnsKeys", null);
    __decorate([
        computed,
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "computedRenderColumns", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "tableXAutoWidth", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableView.prototype, "computedTotal", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "_filterColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "_moveRightShowColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "_moveLeftShowColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "_orderSortRightShowColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "_orderSortLeftShowColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "_setLocalStorageShowColumnsKeys", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Array)
    ], ProTableView.prototype, "_getLocalStorageShowColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "_setLocalStorageShowColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", Promise)
    ], ProTableView.prototype, "_editTableColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], ProTableView.prototype, "_queryTableColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "setTotal", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "updateOpenRowChange", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], ProTableView.prototype, "updateOpenRowSelection", null);
    return ProTableView;
}());

var ProTableLocalView = /** @class */ (function () {
    function ProTableLocalView() {
        /** 查询数据状态
         *
         * 在loading动画展示时使用
         */
        this._loading = false;
    }
    Object.defineProperty(ProTableLocalView.prototype, "computedLoading", {
        /** 数据请求状态 */
        get: function () {
            return this._loading;
        },
        enumerable: false,
        configurable: true
    });
    /** 更新动画状态,组件内部私有方法 */
    ProTableLocalView.prototype._setLoadingState = function (_loading) {
        this._loading = _loading;
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableLocalView.prototype, "_loading", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableLocalView.prototype, "computedLoading", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], ProTableLocalView.prototype, "_setLoadingState", null);
    return ProTableLocalView;
}());

/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:35:17
 * @LastEditTime: 2022-03-04 11:59:55
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProTable/store/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var LegionsStoreTable = /** @class */ (function (_super) {
    __extends(LegionsStoreTable, _super);
    function LegionsStoreTable(context) {
        var _this = _super.call(this, context) || this;
        _this.userInfo = null;
        /**
         * 数据生命周期，表格组件卸载之前
         *
         * @memberof HLTableStore
         */
        _this.TableContainer = observable$1.map();
        _this.TableContainerModules = observable$1.map();
        /**
         *
         *  数据生命周期，应用重新数据前有效
         * @memberof HLTableStore
         */
        _this.HlTableLocalStateContainer = observable$1.map();
        return _this;
    }
    LegionsStoreTable.prototype.add = function (uid, modulesName, timeuid) {
        /* this.TableContainer.set(uid,observableViewModel<ProTableView>(new ProTableView())) */
        var view = new ProTableView(modulesName, timeuid, this.userInfo);
        this.addContainerModules(modulesName);
        this.TableContainer.set(uid, observableViewModel(view));
    };
    LegionsStoreTable.prototype.init = function (uid, options) {
        var store = this.TableContainer.get(uid);
        store.pageIndex = options.pageIndex || 1;
        store.pageSize = options.pageSize || 20;
        if (options.isAdaptiveHeight !== void 0) {
            store.isAdaptiveHeight = options.isAdaptiveHeight;
        }
    };
    LegionsStoreTable.prototype.delete = function (uid) {
        this.TableContainer.delete(uid);
    };
    LegionsStoreTable.prototype.deleteTableModules = function (modulesName) {
        this.TableContainerModules.delete(modulesName);
    };
    LegionsStoreTable.prototype.get = function (uid) {
        return this.TableContainer.get(uid);
    };
    LegionsStoreTable.prototype.addContainerModules = function (modulesName) {
        if (modulesName) {
            if (!this.TableContainerModules.has(modulesName)) {
                this.TableContainerModules.set(modulesName, "" + shortHash(modulesName));
            }
        }
    };
    /**
     * 添加本地数据
     *
     *  内部方法，外部请勿使用
     * @param {string} uid
     * @memberof HLTableStore
     */
    LegionsStoreTable.prototype._addLocalState = function (uid) {
        var view = new ProTableLocalView();
        this.HlTableLocalStateContainer.set(uid, observableViewModel(view));
    };
    LegionsStoreTable.prototype._deleteLocalState = function (uid) {
        this.HlTableLocalStateContainer.delete(uid);
    };
    LegionsStoreTable.prototype.getLocalState = function (uid) {
        return this.HlTableLocalStateContainer.get(uid);
    };
    LegionsStoreTable.meta = __assign({}, LegionsStore.StoreBase.meta);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], LegionsStoreTable.prototype, "TableContainer", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], LegionsStoreTable.prototype, "TableContainerModules", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], LegionsStoreTable.prototype, "HlTableLocalStateContainer", void 0);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "add", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, ProTableView]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "init", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "delete", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "deleteTableModules", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "get", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "addContainerModules", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "_addLocalState", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "_deleteLocalState", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], LegionsStoreTable.prototype, "getLocalState", null);
    LegionsStoreTable = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], LegionsStoreTable);
    return LegionsStoreTable;
}(LegionsStore.StoreBase));

/**
 * 列表组件基类
 *
 * 包含常用方法，例如搜索，重置，搜索条件，列表列配置数据等
 * @export
 * @class ProTableBaseClass
 * @extends {React.Component<P, S>}
 * @template P props 类型约束
 * @template S state 类型约束
 * @template Columns 列配置类型约束
 * @template QueryParams 搜索条件对象类型约束结构 默认any类型
 */
var ProTableBaseClass = /** @class */ (function (_super) {
    __extends(ProTableBaseClass, _super);
    function ProTableBaseClass(props) {
        var _this = _super.call(this, props) || this;
        _this.tableRef = null;
        //@ts-ignore
        _this.queryPrams = {};
        _this.columnsDataMap = observable$1.map();
        /** 列描述数据对象*/
        _this.columnsData = [];
        /**
         * 搜索查询
         * @param value
         * @param options
         */
        _this.handleSearch = function (value, options) {
            var val = value;
            if (options) {
                if (typeof options.onBeforeSearch === 'function') {
                    val = options.onBeforeSearch(val);
                }
            }
            _this.queryPrams = __assign(__assign({}, _this.queryPrams), val);
            _this.tableRef.methods.onSearch();
        };
        /**
         *  重置搜索结果
         *
         * @memberof ProTableBaseClass
         */
        _this.handleReset = function (value, options) {
            var val = value;
            if (options) {
                if (typeof options.onBeforeReset === 'function') {
                    val = options.onBeforeReset(val);
                }
            }
            _this.handleSearch(val);
        };
        _this.onOpenCustomColumns = function () {
            _this.tableRef.methods.openCustomColumns();
        };
        _this.columnsDataMap.observe(function (chan) {
            if (mobxVersion === 'v3') {
                // @ts-ignore
                if (_this.columnsDataMap.values().length) {
                    //@ts-ignore
                    _this.columnsData = toJS(_this.columnsDataMap.values());
                }
            }
            else if (mobxVersion === 'v4') {
                var values_1 = [];
                _this.columnsDataMap.forEach(function (item, key) {
                    values_1.push(item);
                });
                _this.columnsData = toJS(values_1);
            }
        });
        return _this;
    }
    /**
     * 添加表格列数据
     *
     * 主要在初始化列数据时使用
     *
     * @param {string} key column.dataIndex 或者 column.key
     * @memberof ProTableBaseClass
     */
    ProTableBaseClass.prototype.pushColumns = function (key, column) {
        if (!this.columnsDataMap.has(key)) {
            if (!column['key']) {
                column['key'] = key;
            }
            if (!column['dataIndex']) {
                column['dataIndex'] = key;
            }
            this.columnsDataMap.set(key, column);
        }
    };
    /**
     * 更新表格列数据信息
     *
     * @param {string} key
     * @param {TableColumnConfig<Columns>} column
     * @memberof ProTableBaseClass
     */
    ProTableBaseClass.prototype.updateColumns = function (key, column) {
        if (this.columnsDataMap.has(key)) {
            var old = this.columnsDataMap.get(key);
            this.columnsDataMap.set(key, __assign(__assign({}, old), column));
        }
    };
    /**
     * 刷新表格项数据
     *
     * 主要应用于表格列配置项自定义render需要更新时，需要强刷表格
     * @param columnKey  指定刷新表格项字段
     * @param callback 执行某个数据更新后，需要刷新表格项
     */
    ProTableBaseClass.prototype.refreshColumns = function (columnKey, callback) {
        if (typeof callback === 'function') {
            callback();
            this.updateColumns(columnKey, {});
        }
    };
    __decorate([
        observable$1,
        __metadata("design:type", Object)
    ], ProTableBaseClass.prototype, "columnsDataMap", void 0);
    __decorate([
        observable$1,
        __metadata("design:type", Array)
    ], ProTableBaseClass.prototype, "columnsData", void 0);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ProTableBaseClass.prototype, "pushColumns", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ProTableBaseClass.prototype, "updateColumns", null);
    __decorate([
        action$1,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Function]),
        __metadata("design:returntype", void 0)
    ], ProTableBaseClass.prototype, "refreshColumns", null);
    return ProTableBaseClass;
}(React.Component));

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var browser = invariant;

var baseCls = "legions-pro-table";
var errorMessage = {
    uniqueKey: 'Each record in table should have a unique `uniqueKey` prop,' + 'or set `uniqueKey` to an unique primary key.',
    Repeat: 'uniqueKey[接口数据作为唯一字段不可靠，建议前端自己生成唯一字段。开发环境检测，如果用的接口数据字段作为唯一值，也请确保绝对唯一]:存在相同数据,请认真检查数据是否绝对唯一，否则会引发部分功能异常'
};
var LegionsProTable = /** @class */ (function (_super) {
    __extends(LegionsProTable, _super);
    function LegionsProTable(props) {
        var _this = _super.call(this, props) || this;
        _this.timeId = new Date().getTime();
        _this.uid = '';
        /** uid 的值绝对唯一，且每次初始生成table都是相同值 */
        _this.freezeuid = '';
        /**  未加密的freezeuid 值 */
        _this.decryptionfreezeuid = '';
        _this.viewModel = null;
        _this.tableThead = "table-thead" + _this.uid;
        _this.clientHeight = document.body.clientHeight;
        _this.modalRef = null;
        _this.customColumnsModalRef = null;
        _this.selections = [];
        /** th列表,保存th的相对距离 */
        _this.dragThList = [];
        /** 鼠标拖动距离 */
        _this.dragX = 0;
        /** 当前操作的th */
        _this.dragTh = null;
        /** 创建拖动标识线 */
        _this.dragLine = document.createElement('div');
        /** 创建拖动标识区域 */
        _this.dragArea = document.createElement('div');
        /** 可拖动的表头 */
        _this.cantDragThQuery = '.ant-table-content > div:not(.ant-table-fixed-left):not(.ant-table-fixed-right) table th';
        _this.subscription = null;
        _this.node = null;
        _this.resize = debounce(function () {
            _this.viewModel.bodyContainerHeight = document.body.clientHeight;
        }, 500);
        /** 开启自定义列数据同步接口信息-局部配置(当全局和局部存在冲突时，优先局部配置数据)
         *
         * 同步数据到服务端所需要的查询和保存接口地址信息 */
        _this.customColumnsConfig = {
            editApi: '',
            queryApi: '',
        };
        /**
         * 导出当页数据
         *
         * @memberof HLTable
         */
        _this.exportCurrPageData = function () {
            _this.exportCsv({ filename: moment().format('YYYYMMDDHHmmss') + "-" + _this.viewModel.pageIndex });
        };
        _this.exportAllData = function () {
            _this.modalRef.viewModel.title = '导出数据';
            _this.modalRef.viewModel.visible = true;
        };
        _this.onSelectChange = function (selectedRowKeys, selectedRows) {
            var dataleng = _this.props.dataSource ? _this.props.dataSource.length : 0;
            if (_this.props.request) {
                dataleng = _this.getViewStore._renderData.length;
            }
            if (_this.getViewStore._renderData.length === dataleng) {
                _this.getViewStore.selectedRowKeys = selectedRowKeys;
                _this.props.onRowChange && _this.props.onRowChange(selectedRows);
            }
        };
        _this.selectRow = function (record) {
            var getCheckboxPropsItem = _this.getCheckboxPropsItem(record);
            if (getCheckboxPropsItem && getCheckboxPropsItem['disabled']) {
                return;
            }
            _this.selectedRowsCheck(record);
        };
        _this.getSorterFn = function (sortOrder, sorter) {
            return function (a, b) {
                var result = sorter(a, b);
                if (result !== 0) {
                    return (sortOrder === 'descend') ? -result : result;
                }
                return 0;
            };
        };
        _this.uid = _this.uuid;
        if (_this.props.store.TableContainer.has(_this.freezeuid)) {
            _this.timeId = new Date().getTime();
            _this.uid = _this.uuid;
        }
        _this.freezeuid = _this.uid;
        _this.tableThead = "table-thead" + _this.uid;
        var keys = 'uniqueUid';
        browser(_this.props[keys], "[legionsProTable]:props." + keys + " cannot be empty");
        if (_this.props[keys]) {
            _this.decryptionfreezeuid = "" + _this.props[keys];
            _this.freezeuid = shortHash(_this.decryptionfreezeuid);
            _this.props.store.add(_this.freezeuid, _this.props.tableModulesName, _this.uid);
            if (!_this.props.store.HlTableLocalStateContainer.has(_this.freezeuid)) {
                _this.props.store._addLocalState(_this.freezeuid);
            }
            if (!_this.props.store.TableContainer.has(_this.freezeuid)) {
                _this.props.store.add(_this.freezeuid, _this.props.tableModulesName, _this.uid);
            }
        }
        _this.initPagination();
        _this.initProps();
        _this.onReady();
        _this.inintSelectedRows();
        return _this;
    }
    LegionsProTable_1 = LegionsProTable;
    Object.defineProperty(LegionsProTable.prototype, "uuid", {
        get: function () {
            return "table" + this.props.store.TableContainer.size + shortHash("" + this.timeId + this.props.store.TableContainer.size);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProTable.prototype, "getViewStore", {
        get: function () {
            return this.props.store.TableContainer.get(this.freezeuid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProTable.prototype, "getLocalViewStore", {
        get: function () {
            return this.props.store.HlTableLocalStateContainer.get(this.freezeuid);
        },
        enumerable: false,
        configurable: true
    });
    LegionsProTable.prototype._dispatchRequest = function (pageIndex, pageSize) {
        var _this = this;
        if (this.props.request) {
            this.getLocalViewStore._setLoadingState(true);
            this.props.request(pageIndex, pageSize).then(function (res) {
                _this.viewModel._renderData = res.data;
                _this.viewModel.setTotal(res.total);
            }).finally(function () {
                _this.getLocalViewStore._setLoadingState(false);
            });
        }
    };
    LegionsProTable.prototype.search = function (options) {
        if (this.getLocalViewStore) {
            if (options) {
                if (options.pageIndex) { /** 如果主动设置页码，则以主动设置为准 */
                    this.getViewStore.pageIndex = options.pageIndex;
                }
            }
            else {
                this.getViewStore.pageIndex = 1;
            }
            this.getViewStore.selectedRowKeys = [];
            this._dispatchRequest(this.getViewStore.pageIndex, this.getViewStore.pageSize);
        }
    };
    /**
     *
     * 导出表格数据
     * @param {Partial<Parameters<typeof exportCsv>[0]>} prams
     * @memberof HLTable
     */
    LegionsProTable.prototype.exportCsv = function (prams) {
        if (prams === void 0) { prams = {}; }
        if (!runScriptsSdk.plugins.xlsx) {
            message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"excel",url:"xxxx"}))');
            return;
        }
        var columns = [];
        var datas = [];
        if (prams.columns && prams.data) {
            columns = prams.columns;
            datas = prams.data;
        }
        else {
            columns = this.viewModel.computedRenderColumns;
            /* columns = this.viewModel.computedRenderColumns; */
            if (this.props.displayType === 'bigData') {
                datas = this.props.dataSource;
            }
            else {
                datas = this.viewModel._renderData.map(function (item) {
                    return item;
                });
            }
        }
        var newColumns = columns.filter(function (item) { return item.isExport !== false; });
        runScriptsSdk.plugins.xlsx.exportJsonToExcel({ data: datas, columns: newColumns, filename: prams.filename, autoWidth: true });
    };
    //@ts-ignore
    LegionsProTable.prototype.tranMapColumns = function (columns) {
        if (columns === void 0) { columns = this.props.columns; }
        return columns.map(function (item) {
            if (!item.render && item.tooltip) {
                var newItem = __assign({ key: item.dataIndex }, item);
                newItem = __assign(__assign({}, newItem), { render: function (text, record) {
                        return React.createElement(LegionsProLineOverflow, { width: item.width, text: record[item.dataIndex] });
                    } });
                return newItem;
            }
            return item;
        });
    };
    LegionsProTable.prototype.createHeaderInnerNode = function () {
        var ele = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-scroll')[0];
        if (ele && ele.firstElementChild && ele.firstElementChild.firstElementChild) {
            var div = document.createElement('div');
            div.setAttribute('class', 'pro-table-header-inner');
            ele.firstElementChild.insertBefore(div, ele.firstElementChild.firstElementChild);
        }
    };
    LegionsProTable.prototype.inintSelectedRows = function (selectedRows) {
        if (selectedRows === void 0) { selectedRows = this.props.selectedRowKeys; }
        if (Array.isArray(selectedRows) && selectedRows.length) {
            var store_1 = this.getViewStore;
            store_1.selectedRowKeys = [];
            selectedRows.forEach(function (item) {
                if (typeof item === 'string' || typeof item === 'number') {
                    //@ts-ignore
                    store_1.selectedRowKeys.push(item);
                }
            });
        }
    };
    LegionsProTable.prototype.initPagination = function () {
        var paginationProps = this.props.pagination;
        var store = this.getViewStore;
        store.pageIndex = 1;
        store.pageSize = this.props.pageSize || store.pageSize;
        if ((typeof paginationProps === 'boolean')) {
            store._pagination = paginationProps;
        }
        else if (this.props.request) {
            store._pagination = true;
        }
        else if (this.props.onPagingQuery && paginationProps === void 0) {
            store._pagination = true;
        }
        else if (!this.props.onPagingQuery && paginationProps === void 0) {
            store._pagination = false;
        }
    };
    LegionsProTable.prototype.initProps = function () {
        var store = this.getViewStore;
        if ((typeof this.props.isOpenRowChange === 'boolean' && !this.props.isOpenRowChange)) {
            store._isOpenRowChange = false;
        }
        if ((typeof this.props.isOpenRowSelection === 'boolean' && !this.props.isOpenRowSelection)) {
            store._isOpenRowSelection = false;
        }
        this.viewModel = store;
        store._uniqueKey = this.props.uniqueKey;
        this.viewModel.bodyStyle = Object.assign({}, this.props.bodyStyle);
        var customColumnsConfig = this.props.customColumnsConfig;
        if (customColumnsConfig && customColumnsConfig.editApi && customColumnsConfig.queryApi) {
            this.customColumnsConfig = customColumnsConfig;
        }
        else if (LegionsProTable_1.customColumnsConfig.editApi && LegionsProTable_1.customColumnsConfig.queryApi) {
            this.customColumnsConfig = LegionsProTable_1.customColumnsConfig;
        }
    };
    LegionsProTable.prototype.onReady = function () {
        var _this = this;
        var store = this.getViewStore;
        this.props.onReady && this.props.onReady({
            store: this.props.store,
            uid: this.freezeuid,
            viewModel: store,
            localViewModel: this.getLocalViewStore,
            freezeuid: this.freezeuid,
            decryptionfreezeuid: this.decryptionfreezeuid,
            methods: {
                exportCsv: function (prams) {
                    _this.exportCsv(prams);
                },
                onSearch: function (options) {
                    _this.search(options);
                },
                updateOpenRowChange: function (isOpenRowChange) {
                    _this.getViewStore.updateOpenRowChange(isOpenRowChange);
                },
                setTableContainerWidth: function () {
                    _this.setTableContainerWidth();
                },
                openCustomColumns: function () {
                    if (_this.customColumnsModalRef) {
                        _this.customColumnsModalRef.viewModel.visible = true;
                    }
                }
            }
        });
    };
    LegionsProTable.prototype.componentWillMount = function () {
        /* this.subscription.unsubscribe() */
    };
    LegionsProTable.prototype.destroyPortal = function () {
        if (this.node) {
            unmountComponentAtNode(this.node);
        }
    };
    LegionsProTable.prototype.initCustomColumns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.isOpenCustomColumns) return [3 /*break*/, 4];
                        this.selections.push({
                            key: 'custom-columns',
                            text: this.renderButtonCusttomColumns(),
                            onSelect: function (changeableRowKeys) {
                            },
                        });
                        this.viewModel._setLocalStorageShowColumnsKeys(this.props.tableModulesName, this.freezeuid);
                        if (!this.isSettingColumnApiConfig()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.viewModel._queryTableColumns(this.viewModel.computedStorageShowColumnsKeys, this.customColumnsConfig.queryApi)];
                    case 1:
                        _a.sent();
                        if (!this.viewModel._obTableListCustom) return [3 /*break*/, 3];
                        if (!(!this.viewModel._obTableListCustom.result || (this.viewModel._obTableListCustom.result && this.viewModel._obTableListCustom.result.customColumns.length === 0))) return [3 /*break*/, 3];
                        this.getViewStore._filterColumns();
                        body = this.viewModel.computedShowColumns.map(function (item) {
                            return { dataIndex: item.dataIndex, title: item.title };
                        });
                        if (!body.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.viewModel._editTableColumns(this.viewModel.computedStorageShowColumnsKeys, body, this.customColumnsConfig.editApi)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.getViewStore._filterColumns();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** 是否设置自定义列服务端同步接口配置信息 */
    LegionsProTable.prototype.isSettingColumnApiConfig = function () {
        if (this.customColumnsConfig.editApi && this.customColumnsConfig.queryApi) {
            return true;
        }
        return false;
    };
    LegionsProTable.prototype.isSmallData = function () {
        if (this.props.displayType === 'smallData') {
            return true;
        }
        return false;
    };
    LegionsProTable.prototype.componentWillUnmount = function () {
        /* this.props.store.delete(this.freezeuid); */
        if (this.props.tableModulesName) {
            this.props.store.deleteTableModules(this.props.tableModulesName);
        }
        window.removeEventListener && window.removeEventListener('resize', this.resize.bind(this));
        this.subscription && this.subscription.unsubscribe();
        this.destroyPortal();
    };
    LegionsProTable.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var table, _index, data, UniqueKey, Repeat, anttablefixed, thead, span, RootContainer, spanth;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        table = document.querySelector("." + this.uid);
                        if (!table) {
                            return [2 /*return*/];
                        }
                        this.createHeaderInnerNode();
                        if (this.viewModel.isAdaptiveHeight) {
                            this.setTableThead();
                            this.setTabletBody();
                        }
                        this.getViewStore.columns = this.tranMapColumns();
                        return [4 /*yield*/, this.initCustomColumns()];
                    case 1:
                        _a.sent();
                        if (this.props.visibleExportLoacl === void 0 || this.props.visibleExportLoacl) {
                            _index = this.selections.findIndex(function (item) { return item.key === 'export-excel'; });
                            if (_index < 0) {
                                this.selections.push({
                                    key: 'export-excel',
                                    text: React.createElement(Button, { size: "small" },
                                        "\u5BFC\u51FA\u5F53\u9875",
                                        React.createElement(Icon, { type: "download" })),
                                    onSelect: function (changeableRowKeys) {
                                        _this.exportCsv({ filename: moment().format('YYYYMMDDHHmmss') + "-" + _this.viewModel.pageIndex });
                                    },
                                });
                            }
                        }
                        if (this.props.onExportAll) { // 兼容历史问题，之前是onExportAll 传入此方法开启导出当页和全部，现在需要导出当页分开控制
                            this.selections.push({
                                key: 'export-all-excel',
                                text: React.createElement(Button, { size: "small" },
                                    "\u5BFC\u51FA\u5168\u90E8",
                                    React.createElement(Icon, { type: "download" })),
                                onSelect: function (changeableRowKeys) {
                                    _this.props.onExportAll();
                                },
                            });
                        }
                        window.addEventListener && window.addEventListener('resize', this.resize.bind(this));
                        if (findDOMNode(this).getElementsByClassName('ant-table-body')) ;
                        this.setTableContainerWidth();
                        data = this.props.dataSource;
                        if (this.props.request) {
                            if (this.getLocalViewStore && this.getViewStore) {
                                this._dispatchRequest(this.viewModel.pageIndex, this.viewModel.pageSize);
                            }
                        }
                        else {
                            if (this.isSmallData()) {
                                this.getViewStore.setTotal(this.props.total || 0);
                            }
                        }
                        if (data) {
                            if (this.isSmallData()) {
                                this.getViewStore._renderData = __spread(data);
                            }
                            if (this.getViewStore._renderData.length) {
                                UniqueKey = this.isHasUniqueKeyData();
                                Repeat = this.isChkRepeatUniqueKeyData();
                                warningOnce(UniqueKey, errorMessage.uniqueKey);
                                warningOnce(!Repeat, errorMessage.Repeat);
                            }
                        }
                        anttablefixed = table.querySelector('.ant-table-fixed-left');
                        thead = null;
                        if (anttablefixed) {
                            thead = anttablefixed.querySelector('thead');
                        }
                        else {
                            thead = table.querySelector('thead');
                        }
                        if (thead && this.selections.length) {
                            span = document.createElement('span');
                            this.node = span;
                            if (thead.querySelector('th')) {
                                RootContainer = this.getViewStore._isOpenRowSelection && this.props.type === 'checkbox' ? '.ant-table-selection-down' : 'span';
                                spanth = thead.querySelector('th').querySelector(RootContainer);
                                if (spanth) {
                                    spanth.appendChild(this.node);
                                    this.renderPortal();
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LegionsProTable.prototype.setTableContainerWidth = function () {
        if (findDOMNode(this).getElementsByClassName('ant-table-body')) {
            var tableBody = findDOMNode(this).getElementsByClassName('ant-table-body');
            if (tableBody && tableBody instanceof HTMLCollection && tableBody.length) {
                var width = tableBody[0].clientWidth;
                this.viewModel._tableContainerWidth = width;
            }
        }
    };
    LegionsProTable.prototype.renderPortal = function () {
        var index = this.selections.findIndex(function (item) { return item.key === 'export-excel'; });
        var menu = (React.createElement(Menu, null,
            (this.props.isOpenCustomColumns) && React.createElement(Menu.Item, { key: "3" }, this.renderButtonCusttomColumns()),
            index > -1 && React.createElement(Menu.Item, { key: "1" },
                React.createElement(Button, { size: "small", onClick: this.exportCurrPageData },
                    "\u5BFC\u51FA\u5F53\u9875",
                    React.createElement(Icon, { type: "download" }))),
            this.props.onExportAll && React.createElement(Menu.Item, { key: "2" },
                React.createElement(Button, { size: "small", onClick: this.exportAllData },
                    "\u5BFC\u51FA\u5168\u90E8",
                    React.createElement(Icon, { type: "download" })))));
        unstable_renderSubtreeIntoContainer(this, //代表当前组件
        React.createElement(Dropdown, { overlay: menu },
            React.createElement(Icon, { type: "appstore-o", style: { color: 'red' } })), this.node // 传送门另一端的DOM node
        );
    };
    LegionsProTable.prototype.renderButtonCusttomColumns = function () {
        var _this = this;
        return React.createElement(Button, { size: "small", onClick: function () {
                _this.customColumnsModalRef.viewModel.visible = true;
                _this.customColumnsModalRef.viewModel.title =
                    React.createElement("p", null,
                        "\u8868\u683C\u5217\u81EA\u5B9A\u4E49\u663E\u793A\u53CA\u6392\u5E8F",
                        React.createElement("span", { style: { color: 'red' } }, "(\u8BF7\u62D6\u52A8\u5217\u540D\u8FDB\u884C\u64CD\u4F5C)"));
            } },
            "\u81EA\u5B9A\u4E49\u5217",
            React.createElement(Icon, { type: "bars" }));
    };
    /**
     * 设置表格列头高度
     *
     * @memberof HLTable
     */
    LegionsProTable.prototype.setTableThead = function () {
        var table = document.querySelector("." + this.uid);
        if (table) {
            var tableThead = table.querySelector('.ant-table-thead');
            var store = this.props.store.TableContainer.get(this.freezeuid);
            var tr = findDOMNode(tableThead.querySelector('tr'));
            if (tableThead && tr) {
                if (store.bodyExternalContainer.get(this.tableThead) && tr.clientHeight !== store.bodyExternalContainer.get(this.tableThead).height) { // 当存在时，对比两次数据变化，不一致，在重新set
                    store.bodyExternalContainer.set(this.tableThead, { height: findDOMNode(tableThead.querySelector('tr')).clientHeight });
                }
                else {
                    // 不存在时直接set
                    store.bodyExternalContainer.set(this.tableThead, { height: findDOMNode(tableThead.querySelector('tr')).clientHeight });
                }
            }
        }
    };
    /**
     * 设置table 行数据dom 总高度
     *
     * @memberof HLTable
     */
    LegionsProTable.prototype.setTabletBody = function () {
        var table = document.querySelector("." + this.uid);
        if (table) {
            var tabletBody = table.querySelector('.ant-table-tbody');
            var store = this.props.store.TableContainer.get(this.freezeuid);
            if (tabletBody && store.tableBodyDomClientHeight !== findDOMNode(tabletBody).clientHeight) {
                store.tableBodyDomClientHeight = findDOMNode(tabletBody).clientHeight;
            }
        }
    };
    LegionsProTable.prototype.componentDidUpdate = function () {
        if (this.viewModel.isAdaptiveHeight) {
            this.setTableThead();
            this.setTabletBody();
        }
        this.node && this.renderPortal();
    };
    //@ts-ignore
    LegionsProTable.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.props.selectedRowKeys && this.props.selectedRowKeys !== nextProps.selectedRowKeys) {
            var data = [];
            if (this.props.request && this.props.displayType === 'smallData') {
                data = (this.getViewStore._renderData && this.getViewStore._renderData.length) ? this.getViewStore._renderData : [];
            }
            else {
                data = (nextProps.dataSource && nextProps.dataSource.length) ? nextProps.dataSource : [];
            }
            // @ts-ignore
            var newSelectedRows = data.filter(function (v) { return nextProps.selectedRowKeys.includes(v[_this.props.uniqueKey]); });
            var newSelectedRowKeys = newSelectedRows.map(function (item) { return item[_this.props.uniqueKey]; });
            var selectedRowKeys = __spread(newSelectedRowKeys);
            this.getViewStore.selectedRowKeys = selectedRowKeys;
        }
        if (this.props.bodyStyle && !this.deepComparisonObject(this.props.bodyStyle, nextProps.bodyStyle)) {
            this.viewModel.bodyStyle = nextProps.bodyStyle;
        }
        if (nextProps.dataSource !== this.props.dataSource && nextProps.dataSource && !this.props.request) {
            /**  主要解决当渲染数据和传入数据不一致时，无需通过传入数据值来刷新渲染数据 */
            if (this.props.displayType === 'smallData') {
                this.getViewStore._renderData = __spread(this.props.request ? [] : nextProps.dataSource);
            }
            if (this.getViewStore._renderData.length) {
                var UniqueKey = this.isHasUniqueKeyData();
                var Repeat = this.isChkRepeatUniqueKeyData();
                warningOnce(UniqueKey, errorMessage.uniqueKey);
                warningOnce(!Repeat, errorMessage.Repeat);
            }
        }
        if (this.props.columns !== nextProps.columns) {
            this.getViewStore.columns = this.tranMapColumns(nextProps.columns);
        }
    };
    /**
     *
     * 对象值深比较
     * @param {*} obj
     * @param {*} obj1
     * @returns
     * @memberof HLTable
     */
    LegionsProTable.prototype.deepComparisonObject = function (obj, obj1) {
        return JSON.stringify(obj) === JSON.stringify(obj1);
    };
    /**
     * 判定唯一键信息在数据列表项中是否存在
     *
     * @returns {boolean}
     * @memberof HLTable
     */
    LegionsProTable.prototype.isHasUniqueKeyData = function () {
        var _this = this;
        var result = this.viewModel._renderData.every(function (item) { return _this.props.uniqueKey in item; });
        return result;
    };
    /**
     *
     * 判定唯一键值是否存在相同数据
     * @returns
     * @memberof HLTable
     */
    LegionsProTable.prototype.isChkRepeatUniqueKeyData = function () {
        var isSame = false;
        var obj = {};
        for (var i = 0; i < this.viewModel._renderData.length; i++) {
            if (this.viewModel._renderData[i][this.props.uniqueKey] in obj) {
                isSame = true;
                break;
            }
            else {
                obj[this.viewModel._renderData[i][this.props.uniqueKey]] = this.viewModel._renderData[i][this.props.uniqueKey];
            }
        }
        return isSame;
    };
    LegionsProTable.prototype.onRowClick = function (record, index, event) {
        if (this.getViewStore._isOpenRowChange) {
            this.selectRow(record);
            this.props.onRowClick && this.props.onRowClick(record, index, event);
        }
    };
    LegionsProTable.prototype.onRowClassName = function (record, index) {
        var _this = this;
        var RowIndex = this.getViewStore.selectedRowKeys.findIndex(function (item) { return item === record[_this.props.uniqueKey]; });
        var getCheckboxPropsItem = this.getCheckboxPropsItem(record);
        if (this.props.rowClassName) {
            return this.props.rowClassName(record, index);
        }
        else if (RowIndex > -1) {
            return 'row-color';
        }
        else if (getCheckboxPropsItem && getCheckboxPropsItem['disabled']) {
            return 'disabled-color';
        }
        return record['className'] || '';
    };
    LegionsProTable.prototype.getCheckboxPropsItem = function (record) {
        if (record === void 0) { record = null; }
        if (this.props.rowSelection && this.props.rowSelection.getCheckboxProps && typeof this.props.rowSelection.getCheckboxProps === 'function' && record) {
            var getCheckboxPropsItem = this.props.rowSelection.getCheckboxProps(record);
            if (Object.prototype.toString.call(getCheckboxPropsItem) === '[object Object]') {
                return getCheckboxPropsItem;
            }
        }
        return null;
    };
    LegionsProTable.prototype.selectedRowsCheck = function (record) {
        var _this = this;
        var selectedRows = __spread(this.getViewStore.computedSelectedRows);
        var selectedRowKeys = __spread(this.getViewStore.selectedRowKeys);
        var selectedRow = selectedRows.find(function (item) { return item[_this.props.uniqueKey] === record[_this.props.uniqueKey]; });
        if (selectedRowKeys.indexOf(record[this.props.uniqueKey]) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record[this.props.uniqueKey]), 1);
        }
        else {
            if (this.props.rowSelectionClickType === 'radio') {
                selectedRowKeys = [];
            }
            selectedRowKeys.push(record[this.props.uniqueKey]);
        }
        if (selectedRow) {
            var index = selectedRows.findIndex(function (item) { return item[_this.props.uniqueKey] === record[_this.props.uniqueKey]; });
            selectedRows.splice(index, 1);
        }
        else {
            if (this.props.rowSelectionClickType === 'radio') {
                selectedRows = [];
            }
            selectedRows.push(record);
        }
        this.getViewStore.selectedRowKeys = selectedRowKeys;
        this.props.onRowChange && this.props.onRowChange(selectedRows);
    };
    //@ts-ignore
    LegionsProTable.prototype.renderlocale = function () {
        return __assign({ emptyText: React.createElement("div", { className: "no-data-tip" },
                React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                "\u6682\u65E0\u6570\u636E") }, this.props.locale);
    };
    LegionsProTable.prototype.render = function () {
        var _this = this;
        var store = this.getViewStore;
        var selectedRowKeys = store.selectedRowKeys;
        var alreadyRowsLen = store.computedSelectedRows.length;
        var rowSelection = (this.getViewStore._isOpenRowSelection) ? __assign(__assign({}, this.props.rowSelection), { selectedRowKeys: __spread(selectedRowKeys), hideDefaultSelections: true, type: this.props.type, selections: this.selections, onChange: this.onSelectChange.bind(this), onSelectAll: function (selected, selectedRows, changeRows) {
                if (_this.getViewStore._renderData.length <= _this.props.dataSource.length) { // 主要用于大数据table 性能问题，每次只加载部分数据，这时全选时自动选择全部数据
                    if (selected) {
                        var newData = _this.props.dataSource.filter(function (item) {
                            var getCheckboxPropsItem = _this.getCheckboxPropsItem(item);
                            return ((!getCheckboxPropsItem || (getCheckboxPropsItem && !getCheckboxPropsItem['disabled'])));
                        });
                        var selectedRowKey = newData.map(function (item) { return item[_this.props.uniqueKey]; });
                        store.selectedRowKeys = selectedRowKey;
                        _this.props.onRowChange && _this.props.onRowChange(_this.getViewStore.computedSelectedRows);
                    }
                    else {
                        store.selectedRowKeys = [];
                        _this.props.onRowChange && _this.props.onRowChange(_this.getViewStore.computedSelectedRows);
                    }
                }
            }, onSelectInvert: function () {
                store.selectedRowKeys = [];
            } }) : null;
        var paginationProps = this.props.pagination;
        var pagination = {
            pageSizeOptions: this.props.pageSizeOptions,
            total: this.props.request ? this.getViewStore.computedTotal : this.props.total,
            current: store.pageIndex,
            showQuickJumper: true,
            pageSize: store.pageSize,
            showSizeChanger: true,
            size: (paginationProps && typeof paginationProps === 'object') ? paginationProps.size : '',
            onChange: function (pageIndex, pageSize) {
                store.selectedRowKeys = []; /**  切换页码 初始化行选择数据*/
                _this.props.store.get(_this.freezeuid).pageIndex = pageIndex;
                _this.props.store.get(_this.freezeuid).pageSize = pageSize;
                _this.props.onPagingQuery && _this.props.onPagingQuery(pageIndex, pageSize, false);
                if (_this.props.request && _this.getLocalViewStore) {
                    _this._dispatchRequest(pageIndex, pageSize);
                }
            },
            onShowSizeChange: function (current, pageSize) {
                store.selectedRowKeys = []; /**  切换页大小 初始化行选择数据*/
                _this.props.store.get(_this.freezeuid).pageIndex = current;
                _this.props.store.get(_this.freezeuid).pageSize = pageSize;
                _this.props.onPagingQuery && _this.props.onPagingQuery(current, pageSize, true);
                if (_this.props.request && _this.getLocalViewStore) {
                    _this._dispatchRequest(current, pageSize);
                }
            },
            showTotal: function (total) { return (alreadyRowsLen > 0 ? "\u5DF2\u9009\u62E9" + alreadyRowsLen + "\u6761\u6570\u636E" : '') + " \u5171 " + total + " \u6761\u6570\u636E"; }
        };
        /* const bodyStyle = (this.viewModel.isAdaptiveHeight && this.getViewStore._renderData && this.getViewStore._renderData.length > 0) ? { ...this.viewModel.bodyStyle,...this.viewModel.calculateBody } : this.viewModel.bodyStyle */
        var bodyStyle = (this.viewModel.isAdaptiveHeight && this.getViewStore._renderData && this.getViewStore._renderData.length > 0) ? __assign(__assign({}, this.viewModel.bodyStyle), this.viewModel.calculateBody) : this.viewModel.bodyStyle;
        return React.createElement(Row, { className: baseCls },
            React.createElement(Col, null,
                React.createElement("div", { className: "pro-table-containers " + this.uid + " " + (this.viewModel.isAdaptiveHeight ? 'table-adaptive-height' : '') },
                    React.createElement(Table
                    /* size="small" */
                    , __assign({ 
                        /* size="small" */
                        locale: this.renderlocale() }, this.props, { scroll: __assign({
                            x: store.tableXAutoWidth,
                            y: 300,
                        }, this.props.scroll), columns: this.viewModel.computedRenderColumns, bordered: true, bodyStyle: bodyStyle, rowClassName: this.onRowClassName.bind(this), pagination: (this.getViewStore._pagination) ? pagination : false, loading: { tip: 'loading', spinning: this.props.request ? this.getLocalViewStore.computedLoading : this.props.loading }, rowKey: this.props.uniqueKey, 
                        // locale={{emptyText:<span>2222</span>}}
                        onRowClick: this.onRowClick.bind(this), rowSelection: rowSelection, dataSource: __spread(this.getViewStore._renderData), onChange: function (pagination, filters, sorter) {
                            if (sorter.column && sorter.column.sorter && typeof sorter.column.sorter === 'boolean' && _this.props.displayType === 'smallData') {
                                var sorterFn = _this.getSorterFn(sorter.order, function (a, b) {
                                    return compare(a[sorter.columnKey], b[sorter.columnKey]);
                                });
                                var data = _this.viewModel._renderData.map(function (item) { return item; });
                                _this.viewModel._renderData = __spread(data.sort(sorterFn));
                            }
                            _this.props.onChange && _this.props.onChange(pagination, filters, sorter);
                        } })))),
            this.props.isOpenCustomColumns && React.createElement(LegionsProTableCustomColumns, { customColumnsConfig: {
                    queryApi: LegionsProTable_1.customColumnsConfig.queryApi,
                    editApi: LegionsProTable_1.customColumnsConfig.editApi,
                }, tableUid: this.freezeuid, onReady: function (value) {
                    _this.customColumnsModalRef = value;
                } }));
    };
    var LegionsProTable_1;
    LegionsProTable.defaultProps = {
        rowSelectionClickType: 'radio',
        isOpenRowSelection: true,
        type: 'checkbox',
        dataSource: [],
        total: 0,
        loading: false,
        displayType: 'smallData',
        isOpenCustomColumns: true,
        pageSizeOptions: ['5', '10', '20', '40', '60', '80', '100', '200', '500'],
    };
    /** 开启自定义列数据同步接口信息-全局配置(当全局和局部存在冲突时，优先局部配置数据)
     *
     * 同步数据到服务端所需要的查询和保存接口地址信息 */
    LegionsProTable.customColumnsConfig = {
        editApi: '',
        queryApi: '',
    };
    LegionsProTable.store = LegionsStoreTable;
    /**
     * 列表组件基类
     *
     * 包含常用方法，例如搜索，重置，搜索条件，列表列配置数据等
     * @export
     * @class ProTableBaseClass
     * @extends {React.Component<P, S>}
     * @template P props 类型约束
     * @template S state 类型约束
     * @template Columns 列配置类型约束
     * @template QueryParams 搜索条件对象类型约束结构 默认any类型
     */
    LegionsProTable.ProTableBaseClass = ProTableBaseClass;
    LegionsProTable = LegionsProTable_1 = __decorate([
        bind({ store: LegionsStoreTable }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProTable);
    return LegionsProTable;
}(React.Component));

export default LegionsProTable;
