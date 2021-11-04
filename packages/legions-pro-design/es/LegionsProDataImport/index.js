/**
  *  legions-pro-design v0.0.8-beta.1
  * (c) 2021 duanguang
  * @license MIT
  */
import { Button, Icon, Row, Col, message } from 'antd';
import { download } from 'legions-utils-tool/download';
import { observer } from 'legions/store-react';
import { observableViewModel } from 'brain-store-utils';
import { observable, toJS } from 'mobx';
import React from 'react';
import { runScriptsSdk } from 'legions-thirdparty-plugin';
import { OpenConfirm } from 'legions-lunar/antd-toolkit';
import LegionsProTable from '../LegionsProTable';
import LegionsProUpload from '../LegionsProUpload';
import './style/index.less';

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

var cls = 'legions-pro-import';
/** 公共导入组件按钮类型 */
var ProDataImportBtnEnum;
(function (ProDataImportBtnEnum) {
    /** 下载模板 */
    ProDataImportBtnEnum[ProDataImportBtnEnum["template"] = 0] = "template";
    /** 上传文件 */
    ProDataImportBtnEnum[ProDataImportBtnEnum["upload"] = 1] = "upload";
    /** 覆盖导入 */
    ProDataImportBtnEnum[ProDataImportBtnEnum["cover"] = 2] = "cover";
    /** 导入数据 */
    ProDataImportBtnEnum[ProDataImportBtnEnum["submit"] = 3] = "submit";
    /** 删除错误数据 */
    ProDataImportBtnEnum[ProDataImportBtnEnum["delete"] = 4] = "delete";
    /** 导入错误数据 */
    ProDataImportBtnEnum[ProDataImportBtnEnum["export"] = 5] = "export";
    /** 返回按钮 */
    ProDataImportBtnEnum[ProDataImportBtnEnum["goBack"] = 6] = "goBack";
})(ProDataImportBtnEnum || (ProDataImportBtnEnum = {}));
/** 公共导入组件参数 */
var IProps = /** @class */ (function () {
    function IProps() {
        /**
         * 表格配置项, 配置项参考是HLTable 不要配置data，表格data已被托管
         * @type {Partial<IHLTableProps<TableRow, Model>>}
         * @memberof HLDataImportProps
         */
        this.tableProps = { uniqueKey: '' };
        /**
         * 上传按钮配置项, 配置项参考是HLUpload，本地开发注意配置代理
         * @type {IHLUploadProps}
         * @memberof HLDataImportProps
         */
        this.uploadProps = {};
        /**
         * 覆盖删除按钮弹窗配置
         * @type {ModalFuncProps}
         * @memberof HLDataImportProps
         */
        this.deleteModalProps = {};
        /**
         * 容器类名
         * @type {string}
         * @memberof HLDataImportProps
         */
        this.className = '';
        /**
         * 可配置需要隐藏的按钮列表
         * @type {ProDataImportBtnEnum[]}
         * @memberof HLDataImportProps
         */
        this.hideBtnList = [];
        /**
         * 导出错误数据的文件名称，默认'错误数据'
         * @type {string}
         * @memberof HLDataImportProps
         */
        this.errorFileName = '错误数据';
        /**
         * 自定义导出错误数据的列配置，默认会使用表格的columns，在表格配置不满足导入需求时可用该属性代替
         * @type {ColumnProps<TableRow>[]}
         * @memberof HLDataImportProps
         */
        this.errorFileColumns = [];
        /**
         * 提交按钮loading状态
         * @type {Boolean}
         * @memberof HLDataImportProps
         */
        this.submitBtnLoading = false;
        /**
         * 返回，默认window.history.back()
         * @memberof HLDataImportProps
         */
        this.onBack = function () { return window.history.back(); };
    }
    return IProps;
}());
var IViewModel = /** @class */ (function () {
    function IViewModel() {
        /** 表格数据 */
        this.list = [];
        /** 当前上传的文件 */
        this.file = {};
        /** 文件上传状态 */
        this.fileStatus = 'done';
        /** 是否覆盖导入 */
        this.isCover = false;
    }
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], IViewModel.prototype, "list", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], IViewModel.prototype, "file", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], IViewModel.prototype, "fileStatus", void 0);
    __decorate([
        observable,
        __metadata("design:type", Boolean)
    ], IViewModel.prototype, "isCover", void 0);
    return IViewModel;
}());
var LegionsProDataImport = /** @class */ (function (_super) {
    __extends(LegionsProDataImport, _super);
    function LegionsProDataImport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewModel = observableViewModel(new IViewModel());
        /** 返回 */
        _this.handleBack = function () {
            _this.props.onBack && _this.props.onBack();
        };
        /** 下载模板 */
        _this.handleTemplate = function () {
            _this.props.templateUrl && download([_this.props.templateUrl]);
        };
        /** 上传文件状态变化 */
        _this.handleUploadChange = function (info) {
            _this.viewModel.fileStatus = info.file.status;
        };
        /** 上传文件 */
        _this.handleUpload = function (info, header, data) { return __awaiter(_this, void 0, void 0, function () {
            var res, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = this.props.uploadDataTransform && this.props.uploadDataTransform(info.file.response, data) || [];
                        /** 先重置当前状态 */
                        this.reset();
                        /** 开启异步处理的loading状态 */
                        this.viewModel.fileStatus = 'uploading';
                        /** 再赋值新数据 */
                        _a = this.viewModel;
                        return [4 /*yield*/, res];
                    case 1:
                        /** 再赋值新数据 */
                        _a.list = (_b.sent()).map(function (item) { return (__assign(__assign({}, item), { className: item.isError ? cls + "-errorRow" : item.isWarn ? cls + "-warnRow" : '' })); });
                        this.viewModel.file = info.file;
                        this.props.uploadProps && this.props.uploadProps.onSuccess && this.props.uploadProps.onSuccess(info, header, data);
                        /** 关闭loading状态 */
                        setTimeout(function () { _this.viewModel.fileStatus = 'done'; });
                        return [2 /*return*/];
                }
            });
        }); };
        /** 覆盖导入 */
        _this.handleCover = function () {
            _this.viewModel.isCover = !_this.viewModel.isCover;
        };
        /** 导入数据 */
        _this.handleSubmit = function () {
            _this.props.onSubmit && _this.props.onSubmit(toJS(_this.viewModel.list));
        };
        /** 删除错误数据 */
        _this.handleDelete = function () {
            var _a = _this.props, hideBtnList = _a.hideBtnList, deleteModalProps = _a.deleteModalProps;
            var hasCoverBtn = !hideBtnList.includes(ProDataImportBtnEnum.cover);
            OpenConfirm(__assign({ type: 'info', title: '删除提示', content: React.createElement("div", null,
                    React.createElement("div", null,
                        "\u5176\u4E2D\u5305\u542B",
                        React.createElement("span", { style: { color: 'red' } }, _this.errorList.length),
                        "\u6761\u6570\u636E\u4E0E\u7CFB\u7EDF\u6570\u636E\u91CD\u590D\uFF0C\u662F\u5426\u8981\u5220\u9664\uFF1F"),
                    hasCoverBtn && [
                        React.createElement("div", null, "\u4E0D\u5220\u9664\uFF0C\u652F\u6301\u8986\u76D6\u5BFC\u5165\uFF1A\u4F1A\u7528\u6700\u65B0\u6570\u636E\u8986\u76D6\u7CFB\u7EDF\u65E7\u6570\u636E"),
                        React.createElement("div", null, "\u786E\u5B9A\u5220\u9664\uFF1A\u5220\u9664\u91CD\u590D\u6570\u636E"),
                    ]), okText: '确认删除', okType: 'primary', width: 800, cancelText: hasCoverBtn ? '不删除，支持覆盖导入' : '取消', onOk: function () {
                    _this.viewModel.list = _this.viewModel.list.filter(function (item) { return !item.isError; });
                }, onCancel: function () {
                    if (hasCoverBtn) {
                        _this.viewModel.isCover = true;
                    }
                } }, deleteModalProps));
        };
        /** 导出错误数据 */
        _this.handleExport = function () {
            if (!runScriptsSdk.plugins.xlsx) {
                message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"excel",url:"xxxx"}))');
                return;
            }
            var _a = _this.props, errorFileColumns = _a.errorFileColumns, tableProps = _a.tableProps;
            var colums = errorFileColumns.length > 0 ? errorFileColumns : tableProps.columns;
            runScriptsSdk.plugins.xlsx.exportJsonToExcel({
                data: _this.errorList,
                //@ts-ignore
                columns: colums && colums.filter(function (item) {
                    return item.isExport !== false;
                }),
                filename: _this.props.errorFileName,
                autoWidth: true
            });
        };
        /** 清空文件，恢复初始状态 */
        _this.reset = function () {
            _this.viewModel.reset();
        };
        return _this;
    }
    Object.defineProperty(LegionsProDataImport.prototype, "successList", {
        /** 正确数据 */
        get: function () {
            return this.viewModel.list.filter(function (item) {
                return !item.isError && !item.isWarn;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProDataImport.prototype, "errorList", {
        /** 错误数据 */
        get: function () {
            return this.viewModel.list.filter(function (item) {
                return item.isError;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProDataImport.prototype, "warnList", {
        /** 警告数据 */
        get: function () {
            return this.viewModel.list.filter(function (item) {
                return item.isWarn;
            });
        },
        enumerable: false,
        configurable: true
    });
    LegionsProDataImport.prototype.componentWillMount = function () {
        this.props.onReady && this.props.onReady({
            viewModel: this.viewModel,
        });
    };
    LegionsProDataImport.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, tableProps = _a.tableProps, templateUrl = _a.templateUrl, hideBtnList = _a.hideBtnList, uploadProps = _a.uploadProps, customBtn = _a.customBtn, submitBtnLoading = _a.submitBtnLoading;
        var _b = this.viewModel, list = _b.list, file = _b.file, isCover = _b.isCover, fileStatus = _b.fileStatus;
        return (React.createElement("div", { style: style, className: "legions-pro-import " + className },
            React.createElement("div", { className: cls + "-btnWrap" },
                React.createElement("div", { className: cls + "-btnLeft" }, !hideBtnList.includes(ProDataImportBtnEnum.goBack) && React.createElement(Button, { onClick: this.handleBack }, "\u8FD4\u56DE")),
                React.createElement("div", { className: cls + "-btnRight" },
                    !hideBtnList.includes(ProDataImportBtnEnum.template) && (React.createElement(Button, { onClick: this.handleTemplate, disabled: !templateUrl, icon: "download" }, "\u4E0B\u8F7D\u6A21\u677F")),
                    !hideBtnList.includes(ProDataImportBtnEnum.upload) && (React.createElement(LegionsProUpload, __assign({ showUploadList: false, accept: "xlsx,xls", maxFileCount: 1000, onChange: this.handleUploadChange }, uploadProps, { onSuccess: this.handleUpload }),
                        React.createElement(Button, { icon: "folder-open", disabled: !uploadProps, loading: fileStatus === 'uploading' }, list.length > 0 ? '重新选择' : '选择文件'))),
                    !hideBtnList.includes(ProDataImportBtnEnum.cover) && (React.createElement(Button, { onClick: this.handleCover, disabled: !(list.length > 0) },
                        React.createElement(Icon, { type: "check-circle-o", style: { color: isCover ? '#02A854' : '#ccc', fontWeight: 'bold' } }),
                        "\u652F\u6301\u8986\u76D6\u5BFC\u5165")),
                    !hideBtnList.includes(ProDataImportBtnEnum.submit) && (React.createElement(Button, { onClick: this.handleSubmit, disabled: !(
                        /** 列表有数据并且没有错误信息，或者列表有数据并且支持覆盖 */
                        ((list.length > 0 && this.errorList.length === 0) ||
                            (list.length > 0 && !hideBtnList.includes(ProDataImportBtnEnum.cover) && isCover))), loading: submitBtnLoading, icon: "upload" }, "\u5BFC\u5165\u6570\u636E")),
                    !hideBtnList.includes(ProDataImportBtnEnum.delete) && (React.createElement(Button, { onClick: this.handleDelete, disabled: !(this.errorList.length > 0), type: "danger", icon: "delete" }, "\u5220\u9664\u9519\u8BEF\u4FE1\u606F")),
                    !hideBtnList.includes(ProDataImportBtnEnum.export) && (React.createElement(Button, { onClick: this.handleExport, disabled: !(this.errorList.length > 0), icon: "export" }, "\u5BFC\u51FA\u9519\u8BEF\u6570\u636E")),
                    customBtn)),
            React.createElement(Row, { className: cls + "-tipWrap" },
                React.createElement(Col, { span: 12, className: cls + "-tipLeft" },
                    React.createElement("span", null, "\u6821\u9A8C\u6570\u636E"),
                    file.name && (React.createElement("span", { className: cls + "-fileName" },
                        file.name,
                        React.createElement(Icon, { className: cls + "-fileDel", onClick: this.reset, type: "close" })))),
                list.length > 0 && (React.createElement(Col, { span: 12, className: cls + "-tipRight" },
                    React.createElement("span", { className: cls + "-total" },
                        React.createElement("b", null, list.length),
                        "\u6761\u6570\u636E\uFF1A"),
                    React.createElement("span", { className: cls + "-success" },
                        "\u6821\u9A8C\u901A\u8FC7",
                        React.createElement("b", null, this.successList.length)),
                    React.createElement("span", { className: cls + "-error" },
                        "\u6821\u9A8C\u4E0D\u901A\u8FC7",
                        React.createElement("b", null, this.errorList.length)),
                    React.createElement("span", { className: cls + "-warn" },
                        "\u8B66\u544A",
                        React.createElement("b", null, this.warnList.length))))),
            React.createElement("div", { className: cls + "-tableWrap" }, React.createElement(LegionsProTable, __assign({ onPagingQuery: function () { return void 0; }, pageSize: 20, locale: { emptyText: React.createElement("div", { className: cls + "-emptyText" }, "\u65E0\u6570\u636E\uFF0C\u8BF7\u70B9\u51FB\u3010\u9009\u62E9\u6587\u4EF6\u3011\u5BFC\u5165\u6570\u636E") }, columns: [], isOpenRowSelection: false, isOpenRowChange: false, 
                // @ts-ignore
                uniqueUid: this.props['uniqueUid'] }, tableProps, { dataSource: list })))));
    };
    LegionsProDataImport.defaultProps = new IProps();
    LegionsProDataImport = __decorate([
        observer
    ], LegionsProDataImport);
    return LegionsProDataImport;
}(React.Component));

export default LegionsProDataImport;
export { ProDataImportBtnEnum };
