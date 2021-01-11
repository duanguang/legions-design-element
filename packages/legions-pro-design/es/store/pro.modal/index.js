/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { StoreBase } from '../index';
import { observable, action, StoreModules } from 'legions/store';
import { observableViewModel } from 'legions/store-utils';
import { computed } from 'mobx';

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

var ModalView = /** @class */ (function () {
    function ModalView() {
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
        this.dragData = {
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
        this.resizable = {
            enabled: false,
            direction: '',
        };
        this.resizableData = {
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
        this.oldResizableBodyStyle = null;
        this.oldResizableContentStyle = null;
        /**
         *
         * 模态框操作模式，
         * 拖拽，缩放，最大化，还原
         */
        this.operaModel = 'null';
        //@ts-ignore
        this.placement = null;
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
            if (this.dragData.x !== null)
                style['left'] = this.dragData.x - customLeft + "px";
            if (this.dragData.y !== null)
                style['top'] = this.dragData.y + "px";
            if (this.dragData.y !== null)
                style['top'] = this.dragData.y - customTop + "px";
            return style;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalView.prototype, "computedResizable", {
        get: function () {
            return this.resizable;
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
            //@ts-ignore
            var style = __assign({}, this.oldResizableBodyStyle) || {};
            if (this.resizableData.resizableY !== null &&
                this.resizableData.resizable) {
                var header = 48;
                var footer = 53;
                if (this.computedResizable.direction === 'bottom') {
                    // 在底部边框线缩放时，计算body区域高度值
                    var height = this.resizableData.resizableY -
                        header -
                        footer -
                        this.resizableData.top;
                    style['height'] = height + "px";
                }
                if (this.computedResizable.direction === 'top') {
                    // 在顶部边框缩放大小时，计算内容区body部分高度值
                    var height = this.resizableData.bottom - this.resizableData.top - header - footer;
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
            if (this.operaModel === 'maximize') {
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
            //@ts-ignore
            var style = __assign({}, this.oldResizableContentStyle) || {};
            if (this.resizableData.resizableY !== null &&
                this.resizableData.resizable) {
                if (this.computedResizable.direction === 'top' &&
                    this.resizableData.top !== null) {
                    // 在顶部边框缩放大小时，调整上边距大小
                    style['top'] = this.resizableData.top + "px";
                }
                if (this.computedResizable.direction === 'left') {
                    /* const width = this.resizableData.right - this.resizableData.resizableX; */
                    if (this.placement !== 'right') {
                        style['left'] = this.resizableData.resizableX + "px";
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
            if (this.operaModel === 'resizable') {
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
            if (this.operaModel === 'maximize') {
                var height = document.body.clientHeight - 48 - this._footerHeight;
                return Object.assign(__assign({}, this.computedBodyStyle), { height: height + "px", overflow: 'auto' });
            }
            return this.computedBodyStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalView.prototype, "computedResizableClasses", {
        /**
         * 拖拽缩放图标样式
         *
         * @readonly
         * @type {string}
         * @memberof ModalView
         */
        get: function () {
            var style = {
                upperLeft: 'legions-pro-modal-nwse-resizable',
                lowRight: 'legions-pro-modal-nwse-resizable',
                upperRight: 'legions-pro-modal-nesw-resizable',
                leftLower: 'legions-pro-modal-nesw-resizable',
                top: 'legions-pro-modal-ns-resizable',
                bottom: 'legions-pro-modal-ns-resizable',
                left: 'legions-pro-modal-ew-resizable',
                right: 'legions-pro-modal-ew-resizable',
            };
            //@ts-ignore
            return style[this.computedResizable.direction] || '';
        },
        enumerable: false,
        configurable: true
    });
    ModalView.prototype.asyncResizableBodyStyle = function (options) {
        var style = {};
        var header = 48;
        var footer = 53;
        if (!this.oldResizableContentStyle) {
            //@ts-ignore
            this.oldResizableContentStyle = {};
        }
        if (this.resizableData.top !== null) {
            //@ts-ignore
            this.oldResizableContentStyle['top'] = this.resizableData.top + "px";
            this.dragData.y = this.resizableData.top; // 同步坐标回拖拽坐标数据，防止在进行拖拽时，位置不一致，出现闪回动作
        }
        if (this.computedResizable.direction === 'left') {
            if (options &&
                options.modalType === 'Drawer' &&
                options.placement === 'right') {
                this.width = document.body.clientWidth - this.resizableData.resizableX;
            }
            else {
                this.width = this.resizableData.right - this.resizableData.resizableX;
                //@ts-ignore
                this.oldResizableContentStyle['left'] = this.resizableData.resizableX + "px";
            }
            this.dragData.x = this.resizableData.resizableX; // 同步坐标回拖拽坐标数据，防止在进行拖拽时，位置不一致，出现闪回动作
        }
        if (this.computedResizable.direction === 'right') {
            this.width = this.resizableData.resizableX - this.resizableData.left;
            this.dragData.x = this.resizableData.left;
        }
        if (this.computedResizable.direction === 'top' ||
            this.computedResizable.direction === 'bottom') {
            var height = this.resizableData.resizableY -
                header -
                footer -
                this.resizableData.top;
            style['height'] = height + "px";
            //@ts-ignore
            this.oldResizableBodyStyle = style;
        }
    };
    /**
     * 当执行拖拽时需要把坐标同步到缩放坐标数据
     * 在拖拽移动结束时触发
     */
    ModalView.prototype.asyncResizableData = function () {
        this.resizableData.top = this.dragData.y;
        this.resizableData.resizableX = this.dragData.x;
        this.resizableData.left = this.dragData.x;
        if (this.oldResizableContentStyle) {
            //@ts-ignore
            this.oldResizableContentStyle['top'] = this.dragData.y;
            //@ts-ignore
            this.oldResizableContentStyle['left'] = this.dragData.x;
        }
    };
    ModalView.prototype.updateEnabledResizable = function (resizable) {
        if (resizable.enabled !== undefined) {
            this.resizable.enabled = resizable.enabled;
        }
        if (resizable.direction !== void 0) {
            this.resizable.direction = resizable.direction;
        }
    };
    /**
     * 重置模态框位置，回到居中状态
     *
     * @memberof ModalView
     */
    ModalView.prototype.resetDragLocationData = function () {
        var width = document.body.clientWidth;
        var left = (width - this.width) / 2;
        this.dragData = {
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
        __metadata("design:type", Object)
    ], ModalView.prototype, "title", void 0);
    __decorate([
        observable.ref,
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
        __metadata("design:type", Object)
    ], ModalView.prototype, "dragData", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "resizable", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "resizableData", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "oldResizableBodyStyle", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ModalView.prototype, "oldResizableContentStyle", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ModalView.prototype, "operaModel", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], ModalView.prototype, "placement", void 0);
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
        computed,
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], ModalView.prototype, "computedResizableClasses", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ModalView.prototype, "asyncResizableBodyStyle", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ModalView.prototype, "asyncResizableData", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ModalView.prototype, "updateEnabledResizable", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ModalView.prototype, "resetDragLocationData", null);
    return ModalView;
}());

var ProModalStore = /** @class */ (function (_super) {
    __extends(ProModalStore, _super);
    function ProModalStore(context) {
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
    ProModalStore.prototype.open = function (title, width) {
    };
    /**
     * 关闭模态对话框
     *
     * @memberof ModalStore
     */
    ProModalStore.prototype.close = function (uid) {
        //@ts-ignore
        this.ModalContainer.get(uid).visible = false;
    };
    ProModalStore.prototype.showModal = function (uid) {
        //@ts-ignore
        this.ModalContainer.get(uid).visible = true;
    };
    ProModalStore.prototype.add = function (uid) {
        this.ModalContainer.set(uid, observableViewModel(new ModalView()));
    };
    ProModalStore.prototype.delete = function (uid) {
        this.ModalContainer.delete(uid);
    };
    ProModalStore.meta = __assign({}, StoreBase.meta);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], ProModalStore.prototype, "ModalContainer", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ProModalStore.prototype, "open", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProModalStore.prototype, "close", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProModalStore.prototype, "showModal", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProModalStore.prototype, "add", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProModalStore.prototype, "delete", null);
    ProModalStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], ProModalStore);
    return ProModalStore;
}(StoreBase));

export { ProModalStore };
