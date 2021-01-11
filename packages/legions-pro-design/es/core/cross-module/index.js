/**
  *  legions-pro-design v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import { initGlobalState } from 'legions-micro-service';
import { postMessage } from 'legions-utils-tool/dom';
import Store, { resource, Lifecycle, StoreModules, inject } from 'legions/store';
import { schedule } from 'legions-lunar/schedule';
import { ProTableStore } from '../../store/pro.table';

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

/*
 * @Author: duanguang
 * @Date: 2021-01-04 11:17:55
 * @LastEditTime: 2021-01-06 13:49:13
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/core/cross-module/globalStateEven.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
function findWindow(name) {
    var LegionstValue = null;
    try {
        LegionstValue = window[name];
    }
    catch (e) {
        LegionstValue = null;
    }
    if (!LegionstValue) {
        LegionstValue = window.parent[name];
    }
    return LegionstValue;
}
function sendMessageToParentWin(options) {
    postMessage.sendMessageToParentWin(options);
}
function sendMessageToChildrenWin(options) {
    postMessage.sendMessageToChildrenWin(options);
}
var IframePostMessage = {
    sendMessageToParentWin: sendMessageToParentWin,
    sendMessageToChildrenWin: sendMessageToChildrenWin,
    receiveMessage: postMessage.receiveMessage
};
/** 订阅子应用iframe挂载在全局的变量 */
function subscribeLegionsProGlobal(callback) {
    if (typeof callback === 'function') {
        var value_1 = findWindow('LegionsProGlobal');
        if (value_1) {
            //@ts-ignore
            callback(value_1);
        }
        else {
            var count_1 = 0;
            var timeid_1 = setInterval(function () {
                value_1 = findWindow('LegionsProGlobal');
                count_1++;
                if (value_1 && count_1 <= 60) {
                    count_1 = 0;
                    //@ts-ignore
                    callback(value_1);
                    clearInterval(timeid_1);
                }
                if (count_1 > 60) {
                    count_1 = 0;
                    console.error('获取全局数据超时,可能没找到，请检查全局是否存在!');
                    clearInterval(timeid_1);
                }
            }, 400);
        }
    }
}
var userEvent = resource('master/resource/user');
var masterEventScopes = {
    userEvent: userEvent
};

/**  菜单折叠事件分发*/
var CollapsedResource = resource('Menu/resource/collapsed'); // index.d.ts
/** 管理菜单及页签缓存事件 */
var MenuPanesStorageResource = resource('storage/resource/menu/tabPanes');
/**  面包屑事件分发器*/
var BreadCrumbsResourceEven = resource('Menu/resource/BreadCrumbs');
var project = {
    name: 'portal'
};

/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:23:17
 * @LastEditTime: 2021-01-07 17:34:42
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/StoreBase.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var StoreBase = /** @class */ (function (_super) {
    __extends(StoreBase, _super);
    function StoreBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //@ts-ignore
        _this.history = _this.context._manage.history;
        return _this;
    }
    /**
     *
     * 订阅数据，在数据变化时，可以处理一些副作用，当你不需要监听时，请及时调用取消调用进行销毁
     * @param {...Array<any>} funcs 数组内第一个参数一定为函数类型
     * @returns {Array<Function>}
     * @memberof StoreBase
     */
    StoreBase.prototype.schedule = function () {
        var funcs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            funcs[_i] = arguments[_i];
        }
        return schedule.apply(void 0, __spread(funcs));
    };
    StoreBase.meta = __assign(__assign({}, Store.meta), { namespace: project.name });
    return StoreBase;
}(Store));

var UiStoreBase = /** @class */ (function (_super) {
    __extends(UiStoreBase, _super);
    function UiStoreBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiStoreBase.meta = __assign(__assign({}, StoreBase.meta), { namespace: StoreBase.meta.namespace + ".ui", lifecycle: Lifecycle.History });
    return UiStoreBase;
}(StoreBase));

/** 主应用全局数据基类
 * 只在主应用调用
 */
