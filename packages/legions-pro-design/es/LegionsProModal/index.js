/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import React, { useState, forwardRef, memo, Component } from 'react';
import { unstable_batchedUpdates, unmountComponentAtNode, unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Modal } from 'antd';
import { bind, observer } from 'legions/store-react';
import { ProModalStore } from '../store/pro.modal';
import { shortHash } from 'legions-lunar/object-hash';
import './style/index.less';
import { spy, configure, observable, runInAction } from 'mobx';
import { getInjector } from 'legions/store';

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

if (!useState) {
    throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!spy) {
    throw new Error("mobx-react-lite requires mobx at least version 4 to be available");
}

var __read = (undefined && undefined.__read) || function (o, n) {
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
};
function getSymbol(name) {
    if (typeof Symbol === "function") {
        return Symbol.for(name);
    }
    return "__$mobx-react " + name + "__";
}
var mockGlobal = {};
function getGlobal() {
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    return mockGlobal;
}

var observerBatchingConfiguredSymbol = getSymbol("observerBatching");
function defaultNoopBatch(callback) {
    callback();
}
function observerBatching(reactionScheduler) {
    if (!reactionScheduler) {
        reactionScheduler = defaultNoopBatch;
        if ("production" !== process.env.NODE_ENV) {
            console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
        }
    }
    configure({ reactionScheduler: reactionScheduler });
    getGlobal()[observerBatchingConfiguredSymbol] = true;
}

var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

var __read$1 = (undefined && undefined.__read) || function (o, n) {
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
};

observerBatching(unstable_batchedUpdates);

function shallowEqual(objA, objB) {
  //From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (is(objA, objB)) return true;

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
} // based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js

var hasSymbol = typeof Symbol === "function" && Symbol.for; // Using react-is had some issues (and operates on elements, not on types), see #608 / #609

