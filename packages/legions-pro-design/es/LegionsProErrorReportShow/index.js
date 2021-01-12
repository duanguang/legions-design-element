/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import { bind, observer } from 'legions/store-react';
import { ProFormStore } from '../store/pro.form';
import { shortHash } from 'legions-lunar/object-hash';
import { Popover, Icon } from 'antd';
import styles from './style/index.modules.less';
import './style/index.less';
import { runInAction } from 'mobx';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var LegionsProErrorReportShow = /** @class */ (function (_super) {
    __extends(LegionsProErrorReportShow, _super);
    function LegionsProErrorReportShow(props) {
        var _this = _super.call(this, props) || this;
        _this.timeId = new Date().getTime();
        _this.uid = '';
        _this.enumList = { 1: '已忽略', 2: '忽略' };
        _this.uid = "error" + _this.props.code + shortHash(_this.timeId);
        if (_this.props.formUid && _this.viewForm) {
            _this.viewForm.collectErrorReactNode(_this.props.code, _this.uid);
        }
        return _this;
        //this.props.store.addErrorListViewKeyValues(this.props.code,this.uid)
    }
    Object.defineProperty(LegionsProErrorReportShow.prototype, "viewForm", {
        get: function () {
            return this.props.store.get(this.props.formUid);
        },
        enumerable: false,
        configurable: true
    });
    LegionsProErrorReportShow.prototype.handleIgnore = function (item) {
        var _this = this;
        if (item.status === 2) {
            runInAction(function () {
                item.status = 1;
                var canBeSubmit = _this.viewForm && _this.viewForm.errorListView.get(_this.uid).every(function (item) { return item.type === 'canBeSubmit' && item.status === 1; });
                var has = _this.viewForm.errorListView.get(_this.uid).every(function (item) { return item.status === 1; });
                var view = _this.viewForm.computedErrorReactNodeList.get(_this.props.code);
                if (canBeSubmit && has) {
                    view.validateStatus = '';
                }
                else {
                    view.validateStatus = 'error';
                }
            });
        }
        this.props.onIgnoreError && this.props.onIgnoreError(item);
    };
    LegionsProErrorReportShow.prototype.renderContent = function () {
        var _this = this;
        var data = this.viewForm && this.viewForm.errorListView.get(this.uid);
        var canBeSubmit = data.filter(function (item) { return item.type === 'canBeSubmit'; });
        var doNotSubmit = data.filter(function (item) { return item.type === 'doNotSubmit'; });
        return (React.createElement("div", { className: styles['tip-alert-panel'] },
            canBeSubmit.length > 0 && (React.createElement("div", null,
                React.createElement("div", { className: styles['tip-alert-title'] }, "\u53EF\u63D0\u4EA4"),
                canBeSubmit.map(function (item) {
                    return React.createElement("div", { className: styles['tip-alert-panel-item'] },
                        React.createElement("div", { className: styles['tip-alert-panel-item-content'] + " " + styles.canIgnore }, item.title),
                        React.createElement("span", { className: styles.ignoreBtn + " " + (item.status === 1 ? styles.ignored : ''), onClick: _this.handleIgnore.bind(_this, item) }, _this.enumList[item.status]));
                }))),
            doNotSubmit.length > 0 && (React.createElement("div", null,
                React.createElement("div", { className: styles['tip-alert-title'] }, "\u4E0D\u53EF\u63D0\u4EA4"),
                doNotSubmit.map(function (item) {
                    return React.createElement("div", { className: styles['tip-alert-panel-item'] },
                        React.createElement("div", { className: "" + styles['tip-alert-panel-item-content'] }, item.title));
                })))));
    };
    LegionsProErrorReportShow.prototype.render = function () {
        var isShowErrorView = this.viewForm && this.viewForm.errorListView.has(this.uid);
        var view = this.viewForm && this.viewForm.computedErrorReactNodeList.get(this.props.code);
        return (React.createElement("div", { className: (this.props.className || '') + " " + (isShowErrorView && view.validateStatus === 'error' ? 'has-error' : '') },
            isShowErrorView && React.createElement("div", { className: (this.props.errorClassName || '') + " " + ((view && view.validateStatus) === '' && styles.tipIconAllow) },
                React.createElement(Popover, { placement: "bottom", title: '', content: this.renderContent(), trigger: "click" },
                    React.createElement(Icon, { type: "exclamation-circle", style: { fontSize: '14px' } }))),
            this.props.children));
    };
    LegionsProErrorReportShow = __decorate([
        bind({ store: ProFormStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProErrorReportShow);
    return LegionsProErrorReportShow;
}(Component));

export default LegionsProErrorReportShow;
