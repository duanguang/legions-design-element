/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React from 'react';
import LegionsProEcharts from '../LegionsProEcharts';
import { echarts, LegionsProEchartsPropsTypes } from '../interface';
import { merge } from 'lodash';
import { MapChart, LinesChart, EffectScatterChart } from 'echarts/charts';
import { GeoComponent } from 'echarts/components';

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

echarts.use([GeoComponent, MapChart, LinesChart, EffectScatterChart]);
var world = require('../locale/world.json');
var nameCN = require('../locale/country-name-zh.json');
var LegionsProEchartsMapProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsMapProps, _super);
    function LegionsProEchartsMapProps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 是否初始化世界地图, 默认true */
        _this.initRegisterWorldMap = true;
        return _this;
    }
    return LegionsProEchartsMapProps;
}(LegionsProEchartsPropsTypes));
var LegionsProEchartsMap = /** @class */ (function (_super) {
    __extends(LegionsProEchartsMap, _super);
    function LegionsProEchartsMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProEchartsMap.prototype.componentWillMount = function () {
        this.props.initRegisterWorldMap && echarts.registerMap('world', LegionsProEchartsMap.worldData);
    };
    Object.defineProperty(LegionsProEchartsMap.prototype, "option", {
        get: function () {
            return {
                tooltip: {
                    trigger: 'item',
                },
                geo: {
                    map: 'world',
                    zoom: 1,
                    roam: false,
                    label: {
                        color: '#fff',
                    },
                    itemStyle: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                offset: 0,
                                color: 'rgba(147, 235, 248, 0)'
                            }, {
                                offset: 1,
                                color: 'rgba(147, 235, 248, .2)'
                            }]),
                    },
                    emphasis: {
                        label: {
                            color: '#fff',
                        },
                        itemStyle: {
                            areaColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, 0.8)'
                                }])
                        }
                    },
                    nameMap: this.props.initRegisterWorldMap && LegionsProEchartsMap.countryNameZh,
                },
                series: [
                    {
                        geoIndex: 0,
                        type: 'map',
                        map: 'world',
                        nameMap: this.props.initRegisterWorldMap && LegionsProEchartsMap.countryNameZh,
                    },
                    {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        showEffectOn: 'render',
                        zlevel: 1,
                        rippleEffect: {
                            period: 15,
                            scale: 4,
                            brushType: 'fill'
                        },
                        tooltip: { show: false },
                        label: {
                            formatter: '{b}',
                            position: 'right',
                            offset: [15, 0],
                            color: '#1DE9B6',
                            show: true
                        },
                        itemStyle: {
                            color: '#1DE9B6',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        },
                        symbolSize: 10,
                    },
                    {
                        type: 'lines',
                        zlevel: 2,
                        coordinateSystem: 'geo',
                        tooltip: { show: false },
                        effect: {
                            show: true,
                            period: 4,
                            trailLength: 0.4,
                            symbol: 'circle',
                            symbolSize: 7,
                        },
                        lineStyle: {
                            color: '#1DE9B6',
                            width: 1,
                            opacity: 0.1,
                            curveness: .3 //尾迹线条曲直度
                        },
                    }
                ],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsMap.prototype.render = function () {
        var option = this.props.option;
        return (React.createElement(LegionsProEcharts, __assign({}, this.props, { option: merge(this.option, option) })));
    };
    LegionsProEchartsMap.defaultProps = new LegionsProEchartsMapProps();
    LegionsProEchartsMap.countryNameZh = nameCN;
    LegionsProEchartsMap.worldData = world;
    return LegionsProEchartsMap;
}(React.Component));

export default LegionsProEchartsMap;
export { LegionsProEchartsMapProps };
