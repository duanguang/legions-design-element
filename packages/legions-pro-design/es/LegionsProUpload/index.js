/**
  *  legions-pro-design v0.0.8-beta.1
  * (c) 2021 duanguang
  * @license MIT
  */
import { Upload, message, Spin, Button, Icon, Col, Progress, Row } from 'antd';
import React from 'react';
import { runScriptsSdk } from 'legions-thirdparty-plugin';
import { NProgress } from 'legions-nprogress';
import './style/index.less';
import { isNullUndefined } from 'legions-utils-tool/type.validation';

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

var docx = { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', name: 'docx' };
var doc = { type: 'application/msword', name: 'doc' };
var xlsx = { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', name: 'xlsx' };
var xls = { type: 'application/vnd.ms-excel', name: 'xls' };
var pdf = { type: 'application/pdf', name: 'pdf' };
var zip = { type: 'application/zip', name: 'zip' };
var bmp = { type: 'image/bmp', name: 'bmp' };
var png = { type: 'image/png', name: 'png' };
var jpeg = { type: 'image/jpeg', name: 'jpeg' };
var jpg = { type: 'image/jpeg', name: 'jpg' };
var FileTypeList = [doc, docx, xlsx, xls, pdf, zip, bmp, png, jpeg, jpg];
var XlsType = xls.type;
var XlsxType = xlsx.type;

var Dragger = Upload.Dragger;
var LegionsProUpload = /** @class */ (function (_super) {
    __extends(LegionsProUpload, _super);
    function LegionsProUpload(props) {
        var _this = _super.call(this, props) || this;
        _this.timeid = null;
        _this.handlePreview = function (file) {
            _this.props.onPreview && _this.props.onPreview(file);
        };
        _this.onRemove = function (file) {
            if (_this.props.onRemove) {
                return _this.props.onRemove(file);
            }
            return true;
        };
        _this.beforeUpload = function (file, fileList) {
            var legaldata = [file].filter(function (v) { return _this.filterAccept().includes(v['type']); });
            var len = _this.state.fileList ? _this.state.fileList.length + 1 : 0;
            var size = _this.getFileSize(file.size);
            if (_this.props.maxFileCount && _this.props.maxFileCount > 0 && len > _this.props.maxFileCount) {
                if (!_this.timeid) {
                    _this.timeid = setTimeout(function () {
                        message.warning("\u53EF\u4E0A\u4F20\u6700\u5927\u6570\u91CF:" + _this.props.maxFileCount + "\u4E2A", 8);
                        clearTimeout(_this.timeid);
                        _this.timeid = null;
                    }, 200);
                }
                return false;
            }
            else if (_this.props.maxFileSize && _this.props.maxFileSize > 0 && size > _this.props.maxFileSize) {
                if (!_this.timeid) {
                    _this.timeid = setTimeout(function () {
                        message.warning("\u53EF\u4E0A\u4F20\u6700\u5927\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7" + _this.props.maxFileSize + "MB", 4);
                        clearTimeout(_this.timeid);
                        _this.timeid = null;
                    }, 200);
                }
                return false;
            }
            else if (_this.filterAccept() && !legaldata.length) {
                if (!_this.timeid) {
                    var unlegaldata_1 = fileList.filter(function (v) { return !_this.filterAccept().includes(v['type']); });
                    _this.timeid = setTimeout(function () {
                        var error = unlegaldata_1.map(function (item) { return item.name; }).join(',');
                        message.warning("\u5F53\u524D\u6587\u4EF6\u7C7B\u578B:" + file['type'] + ",\u5141\u8BB8\u6587\u4EF6\u7C7B\u578B(" + _this.props.accept + ")\u3010\u4E0D\u7B26\u5408\u6587\u4EF6\u3011:" + error, 4);
                        clearTimeout(_this.timeid);
                        _this.timeid = null;
                    }, 200);
                }
                return false;
            }
            else if (!_this.props.action && !_this.props.commonActionConfig && (file['type'] === XlsxType || file['type'] === XlsType)) { // 当action 为空，且文件为excel类型，改为本地读取
                _this.readFile(file, fileList);
            }
            if (_this.props.beforeUpload) {
                var upload = _this.props.beforeUpload(file, fileList);
                return upload;
            }
            return true;
        };
        /** 文件列表预览, fileList必须要有thumbUrl或者url才可实现预览 */
        _this.fileListPreview = function (url) {
            window.open(url, '_block');
        };
        /** 文件列表删除 */
        _this.fileListDelete = function (file) {
            _this.setState({
                fileList: _this.state.fileList.filter(function (item) { return item.uid !== file.uid; })
            }, function () {
                /** 触发表单onChange */
                _this.props.onChange && _this.props.onChange({
                    file: file,
                    fileList: _this.state.fileList,
                });
            });
        };
        /** 渲染文件列表 */
        _this.renderFileList = function () {
            var fileListDom = _this.state.fileList.map(function (item) {
                var fileName = item.thumbUrl || item.url || item.name;
                /** 文件后缀 */
                var suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
                /** 可预览文件类型列表 */
                var previewFileTypeList = ['png', 'jpg', 'pdf'];
                return React.createElement(Col, { span: 24 / _this.props.showFileListGroup },
                    React.createElement("div", { className: "legions-pro-upload-file-list-item" },
                        React.createElement("span", { className: "legions-pro-upload-file-list-icon", "data-file-type": suffix }),
                        React.createElement("span", { className: "legions-pro-upload-file-list-name", title: item.name },
                            item.name,
                            React.createElement(Progress, { strokeWidth: 2, showInfo: false, percent: item.status === 'error' ? 100 : item.percent, status: item.status === 'error' ? 'exception' : 'success' })),
                        React.createElement("span", { className: "legions-pro-upload-file-list-btn" },
                            previewFileTypeList.includes(suffix) &&
                                (item.thumbUrl || item.url) &&
                                React.createElement(Icon, { type: "eye", title: "\u9884\u89C8", onClick: function () { return _this.fileListPreview(item.thumbUrl || item.url); } }),
                            React.createElement(Icon, { type: "close", title: "\u5220\u9664", onClick: function () { return _this.fileListDelete(item); } }))));
            });
            return React.createElement("div", { className: "legions-pro-upload-file-list " + (!_this.props.isDragger ? 'legions-pro-upload-file-list-mini' : '') },
                React.createElement(Row, { gutter: 20 }, fileListDom));
        };
        /** 处理在表单中使用时，初始赋值问题 */
        var fileList = !isNullUndefined(props.value)
            ? (props.value.fileList || [])
            : (_this.props.fileList || _this.props.defaultFileList || []);
        _this.state = {
            fileList: fileList,
            uploadLoading: false,
            progressPercent: 0,
        };
        return _this;
    }
    LegionsProUpload.prototype.componentWillReceiveProps = function (nextProps) {
        if (!isNullUndefined(nextProps.value) && this.props.value !== nextProps.value) {
            if (nextProps.value && nextProps.value.fileList && nextProps.value.fileList.length <= this.props.maxFileCount) {
                this.setState({
                    fileList: nextProps.value.fileList || []
                });
            }
        }
        else if (this.props.fileList !== nextProps.fileList) {
            this.setState({
                fileList: __spread(nextProps.fileList)
            });
        }
    };
    LegionsProUpload.prototype.getFileSize = function (fileByte) {
        var fileSizeByte = fileByte;
        var fileSizeMsg = 0;
        if (fileSizeByte) {
            fileSizeMsg = parseFloat((fileSizeByte / (1024 * 1024)).toFixed(3));
        }
        return fileSizeMsg;
    };
    LegionsProUpload.prototype.readFile = function (file, fileList) {
        var _this = this;
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadstart = function (e) {
            _this.setState({
                uploadLoading: true,
                progressPercent: 0,
            });
            NProgress.start();
        };
        reader.onprogress = function (e) {
            // const progressPercent = Math.round(e.loaded / e.total * 100)
            // this.setState({progressPercent})
        };
        reader.onerror = function (e) {
            _this.setState({
                uploadLoading: false,
                fileList: __spread(fileList),
            });
            _this.props.onError && _this.props.onError({ file: file, fileList: fileList }, e);
        };
        reader.onload = function (e) {
            if (!runScriptsSdk.plugins.xlsx) {
                message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"excel",url:"xxxx"}))');
                return;
            }
            // @ts-ignore
            var data = e.target.result;
            var _a = runScriptsSdk.plugins.xlsx.read(data, 'array'), header = _a.header, results = _a.results;
            NProgress.done();
            _this.setState({
                uploadLoading: false,
                fileList: __spread(fileList),
            });
            /* const tableTitle = header.map(item => { return { title: item, key: item } }) */
            _this.props.onSuccess && _this.props.onSuccess({ file: file, fileList: fileList }, header, results);
        };
    };
    LegionsProUpload.prototype.filterAccept = function () {
        var accept = this.props.accept || '';
        var arr = accept.split(',');
        return arr.map(function (item) {
            var model = FileTypeList.find(function (m) { return m.name === item; });
            if (model) {
                return model.type;
            }
            return item;
        }).join(',');
    };
    LegionsProUpload.prototype.onChange = function (info) {
        var _this = this;
        if (info.file.status === 'error') {
            this.props.onError && this.props.onError(info);
        }
        else if (info.file.status === 'done') {
            this.props.onSuccess && this.props.onSuccess(info);
        }
        var legaldata = [info.file].filter(function (v) { return _this.filterAccept().includes(v['type']); });
        var size = this.getFileSize(info.file.size);
        if (info.fileList && info.fileList.length <= this.props.maxFileCount && legaldata.length && size <= this.props.maxFileSize) {
            this.setState({
                fileList: __spread(info.fileList),
            });
        }
        this.props.onChange && this.props.onChange(this.props.dataTransform(info));
    };
    LegionsProUpload.prototype.render = function () {
        var _this = this;
        var _a = this.props, label = _a.label, name = _a.name, action = _a.action, data = _a.data, onSuccess = _a.onSuccess, prompt = _a.prompt, showFileList = _a.showFileList, commonActionConfig = _a.commonActionConfig, props = __rest(_a, ["label", "name", "action", "data", "onSuccess", "prompt", "showFileList", "commonActionConfig"]);
        var fileList = this.state.fileList;
        var uploadProps = {
            name: name,
            action: action,
            /* action: commonActionConfig ? `${HttpConfig.fcService}?project=${commonActionConfig.project}&module=${commonActionConfig.module}` : action, */
            accept: this.filterAccept(),
            data: data,
            showUploadList: showFileList ? false : props.showUploadList,
        };
        return (React.createElement(Spin, { spinning: this.state.uploadLoading, tip: "\u6587\u4EF6\u4E0A\u4F20\u4E2D..." },
            this.props.isDragger ? React.createElement(Dragger, __assign({}, props, uploadProps, { className: "legions-pro-upload-dragger", beforeUpload: this.beforeUpload, customRequest: !uploadProps.action ? function () {
                    _this.props.customRequest && _this.props.customRequest(_this.state.fileList);
                } : null, fileList: this.state.fileList, onChange: this.onChange.bind(this), onPreview: this.handlePreview, onRemove: this.onRemove }), this.props.children ? this.props.children : React.createElement("span", null,
                (!showFileList || fileList && fileList.length === 0) && React.createElement("p", { className: "ant-upload-drag-icon" }),
                React.createElement("p", { className: "ant-upload-text" },
                    "\u62D6\u52A8\u56FE\u7247\u5230\u672C\u7A97\u53E3\u4EE5\u4E0A\u4F20\uFF0C\u6216\u8005",
                    React.createElement("span", { style: { color: '#46a0ec' } }, "\u70B9\u51FB\u4E0A\u4F20")),
                (prompt && typeof prompt === 'string') && React.createElement("p", { className: "ant-upload-hint" }, prompt || '支持单个或者批量上传'),
                (prompt && typeof prompt === 'function') && prompt,
                (prompt && typeof prompt === 'object') && (prompt)))
                : React.createElement(Upload, __assign({}, props, uploadProps, { customRequest: !uploadProps.action ? function () {
                        _this.props.customRequest && _this.props.customRequest(_this.state.fileList);
                    } : null, beforeUpload: this.beforeUpload, fileList: this.state.fileList, onChange: this.onChange.bind(this), onPreview: this.handlePreview, onRemove: this.onRemove }), this.props.children ? this.props.children : React.createElement(Button, null,
                    React.createElement(Icon, { type: "upload" }),
                    " ",
                    this.props.label)),
            showFileList && this.renderFileList()));
    };
    LegionsProUpload.defaultProps = {
        listType: 'text',
        label: '上传',
        name: 'file',
        maxFileCount: 3,
        accept: 'png,jpeg,jpg',
        maxFileSize: 10,
        showFileList: false,
        showFileListGroup: 1,
        dataTransform: function (info) { return info; }
    };
    return LegionsProUpload;
}(React.Component));

export default LegionsProUpload;
