/**
  *  legions-pro-design v0.0.7-beta.17
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import ReactDOM, { unmountComponentAtNode, findDOMNode, unstable_renderSubtreeIntoContainer } from 'react-dom';
import { message, Menu, Button, Icon, Dropdown, Row, Col, Table } from 'antd';
import './style/index.less';
import { bind, observer } from 'legions/store-react';
import LegionsStoreTable from '../LegionsStoreTable';
import { compare } from 'legions-utils-tool/object.utils';
import { warningOnce } from 'legions-utils-tool';
import { shortHash } from 'legions-lunar/object-hash';
import { debounce } from 'legions-utils-tool/debounce';
import moment from 'moment';
import LegionsProTableCustomColumns from '../LegionsProTableCustomColumns';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
import { useStrict, toJS, configure, isObservable, runInAction } from 'mobx';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { LoggerManager } from 'legions-lunar/legion.plugin.sdk';
import { cloneDeep } from 'lodash';
import { observable, action } from 'legions/store';

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

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

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
        _this.columnsDataMap = observable.map();
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
            if (useStrict) {
                // @ts-ignore
                if (_this.columnsDataMap.values().length) {
                    //@ts-ignore
                    _this.columnsData = toJS(_this.columnsDataMap.values());
                }
            }
            else if (configure) {
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
    ProTableBaseClass.pageListEntity = LegionsStoreTable.pageListEntity;
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProTableBaseClass.prototype, "columnsDataMap", void 0);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], ProTableBaseClass.prototype, "columnsData", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ProTableBaseClass.prototype, "pushColumns", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ProTableBaseClass.prototype, "updateColumns", null);
    __decorate([
        action,
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

var serialize = require('serialize-javascript');
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
        /**
         * uid 的值绝对唯一，且每次初始生成table都是相同值
         *
         * @memberof HLForm
         */
        _this.freezeuid = '';
        /**
         *
         * 未加密的freezeuid 值
         * @memberof HLForm
         */
        _this.decryptionfreezeuid = '';
        _this.viewModel = null;
        _this.tableThead = "table-thead" + _this.uid;
        _this.clientHeight = document.body.clientHeight;
        _this.modalRef = null;
        _this.customColumnsModalRef = null;
        _this.selections = [];
        /** 全链路监控跟踪id */
        _this.traceId = '';
        _this.log = function (uid) {
            if (_this.getLocalViewStore && !_this.getLocalViewStore.obState.isPending && _this.props.autoQuery && _this.getLocalViewStore.computedRequest === 'pending') {
                runInAction(function () {
                    _this.getLocalViewStore._setLoadingState(false);
                    _this.getLocalViewStore._setRequestState('complete');
                    var data = _this.props.autoQuery.transform(_this.getLocalViewStore.obState);
                    if (data) {
                        var newData = data.data.slice();
                        _this.getLocalViewStore._obStateMap.set(_this.getViewStore.pageIndex.toString(), {
                            data: newData,
                            total: data.total,
                        });
                        _this.props.store.HlTableContainer.get(uid)._renderData = newData;
                        _this.props.store.HlTableContainer.get(uid).setTotal(data.total);
                    }
                });
                _this.consoleLog('watchData', { uid: uid });
                _this.logger('watchData', {
                    uid: uid,
                    apiResult: toJS(_this.getLocalViewStore.obState),
                    apiParams: _this.props.autoQuery.params(_this.getViewStore.pageIndex, _this.getViewStore.pageSize),
                });
            }
        };
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
            if (_this.props.autoQuery) {
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
        if (_this.props.store.HlTableContainer.has(_this.freezeuid)) {
            _this.timeId = new Date().getTime();
            _this.uid = _this.uuid;
        }
        _this.traceId = _this.uid;
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
            if (!_this.props.store.HlTableContainer.has(_this.freezeuid)) {
                _this.props.store.add(_this.freezeuid, _this.props.tableModulesName, _this.uid);
            }
            var isShowLoading = false;
            if (_this.getLocalViewStore && _this.getLocalViewStore.obState && _this.getLocalViewStore.obState.state === 'none') {
                isShowLoading = true;
            }
            if (_this.props.autoQuery && _this.getLocalViewStore && (_this.props.autoQuery.isDefaultLoad === void 0 || _this.props.autoQuery.isDefaultLoad)) {
                _this.getLocalViewStore.dispatchRequest(_this.props.autoQuery, {
                    pageIndex: _this.getViewStore.pageIndex,
                    pageSize: _this.getViewStore.pageSize,
                    isShowLoading: isShowLoading,
                });
            }
        }
        _this.initPagination();
        _this.initProps();
        _this.onReady();
        _this.inintSelectedRows();
        _this.consoleLog('constructor');
        return _this;
    }
    LegionsProTable_1 = LegionsProTable;
    Object.defineProperty(LegionsProTable.prototype, "uuid", {
        get: function () {
            return "table" + this.props.store.HlTableContainer.size + shortHash("" + this.timeId + this.props.store.HlTableContainer.size);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProTable.prototype, "getViewStore", {
        get: function () {
            return this.props.store.HlTableContainer.get(this.freezeuid);
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
    LegionsProTable.prototype.consoleLog = function (type, logObj) {
        var obj = logObj || {};
        var logConent = __assign(__assign({ storeView: __assign({}, this.getViewStore) }, obj), { store: this.props.store, that: toJS(this), props: toJS(this.props) });
        LoggerManager.consoleLog({
            //@ts-ignore
            type: "LegionsProTable-" + type,
            logConent: logConent,
            methodsName: 'onHLTableCycle',
        });
    };
    LegionsProTable.prototype.logger = function (type, logObj) {
        var _this = this;
        if (typeof this.props.onLogRecord === 'function') {
            var obj = logObj || {};
            var viewStoreKeys = ['calculateBody', 'bodyContainerHeight',
                'bodyExternalHeight', 'computedRenderColumns', '_tableContainerWidth', '_renderData', 'tableBodyDomClientHeight', 'tableXAutoWidth'];
            var viewStore_1 = {};
            viewStoreKeys.map(function (item) {
                if (isObservable(_this.getViewStore[item])) {
                    viewStore_1[item] = cloneDeep(toJS(_this.getViewStore[item]));
                }
                else {
                    viewStore_1[item] = cloneDeep(_this.getViewStore[item]);
                }
            });
            var _a = this.props, store = _a.store, columns = _a.columns, props = __rest(_a, ["store", "columns"]);
            var logConent = __assign(__assign({}, viewStore_1), obj);
            /* LoggerManager.report({
                //@ts-ignore
                type,
                content: serialize(logConent,{ ignoreFunction: false }),
                traceId: this.traceId,
                modulesName: this.props.tableModulesName,
                modulesPath: this.props['uniqueUid'],
            },this.props.onLogRecord) */
        }
    };
    LegionsProTable.prototype.search = function (options) {
        if (this.props.autoQuery && this.getLocalViewStore) {
            var isShowLoading = true;
            if (options) {
                if (options.pageIndex) { /** 如果主动设置页码，则以主动设置为准 */
                    this.getViewStore.pageIndex = options.pageIndex;
                }
                if (typeof options.isShowLoading === 'boolean') {
                    isShowLoading = options.isShowLoading;
                }
            }
            else {
                this.getViewStore.pageIndex = 1;
            }
            this.getViewStore.selectedRowKeys = [];
            this.getLocalViewStore.dispatchRequest(this.props.autoQuery, Object.assign({
                pageIndex: this.getViewStore.pageIndex,
                pageSize: this.getViewStore.pageSize,
                isShowLoading: isShowLoading,
            }, options));
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
        if (!legionsThirdpartyPlugin.plugins.excel) {
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
        legionsThirdpartyPlugin.plugins.excel.exportJsonToExcel({ data: datas, columns: newColumns, filename: prams.filename, autoWidth: true });
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
        else if (this.props.autoQuery) {
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
        if (this.props.autoQuery) {
            this.subscription = this.props.store.schedule([this.log.bind(this, this.freezeuid)]);
        }
        this.consoleLog('componentWillMount');
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
        this.consoleLog('componentWillUnmount');
    };
    LegionsProTable.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var table, _index, data, keys, result, UniqueKey, Repeat, anttablefixed, thead, span, RootContainer, spanth;
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
                        if (this.props.autoQuery) {
                            if (this.getLocalViewStore && this.getViewStore) {
                                keys = this.getViewStore.pageIndex.toString();
                                if (this.getLocalViewStore._obStateMap.has(keys)) {
                                    result = this.getLocalViewStore._obStateMap.get(keys);
                                    //@ts-ignore
                                    data = result.data;
                                    this.getViewStore.setTotal(result.total);
                                }
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
                        this.consoleLog('componentDidMount');
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
            var store = this.props.store.HlTableContainer.get(this.freezeuid);
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
            var store = this.props.store.HlTableContainer.get(this.freezeuid);
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
        this.consoleLog('componentDidUpdate');
    };
    //@ts-ignore
    LegionsProTable.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.props.selectedRowKeys && this.props.selectedRowKeys !== nextProps.selectedRowKeys) {
            var data = [];
            if (this.props.autoQuery && this.props.displayType === 'smallData') {
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
        if (nextProps.dataSource !== this.props.dataSource && nextProps.dataSource && !this.props.autoQuery) {
            /**  主要解决当渲染数据和传入数据不一致时，无需通过传入数据值来刷新渲染数据 */
            if (this.props.displayType === 'smallData') {
                this.getViewStore._renderData = __spread(this.props.autoQuery ? [] : nextProps.dataSource);
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
        this.consoleLog('componentWillReceiveProps');
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
        if (RowIndex > -1) {
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
        if (this.props.autoQuery) {
            if (this.getLocalViewStore && this.props.autoQuery.isDefaultLoad === false) {
                return {
                    emptyText: React.createElement("div", { className: "no-data-tip" },
                        React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                        "\u521D\u6B21\u6253\u5F00\u9875\u9762\u4E0D\u52A0\u8F7D\u6570\u636E\uFF0C\u8BF7\u7EC4\u5408\u6761\u4EF6\u8FDB\u884C\u641C\u7D22")
                };
            }
            else if (this.getLocalViewStore && this.getLocalViewStore.obState.isResolved && this.getViewStore._renderData.length === 0) {
                if (this.getLocalViewStore.obState.value && !this.getLocalViewStore.obState.value.success && this.getLocalViewStore.obState.value.message) {
                    return {
                        emptyText: React.createElement("div", { className: "no-data-tip" },
                            React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                            this.getLocalViewStore.obState.value.message)
                    };
                }
                return {
                    emptyText: React.createElement("div", { className: "no-data-tip" },
                        React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                        "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u6570\u636E\uFF0C\u8BF7\u5C1D\u8BD5\u5176\u4ED6\u641C\u7D22\u6761\u4EF6")
                };
            }
            else {
                return {
                    emptyText: React.createElement("div", { className: "no-data-tip" },
                        React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                        "\u6682\u65E0\u6570\u636E")
                };
            }
        }
    };
    LegionsProTable.prototype.render = function () {
        var _this = this;
        var store = this.getViewStore;
        var selectedRowKeys = store.selectedRowKeys;
        var alreadyRowsLen = store.computedSelectedRows.length;
        var locale = null;
        if (this.props.autoQuery) {
            locale = {
                locale: this.renderlocale(),
            };
        }
        this.consoleLog('render');
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
            total: this.props.autoQuery ? this.getViewStore.computedTotal : this.props.total,
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
                if (_this.props.autoQuery && _this.getLocalViewStore) {
                    var isShowLoading = true;
                    var result = _this.getLocalViewStore._obStateMap.get(_this.getViewStore.pageIndex.toString());
                    if (result) {
                        isShowLoading = false;
                        _this.getViewStore._renderData = __spread(result.data);
                        _this.getViewStore.setTotal(result.total);
                    }
                    _this.getLocalViewStore.dispatchRequest(_this.props.autoQuery, {
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        isShowLoading: isShowLoading,
                    });
                }
            },
            onShowSizeChange: function (current, pageSize) {
                store.selectedRowKeys = []; /**  切换页大小 初始化行选择数据*/
                _this.props.store.get(_this.freezeuid).pageIndex = current;
                _this.props.store.get(_this.freezeuid).pageSize = pageSize;
                _this.props.onPagingQuery && _this.props.onPagingQuery(current, pageSize, true);
                if (_this.props.autoQuery && _this.getLocalViewStore) {
                    _this.getLocalViewStore.dispatchRequest(_this.props.autoQuery, {
                        pageIndex: current,
                        pageSize: pageSize,
                        isShowLoading: true,
                    });
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
                    , __assign({}, locale, this.props, { scroll: __assign({
                            x: store.tableXAutoWidth,
                            y: 300,
                        }, this.props.scroll), columns: this.viewModel.computedRenderColumns, bordered: true, bodyStyle: bodyStyle, rowClassName: this.onRowClassName.bind(this), pagination: (this.getViewStore._pagination) ? pagination : false, loading: { tip: 'loading', spinning: this.props.autoQuery ? this.getLocalViewStore.computedLoading : this.props.loading }, rowKey: this.props.uniqueKey, 
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
