/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { GaugeChart } from 'echarts/charts';
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

echarts.use([GaugeChart]);
var LegionsProEchartsGaugeProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsGaugeProps, _super);
    function LegionsProEchartsGaugeProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LegionsProEchartsGaugeProps;
}(LegionsProEchartsPropsTypes));
/** 仪表盘组件 */
var LegionsProEchartsGauge = /** @class */ (function (_super) {
    __extends(LegionsProEchartsGauge, _super);
    function LegionsProEchartsGauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LegionsProEchartsGauge.prototype, "option", {
        /** 配置项 */
        get: function () {
            return {
                tooltip: {
                    trigger: 'item',
                },
                series: [
                    {
                        type: 'gauge',
                        title: {
                            color: '#fff',
                        },
                        detail: {
                            color: '#fff',
                        },
                        itemStyle: {
                            color: '#00d4fd',
                            shadowColor: 'rgba(0,138,255,0.45)',
                            shadowBlur: 10,
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        progress: {
                            show: true,
                            roundCap: true,
                            width: 10
                        },
                        axisTick: {
                            splitNumber: 5,
                            lineStyle: {
                                width: 2,
                                color: 'rgba(20,105,131,1)'
                            }
                        },
                        splitLine: {
                            length: 12,
                            lineStyle: {
                                width: 2,
                                color: 'rgba(20,105,131,1)'
                            }
                        },
                        axisLabel: {
                            distance: 15,
                            color: '#fff',
                            fontSize: 14
                        },
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [1, 'rgba(6,41,70,0.8)']
                                ],
                            },
                            roundCap: true,
                        },
                    },
                ],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsGauge.prototype.render = function () {
        var option = merge(this.option, this.props.option);
        return (React.createElement(LegionsProEcharts, __assign({}, this.props, { option: option })));
    };
    LegionsProEchartsGauge.defaultProps = new LegionsProEchartsGaugeProps();
    return LegionsProEchartsGauge;
}(React.PureComponent));

export default LegionsProEchartsGauge;
export { LegionsProEchartsGaugeProps };
