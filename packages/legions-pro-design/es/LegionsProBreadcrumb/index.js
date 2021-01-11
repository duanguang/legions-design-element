/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import { Breadcrumb, Row, Col } from 'antd';
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
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var baseCls = "legions-pro-design-breadcrumb";
var LegionsProBreadcrumb = /** @class */ (function (_super) {
    __extends(LegionsProBreadcrumb, _super);
    function LegionsProBreadcrumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProBreadcrumb.prototype.renderCrumbItem = function () {
        var value = this.props.value || [];
        return value.map(function (item, index) {
            return React.createElement(Breadcrumb.Item, { key: index }, item.url ? React.createElement("a", { href: item.url }, item.name) : item.name);
        });
    };
    LegionsProBreadcrumb.prototype.render = function () {
        return (React.createElement(Row, { className: baseCls, style: { marginBottom: '10px', marginLeft: '13px', marginRight: '13px' } },
            React.createElement(Col, { span: 7 },
                React.createElement("div", { className: baseCls },
                    React.createElement("div", { className: "system" },
                        React.createElement(Breadcrumb, null, this.renderCrumbItem()))))));
    };
    return LegionsProBreadcrumb;
}(React.Component));

export default LegionsProBreadcrumb;
