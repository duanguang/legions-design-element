/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import 'echarts-liquidfill';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';

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

var LinearGradient = echarts.graphic.LinearGradient;
var LegionsProEchartsLiquidFillProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsLiquidFillProps, _super);
    function LegionsProEchartsLiquidFillProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LegionsProEchartsLiquidFillProps;
}(LegionsProEchartsPropsTypes));
var LegionsProEchartsLiquidFill = /** @class */ (function (_super) {
    __extends(LegionsProEchartsLiquidFill, _super);
    function LegionsProEchartsLiquidFill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LegionsProEchartsLiquidFill.prototype, "option", {
        /** 配置项 */
        get: function () {
            return {
                series: [
                    {
                        type: 'liquidFill',
                        data: this.props.data || [],
                        radius: '80%',
                        center: ['50%', '50%'],
                        color: [new LinearGradient(0, 0, 0, 1, [{
                                    offset: 1,
                                    color: 'rgba(58, 71, 212, 0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(31, 222, 225, .2)'
                                }, {
                                    offset: 0,
                                    color: 'rgba(31, 222, 225, 1)'
                                }], false)],
                        label: {
                            show: true,
                            color: '#aab2fa',
                            insideColor: '#fff',
                            fontSize: 24,
                            top: '68%',
                        },
                        outline: {
                            borderDistance: 0,
                            itemStyle: {
                                borderWidth: 8,
                                borderColor: new LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(69, 73, 240, 0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(69, 73, 240, .25)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(69, 73, 240, 1)'
                                    }], false),
                                shadowBlur: 5,
                                shadowColor: '#000',
                            }
                        },
                        backgroundStyle: {
                            color: new LinearGradient(1, 0, 0.5, 1, [{
                                    offset: 1,
                                    color: 'rgba(68, 145, 253, 0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(68, 145, 253, .25)'
                                }, {
                                    offset: 0,
                                    color: 'rgba(68, 145, 253, 1)'
                                }], false),
                        },
                    },
                ],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsLiquidFill.prototype.render = function () {
        var option = merge(this.option, this.props.option);
        return (React.createElement(LegionsProEcharts, __assign({}, this.props, { option: option })));
    };
    LegionsProEchartsLiquidFill.defaultProps = new LegionsProEchartsLiquidFillProps();
    return LegionsProEchartsLiquidFill;
}(React.Component));

export default LegionsProEchartsLiquidFill;
export { LegionsProEchartsLiquidFillProps };
