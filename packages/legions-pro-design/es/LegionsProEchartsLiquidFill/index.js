/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
import React from 'react';
import { LegionsProEcharts } from '../LegionsProEcharts';
import echarts from 'echarts/lib/echarts';
import { observablePromise, observableViewModel } from 'brain-store-utils';
import { observable } from 'mobx';
import { LegionsFetch } from '../core';
import { merge } from 'lodash';
import completeDimensions from 'echarts/lib/data/helper/completeDimensions';
import { createSymbol } from 'echarts/lib/util/symbol';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
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

/*
 * @Author: duanguang
 * @Date: 2020-12-17 10:26:11
 * @LastEditTime: 2020-12-18 11:06:26
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsLiquidFill/liquidFillSeries.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
function liquidFillSeries() {
    echarts['extendSeriesModel']({
        type: 'series.liquidFill',
        visualColorAccessPath: 'textStyle.normal.color',
        optionUpdated: function () {
            var option = this.option;
            option.gridSize = Math.max(Math.floor(option.gridSize), 4);
        },
        getInitialData: function (option, ecModel) {
            var dimensions = completeDimensions(['value'], option.data);
            var list = new echarts['List'](dimensions, this);
            list.initData(option.data);
            return list;
        },
        defaultOption: {
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 1,
                        color: 'rgba(58, 71, 212, 0)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(31, 222, 225, .2)'
                    }, {
                        offset: 0,
                        color: 'rgba(31, 222, 225, 1)'
                    }], false)],
            center: ['50%', '50%'],
            radius: '50%',
            amplitude: '8%',
            waveLength: '80%',
            phase: 'auto',
            period: 'auto',
            direction: 'right',
            shape: 'circle',
            waveAnimation: true,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            animationDuration: 2000,
            animationDurationUpdate: 1000,
            /* outline: {
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'none',
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            }, */
            outline: {
                show: true,
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 8,
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                color: new echarts.graphic.LinearGradient(1, 0, 0.5, 1, [{
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
            itemStyle: {
                opacity: 0.95,
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, 0.4)'
            },
            label: {
                show: true,
                color: '#aab2fa',
                insideColor: '#fff',
                fontSize: 20,
                /* fontWeight: 'bold', */
                top: '68%',
                align: 'center',
                baseline: 'middle',
                position: 'inside',
                formatter: '{b}\n',
            },
            emphasis: {
                itemStyle: {
                    opacity: 0.8
                }
            }
        }
    });
}

/*
 * @Author: duanguang
 * @Date: 2020-12-17 09:50:50
 * @LastEditTime: 2020-12-17 17:31:54
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsWaterDropBall/liquidFillLayout.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/**
 * Using Bezier curves to fit sine wave.
 * There is 4 control points for each curve of wave,
 * which is at 1/4 wave length of the sine wave.
 *
 * The control points for a wave from (a) to (d) are a-b-c-d:
 *          c *----* d
 *     b *
 *       |
 * ... a * ..................
 *
 * whose positions are a: (0, 0), b: (0.5, 0.5), c: (1, 1), d: (PI / 2, 1)
 *
 * @param {number} x          x position of the left-most point (a)
 * @param {number} stage      0-3, stating which part of the wave it is
 * @param {number} waveLength wave length of the sine wave
 * @param {number} amplitude  wave amplitude
 */
