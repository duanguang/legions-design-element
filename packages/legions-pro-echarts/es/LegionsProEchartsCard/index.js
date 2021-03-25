/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';

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

var LegionsProEchartsCardProps = /** @class */ (function () {
    function LegionsProEchartsCardProps() {
        this.title = '';
        this.total = 0;
    }
    return LegionsProEchartsCardProps;
}());
/** 卡片组件 */
var LegionsProEchartsCard = /** @class */ (function (_super) {
    __extends(LegionsProEchartsCard, _super);
    function LegionsProEchartsCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsCard.prototype.componentDidMount = function () {
    };
    LegionsProEchartsCard.prototype.render = function () {
        var _a = this.props, title = _a.title, total = _a.total;
        return (React.createElement("div", { style: {
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            } },
            React.createElement("div", null,
                React.createElement("div", { style: {
                        fontSize: '30px',
                        fontFamily: ' PingFangSC, PingFangSC-Regular',
                        fontWeight: 400,
                        textAlign: 'center',
                        color: '#00e6fc',
                        lineHeight: '32px',
                    } }, total),
                React.createElement("div", { style: {
                        fontSize: '14px',
                        fontFamily: 'PingFangSC, PingFangSC-Regular',
                        fontWeight: 400,
                        textAlign: 'center',
                        color: '#9be7f5',
                        lineHeight: '20px',
                    } }, title))));
    };
    LegionsProEchartsCard.defaultProps = new LegionsProEchartsCardProps();
    return LegionsProEchartsCard;
}(React.Component));

export default LegionsProEchartsCard;
export { LegionsProEchartsCardProps };
