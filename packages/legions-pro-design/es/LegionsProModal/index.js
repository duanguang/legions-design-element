/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import { unmountComponentAtNode, unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Modal } from 'antd';
import { bind, observer } from 'legions/store-react';
import { ProModalStore } from '../store/pro.modal';
import { shortHash } from 'legions-lunar/object-hash';
import styles from './style/index.modules.less';
import './style/index.less';
import { runInAction } from 'mobx';

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

const maximizeSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/maximize.png'
const undoSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/undo.png'
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

export default LegionsProModal;