function getWaterPositions(x, stage, waveLength, amplitude) {
    if (stage === 0) {
        return [
            [x + 1 / 2 * waveLength / Math.PI / 2, amplitude / 2],
            [x + 1 / 2 * waveLength / Math.PI, amplitude],
            [x + waveLength / 4, amplitude]
        ];
    }
    else if (stage === 1) {
        return [
            [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 2),
                amplitude],
            [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 1),
                amplitude / 2],
            [x + waveLength / 4, 0]
        ];
    }
    else if (stage === 2) {
        return [
            [x + 1 / 2 * waveLength / Math.PI / 2, -amplitude / 2],
            [x + 1 / 2 * waveLength / Math.PI, -amplitude],
            [x + waveLength / 4, -amplitude]
        ];
    }
    else {
        return [
            [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 2),
                -amplitude],
            [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 1),
                -amplitude / 2],
            [x + waveLength / 4, 0]
        ];
    }
}
function liquidFillLayout(opt) {
    var func = echarts.graphic['extendShape']({
        type: 'ec-liquid-fill',
        shape: {
            waveLength: 0,
            radius: 0,
            radiusY: 0,
            cx: 0,
            cy: 0,
            waterLevel: 0,
            amplitude: 0,
            phase: 0,
            inverse: false
        },
        buildPath: function (ctx, shape) {
            if (shape.radiusY == null) {
                shape.radiusY = shape.radius;
            }
            /**
             * We define a sine wave having 4 waves, and make sure at least 8 curves
             * is drawn. Otherwise, it may cause blank area for some waves when
             * wave length is large enough.
             */
            var curves = Math.max(Math.ceil(2 * shape.radius / shape.waveLength * 4) * 2, 8);
            // map phase to [-Math.PI * 2, 0]
            while (shape.phase < -Math.PI * 2) {
                shape.phase += Math.PI * 2;
            }
            while (shape.phase > 0) {
                shape.phase -= Math.PI * 2;
            }
            var phase = shape.phase / Math.PI / 2 * shape.waveLength;
            var left = shape.cx - shape.radius + phase - shape.radius * 2;
            /**
             * top-left corner as start point
             *
             * draws this point
             *  |
             * \|/
             *  ~~~~~~~~
             *  |      |
             *  +------+
             */
            ctx.moveTo(left, shape.waterLevel);
            /**
             * top wave
             *
             * ~~~~~~~~ <- draws this sine wave
             * |      |
             * +------+
             */
            var waveRight = 0;
            for (var c = 0; c < curves; ++c) {
                var stage = c % 4;
                var pos = getWaterPositions(c * shape.waveLength / 4, stage, shape.waveLength, shape.amplitude);
                ctx.bezierCurveTo(pos[0][0] + left, -pos[0][1] + shape.waterLevel, pos[1][0] + left, -pos[1][1] + shape.waterLevel, pos[2][0] + left, -pos[2][1] + shape.waterLevel);
                if (c === curves - 1) {
                    waveRight = pos[2][0];
                }
            }
            if (shape.inverse) {
                /**
                 * top-right corner
                 *                  2. draws this line
                 *                          |
                 *                       +------+
                 * 3. draws this line -> |      | <- 1. draws this line
                 *                       ~~~~~~~~
                 */
                ctx.lineTo(waveRight + left, shape.cy - shape.radiusY);
                ctx.lineTo(left, shape.cy - shape.radiusY);
                ctx.lineTo(left, shape.waterLevel);
            }
            else {
                /**
                 * top-right corner
                 *
                 *                       ~~~~~~~~
                 * 3. draws this line -> |      | <- 1. draws this line
                 *                       +------+
                 *                          ^
                 *                          |
                 *                  2. draws this line
                 */
                ctx.lineTo(waveRight + left, shape.cy + shape.radiusY);
                ctx.lineTo(left, shape.cy + shape.radiusY);
                ctx.lineTo(left, shape.waterLevel);
            }
            ctx.closePath();
        }
    });
    return new func(opt);
}

