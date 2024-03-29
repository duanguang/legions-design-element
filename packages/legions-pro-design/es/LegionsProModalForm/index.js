/**
  *  legions-pro-design v0.0.8-beta.1
  * (c) 2021 duanguang
  * @license MIT
  */
import { observer } from 'legions/store-react';
import React from 'react';
import LegionsProForm from '../LegionsProForm';
import LegionsProModal from '../LegionsProModal';

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

/** 模态框表单
 * 业务场景主要通过弹窗放置表单信息
 */
var LegionsProModalForm = /** @class */ (function (_super) {
    __extends(LegionsProModalForm, _super);
    function LegionsProModalForm(props) {
        var _this = _super.call(this, props) || this;
        _this.timeId = new Date().getTime();
        _this.formInstance = null;
        _this.modalInstance = null;
        _this.onVisibleChange = function (value) {
            var _a = _this.props.modalProps, modalProps = _a === void 0 ? {} : _a;
            modalProps.onVisibleChange && modalProps.onVisibleChange(value);
        };
        return _this;
    }
    LegionsProModalForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.modalProps, modalProps = _b === void 0 ? {} : _b, controls = _a.controls, InputDataModel = _a.InputDataModel, group = _a.group, size = _a.size, colCount = _a.colCount;
        return React.createElement(React.Fragment, null,
            React.createElement(LegionsProModal, __assign({ resizable: true, modalType: "fullscreen", placement: "top", draggable: true }, modalProps, { onVisibleChange: this.onVisibleChange, onReady: function (value) {
                    var width = 1120;
                    _this.modalInstance = value;
                    _this.modalInstance.viewModel.width = width;
                    _this.props.onReady && _this.props.onReady({
                        formInstance: _this.formInstance,
                        modalInstance: _this.modalInstance
                    });
                } }),
                React.createElement(React.Fragment, null,
                    React.createElement(LegionsProForm, { size: size, colCount: colCount, InputDataModel: InputDataModel, mapPropsToFields: function (props) {
                            return new InputDataModel(props);
                        }, onFieldsChange: function (_, fields) {
                            _this.formInstance.store.updateFormInputData(_this.formInstance.uid, fields);
                        }, onReady: function (_, formInstance) {
                            _this.formInstance = __assign(__assign({}, formInstance), { that: _this });
                            _this.props.onReady && _this.props.onReady({
                                formInstance: _this.formInstance,
                                modalInstance: _this.modalInstance
                            });
                        }, group: group, controls: controls }))));
    };
    LegionsProModalForm = __decorate([
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProModalForm);
    return LegionsProModalForm;
}(React.Component));

export default LegionsProModalForm;
