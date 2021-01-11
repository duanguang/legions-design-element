/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import ReactDOM, { unmountComponentAtNode, unstable_renderSubtreeIntoContainer, findDOMNode } from 'react-dom';
import { Modal, message, Menu, Button, Icon, Dropdown, Row, Col, Table, Input } from 'antd';
import './style/index.less';
import { bind, observer } from 'legions/store-react';
import { ProTableStore } from '../store/pro.table';
import { compare } from 'legions-utils-tool/object.utils';
import { warningOnce } from 'legions-utils-tool';
import { shortHash } from 'legions-lunar/object-hash';
import { debounce } from 'legions-utils-tool/debounce';
import moment from 'moment';
import LegionsProTableCustomColumns from '../LegionsProTableCustomColumns';
import LegionsProLineOverflow from '../LegionsProLineOverflow';
import { ProModalStore } from '../store/pro.modal';
import styles from '../LegionsProModal/style/index.modules.less';
import '../LegionsProModal/style/index.less';
import { runInAction, observable, toJS, isObservable } from 'mobx';
import { observableViewModel } from 'legions/store-utils';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { LoggerManager } from 'legions-lunar/legion.plugin.sdk';
import { cloneDeep } from 'lodash';

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

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

var maximizeSrc = require('../assets/images/maximize.png');
var undoSrc = require('../assets/images/images/undo.png');
var antPrefix = 'ant';
var placement = {
    right: {
        marginRight: '0px',
        top: '0px',
        height: '100%'
    },
    left: {
        marginLeft: '0px',
        top: '0px',
        height: '100%'
    },
    top: {
        top: '0px',
        width: '100%'
    },
    bottom: {
        bottom: '0px',
        width: '100%',
        position: 'absolute',
    }
};
var on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            if (element && event && handler) {
                element.addEventListener(event, handler, useCapture);
            }
        };
    }
    else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();
var off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            if (element && event) {
                element.removeEventListener(event, handler, useCapture);
            }
        };
    }
    else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();
