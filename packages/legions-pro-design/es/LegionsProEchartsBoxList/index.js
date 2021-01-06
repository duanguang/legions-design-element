/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
import React from 'react';
import { Col, Row, Progress } from 'antd';
import './style/index.less';
import { LegionsProEchartsBox } from '../LegionsProEchartsBox';
import LegionsProLineOverflow from '../LegionsProLineOverflow';

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

/*
 * @Author: duanguang
 * @Date: 2020-12-11 10:42:01
 * @LastEditTime: 2020-12-18 16:48:44
 * @LastEditors: duanguang
 * @Description: 可视化界面容器盒子列表组件
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsBoxList/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var IProps = /** @class */ (function () {
    function IProps() {
        this.style = {};
        this.className = '';
        this.dataSource = [];
        /** 容器内联样式 */
        this.boxStyle = {};
        /** 容器标题渲染
         *
         * 当不传时，默认渲染表格列展示形式
         *
         * 传入字符串，则绑定字符串信息
         *
         * 传入React.ReactNode 则以自定义展示
         */
        this.boxTitle = null;
        this.columns = [];
        /**表格行 key 的取值，可以是字符串或一个函数
         *
         * 默认值key
         */
        this.rowKey = 'key';
    }
    return IProps;
}());
var proLayoutPrefix = 'legions-pro-echarts';
/** 可视化界面容器盒子列表组件 */
var LegionsProEchartsBoxList = /** @class */ (function (_super) {
    __extends(LegionsProEchartsBoxList, _super);
    function LegionsProEchartsBoxList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsBoxList.prototype.renderContent = function () {
        var _this = this;
        var _a = this.props, dataSource = _a.dataSource, rowKey = _a.rowKey;
        var renderRowKeys = function (item, index) {
            if (typeof rowKey === 'function') {
                return rowKey(item, index);
            }
            else if (typeof rowKey === 'string') {
                return item[rowKey];
            }
        };
        return dataSource.map(function (item, index) {
            var hasOwnProperty = item['hasOwnProperty'];
            var renderCells = function () {
                var cells = [];
                Object.keys(item).forEach(function (keys) {
                    var renderItems = _this.props.columns.find(function (fitem) { return hasOwnProperty && (keys === fitem.dataIndex || keys === fitem.key); });
                    if (renderItems) {
                        if (renderItems.render === void 0) {
                            cells.push(React.createElement(LegionsProLineOverflow, { text: item[keys] },
                                React.createElement(Col, { span: renderItems.colSpan || 3, offset: renderItems.offset || 2, className: "box-lit-title-text-overflow  " + (renderItems.className || 'box-lit-title') }, item[keys])));
                        }
                        else if (typeof renderItems.render === 'function') {
                            cells.push(React.createElement(Col, { span: renderItems.colSpan || 3, offset: renderItems.offset || 2, className: "" + renderItems.className }, renderItems.render(keys, item, index)));
                        }
                        else if (renderItems.render === 'proportion') {
                            cells.push(React.createElement(Col, { span: renderItems.colSpan || 3, offset: renderItems.offset || 2, className: "" + renderItems.className },
                                React.createElement(Progress, { percent: item[keys], 
                                    /* style={{ width: '40%' }} */
                                    showInfo: true, style: { color: '#00E6FC' } })));
                        }
                    }
                });
                return cells;
            };
            return React.createElement("div", { className: "box-lit-top-singleRowList", key: "" + renderRowKeys(item, index) },
                React.createElement("div", { className: "box-lit-item" },
                    React.createElement("div", { className: "box-lit-item-Top" },
                        React.createElement(Col, { span: 2, className: 'box-lit-serial-number', style: index + 1 > 3 ? { backgroundColor: '#00E6FC' } : { backgroundColor: '#db8848' } }, index + 1),
                        renderCells())));
        });
    };
    LegionsProEchartsBoxList.prototype.renderProBoxTitle = function () {
        var _a = this.props, boxTitle = _a.boxTitle, columns = _a.columns;
        var ColumnProps = boxTitle || columns;
        if (Array.isArray(ColumnProps)) {
            var arr = ColumnProps;
            return React.createElement(Row, null,
                React.createElement(Col, { span: 1 }),
                arr.map(function (item) {
                    return React.createElement(Col, { key: item.dataIndex + "-" + item.title, span: item.colSpan || 3, style: { color: '#fff', fontSize: '12px' }, offset: (item.offset || 2) },
                        " ",
                        item.title);
                }));
        }
        else {
            return boxTitle;
        }
    };
    LegionsProEchartsBoxList.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, boxStyle = _a.boxStyle;
        var newBoxStyle = __assign({ height: '33.33%', paddingBottom: 10, paddingTop: 5 }, boxStyle);
        return (React.createElement(LegionsProEchartsBox, { style: newBoxStyle, title: this.renderProBoxTitle() },
            React.createElement("div", { className: proLayoutPrefix + "-box-list" }, this.renderContent())));
    };
    //@ts-ignore
    LegionsProEchartsBoxList.defaultProps = new IProps();
    return LegionsProEchartsBoxList;
}(React.Component));

export { LegionsProEchartsBoxList };