/*
 * @Author: duanguang
 * @Date: 2020-12-17 13:45:59
 * @LastEditTime: 2020-12-17 17:24:48
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsWaterDropBall/liquidFillView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var numberUtil = echarts['number'];
var parsePercent = numberUtil.parsePercent;
function liquidFillView() {
    echarts['extendChartView']({
        type: 'liquidFill',
        dispose: function () {
            // dispose nothing here
        },
        render: function (seriesModel, ecModel, api) {
            var group = this.group;
            group.removeAll();
            var data = seriesModel.getData();
            var itemModel = data.getItemModel(0);
            var center = itemModel.get('center');
            var radius = itemModel.get('radius');
            var width = api.getWidth();
            var height = api.getHeight();
            var size = Math.min(width, height);
            // itemStyle
            var outlineDistance = 0;
            var outlineBorderWidth = 0;
            var showOutline = seriesModel.get('outline.show');
            if (showOutline) {
                outlineDistance = seriesModel.get('outline.borderDistance');
                outlineBorderWidth = parsePercent(seriesModel.get('outline.itemStyle.borderWidth'), size);
            }
            var cx = parsePercent(center[0], width);
            var cy = parsePercent(center[1], height);
            var outterRadius;
            var innerRadius;
            var paddingRadius;
            var isFillContainer = false;
            var symbol = seriesModel.get('shape');
            if (symbol === 'container') {
                // a shape that fully fills the container
                isFillContainer = true;
                outterRadius = [width / 2, height / 2];
                innerRadius = [
                    outterRadius[0] - outlineBorderWidth / 2,
                    outterRadius[1] - outlineBorderWidth / 2,
                ];
                paddingRadius = [
                    parsePercent(outlineDistance, width),
                    parsePercent(outlineDistance, height),
                ];
                radius = [
                    Math.max(innerRadius[0] - paddingRadius[0], 0),
                    Math.max(innerRadius[1] - paddingRadius[1], 0),
                ];
            }
            else {
                outterRadius = parsePercent(radius, size) / 2;
                innerRadius = outterRadius - outlineBorderWidth / 2;
                paddingRadius = parsePercent(outlineDistance, size);
                radius = Math.max(innerRadius - paddingRadius, 0);
            }
            if (showOutline) {
                var outline = getOutline();
                outline.style.lineWidth = outlineBorderWidth;
                group.add(getOutline());
            }
            var left = isFillContainer ? 0 : cx - radius;
            var top = isFillContainer ? 0 : cy - radius;
            var wavePath = null;
            group.add(getBackground());
            // each data item for a wave
            var oldData = this._data;
            var waves = [];
            data
                .diff(oldData)
                .add(function (idx) {
                //@ts-ignore
                var wave = getWave(idx, false);
                var waterLevel = wave.shape.waterLevel;
                wave.shape.waterLevel = isFillContainer ? height / 2 : radius;
                echarts.graphic['initProps'](wave, {
                    shape: {
                        waterLevel: waterLevel,
                    },
                }, seriesModel);
                wave.z2 = 2;
                setWaveAnimation(idx, wave, null);
                group.add(wave);
                data.setItemGraphicEl(idx, wave);
                //@ts-ignore
                waves.push(wave);
            })
                .update(function (newIdx, oldIdx) {
                var waveElement = oldData.getItemGraphicEl(oldIdx);
                // new wave is used to calculate position, but not added
                var newWave = getWave(newIdx, false, waveElement);
                // changes with animation
                var shape = {};
                var shapeAttrs = [
                    'amplitude',
                    'cx',
                    'cy',
                    'phase',
                    'radius',
                    'radiusY',
                    'waterLevel',
                    'waveLength',
                ];
                for (var i = 0; i < shapeAttrs.length; ++i) {
                    var attr = shapeAttrs[i];
                    if (newWave.shape.hasOwnProperty(attr)) {
                        shape[attr] = newWave.shape[attr];
                    }
                }
                var style = {};
                var styleAttrs = ['fill', 'opacity', 'shadowBlur', 'shadowColor'];
                for (var i = 0; i < styleAttrs.length; ++i) {
                    var attr = styleAttrs[i];
                    if (newWave.style.hasOwnProperty(attr)) {
                        style[attr] = newWave.style[attr];
                    }
                }
                if (isFillContainer) {
                    shape['radiusY'] = height / 2;
                }
                // changes with animation
                echarts.graphic['updateProps'](waveElement, {
                    shape: shape,
                }, seriesModel);
                waveElement.useStyle(style);
                // instant changes
                waveElement.position = newWave.position;
                waveElement.setClipPath(newWave.clipPath);
                waveElement.shape.inverse = newWave.inverse;
                setWaveAnimation(newIdx, waveElement, waveElement);
                group.add(waveElement);
                data.setItemGraphicEl(newIdx, waveElement);
                //@ts-ignore
                waves.push(waveElement);
            })
                .remove(function (idx) {
                var wave = oldData.getItemGraphicEl(idx);
                group.remove(wave);
            })
                .execute();
            if (itemModel.get('label.show')) {
                group.add(getText(waves));
            }
            this._data = data;
            /**
             * Get path for outline, background and clipping
             *
             * @param {number} r outter radius of shape
             * @param {boolean|undefined} isForClipping if the shape is used
             *                                          for clipping
             */
            function getPath(r, isForClipping) {
                if (symbol) {
                    // customed symbol path
                    if (symbol.indexOf('path://') === 0) {
                        var path = echarts.graphic['makePath'](symbol.slice(7), {});
                        var bouding = path.getBoundingRect();
                        var w = bouding.width;
                        var h = bouding.height;
                        if (w > h) {
                            h = r * 2 / w * h;
                            w = r * 2;
                        }
                        else {
                            w = r * 2 / h * w;
                            h = r * 2;
                        }
                        var left_1 = isForClipping ? 0 : cx - w / 2;
                        var top_1 = isForClipping ? 0 : cy - h / 2;
                        path = echarts.graphic['makePath'](symbol.slice(7), {}, new echarts.graphic['BoundingRect'](left_1, top_1, w, h));
                        if (isForClipping) {
                            path.position = [-w / 2, -h / 2];
                        }
                        return path;
                    }
                    else if (isFillContainer) {
                        // fully fill the container
                        var x = isForClipping ? -r[0] : cx - r[0];
                        var y = isForClipping ? -r[1] : cy - r[1];
                        return createSymbol('rect', x, y, r[0] * 2, r[1] * 2);
                    }
                    else {
                        var x = isForClipping ? -r : cx - r;
                        var y = isForClipping ? -r : cy - r;
                        if (symbol === 'pin') {
                            y += r;
                        }
                        else if (symbol === 'arrow') {
                            y -= r;
                        }
                        return createSymbol(symbol, x, y, r * 2, r * 2);
                    }
                }
                return new echarts.graphic['Circle']({
                    shape: {
                        cx: isForClipping ? 0 : cx,
                        cy: isForClipping ? 0 : cy,
                        r: r
                    }
                });
            }
            /**
             * Create outline
             */
            function getOutline() {
                //@ts-ignore
                var outlinePath = getPath(outterRadius);
                outlinePath.style.fill = null;
                outlinePath.setStyle(seriesModel.getModel('outline.itemStyle')
                    .getItemStyle());
                return outlinePath;
            }
            /**
             * Create background
             */
            function getBackground() {
                // Seperate stroke and fill, so we can use stroke to cover the alias of clipping.
                //@ts-ignore
                var strokePath = getPath(radius);
                strokePath.setStyle(seriesModel.getModel('backgroundStyle')
                    .getItemStyle());
                strokePath.style.fill = null;
                // Stroke is front of wave
                strokePath.z2 = 5;
                //@ts-ignore
                var fillPath = getPath(radius);
                fillPath.setStyle(seriesModel.getModel('backgroundStyle')
                    .getItemStyle());
                fillPath.style.stroke = null;
                var group = new echarts.graphic['Group']();
                group.add(strokePath);
                group.add(fillPath);
                return group;
            }
            /**
             * wave shape
             */
            function getWave(idx, isInverse, oldWave) {
                var radiusX = isFillContainer ? radius[0] : radius;
                var radiusY = isFillContainer ? height / 2 : radius;
                var itemModel = data.getItemModel(idx);
                var itemStyleModel = itemModel.getModel('itemStyle');
                var phase = itemModel.get('phase');
                var amplitude = parsePercent(itemModel.get('amplitude'), radiusY * 2);
                var waveLength = parsePercent(itemModel.get('waveLength'), radiusX * 2);
                var value = data.get('value', idx);
                var waterLevel = radiusY - value * radiusY * 2;
                phase = oldWave ? oldWave.shape.phase
                    : (phase === 'auto' ? idx * Math.PI / 4 : phase);
                var normalStyle = itemStyleModel.getItemStyle();
                if (!normalStyle.fill) {
                    var seriesColor = seriesModel.get('color');
                    var id = idx % seriesColor.length;
                    normalStyle.fill = seriesColor[id];
                }
                var x = radiusX * 2;
                var wave = liquidFillLayout({
                    shape: {
                        waveLength: waveLength,
                        radius: radiusX,
                        radiusY: radiusY,
                        cx: x,
                        cy: 0,
                        waterLevel: waterLevel,
                        amplitude: amplitude,
                        phase: phase,
                        inverse: isInverse
                    },
                    style: normalStyle,
                    position: [cx, cy]
                });
                wave.shape._waterLevel = waterLevel;
                var hoverStyle = itemModel.getModel('emphasis.itemStyle')
                    .getItemStyle();
                hoverStyle.lineWidth = 0;
                echarts.graphic['setHoverStyle'](wave, hoverStyle);
                // clip out the part outside the circle
                var clip = getPath(radius, true);
                // set fill for clipPath, otherwise it will not trigger hover event
                clip.setStyle({
                    fill: 'white'
                });
                wave.setClipPath(clip);
                return wave;
            }
            function setWaveAnimation(idx, wave, oldWave) {
                var itemModel = data.getItemModel(idx);
                var maxSpeed = itemModel.get('period');
                var direction = itemModel.get('direction');
                var value = data.get('value', idx);
                var phase = itemModel.get('phase');
                phase = oldWave ? oldWave.shape.phase
                    : (phase === 'auto' ? idx * Math.PI / 4 : phase);
                var defaultSpeed = function (maxSpeed) {
                    var cnt = data.count();
                    return cnt === 0 ? maxSpeed : maxSpeed *
                        (0.2 + (cnt - idx) / cnt * 0.8);
                };
                var speed = 0;
                if (maxSpeed === 'auto') {
                    speed = defaultSpeed(5000);
                }
                else {
                    speed = typeof maxSpeed === 'function'
                        ? maxSpeed(value, idx) : maxSpeed;
                }
                // phase for moving left/right
                var phaseOffset = 0;
                if (direction === 'right' || direction == null) {
                    phaseOffset = Math.PI;
                }
                else if (direction === 'left') {
                    phaseOffset = -Math.PI;
                }
                else if (direction === 'none') {
                    phaseOffset = 0;
                }
                else {
                    console.error('Illegal direction value for liquid fill.');
                }
                // wave animation of moving left/right
                if (direction !== 'none' && itemModel.get('waveAnimation')) {
                    wave
                        .animate('shape', true)
                        .when(0, {
                        phase: phase
                    })
                        .when(speed / 2, {
                        phase: phaseOffset + phase
                    })
                        .when(speed, {
                        phase: phaseOffset * 2 + phase
                    })
                        .during(function () {
                        if (wavePath) {
                            //@ts-ignore
                            wavePath.dirty(true);
                        }
                    })
                        .start();
                }
            }
            /**
             * text on wave
             */
            function getText(waves) {
                var labelModel = itemModel.getModel('label');
                function formatLabel() {
                    var formatted = seriesModel.getFormattedLabel(0, 'normal');
                    var defaultVal = (data.get('value', 0) * 100);
                    var defaultLabel = data.getName(0) || seriesModel.name;
                    if (!isNaN(defaultVal)) {
                        defaultLabel = defaultVal.toFixed(0) + '%';
                    }
                    return formatted == null ? defaultLabel : formatted;
                }
                var textOption = {
                    z2: 10,
                    shape: {
                        x: left,
                        y: top,
                        width: (isFillContainer ? radius[0] : radius) * 2,
                        height: (isFillContainer ? radius[1] : radius) * 2
                    },
                    style: {
                        fill: 'transparent',
                        text: formatLabel(),
                        textAlign: labelModel.get('align'),
                        textVerticalAlign: labelModel.get('baseline')
                    },
                    silent: true
                };
                var outsideTextRect = new echarts.graphic['Rect'](textOption);
                var color = labelModel.get('color');
                echarts.graphic['setText'](outsideTextRect.style, labelModel, color);
                var insideTextRect = new echarts.graphic['Rect'](textOption);
                var insColor = labelModel.get('insideColor');
                echarts.graphic['setText'](insideTextRect.style, labelModel, insColor);
                insideTextRect.style.textFill = insColor;
                var group = new echarts.graphic['Group']();
                group.add(outsideTextRect);
                group.add(insideTextRect);
                // clip out waves for insideText
                var boundingCircle = getPath(radius, true);
                wavePath = new echarts.graphic['CompoundPath']({
                    shape: {
                        paths: waves
                    },
                    position: [cx, cy]
                });
                //@ts-ignore
                wavePath.setClipPath(boundingCircle);
                insideTextRect.setClipPath(wavePath);
                return group;
            }
        },
    });
}

