/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import isEqual from 'fast-deep-equal';
import { bind, clear } from 'size-sensor';

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

var pick = function (obj, keys) {
    var r = {};
    keys.forEach(function (key) {
        r[key] = obj[key];
    });
    return r;
};
var LegionsProEchartsCore = /** @class */ (function (_super) {
    __extends(LegionsProEchartsCore, _super);
    function LegionsProEchartsCore(props) {
        var _this = _super.call(this, props) || this;
        /** 获取Echarts实例，没有则初始化 */
        _this.getEchartsInstance = function () {
            return _this.echartsLib.getInstanceByDom(_this.echartsElement) ||
                _this.echartsLib.init(_this.echartsElement, _this.props.theme, _this.props.opts);
        };
        // render the dom
        _this.renderEchartDom = function () {
            // init the echart object
            var echartObj = _this.getEchartsInstance();
            // set the echart option
            echartObj.setOption(_this.props.option || {}, __assign({}, _this.props.setOptionConfig));
            // set loading mask
            if (_this.props.loading)
                echartObj.showLoading(void 0, _this.props.loadingOption || void 0);
            else
                echartObj.hideLoading();
            return echartObj;
        };
        _this.rerender = function () {
            var _a = _this.props, onEvents = _a.onEvents, onChartReady = _a.onChartReady;
            var echartObj = _this.renderEchartDom();
            _this.bindEvents(echartObj, onEvents || {});
            // on chart ready
            if (typeof onChartReady === 'function' && _this.props.onChartReady)
                _this.props.onChartReady(echartObj);
            // on resize
            if (_this.echartsElement) {
                bind(_this.echartsElement, function () {
                    try {
                        echartObj.resize();
                    }
                    catch (e) {
                        console.warn(e);
                    }
                });
            }
        };
        // bind the events
        _this.bindEvents = function (instance, events) {
            var _bindEvent = function (eventName, func) {
                // ignore the event config which not satisfy
                if (typeof eventName === 'string' && typeof func === 'function') {
                    // binding event
                    // instance.off(eventName); // 已经 dispose 在重建，所以无需 off 操作
                    instance.on(eventName, function (param) {
                        func(param, instance);
                    });
                }
            };
            // loop and bind
            for (var eventName in events) {
                if (Object.prototype.hasOwnProperty.call(events, eventName)) {
                    _bindEvent(eventName, events[eventName]);
                }
            }
        };
        /** 销毁实例 */
        _this.dispose = function () {
            if (_this.echartsElement) {
                try {
                    clear(_this.echartsElement);
                }
                catch (e) {
                    console.warn(e);
                }
                // dispose echarts instance
                /* this.echartsLib.dispose(this.echartsElement); */
                echarts.dispose(_this.echartsElement);
            }
        };
        _this.echartsLib = props.echarts; // the echarts object.
        // @ts-ignore 
        _this.echartsElement = null; // echarts div element
        return _this;
    }
    // first add
    LegionsProEchartsCore.prototype.componentDidMount = function () {
        this.rerender();
    };
    // update
    LegionsProEchartsCore.prototype.componentDidUpdate = function (prevProps) {
        // 判断是否需要 setOption，由开发者自己来确定。默认为 true
        if (typeof this.props.shouldSetOption === 'function' && !this.props.shouldSetOption(prevProps, this.props)) {
            return;
        }
        // 以下属性修改的时候，需要 dispose 之后再新建
        // 1. 切换 theme 的时候
        // 2. 修改 opts 的时候
        // 3. 修改 onEvents 的时候，这样可以取消所有之前绑定的事件 issue #151
        if (!isEqual(prevProps.theme, this.props.theme) ||
            !isEqual(prevProps.opts, this.props.opts) ||
            !isEqual(prevProps.onEvents, this.props.onEvents)) {
            this.dispose();
            this.rerender(); // 重建
            return;
        }
        // 当这些属性保持不变的时候，不 setOption
        var pickKeys = ['option', 'notMerge', 'lazyUpdate', 'showLoading', 'loadingOption'];
        if (isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
            return;
        }
        var echartObj = this.renderEchartDom();
        // 样式修改的时候，可能会导致大小变化，所以触发一下 resize
        if (!isEqual(prevProps.style, this.props.style) || !isEqual(prevProps.className, this.props.className)) {
            try {
                echartObj.resize();
            }
            catch (e) {
                console.warn(e);
            }
        }
    };
    LegionsProEchartsCore.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, className = _a.className;
        var newStyle = __assign({ height: '100%' }, style);
        return (React.createElement("div", { 
            //@ts-ignore
            ref: function (e) { _this.echartsElement = e; }, style: newStyle, className: "legions-pro-echarts " + className }));
    };
    LegionsProEchartsCore.defaultProps = new LegionsProEchartsPropsTypes();
    return LegionsProEchartsCore;
}(Component));

export { LegionsProEchartsCore };
