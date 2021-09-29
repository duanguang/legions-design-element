/**
  *  legions-pro-design v0.0.8
  * (c) 2021 duanguang
  * @license MIT
  */
import LegionsStore from '../LegionsStore';
import { observable as observable$1, action as action$1, StoreModules } from 'legions/store';
import { observablePromise, observableViewModel } from 'legions/store-utils';
import { shortHash } from 'legions-lunar/object-hash';
import { isObservableArray, observable, computed, action, runInAction } from 'mobx';
import LegionsModels from '../LegionsModels';
import { editTableColumns, queryTableColumns } from '../services';
import { mobxVersion } from 'brain-store-utils';
import LegionsCore from '../LegionsCore';
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

/** 列表页数据模型类*/
var PageListEntity = /** @class */ (function (_super) {
    __extends(PageListEntity, _super);
    function PageListEntity(options) {
        var _this = _super.call(this) || this;
        _this.total = 0;
        _this.current = 1;
        _this.pageSize = 10;
        _this.result = [];
        if (options && typeof options.responseData === 'object') {
            _this.message = options.responseData.msg || '查询成功';
            _this.success = options.responseData.ok ? true : false;
            _this.code = options.responseData.status || '';
            _this.total = options.responseData.total || 0;
            _this.current = options.responseData.current || 1;
            _this.pageSize = options.responseData.pageSize || 10;
            if (options.mappingEntity &&
                typeof options.mappingEntity === 'function') {
                options.mappingEntity(_this, options.responseData);
            }
        }
        return _this;
    }
    return PageListEntity;
}(LegionsModels.BaseEntity));

var ProTableLocalView = /** @class */ (function () {
    function ProTableLocalView() {
        /**
         *
         * 表格接口数据
         * @memberof ProTableLocalView
         */
        this.obState = observablePromise(null);
        this._obStateMap = observable.map();
        /** 查询数据状态
         *
         * 在loading动画展示时使用
         */
        this._loading = false;
        /** http 请求状态 */
        this._request = 'none';
    }
    Object.defineProperty(ProTableLocalView.prototype, "computedLoading", {
        /** 数据请求状态 */
        get: function () {
            return this._loading;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProTableLocalView.prototype, "computedRequest", {
        /** http 请求状态 */
        get: function () {
            return this._request;
        },
        enumerable: false,
        configurable: true
    });
    /** 更新动画状态,组件内部私有方法 */
    ProTableLocalView.prototype._setLoadingState = function (_loading) {
        this._loading = _loading;
    };
    /** 更新http请求接口状态,组件内部私有方法  */
    ProTableLocalView.prototype._setRequestState = function (request) {
        this._request = request;
    };
    ProTableLocalView.prototype.dispatchRequest = function (autoQuery, options) {
        if (autoQuery) {
            var server_1 = new LegionsCore.LegionsFetch();
            //@ts-ignore
            var apiServer = function () {
                var params = cloneDeep(autoQuery.params(options.pageIndex, options.pageSize));
                // @ts-ignore
                var model = {};
                if (autoQuery.mappingEntity) {
                    model = {
                        model: PageListEntity,
                        onBeforTranform: function (value) {
                            return {
                                responseData: value,
                                mappingEntity: autoQuery['mappingEntity'],
                            };
                        }
                    };
                }
                var headers = {};
                if (autoQuery.token) {
                    if (typeof autoQuery.token === 'string') {
                        headers = { 'api-cookie': autoQuery.token };
                    }
                    else if (typeof autoQuery.token === 'function') {
                        headers = { 'api-cookie': autoQuery.token() };
                    }
                }
                if (autoQuery.method === 'post') {
                    return server_1.post(__assign({ url: autoQuery.ApiUrl, parameter: params, headers: __assign(__assign({}, autoQuery.options), headers) }, model));
                }
                else if (autoQuery.method === 'get') {
                    return server_1.get(__assign({ url: autoQuery.ApiUrl, parameter: params, headers: __assign(__assign({}, autoQuery.options), headers) }, model));
                }
            };
            if (options.isShowLoading) {
                this._setLoadingState(true);
            }
            this._request = 'none';
            // @ts-ignore
            this.obState = observablePromise(apiServer());
            this._request = 'pending';
        }
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableLocalView.prototype, "obState", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableLocalView.prototype, "_obStateMap", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableLocalView.prototype, "_loading", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ProTableLocalView.prototype, "_request", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableLocalView.prototype, "computedLoading", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ProTableLocalView.prototype, "computedRequest", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], ProTableLocalView.prototype, "_setLoadingState", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProTableLocalView.prototype, "_setRequestState", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ProTableLocalView.prototype, "dispatchRequest", null);
    return ProTableLocalView;
}());

/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:35:17
 * @LastEditTime: 2021-08-09 23:42:17
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreTable/index.ts
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
    LegionsStoreTable.pageListEntity = PageListEntity;
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

export default LegionsStoreTable;
