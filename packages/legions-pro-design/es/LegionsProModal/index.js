/**
  *  legions-pro-design v0.0.25
  * (c) 2022 duanguang
  * @license MIT
  */
import React, { Component } from 'react';
import { unmountComponentAtNode, unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Modal } from 'antd';
import { bind, observer } from 'legions/store-react';
import LegionsStore from '../LegionsStore';
import { observable, action, StoreModules, getInjector } from 'legions/store';
import { observableViewModel } from 'legions/store-utils';
import { computed, runInAction } from 'mobx';
import { shortHash } from 'legions-lunar/object-hash';
import './style/index.less';
import { MobXProviderContext, Provider } from 'mobx-react';

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
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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

var ModalView = /** @class */ (function () {
    function ModalView() {
        this._modalType = 'modal';
        /**
         * 模态框标题
         *
         * @memberof ModalView
         */
        this.title = '';
        /**
         * 模态框是否可见
         *
         * @memberof ModalView
         */
        this.visible = false;
        /**
         * 模态框宽度
         *
         * @memberof ModalView
         */
        this.width = 520;
        /**
         *
         *确认按钮文字
         * @memberof ModalView
         */
        this.okText = '确定';
        /**
         *
         * 取消按钮文字
         * @memberof ModalView
         */
        this.cancelText = '取消';
        /**
         * 是否启用取消确认按钮
         *
         * @memberof ModalView
         */
        this.cancelConfirm = false;
        /**
         *确定按钮 loading
         *
         * @memberof ModalView
         */
        //@ts-ignore
        this.confirmLoading = null;
        /** 扩展数据，可用于存储模态框数据，使用场景，譬如模态框内容区动态控制，可以把条件存储在扩展数据体 */
        this.extendData = '';
        this._dragData = {
            //@ts-ignore
            x: null,
            //@ts-ignore
            y: null,
            //@ts-ignore
            dragX: null,
            //@ts-ignore
            dragY: null,
            dragging: false,
        };
        /**
         * 启用或者禁用拖拽
         *
         * @private
         * @type {boolean}
         * @memberof ModalView
         */
        this._resizable = {
            enabled: false,
            direction: '',
        };
        this._resizableData = {
            //@ts-ignore
            x: null,
            //@ts-ignore
            y: null,
            //@ts-ignore
            resizableX: null,
            //@ts-ignore
            resizableY: null,
            resizable: false,
            //@ts-ignore
            top: null,
            //@ts-ignore
            bottom: null,
            //@ts-ignore
            right: null,
            //@ts-ignore
            left: null,
        };
        /** 拖拽缩放时产生的高度在modal-body生效的样式 */
        this._oldResizableBodyStyle = null;
        this._oldResizableContentStyle = null;
        /**
         *
         * 模态框操作模式，
         * 拖拽，缩放，最大化，还原
         */
        this._operaModel = 'null';
        this._placement = null;
        /**
         * 底部高度，组件外部请勿直接修改其值
         *
         * @memberof ModalView
         */
        this._footerHeight = 0;
    }
    Object.defineProperty(ModalView.prototype, "computedDraggableContentStyles", {
        /** 拖拽移动样式信息 */
        get: function () {
            var style = {};
            var customTop = 0;
            var customLeft = 0;
            if (this._dragData.x !== null)
                style['left'] = this._dragData.x - customLeft + "px";
            if (this._dragData.y !== null)
                style['top'] = this._dragData.y + "px";
            if (this._dragData.y !== null)
                style['top'] = this._dragData.y - customTop + "px";
            return style;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalView.prototype, "computedResizable", {
        get: function () {
            return this._resizable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalView.prototype, "computedBodyStyle", {
        /**
         * 模态框大小缩放时 ，body 内容区样式值
         *
         * @readonly
         * @memberof ModalView
         */
        get: function () {
            var style = __assign({}, this._oldResizableBodyStyle) || {};
            if (this._resizableData.resizableY !== null &&
                this._resizableData.resizable) {
                var header = 48;
                var footer = 53;
                if (this.computedResizable.direction === 'bottom') {
                    // 在底部边框线缩放时，计算body区域高度值
                    var height = this._resizableData.resizableY -
                        header -
                        footer -
                        this._resizableData.top;
                    style['height'] = height + "px";
                }
                if (this.computedResizable.direction === 'top') {
                    // 在顶部边框缩放大小时，计算内容区body部分高度值
                    var height = this._resizableData.bottom - this._resizableData.top - header - footer;
                    style['height'] = height + "px";
                }
            }
            return style;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalView.prototype, "computedMaximizeContentStyles", {
        /** 模态框最大化时样式数据 */
        get: function () {
            if (this._operaModel === 'maximize') {
                return { width: '100%', top: '0px', left: '0px', paddingBottom: '0px' };
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalView.prototype, "computedResizableContentTopStyles", {
        /**
         * 模态框大小缩放时，上边距样式值
         */
        get: function () {
            var style = __assign({}, this._oldResizableContentStyle) || {};
            if (this._resizableData.resizableY !== null &&
                this._resizableData.resizable) {
                if (this.computedResizable.direction === 'top' &&
                    this._resizableData.top !== null) {
                    // 在顶部边框缩放大小时，调整上边距大小
                    style['top'] = this._resizableData.top + "px";
                }
                if (this.computedResizable.direction === 'left' && this._modalType !== 'drawer') { //非抽屉模式 以左侧为焦点，向右缩放
                    if (this._placement !== 'right') { // 如果抽屉方向是非右侧，则以左侧为中心轴，进行缩放
                        style['left'] = this._resizableData.resizableX + "px";
                    }
                    else if (this._placement === 'right') {
                        style['right'] = this._resizableData.right + "px"; // 如果抽屉方向右侧，则以右侧方向为中心轴，进行缩放
                    }
                }
            }
            return style;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalView.prototype, "computedResizableContentStyles", {
        /** 模态框拖拽缩放大小样式数据 */
        get: function () {
            if (this._operaModel === 'resizable') {
                return this.computedResizableContentTopStyles;
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalView.prototype, "computedMaximizeBodyStyle", {
        /**** 模态框最大化时模态框内部body部分样式数据 */
        get: function () {
            if (this._operaModel === 'maximize') {
                var height = document.body.clientHeight - 48 - this._footerHeight;
                return Object.assign(__assign({}, this.computedBodyStyle), { height: height + "px", overflow: 'auto' });
            }
            return this.computedBodyStyle;
        },
        enumerable: false,
        configurable: true
    });
    ModalView.prototype._asyncResizableBodyStyle = function (options) {
        var style = {};
        var header = 48;
        var footer = 53;
        if (!this._oldResizableContentStyle) {
            this._oldResizableContentStyle = {};
        }
        if (this._resizableData.top !== null) {
            this._oldResizableContentStyle['top'] = this._resizableData.top + "px";
            this._dragData.y = this._resizableData.top; // 同步坐标回拖拽坐标数据，防止在进行拖拽时，位置不一致，出现闪回动作
        }
        if (this.computedResizable.direction === 'left') {
            if (options &&
                options.modalType === 'drawer' &&
                options.placement === 'right') {
                this.width = document.body.clientWidth - this._resizableData.resizableX;
            }
            else {
                this.width = this._resizableData.right - this._resizableData.resizableX;
                this._oldResizableContentStyle['left'] = this._resizableData.resizableX + "px";
            }
            this._dragData.x = this._resizableData.resizableX; // 同步坐标回拖拽坐标数据，防止在进行拖拽时，位置不一致，出现闪回动作
        }
        if (this.computedResizable.direction === 'right') {
            this.width = this._resizableData.resizableX - this._resizableData.left;
            this._dragData.x = this._resizableData.left;
        }
        if (this.computedResizable.direction === 'top' ||
            this.computedResizable.direction === 'bottom') {
            var height = this._resizableData.resizableY -
                header -
                footer -
                this._resizableData.top;
            style['height'] = height + "px";
            style['overflow'] = 'auto';
            this._oldResizableBodyStyle = style;
        }
    };
    /**
     * 当执行拖拽时需要把坐标同步到缩放坐标数据
     * 在拖拽移动结束时触发
     */
    ModalView.prototype._asyncResizableData = function () {
        this._resizableData.top = this._dragData.y;
        this._resizableData.resizableX = this._dragData.x;
        this._resizableData.left = this._dragData.x;
        if (this._oldResizableContentStyle) {
            this._oldResizableContentStyle['top'] = this._dragData.y;
            this._oldResizableContentStyle['left'] = this._dragData.x;
        }
    };
    ModalView.prototype._updateEnabledResizable = function (resizable) {
        if (resizable.enabled !== undefined) {
            this._resizable.enabled = resizable.enabled;
        }
        if (resizable.direction !== void 0) {
            this._resizable.direction = resizable.direction;
        }
    };
    /**
     * 重置模态框位置，回到居中状态
     *
     * @memberof ModalView
     */
    ModalView.prototype._resetDragLocationData = function () {
        var width = document.body.clientWidth;
        var left = (width - this.width) / 2;
        this._dragData = {
            x: left,
            //@ts-ignore
            y: null,
            //@ts-ignore
            dragX: null,
            //@ts-ignore
            dragY: null,
            dragging: false,
        };
    };
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ModalView.prototype, "_modalType", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "title", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "visible", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "width", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "okText", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "cancelText", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "cancelConfirm", void 0);
    __decorate([
        observable,
        __metadata("design:type", Boolean)
    ], ModalView.prototype, "confirmLoading", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ModalView.prototype, "extendData", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "_dragData", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "_resizable", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "_resizableData", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "_oldResizableBodyStyle", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "_oldResizableContentStyle", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ModalView.prototype, "_operaModel", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ModalView.prototype, "_placement", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "_footerHeight", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ModalView.prototype, "computedDraggableContentStyles", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ModalView.prototype, "computedResizable", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ModalView.prototype, "computedBodyStyle", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ModalView.prototype, "computedMaximizeContentStyles", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ModalView.prototype, "computedResizableContentTopStyles", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ModalView.prototype, "computedResizableContentStyles", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ModalView.prototype, "computedMaximizeBodyStyle", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ModalView.prototype, "_asyncResizableBodyStyle", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ModalView.prototype, "_asyncResizableData", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ModalView.prototype, "_updateEnabledResizable", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ModalView.prototype, "_resetDragLocationData", null);
    return ModalView;
}());

var ModalStore = /** @class */ (function (_super) {
    __extends(ModalStore, _super);
    function ModalStore(context) {
        var _this = _super.call(this, context) || this;
        _this.ModalContainer = observable.map();
        return _this;
    }
    /**
     *
     * 打开 Modal 模态对话框。
     * @param {*} title
     * @param {number} [width=520]
     * @memberof ModalStore
     */
    ModalStore.prototype.open = function (title, width) {
    };
    /**
     * 关闭模态对话框
     *
     * @memberof ModalStore
     */
    ModalStore.prototype.close = function (uid) {
        //@ts-ignore
        this.ModalContainer.get(uid).visible = false;
    };
    ModalStore.prototype.showModal = function (uid) {
        //@ts-ignore
        this.ModalContainer.get(uid).visible = true;
    };
    ModalStore.prototype.add = function (uid) {
        this.ModalContainer.set(uid, observableViewModel(new ModalView()));
    };
    ModalStore.prototype.delete = function (uid) {
        this.ModalContainer.delete(uid);
    };
    ModalStore.meta = __assign({}, LegionsStore.StoreBase.meta);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalStore.prototype, "ModalContainer", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ModalStore.prototype, "open", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ModalStore.prototype, "close", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ModalStore.prototype, "showModal", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ModalStore.prototype, "add", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ModalStore.prototype, "delete", null);
    ModalStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], ModalStore);
    return ModalStore;
}(LegionsStore.StoreBase));

var ProModalContext = /** @class */ (function (_super) {
    __extends(ProModalContext, _super);
    function ProModalContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProModalContext.prototype.renderMobXProviderContext = function () {
        var _this = this;
        return React.createElement(MobXProviderContext.Consumer, null, function (context) {
            // @ts-ignore
            return React.cloneElement(_this.props.modal || _this.props.children, null, React.createElement(Provider, { storeManage: context.storeManage },
                " ",
                _this.props.content));
        });
    };
    ProModalContext.prototype.renderContextType = function () {
        return React.cloneElement(this.props.modal || this.props.children, null, React.createElement(Provider, { storeManage: this.context.storeManage['getState'] ? this.context.storeManage : getInjector() },
            " ",
            this.props.content));
    };
    ProModalContext.prototype.render = function () {
        return (this.renderContextType());
    };
    return ProModalContext;
}(React.Component));
ProModalContext.contextType = MobXProviderContext;

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
var watchVisibleChange = null;
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
            if (watchVisibleChange) {
                watchVisibleChange(visible);
                watchVisibleChange = null;
            }
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
        this.props.onReady && this.props.onReady({
            store: this.props.store,
            uid: this.uid,
            viewModel: view,
            methods: {
                watchVisibleChange: function (callback) {
                    watchVisibleChange = callback;
                }
            }
        });
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
    ProModal.ProModalContext = ProModalContext;
    ProModal = __decorate([
        bind({ store: ModalStore }),
        observer,
        __metadata("design:paramtypes", [Object])
    ], ProModal);
    return ProModal;
}(Component));
var LegionsProModal = function (props) {
    var children = props.children, prop = __rest(props, ["children"]);
    return React.createElement(ProModal.ProModalContext, { content: React.createElement(React.Fragment, null, children) },
        React.createElement(ProModal, __assign({}, prop)));
};
LegionsProModal['store'] = ModalStore;

export default LegionsProModal;