var MasterGlobalStateStore = /** @class */ (function (_super) {
    __extends(MasterGlobalStateStore, _super);
    function MasterGlobalStateStore(context) {
        var _this = _super.call(this, context) || this;
        //@ts-ignore
        _this.onGlobalStateChange = null;
        //@ts-ignore
        _this.setGlobalState = null;
        _this.openTabPane = function () { };
        _this.removeTablePane = function () { };
        _this.menuList = [];
        /** 订阅子应用iframe挂载在全局的变量 */
        _this.iframePostMessage = IframePostMessage;
        _this.masterEventScopes = masterEventScopes;
        var _a = initGlobalState({
            user: null,
        }), onGlobalStateChange = _a.onGlobalStateChange, setGlobalState = _a.setGlobalState, offGlobalStateChange = _a.offGlobalStateChange;
        //@ts-ignore
        _this.onGlobalStateChange = onGlobalStateChange;
        _this.setGlobalState = setGlobalState;
        return _this;
    }
    MasterGlobalStateStore.prototype.listeningGlobalStateChange = function (options) {
        this.onGlobalStateChange(function (value, prev, event) {
            if (options.callback && typeof options.callback === 'function') {
                options.callback(value, prev, event);
            }
            if (process.env.NODE_ENV !== 'production') {
                console.log('[onGlobalStateChange - master]:', value, prev, event);
            }
        }, {
            eventScopes: options.eventScopes,
        });
    };
    MasterGlobalStateStore.prototype.setUserGlobalState = function (state) {
        this.setGlobalState({
            user: state,
        }, this.masterEventScopes.userEvent.created);
    };
    MasterGlobalStateStore.meta = __assign({}, StoreBase.meta);
    MasterGlobalStateStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], MasterGlobalStateStore);
    return MasterGlobalStateStore;
}(StoreBase));

/** 子应用全局数据基类 */
var WorkerGlobalStateStore = /** @class */ (function (_super) {
    __extends(WorkerGlobalStateStore, _super);
    function WorkerGlobalStateStore(context) {
        var _this = _super.call(this, context) || this;
        _this.onGlobalStateChange = null;
        _this.subscribeLegionsProGlobal = subscribeLegionsProGlobal;
        _this.menuList = [];
        _this.masterEventScopes = masterEventScopes;
        /** 打开菜单页签方法 */
        _this.openTabPane = function () { };
        /** 移除菜单页签方法 */
        _this.removeTablePane = function () { };
        _this.setGlobalState = null;
        /** postmessage 通信 */
        _this.iframePostMessage = IframePostMessage;
        /** 订阅子应用iframe挂载在全局的变量 */
        _this.appId = '';
        return _this;
    }
    WorkerGlobalStateStore.prototype.listeningSanboxGlobalStateChange = function (options) {
        //@ts-ignore
        this.syncUpdateGlobalState(options.props);
        this.onGlobalStateChange(function (value, prev, event) {
            console.log("[onGlobalStateChange - " + options.props.name + "]:", value, prev, event);
            if (options.callback && typeof options.callback === 'function') {
                options.callback(value, prev, event);
            }
        }, {
            fireImmediately: true,
            eventScopes: options.eventScopes,
        });
    };
    WorkerGlobalStateStore.prototype.listeningGlobalStateChange = function (options) {
        var _this = this;
        this.subscribeLegionsProGlobal(function (values) {
            //@ts-ignore
            _this.syncUpdateGlobalState(values);
            _this.onGlobalStateChange(function (value, prev, event) {
                if (!event && (value.user || value.methods)) {
                    _this.setLayoutData(value);
                }
                if (options.callback && typeof options.callback === 'function') {
                    options.callback(value, prev, event);
                }
                if (process.env.NODE_ENV !== 'production') {
                    console.log("[onGlobalStateChange - " + values.appId + "]:", value, prev, event);
                }
            }, {
                fireImmediately: true,
                eventScopes: options.eventScopes,
            });
        });
    };
    WorkerGlobalStateStore.prototype.syncUpdateGlobalState = function (props) {
        if (!this.onGlobalStateChange) {
            this.onGlobalStateChange = function (callback, options) {
                props.onGlobalStateChange(callback, options);
            };
        }
        if (!this.setGlobalState) {
            this.setGlobalState = function (state, event) {
                props.setGlobalState(state, event);
            };
        }
        this.appId = props.appId;
    };
    /** 写入用户数据 */
    WorkerGlobalStateStore.prototype.setUserInfo = function (user) {
        this.userInfo = user;
    };
    /** 写入基座系统相关方法及对象变量 */
    WorkerGlobalStateStore.prototype.setLayoutData = function (data) {
        if (data.user) {
            this.proTableStore.userInfo = data.user;
            this.setUserInfo(data.user);
        }
        if (data.methods) {
            if (data.methods.openTabPane) {
                this.openTabPane = data.methods.openTabPane;
            }
            if (data.methods.removeTablePane) {
                this.removeTablePane = data.methods.removeTablePane;
            }
        }
        if (data.menuList) {
            this.menuList = data.menuList;
        }
    };
    WorkerGlobalStateStore.meta = __assign({}, StoreBase.meta);
    __decorate([
        inject(ProTableStore),
        __metadata("design:type", ProTableStore)
    ], WorkerGlobalStateStore.prototype, "proTableStore", void 0);
    WorkerGlobalStateStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], WorkerGlobalStateStore);
    return WorkerGlobalStateStore;
}(StoreBase));

export { MasterGlobalStateStore, WorkerGlobalStateStore };