var DrawerPositionWrap = {
    top: 'legions-pro-modal-DrawerPositionX',
    bottom: 'legions-pro-modal-DrawerPositionBottom',
    left: 'legions-pro-modal-drawerPositionY',
    right: 'legions-pro-modal-drawerPositionY',
};
var LegionsProModal = /** @class */ (function (_super) {
    __extends(LegionsProModal, _super);
    function LegionsProModal(props) {
        var _this = _super.call(this, props) || this;
        _this.timeId = new Date().getTime();
        _this.uid = '';
        _this.modalContent = null;
        /**
         * 是否绑定拖拽移动事件
         */
        _this.isBinddraggableEven = false;
        /** 是否绑定拖拽缩放事件 */
        _this.isBindResizableEven = false;
        /** * 方案二防止重复绑定DOM数据*/
        _this.isBindingDom = false;
        _this.contentResizableNode = null;
        _this.nodeMaximize = null;
        _this.subscription = null;
        /**
         * antd-content 坐标轴 *
         */
        // @ts-ignore
        _this.topLocation = {
            left: null,
            top: null,
            right: null,
        };
        _this.draggableLocationLeftY = null;
        _this.clientHeight = 0;
        _this.clientWidth = 0;
        _this.viewStore = null;
        _this.getModalDOM = null;
        _this.log = function (n) {
            /** 拖拽移动方案一: 设置ant-content 居中样式margin:o auto 为margin:0px,通过手动left来决定显示时居左距离
             * 拖动时更改modal style属性值来设置x,y坐标
             */
            if (_this.viewStore.visible && _this.props.draggable && _this.viewStore.dragData.x === null) {
                var timeId_1 = setTimeout(function () {
                    _this.viewStore.resetDragLocationData();
                    clearTimeout(timeId_1);
                }, 0);
            }
        };
        /*** 拖拽移动 移动事件 */
        //@ts-ignore
        _this.handleDraggableMoveMove = function (event) {
            /* runInAction(() => {
                this.viewStore.dragData.dragging = true;
            }) */
            if (!_this.viewStore.dragData.dragging)
                return false;
            runInAction(function () {
                var distance = {
                    x: event.clientX,
                    y: event.clientY
                };
                var diff_distance = {
                    x: distance.x - _this.viewStore.dragData.dragX,
                    y: distance.y - _this.viewStore.dragData.dragY
                };
                if (_this.getModalContentDOM) {
                    var rect = _this.getModalContentDOM.getBoundingClientRect();
                    var bottomMargin = _this.clientHeight - rect.top;
                    var rightMargin = _this.clientWidth - rect.left;
                    /* if (rect.left >  this.draggableLocationLeftY) {
                        console.log('往右')
                    }
                    else if(rect.left<=this.draggableLocationLeftY) {
                        console.log('往左')
                    } */
                    if (rect.top < 0) {
                        _this.viewStore.dragData.y = 0;
                    }
                    else if (bottomMargin < 48) { // 到达底部回弹
                        _this.viewStore.dragData.y = rect.top - 48;
                    }
                    else if (rect.right < 85) { // 到达左边界极限
                        _this.viewStore.dragData.x = rect.left + 10;
                    }
                    else if (rightMargin < 85) { // 到达又边界极限
                        _this.viewStore.dragData.x = rect.left - 10;
                    }
                    else {
                        _this.viewStore.dragData.y += diff_distance.y;
                        _this.viewStore.dragData.x += diff_distance.x;
                    }
                    /* this.viewStore.dragData.x += diff_distance.x; */
                    _this.viewStore.dragData.dragX = distance.x;
                    _this.viewStore.dragData.dragY = distance.y;
                }
            });
            event.stopPropagation();
        };
        /**  * 拖拽移动结束事件 */
        _this.handleDraggableMoveEnd = function () {
            runInAction(function () {
                _this.viewStore.dragData.dragging = false;
                _this.viewStore.asyncResizableData();
                /* this.viewStore.operaModel = ''; */
            });
            if (_this.getModalContentDOM) {
                var rect = _this.getModalContentDOM.getBoundingClientRect();
                _this.draggableLocationLeftY = rect.left;
            }
            _this.unbindingDraggableMousemoveEven();
            _this.unbindingDraggableMouseupEven();
        };
        /** 拖拽缩放移动事件,在modal-content监听事件 */
        _this.handleResizableMousemove = function (event) {
            var distance = {
                x: event.clientX,
                y: event.clientY
            };
            if (_this.viewStore.computedResizable.enabled) { // 在移动或缩放过程中，如果窗口正在被缩放中，缩放坐标样式不发生变化
                return;
            }
            /* if (((distance.y - this.topLocation.top) < 1) ||
                ((distance.x - this.topLocation.left) < 1) ||
                ((this.topLocation.right - distance.x) < 1) ||
                ((this.topLocation.bottom-distance.y)<=1||(this.topLocation.bottom-distance.y)===0)) {
                
            }  */
            /** 左上角 */
            var upperLeftX = distance.x - _this.topLocation.left;
            var upperLeftY = distance.y - _this.topLocation.top;
            /** 顶部 */
            var top = distance.y - _this.topLocation.top;
            var topLeft = distance.x - _this.topLocation.left;
            var topRight = _this.topLocation.right - distance.x;
            /** 右上角 */
            var upperRightX = _this.topLocation.right - distance.x;
            var upperRightY = distance.y - _this.topLocation.top;
            /** 底部 */
            var bottom = _this.topLocation.bottom - distance.y;
            var bottomLeft = distance.x - _this.topLocation.left;
            var bottomRight = _this.topLocation.right - distance.x;
            /** 左下角 */
            var leftLowerX = distance.x - _this.topLocation.left;
            var leftLowerY = distance.y - _this.topLocation.bottom;
            /** 右下角 */
            var lowRightX = _this.topLocation.right - distance.x;
            var lowRightY = distance.y - _this.topLocation.bottom;
            /** 左部 */
            var left = distance.x - _this.topLocation.left;
            var LeftMin = distance.y - _this.topLocation.top;
            var leftMax = _this.topLocation.bottom - distance.y;
            /** 右部 */
            var right = _this.topLocation.right - distance.x;
            var rightMin = distance.y - _this.topLocation.top;
            var rightMax = _this.topLocation.bottom - distance.y;
            /* if (top>-15&&top<10&&topLeft>15&&topRight>15){ // top 方向
                this.viewStore.updateEnabledResizable({
                    enabled: true,
                    direction:'top',
                });
            } */
            /* console.log(left,this.topLocation,distance,event) */
            if (left > -15 && left < 15 && LeftMin > 15 && leftMax > 15) { // 左部
                _this.viewStore.updateEnabledResizable({
                    enabled: false,
                    direction: 'left',
                });
            }
            else if (right > -15 && right < 15 && rightMin > 15 && rightMax > 15) { // 右部
                _this.viewStore.updateEnabledResizable({
                    enabled: false,
                    direction: 'right',
                });
            }
            /* else if (upperLeftX > - 10 && upperLeftX < 10 && (upperLeftY < 10 && upperLeftY > -10)) {  // 左上角
                this.viewStore.updateEnabledResizable({
                    enabled: true,
                    direction:'upperLeft',
                });
            }
            else if (upperRightX>-10&&upperRightX<10&& (upperRightY < 10 && upperRightY > -10)) {  // 右上角
                this.viewStore.updateEnabledResizable({
                    enabled: true,
                    direction:'upperRight',
                });
            } */
            else if (bottom > -15 && bottom < 10 && bottomLeft > 15 && bottomRight > 15) { // 底部
                _this.viewStore.updateEnabledResizable({
                    enabled: false,
                    direction: 'bottom',
                });
            }
            /* else if (leftLowerX > - 10 && leftLowerX < 10 && (leftLowerY < 10 && leftLowerY > -10)) {  // 左下角
                this.viewStore.updateEnabledResizable({
                    enabled: true,
                    direction:'leftLower',
                });
            }
            else if (lowRightX>-10&&lowRightX<10&& (lowRightY < 10 && lowRightY > -10)) {  // 右下角
                this.viewStore.updateEnabledResizable({
                    enabled: true,
                    direction:'lowRight',
                });
            } */ else {
                _this.viewStore.updateEnabledResizable({
                    direction: '',
                });
            }
        };
        /** 移出元素范围之外触发 */
        _this.handleResizableMouseOut = function (event) {
            var distance = {
                x: event.clientX,
                y: event.clientY
            };
            if (!_this.viewStore.resizableData.resizable) {
                _this.viewStore.updateEnabledResizable({
                    enabled: false,
                    direction: '',
                });
            }
        };
        /**  拖拽缩放移动坐标轴，触发在window对象*/
        //@ts-ignore
        _this.handleResizableMoveMove = function (event) {
            runInAction(function () {
                _this.viewStore.resizableData.resizable = true;
            });
            if (!_this.viewStore.resizableData.resizable)
                return false;
            runInAction(function () {
                var distance = {
                    x: event.clientX,
                    y: event.clientY
                };
                var diff_distance = {
                    x: distance.x - _this.viewStore.resizableData.resizableX,
                    y: distance.y - _this.viewStore.resizableData.resizableY
                };
                /*  console.log('准备拖拽缩放移动坐标轴====satrt====')
                 console.log('this.viewStore.resizableData',this.viewStore.resizableData)
                 console.log('this.topLocation',this.topLocation)
                 console.log('准备拖拽缩放移动坐标轴====end====') */
                _this.viewStore.resizableData.x += diff_distance.x;
                _this.viewStore.resizableData.y += diff_distance.y;
                _this.viewStore.resizableData.resizableX = distance.x;
                _this.viewStore.resizableData.resizableY = distance.y;
                if (_this.viewStore.computedResizable.direction === 'bottom') {
                    _this.viewStore.resizableData.top = _this.topLocation.top;
                }
                if (_this.viewStore.computedResizable.direction === 'top') {
                    _this.viewStore.resizableData.top = _this.viewStore.resizableData.y;
                    _this.viewStore.resizableData.bottom = _this.topLocation.bottom;
                }
                if (_this.viewStore.computedResizable.direction === 'left') { // 左侧缩放，则固定右侧坐标轴
                    _this.viewStore.resizableData.right = _this.topLocation.right;
                    /* console.log('拖拽缩放移动坐标轴====satrt====')
                    console.log('this.viewStore.resizableData',this.viewStore.resizableData)
                    console.log('this.topLocation',this.topLocation)
                    console.log('拖拽缩放移动坐标轴====end====') */
                }
                if (_this.viewStore.computedResizable.direction === 'right') {
                    _this.viewStore.resizableData.left = _this.topLocation.left;
                }
                _this.viewStore.asyncResizableBodyStyle({
                    modalType: _this.props.modalType,
                    placement: _this.props.placement,
                });
            });
        };
        /** * 结束拖拽缩放，鼠标释放。window触发*/
        _this.handleResizableMoveEnd = function () {
            runInAction(function () {
                _this.viewStore.resizableData.resizable = false;
            });
            _this.setAntdContentLocation();
            _this.viewStore.updateEnabledResizable({
                enabled: false,
                direction: '',
            });
            off(window, 'mousemove', _this.handleResizableMoveMove);
            off(window, 'mouseup', _this.handleResizableMoveEnd);
        };
        /**
         *  拖拽缩放开始 在modal-content监听事件触发
         */
        _this.handleResizableMouseStart = function (event) {
            if (_this.viewStore.operaModel !== 'maximize') { // 最大化时也就是全屏不允许缩放
                if (_this.getModalContentDOM) {
                    var rect_1 = _this.getModalContentDOM.getBoundingClientRect();
                    runInAction(function () {
                        _this.viewStore.resizableData.x = rect_1.x || rect_1.left;
                        _this.viewStore.resizableData.y = rect_1.y || rect_1.top;
                        var distance = {
                            x: event.clientX,
                            y: event.clientY
                        };
                        _this.viewStore.resizableData.resizableX = distance.x;
                        _this.viewStore.resizableData.resizableY = distance.y;
                        /* console.log('开始缩放====satrt====')
                        console.log('this.viewStore.resizableData',this.viewStore.resizableData)
                        console.log('this.topLocation',this.topLocation)
                        console.log('distance',distance)
                        console.log('rect',rect)
                        console.log('开始缩放====end====') */
                        _this.viewStore.operaModel = 'resizable';
                        _this.viewStore.computedResizable.enabled = true;
                    });
                    _this.bindingResizableMoveMoveEven();
                    _this.bindingResizableMouseupEven();
                }
            }
        };
        _this.handleCancel = _this.handleCancel.bind(_this);
        _this.handleOnOk = _this.handleOnOk.bind(_this);
        return _this;
    }
    Object.defineProperty(LegionsProModal.prototype, "getModalContentDOM", {
        get: function () {
            if (this.getModalDOM) {
                return this.getModalDOM.querySelector("." + antPrefix + "-modal-content");
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProModal.prototype, "getModalHeaderDOM", {
        get: function () {
            if (this.getModalDOM) {
                return this.getModalDOM.querySelector("." + antPrefix + "-modal-header");
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /** 设置模态框根节点值 */
    LegionsProModal.prototype.setModalDOM = function () {
        this.getModalDOM = document.querySelector("." + this.uid);
    };
    /** 取消拖拽缩放模态框尺寸事件 */
    LegionsProModal.prototype.unbindingResizableEven = function () {
        var modalDOM = this.getModalDOM;
        if (modalDOM) {
            if (this.getModalContentDOM) {
                off(this.getModalContentDOM, 'mousemove', this.handleResizableMousemove);
                /* on(modalAntd,'mouseout',this.handleMouseOut) */
                off(this.getModalContentDOM, 'mousedown', this.handleResizableMouseStart);
            }
        }
    };
    LegionsProModal.prototype.unbindingDraggableMousemoveEven = function () {
        off(window, 'mousemove', this.handleDraggableMoveMove);
    };
    LegionsProModal.prototype.unbindingDraggableMouseupEven = function () {
        off(window, 'mouseup', this.handleDraggableMoveEnd);
    };
    LegionsProModal.prototype.bindingDraggableMousemoveEven = function () {
        on(window, 'mousemove', this.handleDraggableMoveMove);
    };
    LegionsProModal.prototype.bindingDraggableMouseupEven = function () {
        on(window, 'mouseup', this.handleDraggableMoveEnd);
    };
    /** window对象上绑定拖拽缩放 鼠标移动事件
     * 在触发handleResizableMouseStart即 mousedown 鼠标键在modal-content区域移动时进行绑定事件
     */
    LegionsProModal.prototype.bindingResizableMoveMoveEven = function () {
        on(window, 'mousemove', this.handleResizableMoveMove);
    };
    /** window对象上绑定拖拽缩放 鼠标按键释放事件,
     * 在触发handleResizableMouseStart即 mousedown 鼠标键在modal-content区域按下时进行绑定事件*/
    LegionsProModal.prototype.bindingResizableMouseupEven = function () {
        on(window, 'mouseup', this.handleResizableMoveEnd);
    };
    /** 模态框头部绑定拖拽移动事件 */
    LegionsProModal.prototype.bindingDraggableHeaderMousedownEven = function () {
        if (!this.isBinddraggableEven && this.props.draggable && this.viewStore.operaModel !== 'maximize') {
            if (this.getModalContentDOM && this.getModalHeaderDOM) {
                var rect = this.getModalContentDOM.getBoundingClientRect();
                if (this.draggableLocationLeftY === null) {
                    this.draggableLocationLeftY = rect.left;
                }
                this.getModalHeaderDOM.addEventListener('mousedown', this.handleDraggableMoveStart.bind(this));
                /* modalFooter&&modalFooter.addEventListener('mousedown',this.handleMoveStart.bind(this)) */
                this.isBinddraggableEven = true;
            }
        }
        this.coverOverfolwTranformAutoOverflow();
    };
    /** 在modal-content 节点绑定拖拽缩放鼠标移动和鼠标按键按下事件 */
    LegionsProModal.prototype.bindingResizableContentEven = function () {
        if (this.getModalDOM && this.props.resizable && this.viewStore.operaModel !== 'maximize') {
            this.setAntdContentLocation({ modalDOM: this.getModalDOM, modalContent: this.getModalContentDOM });
            if (!this.isBindResizableEven) {
                on(this.getModalContentDOM, 'mousemove', this.handleResizableMousemove);
                /* on(modalAntd,'mouseout',this.handleMouseOut) */
                on(this.getModalContentDOM, 'mousedown', this.handleResizableMouseStart);
                this.isBindResizableEven = true;
            }
            /* modalContent.addEventListener('mouseover',this.handleMousemove.bind(this)) */
        }
    };
    LegionsProModal.prototype.componentWillMount = function () {
        this.uid = "m" + this.props.store.ModalContainer.size + shortHash("" + this.timeId + this.props.store.ModalContainer.size);
        if (this.props.store.ModalContainer.has(this.uid)) {
            this.timeId = new Date().getTime();
            this.uid = "m" + this.props.store.ModalContainer.size + shortHash("" + this.timeId + this.props.store.ModalContainer.size);
        }
        this.props.store.add(this.uid);
        this.viewStore = this.props.store.ModalContainer.get(this.uid);
        this.viewStore.placement = this.props.placement;
        var view = this.props.store.ModalContainer.get(this.uid);
        if (this.props.draggable) {
            this.subscription = this.props.store.schedule([this.log.bind(this)]);
        }
        this.props.onReady && this.props.onReady({ store: this.props.store, uid: this.uid, viewModel: view });
    };
    LegionsProModal.prototype.componentDidMount = function () {
        this.setModalDOM();
        this.setModalContentInsertMaximize();
        this.clientHeight = document.body.clientHeight;
        this.clientWidth = document.body.clientWidth;
        this.bindingDraggableHeaderMousedownEven();
        this.bindingResizableContentEven();
        this.props.footer === null ? (this.viewStore._footerHeight = 0) : (this.viewStore._footerHeight = 53);
    };
    LegionsProModal.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.placement !== nextProps.placement && this.viewStore && nextProps.placement) {
            this.viewStore.placement = nextProps.placement;
        }
    };
    LegionsProModal.prototype.componentDidUpdate = function () {
        this.setModalDOM();
        this.setModalContentInsertMaximize();
        this.renderMaximize();
        /** 拖拽移动方案二： 通过埋点，往埋点处动态挂载react node 节点，并把ant-content dom 元素移动到动态节点下
         * 方案二缺陷，频繁操作dom,在隐藏模态框时会造成元素抖动,影响体验
         * 需要在render 写上一行废代码let styles = this.viewStore.computedContentStyles来保证拖拽过程触发render
         *  */
        /* const modalDOM = document.querySelector(`.${this.uid}`);
        if(modalDOM){
            const antModal = modalDOM.querySelector('.ant-modal');
            if (!this.isBindingDom) {
                const div = document.createElement('div');
                div.setAttribute('class',`legions-pro-modal-content-drag`);
                this.node = div;
                antModal.appendChild(div)
            }
            this.renderModalContent();
            if (!this.isBindingDom) {
                const antModalClass = modalDOM.querySelector('.ant-modal-content-drag');
                if (antModalClass) {
                    antModalClass.appendChild(modalDOM.querySelector('.ant-modal-content'))
                    this.isBindingDom = true;
                }
            }
        } */
        this.bindingDraggableHeaderMousedownEven();
        this.bindingResizableContentEven();
        this.props.footer === null ? (this.viewStore._footerHeight = 0) : (this.viewStore._footerHeight = 53);
    };
    LegionsProModal.prototype.componentWillUnmount = function () {
        this.props.store.delete(this.uid);
        this.subscription && this.subscription.unsubscribe();
        this.destroyPortal();
        this.unbindingResizableEven();
        if (this.getModalHeaderDOM) {
            this.getModalHeaderDOM.removeEventListener('mousedown', this.handleDraggableMoveStart.bind(this));
        }
    };
    /** 销毁最大化按钮节点 */
    LegionsProModal.prototype.destroyPortal = function () {
        if (this.nodeMaximize) {
            unmountComponentAtNode(this.nodeMaximize);
        }
    };
    /** 插入最大化按钮dom */
    LegionsProModal.prototype.setModalContentInsertMaximize = function () {
        if (!this.nodeMaximize && this.props.modalType === 'fullscreen') { // 如果开启了全屏模式
            if (this.getModalDOM && this.getModalContentDOM) {
                /* this.modalContent = this.getModalContentDOM; */
                var button = document.createElement('botton');
                button.setAttribute('class', styles.modalMaximize);
                this.nodeMaximize = button;
                this.getModalContentDOM.insertBefore(this.nodeMaximize, this.getModalContentDOM.firstChild);
                this.renderMaximize(); // 插入全屏操作按钮
                /* button.innerHTML = `
                   <img src=${maximizeSrc} />
                `; */
                /*
                this.modalContent.insertBefore(button,this.modalContent.firstChild) */
            }
        }
    };
    /** * 渲染全屏和还原按钮 */
    LegionsProModal.prototype.renderMaximize = function () {
        var _this = this;
        if (this.nodeMaximize) {
            unstable_renderSubtreeIntoContainer(this, //代表当前组件
            React.createElement("img", { src: this.viewStore.operaModel === 'maximize' ? undoSrc : maximizeSrc, onClick: function (even) {
                    runInAction(function () {
                        if (_this.viewStore.operaModel === 'maximize') {
                            _this.viewStore.operaModel = 'reduction'; // 还原
                        }
                        else {
                            _this.viewStore.operaModel = 'maximize'; // 全屏
                        }
                        if (_this.viewStore.operaModel === 'reduction') {
                            var timeid_1 = setTimeout(function () {
                                _this.setAntdContentLocation();
                                clearTimeout(timeid_1);
                            }, 100);
                        }
                        even.stopPropagation();
                    });
                } }), // 塞进传送门的JSX
            this.nodeMaximize // 传送门另一端的DOM node
            );
        }
    };
    LegionsProModal.prototype.renderModalContent = function () {
        var styles = {};
        if (this.props.draggable) {
            styles = this.viewStore.computedDraggableContentStyles;
        }
        unstable_renderSubtreeIntoContainer(this, //代表当前组件
        React.createElement("div", { className: "ant-modal-content-resizableData", style: Object.assign(this.props.style || {}, styles, { width: this.viewStore.width + "px" }) }), // 塞进传送门的JSX
        this.contentResizableNode // 传送门另一端的DOM node
        );
    };
    /** 往模态框ant-modal-content节点插入元素 */
    LegionsProModal.prototype.setModadlContentInsertElement = function () {
        if (this.getModalDOM && !this.contentResizableNode) {
            var antModal = this.getModalDOM.querySelector("." + antPrefix + "-modal");
            if (!this.isBindingDom) {
                var div = document.createElement('div');
                div.setAttribute('class', "antd-modal-resizableData");
                this.contentResizableNode = div;
                antModal.appendChild(div);
            }
            this.renderModalContent();
            if (!this.isBindingDom) {
                var antModalClass = this.getModalDOM.querySelector("." + antPrefix + "-modal-content-resizableData");
                if (antModalClass) {
                    antModalClass.appendChild(this.getModalContentDOM);
                    this.isBindingDom = true;
                }
            }
        }
    };
    /** 同步回an-modal-content节点元素坐标轴数据 */
    LegionsProModal.prototype.setAntdContentLocation = function (options) {
        var modalDOM = null;
        var modalContent = null;
        if (options) {
            if (options.modalDOM) {
                modalDOM = options.modalDOM;
            }
            if (options.modalContent) {
                modalContent = options.modalContent;
            }
        }
        else {
            modalDOM = this.getModalDOM;
        }
        if (modalDOM) {
            modalContent = this.getModalContentDOM;
            if (modalContent) {
                var rect = modalContent.getBoundingClientRect();
                this.topLocation.left = rect.left;
                this.topLocation.right = rect.right;
                this.topLocation.top = rect.y;
                this.topLocation.bottom = rect.bottom;
            }
            /* off(modalAntd,'mousemove',this.handleMousemove);
            off(modalAntd,'mousedown',this.handleResizableMouseStart) */
        }
    };
    /**
     * 拖拽移动开始事件
     *
     * @param {MouseEvent} event
     * @memberof HLModal
     */
    LegionsProModal.prototype.handleDraggableMoveStart = function (event) {
        var _this = this;
        if (this.getModalDOM && this.viewStore.operaModel !== 'maximize') {
            if (this.getModalContentDOM) {
                var rect_2 = this.getModalContentDOM.getBoundingClientRect();
                runInAction(function () {
                    _this.viewStore.dragData.x = rect_2.x || rect_2.left;
                    _this.viewStore.dragData.y = rect_2.y || rect_2.top;
                    var distance = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    _this.viewStore.dragData.dragX = distance.x;
                    _this.viewStore.dragData.dragY = distance.y;
                    _this.viewStore.dragData.dragging = true;
                    _this.viewStore.operaModel = 'draggable';
                });
                this.bindingDraggableMousemoveEven();
                this.bindingDraggableMouseupEven();
            }
        }
        event.stopPropagation();
    };
    /**在进行拖拽移动时 覆盖原有overfolw:hidden行为
     * 具体进行此操作原因忘记了
     */
    LegionsProModal.prototype.coverOverfolwTranformAutoOverflow = function () {
        if (this.props.draggable && this.viewStore.visible) {
            var modalbody = document.querySelector('body');
            var classNames = modalbody.getAttribute('class') || '';
            if (this.viewStore.visible && classNames.indexOf('legions-pro-modal-body-autoOverflow') < 0) {
                modalbody.setAttribute('class', classNames + " legions-pro-modal-body-autoOverflow");
            }
        }
    };
    LegionsProModal.prototype.handleCancel = function (even) {
        var _this = this;
        var instance = this.props.store.ModalContainer.get(this.uid);
        if (instance.cancelConfirm) {
            var ref_1 = Modal.confirm({
                title: '提示',
                content: React.createElement("h5", null, "\u6570\u636E\u6B63\u5728\u7F16\u8F91\u72B6\u6001\uFF0C\u662F\u5426\u7EE7\u7EED\u5173\u95ED\uFF1F"),
                okText: '确认关闭',
                okType: 'danger',
                cancelText: '取消',
                onOk: function () {
                    _this.props.store.close(_this.uid);
                    _this.props.onCancel && _this.props.onCancel(even);
                    ref_1.destroy();
                },
            });
        }
        else {
            /** 方案二代码： 取消时，回归坐标值，此方法会造成元素抖动 */
            /* runInAction(() => {
                this.viewStore.dragData = {
                    x: null,
                    y: null,
                    dragX: null,
                    dragY: null,
                    dragging:false,
                }
            }) */
            this.props.store.close(this.uid);
            this.props.onCancel && this.props.onCancel(even);
        }
    };
    LegionsProModal.prototype.handleOnOk = function (even) {
        var onOk = this.props.onOk;
        onOk && onOk(even);
    };
    LegionsProModal.prototype.render = function () {
        var instance = this.viewStore;
        var DrawerBodyHeight = this.props.footer === null ? '94%' : '89%';
        var draggingMouseStyles = ''; // 拖拽移动鼠标样式
        var draggableStyles = {};
        var draggableMaskProps = {};
        var drawerMaskProps = {};
        if (this.props.draggable && this.viewStore.operaModel !== 'maximize') {
            draggableStyles = this.viewStore.computedDraggableContentStyles;
            draggableMaskProps = {
                mask: false,
                maskClosable: false,
            };
            draggingMouseStyles = this.viewStore.dragData.dragging ? 'legions-pro-modal-content-dragging' : 'legions-pro-modal-content-drag';
        }
        if (this.props.modalType === 'Drawer' && this.props.resizable) {
            drawerMaskProps = {
                maskClosable: false,
            };
        }
        var drawerStyles = Object.assign(__assign({}, this.props.style), { paddingBottom: '0px' }, placement[this.props.placement], this.viewStore.computedResizableContentStyles);
        return (this.props.modalType === 'Drawer' ? React.createElement(Modal, __assign({ width: (this.props.placement === 'top' || this.props.placement === 'bottom') ? '100%' : this.viewStore.width }, this.props, drawerMaskProps, { bodyStyle: __assign({ height: DrawerBodyHeight, overflow: 'auto' }, this.viewStore.computedMaximizeBodyStyle), style: drawerStyles, wrapClassName: this.uid + " " + DrawerPositionWrap[this.props.placement] + " " + (this.props.wrapClassName || '') + " " + this.viewStore.computedResizableClasses, title: this.viewStore.title, visible: this.viewStore.visible, onCancel: this.handleCancel, onOk: this.handleOnOk, okText: this.viewStore.okText, cancelText: this.viewStore.cancelText, confirmLoading: this.viewStore.confirmLoading }), this.props.children) :
            React.createElement(Modal, __assign({ width: (this.viewStore.operaModel === 'maximize') ? '100%' : this.viewStore.width }, this.props, draggableMaskProps, { 
                /* mask={false}
                maskClosable={false} */
                style: Object.assign(this.props.style || {}, draggableStyles, this.viewStore.computedMaximizeContentStyles, this.viewStore.computedResizableContentStyles), bodyStyle: Object.assign(this.props.bodyStyle || {}, this.viewStore.computedMaximizeBodyStyle), wrapClassName: this.uid + " " + (this.props.wrapClassName || '') + " " + draggingMouseStyles + " " + this.viewStore.computedResizableClasses, title: this.viewStore.title, visible: this.viewStore.visible, onCancel: this.handleCancel, onOk: this.handleOnOk, okText: this.viewStore.okText, cancelText: this.viewStore.cancelText, confirmLoading: this.viewStore.confirmLoading }), this.props.children));
    };
    LegionsProModal.defaultProps = {
        modalType: 'Modal',
        placement: 'left',
        draggable: false,
        resizable: false,
    };
    LegionsProModal = __decorate([
        bind({ store: ProModalStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProModal);
    return LegionsProModal;
}(Component));

var serialize = require('serialize-javascript');
var baseCls = "legions-pro-table";
/* class Calculate{
     @observable  test=1

     @observable.ref userlist =[]
     @observable title={a:1}
    @computed
    get usersCount() {
        return this.userlist.length
    }
} */
var ViewUI = /** @class */ (function () {
    function ViewUI() {
        this.taskName = '';
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ViewUI.prototype, "taskName", void 0);
    return ViewUI;
}());
var errorMessage = {
    uniqueKey: 'Each record in table should have a unique `uniqueKey` prop,' + 'or set `uniqueKey` to an unique primary key.',
    Repeat: 'uniqueKey[接口数据作为唯一字段不可靠，建议前端自己生成唯一字段。开发环境检测，如果用的接口数据字段作为唯一值，也请确保绝对唯一]:存在相同数据,请认真检查数据是否绝对唯一，否则会引发部分功能异常'
};
var LegionsProTable = /** @class */ (function (_super) {
    __extends(LegionsProTable, _super);
    function LegionsProTable(props) {
        var _this = _super.call(this, props) || this;
        _this.timeId = new Date().getTime();
        _this.uid = '';
        /**
         * uid 的值绝对唯一，且每次初始生成表单都是相同值
         *
         * @memberof HLForm
         */
        _this.freezeuid = '';
        /**
         *
         * 未加密的freezeuid 值
         * @memberof HLForm
         */
        _this.decryptionfreezeuid = '';
        _this.viewModel = null;
        _this.tableThead = "table-thead" + _this.uid;
        _this.clientHeight = document.body.clientHeight;
        _this.viewUI = observableViewModel(new ViewUI());
        _this.modalRef = null;
        _this.customColumnsModalRef = null;
        _this.selections = [];
        /** 全链路监控跟踪id */
        _this.traceId = '';
        _this.log = function (uid) {
            if (_this.getLocalViewStore && _this.props.autoQuery && _this.getLocalViewStore.obState.isPending) {
                _this.getLocalViewStore.loading = true;
            }
            if (_this.getLocalViewStore && !_this.getLocalViewStore.obState.isPending && _this.props.autoQuery && _this.getLocalViewStore.loading) {
                runInAction(function () {
                    var data = _this.props.autoQuery.transform(_this.getLocalViewStore.obState);
                    if (data) {
                        _this.props.store.HlTableContainer.get(uid).renderData = data.data.slice();
                        _this.props.store.HlTableContainer.get(uid).setTotal(data.total);
                        /* this.forceUpdate&&this.forceUpdate() */
                    }
                    _this.getLocalViewStore.loading = false;
                });
                _this.consoleLog('hlTable-watchData', { uid: uid });
                _this.logger('hlTable-watchData', {
                    uid: uid,
                    apiResult: toJS(_this.getLocalViewStore.obState),
                    apiParams: _this.props.autoQuery.params(_this.getViewStore.pageIndex, _this.getViewStore.pageSize),
                });
            }
        };
        _this.subscription = null;
        _this.node = null;
        _this.resize = debounce(function () {
            _this.viewModel.bodyContainerHeight = document.body.clientHeight;
        }, 500);
        /**
         * 导出当页数据
         *
         * @memberof HLTable
         */
        _this.exportCurrPageData = function () {
            _this.exportCsv({ filename: moment().format('YYYYMMDDHHmmss') + "-" + _this.viewModel.pageIndex });
        };
        _this.exportAllData = function () {
            _this.modalRef.viewModel.title = '导出数据';
            _this.modalRef.viewModel.visible = true;
        };
        _this.onSelectChange = function (selectedRowKeys, selectedRows) {
            var dataleng = _this.props.data ? _this.props.data.length : 0;
            if (_this.props.autoQuery) {
                dataleng = _this.getViewStore.renderData.length;
            }
            if (_this.getViewStore.renderData.length === dataleng) {
                _this.setState({ selectedRowKeys: selectedRowKeys }, function () {
                    _this.props.store.get(_this.freezeuid).selectedRows = selectedRows;
                    _this.props.onRowChange && _this.props.onRowChange(selectedRows);
                });
            }
        };
        _this.selectRow = function (record) {
            var getCheckboxPropsItem = _this.getCheckboxPropsItem(record);
            if (getCheckboxPropsItem && getCheckboxPropsItem['disabled']) {
                return;
            }
            _this.selectedRowsCheck(record);
        };
        _this.getSorterFn = function (sortOrder, sorter) {
            return function (a, b) {
                var result = sorter(a, b);
                if (result !== 0) {
                    return (sortOrder === 'descend') ? -result : result;
                }
                return 0;
            };
        };
        _this.state = {
            selectedRowKeys: [],
            taskName: '',
        };
        _this.uid = "table" + _this.props.store.HlTableContainer.size + shortHash("" + _this.timeId + _this.props.store.HlTableContainer.size);
        if (_this.props.store.HlTableContainer.has(_this.freezeuid)) {
            _this.timeId = new Date().getTime();
            _this.uid = "table" + _this.props.store.HlTableContainer.size + shortHash("" + _this.timeId + _this.props.store.HlTableContainer.size);
        }
        _this.traceId = _this.uid;
        _this.freezeuid = _this.uid;
        _this.tableThead = "table-thead" + _this.uid;
        if (_this.props['uniqueUid']) {
            _this.decryptionfreezeuid = "" + _this.props['uniqueUid'];
            _this.freezeuid = shortHash(_this.decryptionfreezeuid);
            _this.props.store.add(_this.freezeuid, _this.props.tableModulesName, _this.uid);
            if (!_this.props.store.HlTableLocalStateContainer.has(_this.freezeuid)) {
                _this.props.store._addLocalState(_this.freezeuid);
            }
            if (_this.props.autoQuery && _this.getLocalViewStore && (_this.props.autoQuery.isDefaultLoad === void 0 || _this.props.autoQuery.isDefaultLoad)) {
                _this.getLocalViewStore.dispatchRequest(_this.props.autoQuery, {
                    pageIndex: _this.getViewStore.pageIndex,
                    pageSize: _this.getViewStore.pageSize,
                });
            }
        }
        if (!_this.props.store.HlTableContainer.has(_this.freezeuid)) {
            _this.props.store.add(_this.freezeuid, _this.props.tableModulesName, _this.uid);
        }
        _this.consoleLog('hlTable-constructor');
        return _this;
    }
    Object.defineProperty(LegionsProTable.prototype, "getViewStore", {
        get: function () {
            return this.props.store.HlTableContainer.get(this.freezeuid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LegionsProTable.prototype, "getLocalViewStore", {
        get: function () {
            return this.props.store.HlTableLocalStateContainer.get(this.freezeuid);
        },
        enumerable: false,
        configurable: true
    });
    LegionsProTable.prototype.consoleLog = function (type, logObj) {
        var obj = logObj || {};
        var logConent = __assign(__assign({ storeView: __assign({}, this.getViewStore) }, obj), { store: this.props.store, that: toJS(this), props: toJS(this.props) });
        LoggerManager.consoleLog({
            type: type,
            logConent: logConent,
            methodsName: 'onHLTableCycle',
        });
    };
    LegionsProTable.prototype.logger = function (type, logObj) {
        var _this = this;
        if (typeof this.props.onLogRecord === 'function') {
            var obj = logObj || {};
            var viewStoreKeys = ['calculateBody', 'bodyContainerHeight',
                'bodyExternalHeight', 'computedRenderColumns', '_tableContainerWidth', 'renderData', 'tableBodyDomClientHeight', 'tableXAutoWidth'];
            var viewStore_1 = {};
            viewStoreKeys.map(function (item) {
                if (isObservable(_this.getViewStore[item])) {
                    viewStore_1[item] = cloneDeep(toJS(_this.getViewStore[item]));
                }
                else {
                    viewStore_1[item] = cloneDeep(_this.getViewStore[item]);
                }
            });
            var _a = this.props, store = _a.store, columns = _a.columns, props = __rest(_a, ["store", "columns"]);
            var logConent = __assign(__assign({}, viewStore_1), obj);
            LoggerManager.report({
                type: type,
                content: serialize(logConent, { ignoreFunction: false }),
                traceId: this.traceId,
                modulesName: this.props.tableModulesName,
                modulesPath: this.props['uniqueUid'],
            }, this.props.onLogRecord);
        }
    };
    LegionsProTable.prototype.search = function (options) {
        var _this = this;
        if (this.props.autoQuery && this.getLocalViewStore) {
            if (options && options.pageIndex) { /** 如果主动设置页码，则以主动设置为准 */
                this.getViewStore.pageIndex = options.pageIndex;
            }
            else {
                this.getViewStore.pageIndex = 1;
            }
            this.setState({
                selectedRowKeys: [],
            }, function () {
                _this.getViewStore.selectedRows = [];
                _this.getLocalViewStore.dispatchRequest(_this.props.autoQuery, Object.assign({
                    pageIndex: _this.getViewStore.pageIndex,
                    pageSize: _this.getViewStore.pageSize,
                }, options));
            });
        }
    };
    /**
     *
     * 导出表格数据
     * @param {Partial<Parameters<typeof exportCsv>[0]>} prams
     * @memberof HLTable
     */
    LegionsProTable.prototype.exportCsv = function (prams) {
        if (prams === void 0) { prams = {}; }
        if (!legionsThirdpartyPlugin.plugins.excel) {
            message.warning('Plugin is not ready to excel, Please install at the entrance(legionsThirdpartyPlugin.use({name:"excel",url:"xxxx"}))');
            return;
        }
        var columns = [];
        var datas = [];
        if (prams.columns && prams.data) {
            columns = prams.columns;
            datas = prams.data;
        }
        else {
            columns = this.viewModel.computedRenderColumns;
            /* columns = this.viewModel.computedRenderColumns; */
            if (this.props.displayType === 'bigData') {
                datas = this.props.data;
            }
            else {
                datas = this.viewModel.renderData.map(function (item) {
                    return item;
                });
            }
        }
        var newColumns = columns.filter(function (item) { return item.isExport !== false; });
        /* exportCsv({
            ...prams,
            filename: prams.filename,
            columns: newColumns,
            data: datas,
        }) */
        /* const newArr = [];
        datas.map((item) => {
            let dataItem = {}
            for(let key in item){
                const newItem = newColumns.filter((entity) => entity['dataIndex'] === key)
                if (newItem&&newItem.length) {
                    dataItem[newItem[0]['title']] = item[key]
                }
            }
            if (dataItem) {
              newArr.push(dataItem)
            }
        }) */
        legionsThirdpartyPlugin.plugins.excel.exportJsonToExcel({ data: datas, columns: newColumns, filename: prams.filename, autoWidth: true });
        // @ts-ignore
        // excel.export_json_to_excel({data:newArr,key:newColumns.map((item)=>item['title']),filename:prams.filename,autoWidth:true})
    };
    //@ts-ignore
    LegionsProTable.prototype.tranMapColumns = function (columns) {
        if (columns === void 0) { columns = this.props.columns; }
        /* return columns.map((item) => {
            let newItem = { key: item.dataIndex, ...item };
            if (!item.render) {
                newItem = {
                    ...newItem, render: (text, record) => {
                        return <HlLineOverflow width={item.width} text={record[item.dataIndex]}></HlLineOverflow>
                    }
                }
            }
            return newItem;
        }) */
        return columns.map(function (item) {
            if (!item.render && item.tooltip) {
                var newItem = __assign({ key: item.dataIndex }, item);
                newItem = __assign(__assign({}, newItem), { render: function (text, record) {
                        return React.createElement(LegionsProLineOverflow, { width: item.width, text: record[item.dataIndex] });
                    } });
                return newItem;
            }
            return item;
        });
    };
    LegionsProTable.prototype.createHeaderInnerNode = function () {
        var ele = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-scroll')[0];
        if (ele && ele.firstElementChild && ele.firstElementChild.firstElementChild) {
            var div = document.createElement('div');
            div.setAttribute('class', 'hlTable-header-inner');
            ele.firstElementChild.insertBefore(div, ele.firstElementChild.firstElementChild);
        }
    };
    LegionsProTable.prototype.initPagination = function () {
        var paginationProps = this.props.pagination;
        var store = this.props.store.HlTableContainer.get(this.freezeuid);
        if ((typeof paginationProps === 'boolean')) {
            store.pagination = paginationProps;
        }
        else if (this.props.autoQuery) {
            store.pagination = true;
        }
        else if (this.props.onPagingQuery && paginationProps === void 0) {
            store.pagination = true;
        }
        else if (!this.props.onPagingQuery && paginationProps === void 0) {
            store.pagination = false;
        }
    };
    LegionsProTable.prototype.componentWillMount = function () {
        var _this = this;
        var store = this.props.store.HlTableContainer.get(this.freezeuid);
        store.pageIndex = 1;
        store.pageSize = this.props.pageSize || store.pageSize;
        this.initPagination();
        if ((typeof this.props.isOpenRowChange === 'boolean' && !this.props.isOpenRowChange)) {
            store.isOpenRowChange = false;
        }
        if (!this.props.onRowChange && this.props.isOpenRowChange === void 0) { /** 历史问题， 当行选择函数没有传递时，表示关闭行选择 */
            store.isOpenRowChange = false;
            console.log(store.isOpenRowChange);
        }
        if ((typeof this.props.isOpenRowSelection === 'boolean' && !this.props.isOpenRowSelection)) {
            store.isOpenRowSelection = false;
        }
        if (!this.props.onRowChange && this.props.isOpenRowSelection === void 0) {
            store.isOpenRowSelection = false;
        }
        this.viewModel = store;
        this.viewModel.scroll = this.props.scroll;
        this.viewModel.bodyStyle = Object.assign({}, this.props.bodyStyle);
        this.props.onReady && this.props.onReady({
            store: this.props.store,
            uid: this.freezeuid,
            viewModel: store,
            localViewModel: this.getLocalViewStore,
            freezeuid: this.freezeuid,
            decryptionfreezeuid: this.decryptionfreezeuid,
            methods: {
                exportCsv: function (prams) {
                    _this.exportCsv(prams);
                },
                //@ts-ignore
                onSearch: function (options) {
                    _this.search(options);
                },
                updateOpenRowChange: function (isOpenRowChange) {
                    _this.getViewStore.updateOpenRowChange(isOpenRowChange);
                },
                setTableContainerWidth: function () {
                    _this.setTableContainerWidth();
                },
                openCustomColumns: function () {
                    if (_this.customColumnsModalRef) {
                        _this.customColumnsModalRef.viewModel.visible = true;
                    }
                }
            }
        });
        if (this.props.autoQuery) {
            this.subscription = this.props.store.schedule([this.log.bind(this, this.freezeuid)]);
        }
        this.consoleLog('hlTable-componentWillMount');
        /* this.subscription.unsubscribe() */
    };
    LegionsProTable.prototype.destroyPortal = function () {
        if (this.node) {
            unmountComponentAtNode(this.node);
        }
    };
    LegionsProTable.prototype.componentWillUnmount = function () {
        /* this.props.store.delete(this.freezeuid); */
        if (this.props.tableModulesName) {
            this.props.store.deleteTableModules(this.props.tableModulesName);
        }
        window.removeEventListener && window.removeEventListener('resize', this.resize.bind(this));
        this.subscription && this.subscription.unsubscribe();
        this.destroyPortal();
        this.consoleLog('hlTable-componentWillUnmount');
    };
    LegionsProTable.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var table, body, _index, data, UniqueKey, Repeat, anttablefixed, thead, span, RootContainer, spanth;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        table = document.querySelector("." + this.uid);
                        if (!table) {
                            return [2 /*return*/];
                        }
                        this.createHeaderInnerNode();
                        if (this.viewModel.isAdaptiveHeight) {
                            this.setTableThead();
                            this.setTabletBody();
                        }
                        this.getViewStore.columns = this.tranMapColumns();
                        if (!(this.props.tableModulesName && this.props.isOpenCustomColumns)) return [3 /*break*/, 4];
                        this.viewModel.setLocalStorageShowColumnsKeys(this.props.tableModulesName);
                        return [4 /*yield*/, this.viewModel.queryTableColumns(this.viewModel.computedStorageShowColumnsKeys, this.props.customColumnsConfig.queryApi)];
                    case 1:
                        _a.sent();
                        if (!(!this.viewModel.obTableListCustom.result || (this.viewModel.obTableListCustom.result && this.viewModel.obTableListCustom.result.customColumns.length === 0))) return [3 /*break*/, 3];
                        this.getViewStore.filterColumns();
                        body = this.viewModel.computedShowColumns.map(function (item) {
                            return { dataIndex: item.dataIndex, title: item.title };
                        });
                        if (!body.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.viewModel.editTableColumns(this.viewModel.computedStorageShowColumnsKeys, body, this.props.customColumnsConfig.editApi)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (this.props.isOpenCustomColumns) {
                            this.selections.push({
                                key: 'custom-columns',
                                text: this.renderButtonCusttomColumns(),
                                onSelect: function (changeableRowKeys) {
                                },
                            });
                        }
                        this.getViewStore.filterColumns();
                        _a.label = 4;
                    case 4:
                        if (this.props.visibleExportLoacl) {
                            this.selections.push({
                                key: 'export-excel',
                                text: React.createElement(Button, { size: "small" },
                                    "\u5BFC\u51FA\u5F53\u9875",
                                    React.createElement(Icon, { type: "download" })),
                                onSelect: function (changeableRowKeys) {
                                    _this.exportCsv({ filename: moment().format('YYYYMMDDHHmmss') + "-" + _this.viewModel.pageIndex });
                                },
                            });
                        }
                        if (this.props.onExportAll) { // 兼容历史问题，之前是onExportAll 传入此方法开启导出当页和全部，现在需要导出当页分开控制
                            if (this.props.visibleExportLoacl === void 0 || this.props.visibleExportLoacl) {
                                _index = this.selections.findIndex(function (item) { return item.key === 'export-excel'; });
                                if (_index < 0) {
                                    this.selections.push({
                                        key: 'export-excel',
                                        text: React.createElement(Button, { size: "small" },
                                            "\u5BFC\u51FA\u5F53\u9875",
                                            React.createElement(Icon, { type: "download" })),
                                        onSelect: function (changeableRowKeys) {
                                            _this.exportCsv({ filename: moment().format('YYYYMMDDHHmmss') + "-" + _this.viewModel.pageIndex });
                                        },
                                    });
                                }
                            }
                            this.selections.push({
                                key: 'export-all-excel',
                                text: React.createElement(Button, { size: "small" },
                                    "\u5BFC\u51FA\u5168\u90E8",
                                    React.createElement(Icon, { type: "download" })),
                                onSelect: function (changeableRowKeys) {
                                    /* OpenConfirm({
                                        title:'导出数据',
                                        content:(((taskName:string) => <Input value={taskName} onChange={(value) => {
                                             this.setState({taskName:value.target.value})
                                             
                                        }}></Input>)(this.state.taskName))
                                    }) */
                                    _this.modalRef.viewModel.title = '导出数据';
                                    _this.modalRef.viewModel.visible = true;
                                    //this.props.onExportAll(this.viewModel.computedStorageShowColumnsKeys);
                                },
                            });
                        }
                        window.addEventListener && window.addEventListener('resize', this.resize.bind(this));
                        if (findDOMNode(this).getElementsByClassName('ant-table-body')) ;
                        this.setTableContainerWidth();
                        data = this.props.data;
                        if (this.props.autoQuery) {
                            // @ts-ignore
                            data = this.getLocalViewStore.obData;
                        }
                        if (data) {
                            /* this.getViewStore.renderData = this.props.data.map((item,index) => {
                                return {...item,uniqueKey:`${this.viewModel.pageIndex}${index+1}`}
                            }) */
                            if (this.props.displayType === 'smallData') {
                                /* this.getViewStore.renderData = [...this.props.data] */
                                this.getViewStore.renderData = __spread(data);
                                this.getViewStore.setTotal(this.props.total || 0);
                            }
                            if (this.getViewStore.renderData.length) {
                                UniqueKey = this.isHasUniqueKeyData();
                                Repeat = this.isChkRepeatUniqueKeyData();
                                warningOnce(UniqueKey, errorMessage.uniqueKey);
                                warningOnce(!Repeat, errorMessage.Repeat);
                            }
                        }
                        anttablefixed = table.querySelector('.ant-table-fixed-left');
                        thead = null;
                        if (anttablefixed) {
                            thead = anttablefixed.querySelector('thead');
                        }
                        else {
                            thead = table.querySelector('thead');
                        }
                        if (thead && this.selections.length) {
                            span = document.createElement('span');
                            this.node = span;
                            if (thead.querySelector('th')) {
                                RootContainer = this.getViewStore.isOpenRowSelection && this.props.type === 'checkbox' ? '.ant-table-selection-down' : 'span';
                                spanth = thead.querySelector('th').querySelector(RootContainer);
                                if (spanth) {
                                    spanth.appendChild(this.node);
                                    this.renderPortal();
                                }
                            }
                        }
                        this.consoleLog('hlTable-componentDidMount');
                        return [2 /*return*/];
                }
            });
        });
    };
    LegionsProTable.prototype.setTableContainerWidth = function () {
        if (findDOMNode(this).getElementsByClassName('ant-table-body')) {
            var tableBody = findDOMNode(this).getElementsByClassName('ant-table-body');
            if (tableBody && tableBody instanceof HTMLCollection && tableBody.length) {
                var width = tableBody[0].clientWidth;
                this.viewModel._tableContainerWidth = width;
            }
        }
    };
    LegionsProTable.prototype.renderPortal = function () {
        var index = this.selections.findIndex(function (item) { return item.key === 'export-excel'; });
        var menu = (React.createElement(Menu, null,
            (this.props.isOpenCustomColumns && this.props.tableModulesName) && React.createElement(Menu.Item, { key: "3" }, this.renderButtonCusttomColumns()),
            index > -1 && React.createElement(Menu.Item, { key: "1" },
                React.createElement(Button, { size: "small", onClick: this.exportCurrPageData },
                    "\u5BFC\u51FA\u5F53\u9875",
                    React.createElement(Icon, { type: "download" }))),
            this.props.onExportAll && React.createElement(Menu.Item, { key: "2" },
                React.createElement(Button, { size: "small", onClick: this.exportAllData },
                    "\u5BFC\u51FA\u5168\u90E8",
                    React.createElement(Icon, { type: "download" })))));
        unstable_renderSubtreeIntoContainer(this, //代表当前组件
        React.createElement(Dropdown, { overlay: menu },
            React.createElement(Icon, { type: "appstore-o", style: { color: 'red' } })), this.node // 传送门另一端的DOM node
        );
    };
    LegionsProTable.prototype.renderButtonCusttomColumns = function () {
        var _this = this;
        return React.createElement(Button, { size: "small", onClick: function () {
                _this.customColumnsModalRef.viewModel.visible = true;
                _this.customColumnsModalRef.viewModel.title =
                    React.createElement("p", null,
                        "\u8868\u683C\u5217\u81EA\u5B9A\u4E49\u663E\u793A\u53CA\u6392\u5E8F",
                        React.createElement("span", { style: { color: 'red' } }, "(\u8BF7\u62D6\u52A8\u5217\u540D\u8FDB\u884C\u64CD\u4F5C)"));
            } },
            "\u81EA\u5B9A\u4E49\u5217",
            React.createElement(Icon, { type: "bars" }));
    };
    /**
     * 设置表格列头高度
     *
     * @memberof HLTable
     */
    LegionsProTable.prototype.setTableThead = function () {
        var table = document.querySelector("." + this.uid);
        if (table) {
            var tableThead = table.querySelector('.ant-table-thead');
            var store = this.props.store.HlTableContainer.get(this.freezeuid);
            var tr = findDOMNode(tableThead.querySelector('tr'));
            if (tableThead && tr) {
                if (store.bodyExternalContainer.get(this.tableThead) && tr.clientHeight !== store.bodyExternalContainer.get(this.tableThead).height) { // 当存在时，对比两次数据变化，不一致，在重新set
                    store.bodyExternalContainer.set(this.tableThead, { height: findDOMNode(tableThead.querySelector('tr')).clientHeight });
                }
                else {
                    // 不存在时直接set
                    store.bodyExternalContainer.set(this.tableThead, { height: findDOMNode(tableThead.querySelector('tr')).clientHeight });
                }
            }
        }
    };
    /**
     * 设置table 行数据dom 总高度
     *
     * @memberof HLTable
     */
    LegionsProTable.prototype.setTabletBody = function () {
        var table = document.querySelector("." + this.uid);
        if (table) {
            var tabletBody = table.querySelector('.ant-table-tbody');
            var store = this.props.store.HlTableContainer.get(this.freezeuid);
            if (tabletBody && store.tableBodyDomClientHeight !== findDOMNode(tabletBody).clientHeight) {
                store.tableBodyDomClientHeight = findDOMNode(tabletBody).clientHeight;
            }
        }
    };
    LegionsProTable.prototype.componentDidUpdate = function () {
        if (this.viewModel.isAdaptiveHeight) {
            this.setTableThead();
            this.setTabletBody();
        }
        this.node && this.renderPortal();
        this.consoleLog('hlTable-componentDidUpdate');
    };
    //@ts-ignore
    LegionsProTable.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.props.selectedRowKeys && this.props.selectedRowKeys !== nextProps.selectedRowKeys) {
            var data = [];
            if (this.props.autoQuery && this.props.displayType === 'smallData') {
                data = (this.getViewStore.renderData && this.getViewStore.renderData.length) ? this.getViewStore.renderData : [];
            }
            else {
                data = (nextProps.data && nextProps.data.length) ? nextProps.data : [];
            }
            // @ts-ignore
            var newSelectedRows = data.filter(function (v) { return nextProps.selectedRowKeys.includes(v[_this.props.uniqueKey]); });
            var newSelectedRowKeys = newSelectedRows.map(function (item) { return item[_this.props.uniqueKey]; });
            var selectedRowKeys = __spread(newSelectedRowKeys);
            this.setState({ selectedRowKeys: selectedRowKeys });
        }
        if (this.props.scroll && !this.deepComparisonObject(this.props.scroll, nextProps.scroll)) {
            this.viewModel.scroll = nextProps.scroll;
        }
        if (this.props.bodyStyle && !this.deepComparisonObject(this.props.bodyStyle, nextProps.bodyStyle)) {
            this.viewModel.bodyStyle = nextProps.bodyStyle;
        }
        if (nextProps.data !== this.props.data && nextProps.data && !this.props.autoQuery) {
            /* this.getViewStore.renderData = nextProps.data.map((item,index) => {
                return {...item,uniqueKey:`${this.viewModel.pageIndex}${index+1}`}
            }) */
            /**  主要解决当渲染数据和传入数据不一致时，无需通过传入数据值来刷新渲染数据 */
            if (this.props.displayType === 'smallData') {
                this.getViewStore.renderData = __spread(this.props.autoQuery ? [] : nextProps.data);
            }
            if (this.getViewStore.renderData.length) {
                var UniqueKey = this.isHasUniqueKeyData();
                var Repeat = this.isChkRepeatUniqueKeyData();
                warningOnce(UniqueKey, errorMessage.uniqueKey);
                warningOnce(!Repeat, errorMessage.Repeat);
            }
        }
        /* if (nextProps.total !== this.props.total&&!this.props.autoQuery) {
           this.getViewStore.setTotal(nextProps.total)
        } */
        if (this.props.columns !== nextProps.columns) {
            this.getViewStore.columns = this.tranMapColumns(nextProps.columns);
        }
        this.consoleLog('hlTable-componentWillReceiveProps');
        /* if (this.props.total !== nextProps.total) {
            console.log(this.props.total, nextProps.total)
            const totalPage = parseInt(((nextProps.total + this.viewModel.pageSize - 1) / this.viewModel.pageSize).toString());
            if (this.viewModel.pageIndex > totalPage) {
                this.viewModel.pageIndex = totalPage
            }
        } */
        /* if(this.props.pageIndex!==nextProps.pageIndex){ 暂时取消
            this.setState({pageIndex:nextProps.pageIndex})
        } */
    };
    /**
     *
     * 对象值深比较
     * @param {*} obj
     * @param {*} obj1
     * @returns
     * @memberof HLTable
     */
    LegionsProTable.prototype.deepComparisonObject = function (obj, obj1) {
        return JSON.stringify(obj) === JSON.stringify(obj1);
    };
    /**
     * 判定唯一键信息在数据列表项中是否存在
     *
     * @returns {boolean}
     * @memberof HLTable
     */
    LegionsProTable.prototype.isHasUniqueKeyData = function () {
        var _this = this;
        var result = this.viewModel.renderData.every(function (item) { return _this.props.uniqueKey in item; });
        return result;
    };
    /**
     *
     * 判定唯一键值是否存在相同数据
     * @returns
     * @memberof HLTable
     */
    LegionsProTable.prototype.isChkRepeatUniqueKeyData = function () {
        var isSame = false;
        var obj = {};
        for (var i = 0; i < this.viewModel.renderData.length; i++) {
            if (this.viewModel.renderData[i][this.props.uniqueKey] in obj) {
                isSame = true;
                break;
            }
            else {
                obj[this.viewModel.renderData[i][this.props.uniqueKey]] = this.viewModel.renderData[i][this.props.uniqueKey];
            }
        }
        return isSame;
    };
    LegionsProTable.prototype.onRowClick = function (record, index, event) {
        if (this.getViewStore.isOpenRowChange) {
            this.selectRow(record);
            this.props.onRowClick && this.props.onRowClick(record, index, event);
        }
    };
    LegionsProTable.prototype.onRowClassName = function (record, index) {
        var _this = this;
        var RowIndex = this.state.selectedRowKeys.findIndex(function (item) { return item === record[_this.props.uniqueKey]; });
        var getCheckboxPropsItem = this.getCheckboxPropsItem(record);
        if (RowIndex > -1) {
            return 'row-color';
        }
        else if (getCheckboxPropsItem && getCheckboxPropsItem['disabled']) {
            return 'disabled-color';
        }
        return record['className'] || '';
    };
    LegionsProTable.prototype.getCheckboxPropsItem = function (record) {
        if (record === void 0) { record = null; }
        if (this.props.rowSelection && this.props.rowSelection.getCheckboxProps && typeof this.props.rowSelection.getCheckboxProps === 'function' && record) {
            var getCheckboxPropsItem = this.props.rowSelection.getCheckboxProps(record);
            if (Object.prototype.toString.call(getCheckboxPropsItem) === '[object Object]') {
                return getCheckboxPropsItem;
            }
        }
        return null;
    };
    LegionsProTable.prototype.selectedRowsCheck = function (record) {
        var _this = this;
        var selectedRows = __spread(this.props.store.get(this.freezeuid).selectedRows);
        var selectedRowKeys = __spread(this.state.selectedRowKeys);
        var selectedRow = selectedRows.find(function (item) { return item[_this.props.uniqueKey] === record[_this.props.uniqueKey]; });
        if (selectedRowKeys.indexOf(record[this.props.uniqueKey]) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record[this.props.uniqueKey]), 1);
        }
        else {
            if (this.props.rowSelectionClickType === 'radio') {
                selectedRowKeys = [];
            }
            selectedRowKeys.push(record[this.props.uniqueKey]);
        }
        if (selectedRow) {
            var index = selectedRows.findIndex(function (item) { return item[_this.props.uniqueKey] === record[_this.props.uniqueKey]; });
            selectedRows.splice(index, 1);
        }
        else {
            if (this.props.rowSelectionClickType === 'radio') {
                selectedRows = [];
            }
            selectedRows.push(record);
        }
        this.setState({ selectedRowKeys: selectedRowKeys });
        this.props.store.get(this.freezeuid).selectedRows = selectedRows;
        this.props.onRowChange && this.props.onRowChange(selectedRows);
    };
    //@ts-ignore
    LegionsProTable.prototype.renderlocale = function () {
        if (this.props.autoQuery) {
            if (this.getLocalViewStore && this.props.autoQuery.isDefaultLoad === false) {
                return {
                    emptyText: React.createElement("div", { className: "no-data-tip" },
                        React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                        "\u521D\u6B21\u6253\u5F00\u9875\u9762\u4E0D\u52A0\u8F7D\u6570\u636E\uFF0C\u8BF7\u7EC4\u5408\u6761\u4EF6\u8FDB\u884C\u641C\u7D22")
                };
            }
            else if (this.getLocalViewStore && this.getLocalViewStore.obState.isResolved && this.getViewStore.renderData.length === 0) {
                if (!this.getLocalViewStore.obState.value.success && this.getLocalViewStore.obState.value.message) {
                    return {
                        emptyText: React.createElement("div", { className: "no-data-tip" },
                            React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                            this.getLocalViewStore.obState.value.message)
                    };
                }
                return {
                    emptyText: React.createElement("div", { className: "no-data-tip" },
                        React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                        "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u6570\u636E\uFF0C\u8BF7\u5C1D\u8BD5\u5176\u4ED6\u641C\u7D22\u6761\u4EF6")
                };
            }
            else {
                return {
                    emptyText: React.createElement("div", { className: "no-data-tip" },
                        React.createElement(Icon, { style: { color: '#95cef9', fontSize: '20px', paddingRight: '5px', verticalAlign: 'middle' }, type: "search" }),
                        "\u6682\u65E0\u6570\u636E")
                };
            }
        }
    };
    LegionsProTable.prototype.render = function () {
        var _this = this;
        var selectedRowKeys = this.state.selectedRowKeys;
        var store = this.props.store.get(this.freezeuid);
        var alreadyRowsLen = store.selectedRows.length;
        var onRowChange = this.props.onRowChange;
        var locale = null;
        if (this.props.autoQuery) {
            locale = {
                locale: this.renderlocale(),
            };
        }
        this.consoleLog('hlTable-render');
        //@ts-ignore
        var rowSelection = (this.getViewStore.isOpenRowSelection) && __assign(__assign({}, this.props.rowSelection), { selectedRowKeys: selectedRowKeys, hideDefaultSelections: true, type: this.props.type, selections: this.selections, onChange: this.onSelectChange.bind(this), onSelectAll: function (selected, selectedRows, changeRows) {
                if (_this.getViewStore.renderData.length <= _this.props.data.length) { // 主要用于大数据table 性能问题，每次只加载部分数据，这时全选时自动选择全部数据
                    if (selected) {
                        var newData_1 = _this.props.data.filter(function (item) {
                            var getCheckboxPropsItem = _this.getCheckboxPropsItem(item);
                            return ((!getCheckboxPropsItem || (getCheckboxPropsItem && !getCheckboxPropsItem['disabled'])));
                        });
                        var selectedRowKey = newData_1.map(function (item) { return item[_this.props.uniqueKey]; });
                        _this.setState({ selectedRowKeys: selectedRowKey }, function () {
                            var data = __spread(newData_1);
                            _this.getViewStore.selectedRows = data;
                            _this.props.onRowChange && _this.props.onRowChange(_this.getViewStore.selectedRows);
                        });
                    }
                    else {
                        _this.setState({ selectedRowKeys: [] }, function () {
                            _this.getViewStore.selectedRows = [];
                            _this.props.onRowChange && _this.props.onRowChange(_this.getViewStore.selectedRows);
                        });
                    }
                }
            }, onSelectInvert: function () {
                _this.setState({ selectedRowKeys: [] }, function () {
                    _this.getViewStore.selectedRows = [];
                });
            } });
        var paginationProps = this.props.pagination;
        var pagination = {
            pageSizeOptions: this.props.pageSizeOptions,
            /* total: this.props.total, */
            total: this.props.autoQuery ? this.getViewStore.computedTotal : this.props.total,
            current: store.pageIndex,
            showQuickJumper: true,
            pageSize: store.pageSize,
            showSizeChanger: true,
            size: (paginationProps && typeof paginationProps === 'object') ? paginationProps.size : '',
            onChange: function (pageIndex, pageSize) {
                _this.setState({
                    selectedRowKeys: [],
                });
                _this.props.store.get(_this.freezeuid).pageIndex = pageIndex;
                _this.props.store.get(_this.freezeuid).pageSize = pageSize;
                _this.props.store.get(_this.freezeuid).selectedRows = [];
                _this.props.onPagingQuery && _this.props.onPagingQuery(pageIndex, pageSize, false);
                if (_this.props.autoQuery && _this.getLocalViewStore) {
                    _this.getLocalViewStore.dispatchRequest(_this.props.autoQuery, {
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                    });
                }
            },
            onShowSizeChange: function (current, pageSize) {
                _this.setState({
                    selectedRowKeys: [],
                });
                _this.props.store.get(_this.freezeuid).pageIndex = current;
                _this.props.store.get(_this.freezeuid).pageSize = pageSize;
                _this.props.store.get(_this.freezeuid).selectedRows = [];
                _this.props.onPagingQuery && _this.props.onPagingQuery(current, pageSize, true);
                if (_this.props.autoQuery && _this.getLocalViewStore) {
                    _this.getLocalViewStore.dispatchRequest(_this.props.autoQuery, {
                        pageIndex: current,
                        pageSize: pageSize,
                    });
                }
            },
            showTotal: function (total) { return (alreadyRowsLen > 0 ? "\u5DF2\u9009\u62E9" + alreadyRowsLen + "\u6761\u6570\u636E" : '') + " \u5171 " + total + " \u6761\u6570\u636E"; }
        };
        /* console.log(this.getViewStore.renderData) */
        /* const bodyStyle = (this.viewModel.isAdaptiveHeight && this.getViewStore.renderData && this.getViewStore.renderData.length > 0) ? { ...this.viewModel.bodyStyle,...this.viewModel.calculateBody } : this.viewModel.bodyStyle */
        var bodyStyle = (this.viewModel.isAdaptiveHeight && this.getViewStore.renderData && this.getViewStore.renderData.length > 0) ? __assign(__assign({}, this.viewModel.bodyStyle), this.viewModel.calculateBody) : this.viewModel.bodyStyle;
        return React.createElement(Row, { className: baseCls },
            React.createElement(Col, null,
                React.createElement("div", { className: "containers " + this.uid + " " + (this.viewModel.isAdaptiveHeight ? 'adaptiveHeight' : '') },
                    React.createElement(Table
                    /* size="small" */
                    , __assign({}, locale, this.props, { scroll: this.viewModel.scroll, columns: this.viewModel.computedRenderColumns, bordered: true, bodyStyle: bodyStyle, rowClassName: this.onRowClassName.bind(this), pagination: (this.getViewStore.pagination) ? pagination : false, loading: { tip: 'loading', spinning: this.props.autoQuery ? this.getLocalViewStore.loading : this.props.loading }, rowKey: this.props.uniqueKey, 
                        // locale={{emptyText:<span>2222</span>}}
                        onRowClick: this.onRowClick.bind(this), rowSelection: rowSelection, dataSource: __spread(this.getViewStore.renderData), onChange: function (pagination, filters, sorter) {
                            if (sorter.column && sorter.column.sorter && typeof sorter.column.sorter === 'boolean' && _this.props.displayType === 'smallData') {
                                var sorterFn = _this.getSorterFn(sorter.order, function (a, b) {
                                    return compare(a[sorter.columnKey], b[sorter.columnKey]);
                                });
                                var data = _this.viewModel.renderData.map(function (item) { return item; });
                                _this.viewModel.renderData = __spread(data.sort(sorterFn));
                            }
                            _this.props.onChange && _this.props.onChange(pagination, filters, sorter);
                        } })))),
            React.createElement(LegionsProModal, { onOk: function () {
                    if (!_this.viewUI.taskName) {
                        message.warning('请输入任务名称');
                        return;
                    }
                    _this.props.onExportAll && _this.props.onExportAll(_this.props.tableModulesName, _this.viewUI.taskName);
                    _this.modalRef.viewModel.visible = false;
                }, onReady: function (value) {
                    _this.modalRef = value;
                } },
                React.createElement(Input, { value: this.viewUI.taskName, placeholder: "\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0", onChange: function (value) {
                        _this.viewUI.taskName = value.target.value;
                    } })),
            this.props.isOpenCustomColumns && React.createElement(LegionsProTableCustomColumns, { customColumnsConfig: this.props.customColumnsConfig, tableUid: this.freezeuid, onReady: function (value) {
                    _this.customColumnsModalRef = value;
                } }));
    };
    /* lodaMore = debounce(() => {
        const end = this.getViewStore.flag + 100;
        const data = this.props.data.slice(this.getViewStore.flag,end);
        if (data.length) {
            data.map((item) => {
                const index = this.getViewStore.renderData.findIndex((entity) => entity[this.props.uniqueKey] === item[this.props.uniqueKey])
                if (index < 0) {
                    this.getViewStore.renderData.push(item);
                }
            })
            this.getViewStore.renderData = [... this.getViewStore.renderData]
            this.getViewStore.flag = end;
        }
    },500) */
    /* viewTodo=observableViewModel<Calculate>(new Calculate()) */
    /* lodaMore = debounce((mode: 'next' | 'pre') => {
        const totalPage = parseInt(((this.props.total + this.viewModel.pageSize - 1) / this.viewModel.pageSize).toString())
        if (mode === 'next') {
            if (this.viewModel.pageIndex < totalPage) {
                this.viewModel.pageIndex = this.viewModel.pageIndex + 1;
                this.props.onPagingQuery && this.props.onPagingQuery(this.viewModel.pageIndex,this.viewModel.pageSize,false);
            }
        }
        if (mode === 'pre') {
            if (this.viewModel.pageIndex > 1 && this.viewModel.pageIndex <= totalPage) {
                this.viewModel.pageIndex = this.viewModel.pageIndex - 1;
                this.props.onPagingQuery && this.props.onPagingQuery(this.viewModel.pageIndex,this.viewModel.pageSize,false);
            }
        }

    },500) */
    LegionsProTable.defaultProps = {
        rowSelectionClickType: 'radio',
        isOpenRowSelection: true,
        type: 'checkbox',
        data: [],
        total: 0,
        loading: false,
        displayType: 'smallData',
        isOpenCustomColumns: true,
        pageSizeOptions: ['5', '10', '20', '40', '60', '80', '100', '200', '500'],
    };
    LegionsProTable = __decorate([
        bind({ store: ProTableStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], LegionsProTable);
    return LegionsProTable;
}(React.Component));

export default LegionsProTable;