var ReactForwardRefSymbol = hasSymbol ?
/*#__PURE__*/
Symbol.for("react.forward_ref") : typeof forwardRef === "function" &&
/*#__PURE__*/
forwardRef(function (props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ?
/*#__PURE__*/
Symbol.for("react.memo") : typeof memo === "function" &&
/*#__PURE__*/
memo(function (props) {
  return null;
})["$$typeof"];

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var MobXProviderContext =
/*#__PURE__*/
React.createContext({});
function Provider(props) {
  var children = props.children,
      stores = _objectWithoutPropertiesLoose(props, ["children"]);

  var parentValue = React.useContext(MobXProviderContext);
  var mutableProviderRef = React.useRef(_extends({}, parentValue, stores));
  var value = mutableProviderRef.current;

  if (process.env.NODE_ENV !== "production") {
    var newValue = _extends({}, value, stores); // spread in previous state for the context based stores


    if (!shallowEqual(value, newValue)) {
      throw new Error("MobX Provider: The set of provided stores has changed. See: https://github.com/mobxjs/mobx-react#the-set-of-provided-stores-has-changed-error.");
    }
  }

  return React.createElement(MobXProviderContext.Provider, {
    value: value
  }, children);
}
Provider.displayName = "MobXProvider";

if (!Component) throw new Error("mobx-react requires React to be available");
if (!observable) throw new Error("mobx-react requires mobx to be available");

var LegionsProModalContext = /** @class */ (function (_super) {
    __extends(LegionsProModalContext, _super);
    function LegionsProModalContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegionsProModalContext.prototype.renderMobXProviderContext = function () {
        var _this = this;
        return React.createElement(MobXProviderContext.Consumer, null, function (context) {
            // @ts-ignore
            return React.cloneElement(_this.props.modal || _this.props.children, null, React.createElement(Provider, { storeManage: context.storeManage },
                " ",
                _this.props.content));
        });
    };
    LegionsProModalContext.prototype.renderContextType = function () {
        return React.cloneElement(this.props.modal || this.props.children, null, React.createElement(Provider, { storeManage: getInjector()  },
            " ",
            this.props.content));
    };
    LegionsProModalContext.prototype.render = function () {
        return (this.renderContextType());
    };
    return LegionsProModalContext;
}(React.Component));
LegionsProModalContext.contextType = MobXProviderContext;

var maximizeSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/maximize.png';
var undoSrc = 'https://gitee.com/duanguang/figure-bed/raw/master/oss/undo.png';
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
var ProModal = /** @class */ (function (_super) {
    __extends(ProModal, _super);
    function ProModal(props) {
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
        _this.subscriptionVisible = null;
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
        /** 左侧拖拽缩放节点 */
        _this.leftBarNode = null;
        /** 右侧拖拽缩放节点 */
        _this.rightBarNode = null;
        /** 底部拖拽缩放节点 */
        _this.buttomBarNode = null;
        _this.log = function (n) {
            /** 拖拽移动方案一: 设置ant-content 居中样式margin:o auto 为margin:0px,通过手动left来决定显示时居左距离
             * 拖动时更改modal style属性值来设置x,y坐标
             */
            if (_this.viewStore.visible && _this.props.draggable && _this.viewStore._dragData.x === null) {
                var timeId_1 = setTimeout(function () {
                    _this.viewStore._resetDragLocationData();
                    clearTimeout(timeId_1);
                }, 0);
            }
        };
        _this.watchVisibleChange = function (n) {
            var visible = _this.viewStore.visible;
            if (visible) {
                var timeId_2 = setTimeout(function () {
                    _this.setModalDOM();
                    _this.setModalContentInsertMaximize();
                    _this.createZoomable();
                    clearTimeout(timeId_2);
                }, 100);
            }
            _this.props.onVisibleChange && _this.props.onVisibleChange(visible);
        };
        /*** 拖拽移动 移动事件 */
        //@ts-ignore
        _this.handleDraggableMoveMove = function (event) {
            /* runInAction(() => {
                this.viewStore._dragData.dragging = true;
            }) */
            if (!_this.viewStore._dragData.dragging)
                return false;
            runInAction(function () {
                var distance = {
                    x: event.clientX,
                    y: event.clientY
                };
                var diff_distance = {
                    x: distance.x - _this.viewStore._dragData.dragX,
                    y: distance.y - _this.viewStore._dragData.dragY
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
                        _this.viewStore._dragData.y = 0;
                    }
                    else if (bottomMargin < 48) { // 到达底部回弹
                        _this.viewStore._dragData.y = rect.top - 48;
                    }
                    else if (rect.right < 85) { // 到达左边界极限
                        _this.viewStore._dragData.x = rect.left + 10;
                    }
                    else if (rightMargin < 85) { // 到达又边界极限
                        _this.viewStore._dragData.x = rect.left - 10;
                    }
                    else {
                        _this.viewStore._dragData.y += diff_distance.y;
                        _this.viewStore._dragData.x += diff_distance.x;
                    }
                    /* this.viewStore._dragData.x += diff_distance.x; */
                    _this.viewStore._dragData.dragX = distance.x;
                    _this.viewStore._dragData.dragY = distance.y;
                }
            });
            event.stopPropagation();
        };
        /**  * 拖拽移动结束事件 */
        _this.handleDraggableMoveEnd = function () {
            runInAction(function () {
                _this.viewStore._dragData.dragging = false;
                _this.viewStore._asyncResizableData();
            });
            if (_this.getModalContentDOM) {
                var rect = _this.getModalContentDOM.getBoundingClientRect();
                _this.draggableLocationLeftY = rect.left;
            }
            _this.unbindingDraggableMousemoveEven();
            _this.unbindingDraggableMouseupEven();
        };
        /** 移出元素范围之外触发 */
        _this.handleResizableMouseOut = function (event) {
            var distance = {
                x: event.clientX,
                y: event.clientY
            };
            if (!_this.viewStore._resizableData.resizable) {
                _this.viewStore._updateEnabledResizable({
                    enabled: false,
                    direction: '',
                });
            }
        };
        /**  拖拽缩放移动坐标轴，触发在window对象*/
        //@ts-ignore
        _this.handleResizableMoveMove = function (event) {
            runInAction(function () {
                _this.viewStore._resizableData.resizable = true;
            });
            if (!_this.viewStore._resizableData.resizable)
                return false;
            runInAction(function () {
                var distance = {
                    x: event.clientX,
                    y: event.clientY
                };
                var diff_distance = {
                    x: distance.x - _this.viewStore._resizableData.resizableX,
                    y: distance.y - _this.viewStore._resizableData.resizableY
                };
                /*  console.log('准备拖拽缩放移动坐标轴====satrt====')
                 console.log('this.viewStore.resizableData',this.viewStore.resizableData)
                 console.log('this.topLocation',this.topLocation)
                 console.log('准备拖拽缩放移动坐标轴====end====') */
                _this.viewStore._resizableData.x += diff_distance.x;
                _this.viewStore._resizableData.y += diff_distance.y;
                _this.viewStore._resizableData.resizableX = distance.x;
                _this.viewStore._resizableData.resizableY = distance.y;
                if (_this.viewStore.computedResizable.direction === 'bottom') {
                    _this.viewStore._resizableData.top = _this.topLocation.top;
                }
                if (_this.viewStore.computedResizable.direction === 'top') {
                    _this.viewStore._resizableData.top = _this.viewStore._resizableData.y;
                    _this.viewStore._resizableData.bottom = _this.topLocation.bottom;
                }
                if (_this.viewStore.computedResizable.direction === 'left') { // 左侧缩放，则固定右侧坐标轴
                    _this.viewStore._resizableData.right = _this.topLocation.right;
                    /* console.log('拖拽缩放移动坐标轴====satrt====')
                    console.log('this.viewStore._resizableData',this.viewStore._resizableData)
                    console.log('this.topLocation',this.topLocation)
                    console.log('拖拽缩放移动坐标轴====end====') */
                }
                if (_this.viewStore.computedResizable.direction === 'right') {
                    _this.viewStore._resizableData.left = _this.topLocation.left;
                }
                _this.viewStore._asyncResizableBodyStyle({
                    modalType: _this.props.modalType,
                    placement: _this.props.placement,
                });
            });
        };
        /** * 结束拖拽缩放，鼠标释放。window触发*/
        _this.handleResizableMoveEnd = function () {
            runInAction(function () {
                _this.viewStore._resizableData.resizable = false;
            });
            _this.setAntdContentLocation();
            _this.viewStore._updateEnabledResizable({
                enabled: false,
                direction: '',
            });
            off(window, 'mousemove', _this.handleResizableMoveMove);
            off(window, 'mouseup', _this.handleResizableMoveEnd);
        };
        /**
         *  拖拽缩放开始 在modal-content监听事件触发
         */
        _this.handleResizableMouseStart = function (direction, event) {
            if (_this.viewStore._operaModel !== 'maximize') { // 最大化时也就是全屏不允许缩放
                if (_this.getModalContentDOM) {
                    var rect_1 = _this.getModalContentDOM.getBoundingClientRect();
                    runInAction(function () {
                        _this.viewStore._resizableData.x = rect_1.x || rect_1.left;
                        _this.viewStore._resizableData.y = rect_1.y || rect_1.top;
                        var distance = {
                            x: event.clientX,
                            y: event.clientY
                        };
                        _this.viewStore._resizableData.resizableX = distance.x;
                        _this.viewStore._resizableData.resizableY = distance.y;
                        /* console.log('开始缩放====satrt====')
                        console.log('this.viewStore._resizableData',this.viewStore._resizableData)
                        console.log('this.topLocation',this.topLocation)
                        console.log('distance',distance)
                        console.log('rect',rect)
                        console.log('开始缩放====end====') */
                        _this.viewStore._operaModel = 'resizable';
                        _this.viewStore.computedResizable.enabled = true;
                        _this.viewStore.computedResizable.direction = direction;
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
    Object.defineProperty(ProModal.prototype, "getModalContentDOM", {
        get: function () {
            if (this.getModalDOM) {
                return this.getModalDOM.querySelector("." + antPrefix + "-modal-content");
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProModal.prototype, "getModalHeaderDOM", {
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
    ProModal.prototype.setModalDOM = function () {
        if (!this.getModalDOM) {
            this.getModalDOM = document.querySelector("." + this.uid);
        }
    };
    /** 取消拖拽缩放模态框尺寸事件 */
    ProModal.prototype.unbindingResizableEven = function () {
        var modalDOM = this.getModalDOM;
        if (modalDOM) {
            if (this.getModalContentDOM) {
                off(this.getModalContentDOM, 'mousedown', this.handleResizableMouseStart);
            }
        }
    };
    ProModal.prototype.unbindingDraggableMousemoveEven = function () {
        off(window, 'mousemove', this.handleDraggableMoveMove);
    };
    ProModal.prototype.unbindingDraggableMouseupEven = function () {
        off(window, 'mouseup', this.handleDraggableMoveEnd);
    };
    ProModal.prototype.bindingDraggableMousemoveEven = function () {
        on(window, 'mousemove', this.handleDraggableMoveMove);
    };
    ProModal.prototype.bindingDraggableMouseupEven = function () {
        on(window, 'mouseup', this.handleDraggableMoveEnd);
    };
    /** window对象上绑定拖拽缩放 鼠标移动事件
     * 在触发handleResizableMouseStart即 mousedown 鼠标键在modal-content区域移动时进行绑定事件
     */
    ProModal.prototype.bindingResizableMoveMoveEven = function () {
        on(window, 'mousemove', this.handleResizableMoveMove);
    };
    /** window对象上绑定拖拽缩放 鼠标按键释放事件,
     * 在触发handleResizableMouseStart即 mousedown 鼠标键在modal-content区域按下时进行绑定事件*/
    ProModal.prototype.bindingResizableMouseupEven = function () {
        on(window, 'mouseup', this.handleResizableMoveEnd);
    };
    /** 模态框头部绑定拖拽移动事件 */
    ProModal.prototype.bindingDraggableHeaderMousedownEven = function () {
        if (!this.isBinddraggableEven && this.props.draggable && this.viewStore._operaModel !== 'maximize') {
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
    ProModal.prototype.bindingResizableContentEven = function () {
        if (this.getModalDOM && this.props.resizable && this.viewStore._operaModel !== 'maximize') {
            this.setAntdContentLocation({ modalDOM: this.getModalDOM, modalContent: this.getModalContentDOM });
            if (!this.isBindResizableEven) {
                this.isBindResizableEven = true;
            }
        }
    };
    ProModal.prototype.createZoomable = function () {
        var _this = this;
        var modalNode = this.getModalDOM;
        if (modalNode) {
            var antdModal_1 = modalNode.querySelector('.ant-modal');
            if (antdModal_1 && this.props.resizable) {
                var createZoomabNode = function (direction) {
                    var div = document.createElement('div');
                    div.setAttribute('class', "zoom-bar " + direction + "-bar");
                    _this[direction + "BarNode"] = div;
                    antdModal_1.appendChild(_this[direction + "BarNode"]);
                    on(_this[direction + "BarNode"], 'mousedown', _this.handleResizableMouseStart.bind(_this, direction));
                };
                if (!antdModal_1.querySelector('.left-bar')) {
                    createZoomabNode('left');
                }
                if (!antdModal_1.querySelector('.right-bar')) {
                    createZoomabNode('right');
                }
                if (!antdModal_1.querySelector('.bottom-bar')) {
                    createZoomabNode('bottom');
                }
            }
        }
    };
    ProModal.prototype.componentWillMount = function () {
        this.uid = "m" + this.props.store.ModalContainer.size + shortHash("" + this.timeId + this.props.store.ModalContainer.size);
        if (this.props.store.ModalContainer.has(this.uid)) {
            this.timeId = new Date().getTime();
            this.uid = "m" + this.props.store.ModalContainer.size + shortHash("" + this.timeId + this.props.store.ModalContainer.size);
        }
        this.props.store.add(this.uid);
        this.viewStore = this.props.store.ModalContainer.get(this.uid);
        this.viewStore._placement = this.props.placement;
        var view = this.props.store.ModalContainer.get(this.uid);
        if (this.props.draggable) {
            this.subscription = this.props.store.schedule([this.log.bind(this)]);
        }
        this.subscriptionVisible = this.props.store.schedule([this.watchVisibleChange.bind(this)]);
        this.props.onReady && this.props.onReady({ store: this.props.store, uid: this.uid, viewModel: view });
        this.viewStore._modalType = this.props.modalType;
    };
    ProModal.prototype.componentDidMount = function () {
        this.setModalDOM();
        this.setModalContentInsertMaximize();
        this.clientHeight = document.body.clientHeight;
        this.clientWidth = document.body.clientWidth;
        this.bindingDraggableHeaderMousedownEven();
        this.bindingResizableContentEven();
        this.props.footer === null ? (this.viewStore._footerHeight = 0) : (this.viewStore._footerHeight = 53);
    };
    ProModal.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.placement !== nextProps.placement && this.viewStore && nextProps.placement) {
            this.viewStore._placement = nextProps.placement;
        }
    };
    ProModal.prototype.componentDidUpdate = function () {
        this.setModalDOM();
        this.setModalContentInsertMaximize();
        this.renderMaximize();
        this.bindingDraggableHeaderMousedownEven();
        this.bindingResizableContentEven();
        this.props.footer === null ? (this.viewStore._footerHeight = 0) : (this.viewStore._footerHeight = 53);
    };
    ProModal.prototype.componentWillUnmount = function () {
        this.props.store.delete(this.uid);
        this.subscription && this.subscription.unsubscribe();
        this.subscriptionVisible && this.subscriptionVisible.unsubscribe();
        this.destroyPortal();
        this.unbindingResizableEven();
        if (this.getModalHeaderDOM) {
            this.getModalHeaderDOM.removeEventListener('mousedown', this.handleDraggableMoveStart.bind(this));
        }
    };
    /** 销毁最大化按钮节点 */
    ProModal.prototype.destroyPortal = function () {
        if (this.nodeMaximize) {
            unmountComponentAtNode(this.nodeMaximize);
        }
    };
    /** 插入最大化按钮dom */
    ProModal.prototype.setModalContentInsertMaximize = function () {
        if (!this.nodeMaximize && this.props.modalType === 'fullscreen') { // 如果开启了全屏模式
            if (this.getModalDOM && this.getModalContentDOM) {
                /* this.modalContent = this.getModalContentDOM; */
                var button = document.createElement('botton');
                button.setAttribute('class', 'modalMaximize');
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
    ProModal.prototype.renderMaximize = function () {
        var _this = this;
        if (this.nodeMaximize) {
            unstable_renderSubtreeIntoContainer(this, //代表当前组件
            React.createElement("img", { src: this.viewStore._operaModel === 'maximize' ? undoSrc : maximizeSrc, onClick: function (even) {
                    runInAction(function () {
                        if (_this.viewStore._operaModel === 'maximize') {
                            _this.viewStore._operaModel = 'reduction'; // 还原
                        }
                        else {
                            _this.viewStore._operaModel = 'maximize'; // 全屏
                        }
                        if (_this.viewStore._operaModel === 'reduction') {
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
    ProModal.prototype.renderModalContent = function () {
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
    ProModal.prototype.setModadlContentInsertElement = function () {
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
    ProModal.prototype.setAntdContentLocation = function (options) {
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
        }
    };
    /**
     * 拖拽移动开始事件
     *
     * @param {MouseEvent} event
     * @memberof HLModal
     */
    ProModal.prototype.handleDraggableMoveStart = function (event) {
        var _this = this;
        if (this.getModalDOM && this.viewStore._operaModel !== 'maximize') {
            if (this.getModalContentDOM) {
                var rect_2 = this.getModalContentDOM.getBoundingClientRect();
                runInAction(function () {
                    _this.viewStore._dragData.x = rect_2.x || rect_2.left;
                    _this.viewStore._dragData.y = rect_2.y || rect_2.top;
                    var distance = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    _this.viewStore._dragData.dragX = distance.x;
                    _this.viewStore._dragData.dragY = distance.y;
                    _this.viewStore._dragData.dragging = true;
                    _this.viewStore._operaModel = 'draggable';
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
    ProModal.prototype.coverOverfolwTranformAutoOverflow = function () {
        if (this.props.draggable && this.viewStore.visible) {
            var modalbody = document.querySelector('body');
            var classNames = modalbody.getAttribute('class') || '';
            if (this.viewStore.visible && classNames.indexOf('legions-pro-modal-body-autoOverflow') < 0) {
                modalbody.setAttribute('class', classNames + " legions-pro-modal-body-autoOverflow");
            }
        }
    };
    ProModal.prototype.handleCancel = function (even) {
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
            this.props.store.close(this.uid);
            this.props.onCancel && this.props.onCancel(even);
        }
    };
    ProModal.prototype.handleOnOk = function (even) {
        var onOk = this.props.onOk;
        onOk && onOk(even);
    };
    ProModal.prototype.render = function () {
        var instance = this.viewStore;
        var DrawerBodyHeight = this.props.footer === null ? '94%' : '89%';
        var draggingMouseStyles = ''; // 拖拽移动鼠标样式
        var draggableStyles = {};
        var draggableMaskProps = {};
        var drawerMaskProps = {};
        var defultZoomableProps = {};
        if (this.props.draggable && this.viewStore._operaModel !== 'maximize') {
            draggableStyles = this.viewStore.computedDraggableContentStyles;
            draggableMaskProps = {
                mask: false,
                maskClosable: false,
            };
            draggingMouseStyles = this.viewStore._dragData.dragging ? 'legions-pro-modal-content-dragging' : 'legions-pro-modal-content-drag';
        }
        if (this.props.modalType === 'drawer' && this.props.resizable) {
            drawerMaskProps = {
                maskClosable: false,
            };
        }
        if (this.props.resizable) {
            defultZoomableProps = {
                mask: true,
            };
        }
        var drawerStyles = Object.assign(__assign({}, this.props.style), { paddingBottom: '0px' }, placement[this.props.placement], this.viewStore.computedResizableContentStyles);
        return (this.props.modalType === 'drawer' ? React.createElement(Modal, __assign({ width: (this.props.placement === 'top' || this.props.placement === 'bottom') ? '100%' : this.viewStore.width }, defultZoomableProps, this.props, drawerMaskProps, { bodyStyle: __assign({ height: DrawerBodyHeight, overflow: 'auto' }, this.viewStore.computedMaximizeBodyStyle), style: drawerStyles, wrapClassName: this.uid + " " + DrawerPositionWrap[this.props.placement] + " " + (this.props.wrapClassName || ''), title: this.viewStore.title, visible: this.viewStore.visible, onCancel: this.handleCancel, onOk: this.handleOnOk, okText: this.viewStore.okText, cancelText: this.viewStore.cancelText, confirmLoading: this.viewStore.confirmLoading }), this.props.children) :
            React.createElement(Modal, __assign({ width: (this.viewStore._operaModel === 'maximize') ? '100%' : this.viewStore.width }, defultZoomableProps, this.props, draggableMaskProps, { style: Object.assign(this.props.style || {}, draggableStyles, this.viewStore.computedMaximizeContentStyles, this.viewStore.computedResizableContentStyles), bodyStyle: Object.assign(this.props.bodyStyle || {}, this.viewStore.computedMaximizeBodyStyle), wrapClassName: this.uid + " legions-pro-modal " + (this.props.wrapClassName || '') + " " + draggingMouseStyles, title: this.viewStore.title, visible: this.viewStore.visible, onCancel: this.handleCancel, onOk: this.handleOnOk, okText: this.viewStore.okText, cancelText: this.viewStore.cancelText, confirmLoading: this.viewStore.confirmLoading }), this.props.children));
    };
    ProModal.defaultProps = {
        modalType: 'modal',
        placement: 'left',
        draggable: false,
        resizable: false,
    };
    ProModal.LegionsProModalContext = LegionsProModalContext;
    ProModal = __decorate([
        bind({ store: ProModalStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], ProModal);
    return ProModal;
}(Component));
var LegionsProModal = function (props) {
    var children = props.children, prop = __rest(props, ["children"]);
    return React.createElement(ProModal.LegionsProModalContext, { content: React.createElement(React.Fragment, null, children) },
        React.createElement(ProModal, __assign({}, prop)));
};

export default LegionsProModal;
