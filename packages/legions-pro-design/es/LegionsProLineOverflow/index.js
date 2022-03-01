/**
  *  legions-pro-design v0.0.21
  * (c) 2022 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import './style/index.less';
import { Tooltip } from 'antd';

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

var baseCls = 'legions-pro-lineoverflow';
var LegionsProLineOverflow = /** @class */ (function (_super) {
    __extends(LegionsProLineOverflow, _super);
    function LegionsProLineOverflow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProLineOverflow.prototype.render = function () {
        return (React.createElement(Tooltip, { placement: "leftTop", title: this.props.text ? this.props.text : '' },
            React.createElement("div", { className: baseCls },
                React.createElement("div", { className: "tooltip-rel" },
                    React.createElement("span", { className: "tooltip-content" }, this.props.text)))));
    };
    LegionsProLineOverflow.defaultProps = {
        text: '',
        width: 100,
    };
    return LegionsProLineOverflow;
}(Component));

export default LegionsProLineOverflow;
