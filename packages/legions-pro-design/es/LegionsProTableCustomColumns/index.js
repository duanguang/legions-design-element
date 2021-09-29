/**
  *  legions-pro-design v0.0.8
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import { Row, Col, Card, message } from 'antd';
import LegionsProModal from '../LegionsProModal';
import LegionsStoreTable from '../LegionsStoreTable';
import { bind, observer } from 'legions/store-react';
import LegionsProDragger from '../LegionsProDragger';
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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var LegionsProTableCustomColumns = /** @class */ (function (_super) {
    __extends(LegionsProTableCustomColumns, _super);
    function LegionsProTableCustomColumns(props) {
        var _this = _super.call(this, props) || this;
        _this.modalRef = null;
        _this.state = {};
        return _this;
    }
    LegionsProTableCustomColumns.prototype.componentDidMount = function () {
        document.body.ondrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
    };
    Object.defineProperty(LegionsProTableCustomColumns.prototype, "viewStore", {
        get: function () {
            return this.props.store.get(this.props.tableUid);
        },
        enumerable: false,
        configurable: true
    });
    LegionsProTableCustomColumns.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { display: 'block' } },
            React.createElement(LegionsProModal, { footer: null, onReady: function (value) {
                    _this.modalRef = value;
                    _this.modalRef.viewModel.width = 960;
                    _this.props.onReady && _this.props.onReady(value);
                } },
                React.createElement(Row, { className: "legions-pro-table-custom" },
                    React.createElement(Col, { span: 11 },
                        React.createElement(Card, { style: {
                                width: '100%',
                                minHeight: '300px',
                                maxHeight: '500px',
                                overflow: 'scroll',
                            }, title: (React.createElement("p", null,
                                "\u5168\u90E8\u5217",
                                React.createElement("span", { style: { color: 'red' } }, "*\u9700\u8981\u663E\u793A\u7684\u5217\u62D6\u52A8\u5230\u53F3\u4FA7"))) }, this.viewStore && React.createElement(LegionsProDragger, { style: { width: '100%', minHeight: '200px' }, options: {
                                animation: 150,
                                group: {
                                    name: 'shared',
                                    pull: true,
                                    put: true,
                                },
                                filter: ".disabled",
                                /* filter:`.${this.viewStore.computedStorageShowColumnsKeys}disabled`, */
                                store: {
                                    /**
                                     * Get the order of elements. Called once during initialization.
                                     * @param   {Sortable}  sortable
                                     * @returns {Array}
                                     */
                                    get: function (sortable) {
                                        // const order = localStorage.getItem(sortable.options.group.name);
                                        /* const order = localStorage.getItem(this.viewStore.computedStorageShowColumnsKeys); */
                                        return _this.viewStore._getLocalStorageShowColumns();
                                    },
                                    /**
                                     * Save the order of elements. Called onEnd (when the item is dropped).
                                     * @param {Sortable}  sortable
                                     */
                                    set: function (sortable) {
                                        // 从显示列往全部列拖动时触发
                                        /* let order = sortable.toArray(); */
                                        // localStorage.setItem(sortable.options.group.name,order.join('|'));
                                        _this.viewStore._setLocalStorageShowColumns(_this.props.customColumnsConfig.editApi);
                                    }
                                }
                            }, onChange: function (items) {
                                /** 右侧区域在移动时不需要变化 ，则不执行任何数据处理*/
                                if (_this.viewStore.computedShowColumns.length === items.length) ;
                            } }, this.viewStore.computedUnShowColumns.map(function (item) {
                            var index = _this.viewStore.computedShowColumns.findIndex(function (m) { return m.dataIndex === item.dataIndex; });
                            /* const className = `${this.viewStore.computedStorageShowColumnsKeys}disabled` */
                            var className = "disabled";
                            return React.createElement(Col, { style: { marginBottom: '15px' }, className: index > -1 ? className : '', span: 8, "data-id": item.dataIndex, key: item.dataIndex },
                                React.createElement("div", { className: "table-columns-col " + (index > -1 ? "col-white-color cursor-not-allowed" : 'col-color-blue') },
                                    React.createElement("span", { style: { display: 'inline-block', whiteSpace: 'normal', verticalAlign: 'middle', lineHeight: '15px' } }, item.title)));
                        })))),
                    React.createElement(Col, { span: 12, style: { marginLeft: '15px' } },
                        React.createElement(Card, { style: {
                                width: '100%',
                                minHeight: '300px',
                                maxHeight: '500px',
                                overflow: 'scroll',
                            }, title: (React.createElement("p", null,
                                "\u663E\u793A\u5217",
                                React.createElement("span", { style: { color: 'red' } }, "*\u9700\u8981\u9690\u85CF\u7684\u5217\u62D6\u52A8\u5230\u5DE6\u4FA7"))) }, this.viewStore && React.createElement(LegionsProDragger, { style: { width: '100%', minHeight: '200px' }, options: {
                                animation: 150,
                                group: {
                                    name: 'shared',
                                    pull: true,
                                    put: true,
                                },
                            }, onChange: function (items, sort, evt) {
                                if (items.length > 0) { // 至少保留一项
                                    if (evt.item.attributes['data-id']) {
                                        var name_1 = evt.item.innerText;
                                        var columnKey_1 = evt.item.attributes['data-id'].value;
                                        var entity = _this.viewStore.columns.find(function (item) { return item.dataIndex === columnKey_1; });
                                        if (entity) {
                                            if (entity.hasOwnProperty('fixed')) { // 当用户移动的是固定列时，排序不执行
                                                var currIndex = items.findIndex(function (item) { return item === columnKey_1; });
                                                if (entity['fixed'] === 'left' && currIndex > 0) {
                                                    /** 如果拖拽左侧固定列，则只能插入在最左侧位置 */
                                                    var newItem = _this.viewStore.computedShowColumns[currIndex - 1] || {};
                                                    if (newItem && !newItem.hasOwnProperty('fixed')) {
                                                        message.error(entity.title + "\u5217\u5DF2\u56FA\u5B9A\u5728\u5DE6\u4FA7\uFF0C\u60A8\u65E0\u6CD5\u79FB\u52A8\u81F3\u5176\u4ED6\u4F4D\u7F6E", 4);
                                                        return;
                                                    }
                                                }
                                                else if (entity['fixed'] === 'right') {
                                                    /**  如果右侧固定列取消显示即currIndex =-1,则不拦截
                                                     *  如果右侧固定列拖拽显示，则只能移动到最右侧最后一个位置
                                                    */
                                                    if (currIndex > -1 && currIndex < items.length - 1) {
                                                        message.error(name_1 + "\u5217\u5DF2\u56FA\u5B9A\u5728\u53F3\u4FA7\uFF0C\u60A8\u65E0\u6CD5\u79FB\u52A8\u81F3\u5176\u4ED6\u4F4D\u7F6E", 4);
                                                        return;
                                                    }
                                                }
                                            }
                                            /** 当用户移动的不是固定列，而是把其他列插入左固定列前面或者右固定的后面时
                                             * 首先查询出当前移动列后排完序的结果，并计算出数组位置下标值
                                             * 通过下标值去历史列表中查询该下标的值，如果该值列信息是固定列，则直接return 不执行排序
                                             */
                                            else if (items.length === _this.viewStore.computedShowColumns.length) {
                                                var currIndex = items.findIndex(function (item) { return item === columnKey_1; });
                                                var newItem_1 = _this.viewStore.computedShowColumns[currIndex] || {};
                                                // @ts-ignore
                                                var newentity = _this.viewStore.columns.find(function (item) { return item.dataIndex === newItem_1.dataIndex; });
                                                if (newentity && newentity.hasOwnProperty('fixed')) {
                                                    // @ts-ignore
                                                    message.warning(newItem_1.title + "\u5217\u5DF2\u56FA\u5B9A\u4F4D\u7F6E\uFF0C\u60A8\u6682\u65F6\u65E0\u6CD5\u79FB\u52A8", 4);
                                                    return;
                                                }
                                            }
                                            else {
                                                var currIndex = items.findIndex(function (item) { return item === columnKey_1; });
                                                /** 当用户拖拽其他非固定列移动时，如果移动位置大于0，则判定上个位置是否右侧固定列，不是的话，可以移动
                                                 * 如果移动位置为0 ，则判定当前所占位置是否左侧固定列，如果不是则可以移动
                                                 */
                                                var newItem_2 = _this.viewStore.computedShowColumns[currIndex > 0 ? currIndex - 1 : currIndex] || {};
                                                // @ts-ignore
                                                var newentity = _this.viewStore.columns.find(function (item) { return item.dataIndex === newItem_2.dataIndex; });
                                                if (newentity && newentity.hasOwnProperty('fixed')) {
                                                    if (currIndex > 0 && newentity.fixed === 'right') {
                                                        // @ts-ignore
                                                        message.warning(newItem_2.title + "\u5217\u5DF2\u56FA\u5B9A\u4F4D\u7F6E\uFF0C\u60A8\u6682\u65F6\u65E0\u6CD5\u79FB\u52A8", 4);
                                                        return;
                                                    }
                                                    else if (currIndex === 0 && newentity.fixed === 'left') {
                                                        // @ts-ignore
                                                        message.warning(newItem_2.title + "\u5217\u5DF2\u56FA\u5B9A\u4F4D\u7F6E\uFF0C\u60A8\u6682\u65F6\u65E0\u6CD5\u79FB\u52A8", 4);
                                                        return;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_this.viewStore.computedShowColumns.length === items.length) { // 表示在当前区域做排序处理
                                        _this.viewStore._orderSortRightShowColumns(items);
                                        _this.viewStore._setLocalStorageShowColumns(_this.props.customColumnsConfig.editApi);
                                        /* localStorage.setItem(this.viewStore.computedStorageShowColumnsKeys,JSON.stringify(this.viewStore.computedShowColumns)); */
                                    }
                                    else {
                                        _this.viewStore._moveRightShowColumns(items);
                                    }
                                }
                                else {
                                    message.warning('至少保留一项');
                                }
                            } }, this.viewStore.computedShowColumns.map(function (item) {
                            /* const newitem = this.viewStore.columns.find((m) => m.dataIndex === item.dataIndex)
                            let disabled = false;
                            if (newitem&&newitem.hasOwnProperty('fixed')) {
                                disabled = true;
                            } */
                            /* const className = `${this.viewStore.computedStorageShowColumnsKeys}disabled` */
                            /* const className = `disabled` */
                            return React.createElement(Col, { span: 8, style: { marginBottom: '15px', display: 'table' }, "data-id": item.dataIndex, key: item.dataIndex },
                                React.createElement("div", { className: "table-columns-col  col-color-blue" },
                                    React.createElement("span", { style: { display: 'inline-block', whiteSpace: 'normal', verticalAlign: 'middle', lineHeight: '15px' } }, item.title)));
                        }))))))));
    };
    LegionsProTableCustomColumns = __decorate([
        bind({ store: LegionsStoreTable }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProTableCustomColumns);
    return LegionsProTableCustomColumns;
}(Component));

export default LegionsProTableCustomColumns;
