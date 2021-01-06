/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
import 'echarts/lib/chart/map';
import echarts from 'echarts/lib/echarts';
import React from 'react';
import { LegionsProEcharts } from '../LegionsProEcharts';
import { merge } from 'lodash';
import 'echarts-gl';

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

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var theme = require('../locale/theme.json');
var LegionsProEchartsPropsTypes = /** @class */ (function () {
    function LegionsProEchartsPropsTypes() {
        /** 配置项 */
        this.option = {};
        this.onEvents = {};
        /** 是否显示加载状态 */
        this.loading = false;
        this.loadingOption = {};
        /** 初始化附加参数 */
        this.opts = {};
        /** 初始化主题 */
        //@ts-ignore
        this.theme = theme;
        /** 容器样式 */
        this.style = {};
        /** 容器类名 */
        this.className = '';
        /** setOption时的附加配置项 */
        this.setOptionConfig = {};
        /** 由上层觉得是否需要setOption, 类似shouldComponentUpdate。默认为 true */
        this.shouldSetOption = function () { return true; };
        /** echarts 实例化完成后执行并抛出实例 */
        this.onChartReady = function () { };
    }
    return LegionsProEchartsPropsTypes;
}());

var world = require('echarts/map/json/world.json');
var nameCN = require('../locale/country-name-zh.json');
var LegionsProEchartsMapProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsMapProps, _super);
    function LegionsProEchartsMapProps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 数据 */
        _this.data = __spread(Object.values(nameCN).map(function (name) {
            return { name: name, value: Math.ceil((Math.random() * 10000000)) };
        }));
        /** 配置项 */
        _this.option = {};
        return _this;
    }
    return LegionsProEchartsMapProps;
}(LegionsProEchartsPropsTypes));
var LegionsProEchartsMap = /** @class */ (function (_super) {
    __extends(LegionsProEchartsMap, _super);
    function LegionsProEchartsMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeAction = true;
        _this.state = {
            data: LegionsProEchartsMap.initData
        };
        _this.timeId = null;
        //@ts-ignore
        _this.chartsRef = null;
        return _this;
    }
    Object.defineProperty(LegionsProEchartsMap.prototype, "option", {
        get: function () {
            return {
                tooltip: {
                    trigger: 'item',
                },
                series: [
                    {
                        name: '出口报关单单量',
                        type: 'map3D',
                        map: 'world',
                        data: this.state.data,
                        itemStyle: {
                            color: '#0f2a37',
                            borderColor: '#00e7fb',
                            borderWidth: 1,
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                            itemStyle: {
                                color: '#e1874d',
                            },
                        },
                        //@ts-ignore
                        groundPlane: {
                            show: true,
                            color: 'rgba(0, 54, 81, 0.3)',
                        },
                        viewControl: {
                            projection: 'orthographic',
                            alpha: 30,
                            orthographicSize: 50
                        },
                        nameMap: LegionsProEchartsMap.countryNameZh,
                    },
                ],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsMap.prototype.componentWillMount = function () {
        var _this = this;
        echarts.registerMap('world', world);
        this.timeId = setInterval(function () {
            _this.timeAction && _this.highlightSelect();
        }, 2000);
    };
    LegionsProEchartsMap.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                data: this.props.data
            });
        }
    };
    LegionsProEchartsMap.prototype.componentDidMount = function () {
        var _this = this;
        /** 点击对应状态跳转到对应模块 */
        this.chartsRef.on('globalout', function (e) {
            _this.timeAction = true;
        });
        this.chartsRef.on('mouseover', function (e) {
            _this.timeAction = false;
            _this.highlightSelect(e.dataIndex);
        });
    };
    LegionsProEchartsMap.prototype.componentWillUnmount = function () {
        clearInterval(this.timeId);
    };
    LegionsProEchartsMap.prototype.highlightSelect = function (dataIndex) {
        var timeIndex = dataIndex || Math.ceil(Math.random() * Object.values(nameCN).length);
        this.setState({
            //@ts-ignore
            data: __spread(LegionsProEchartsMap.initData.map(function (item, index) {
                if (timeIndex === index) {
                    return __assign(__assign({}, item), { height: 6, itemStyle: { color: '#e1874d' }, label: {
                            show: dataIndex ? false : true,
                            distance: 10000,
                            formatter: '{b}:{c}',
                            textStyle: {
                                fontSize: 12,
                            }
                        } });
                }
                return item;
            }))
        });
    };
    LegionsProEchartsMap.prototype.render = function () {
        var _this = this;
        var option = this.props.option;
        return (React.createElement(LegionsProEcharts, __assign({}, this.props, { option: merge(this.option, option), onChartReady: function (ref) {
                _this.chartsRef = ref;
            } })));
    };
    LegionsProEchartsMap.initData = __spread(Object.values(nameCN).map(function (name) {
        return { name: name, value: Math.ceil((Math.random() * 10000000)) };
    }));
    LegionsProEchartsMap.countryNameZh = nameCN;
    LegionsProEchartsMap.defaultProps = new LegionsProEchartsMapProps();
    return LegionsProEchartsMap;
}(React.Component));

export { LegionsProEchartsMap, LegionsProEchartsMapProps };