/*
 * @Author: duanguang
 * @Date: 2020-12-17 14:14:49
 * @LastEditTime: 2020-12-17 14:16:59
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsWaterDropBall/liquidFill.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
liquidFillSeries();
liquidFillView();
echarts['registerVisual'](echarts['util'].curry(require('echarts/lib/visual/dataColor'), 'liquidFill'));

var LegionsProEchartsLiquidFillProps = /** @class */ (function (_super) {
    __extends(LegionsProEchartsLiquidFillProps, _super);
    function LegionsProEchartsLiquidFillProps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 数据 */
        _this.data = [{ value: 100, name: 'demo' }];
        /** 配置项 */
        _this.option = {};
        return _this;
    }
    return LegionsProEchartsLiquidFillProps;
}(LegionsProEchartsPropsTypes));
/* interface ISeries extends Weaken<echarts.EChartOption,'series'>{
   
} */
var ViewModel = /** @class */ (function () {
    function ViewModel() {
        /** 请求托管response */
        this.response = observablePromise();
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ViewModel.prototype, "response", void 0);
    return ViewModel;
}());
/** 水滴波纹组件 */
var LegionsProEchartsLiquidFill = /** @class */ (function (_super) {
    __extends(LegionsProEchartsLiquidFill, _super);
    function LegionsProEchartsLiquidFill() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewModel = observableViewModel(new ViewModel());
        return _this;
    }
    Object.defineProperty(LegionsProEchartsLiquidFill.prototype, "responseData", {
        /** 自动接管接口返回数据 */
        get: function () {
            if (this.viewModel.response.isResolved && this.props.autoQuery) {
                return this.props.autoQuery.responseTransform(this.viewModel.response);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProEchartsLiquidFill.prototype, "option", {
        /** 配置项 */
        get: function () {
            return {
                backgroundColor: new echarts.graphic['RadialGradient'](0.3, 0.3, 0.8, [{
                        offset: 0,
                        color: '#1D263F'
                    }, {
                        offset: 1,
                        color: '#111D35'
                    }]),
                title: [{
                        text: (0.2 * 100).toFixed(0) + '{a|%}',
                        textStyle: {
                            fontSize: 25,
                            fontFamily: 'Microsoft Yahei',
                            fontWeight: 'normal',
                            color: '#bcb8fb',
                            rich: {
                                a: {
                                    fontSize: 25,
                                }
                            },
                        },
                        //@ts-ignore
                        x: 'center',
                        top: '33%',
                    }],
                series: [
                    {
                        type: 'liquidFill',
                        radius: '80%',
                        center: ['50%', '50%'],
                        //  shape: 'roundRect',
                        data: [{
                                name: '流量统计',
                                value: 0.2,
                            }, 0.2, 0.2, 0.2,],
                        label: {
                            show: true,
                            position: ['50%', '60%'],
                        }
                    },
                ],
            };
        },
        enumerable: false,
        configurable: true
    });
    LegionsProEchartsLiquidFill.prototype.componentDidMount = function () {
        if (this.props.autoQuery) {
            this.getData();
        }
    };
    /** 获取数据 */
    LegionsProEchartsLiquidFill.prototype.getData = function () {
        var autoQuery = this.props.autoQuery;
        var server = new LegionsFetch();
        if (autoQuery) {
            if (autoQuery.method === 'post') {
                var res = server.post({
                    url: autoQuery.url,
                    model: autoQuery.model,
                    parameter: autoQuery.params,
                    headers: autoQuery.headerOption,
                });
                this.viewModel.response = observablePromise(res);
            }
            else {
                var res = server.get({
                    url: autoQuery.url,
                    model: autoQuery.model,
                    parameter: autoQuery.params,
                    headers: autoQuery.headerOption,
                });
                this.viewModel.response = observablePromise(res);
            }
        }
    };
    LegionsProEchartsLiquidFill.prototype.render = function () {
        var option = this.props.option;
        console.log(echarts);
        var loading = this.props.autoQuery ? this.viewModel.response.isPending : this.props.loading;
        return (React.createElement(LegionsProEcharts, __assign({}, this.props, { loading: loading, option: merge(this.option, option) })));
    };
    LegionsProEchartsLiquidFill.defaultProps = new LegionsProEchartsLiquidFillProps();
    return LegionsProEchartsLiquidFill;
}(React.Component));

export { LegionsProEchartsLiquidFill, LegionsProEchartsLiquidFillProps };
