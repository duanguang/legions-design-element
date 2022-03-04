/**
  *  legions-pro-design v0.0.25
  * (c) 2022 duanguang
  * @license MIT
  */
import { initGlobalState } from 'qiankun';
import { postMessage } from 'legions-utils-tool/dom';
import { resource, StoreModules, inject } from 'legions/store';
import LegionsStore from '../LegionsStore';
import LegionsStoreTable from '../LegionsStoreTable';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

/*
 * @Author: duanguang
 * @Date: 2021-01-04 11:17:55
 * @LastEditTime: 2022-02-28 17:03:17
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCrossModule/globalStateEven.ts
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
    try {
        if (!LegionstValue) {
            LegionstValue = window.parent[name];
        }
    }
    catch (e) {
        console.warn('LegionstValue = window.parent[name]，赋值异常，可能是域不同');
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
                    console.groupCollapsed('获取全局数据超时,失败原因如下:');
                    console.error('可能没找到，请检查全局是否存在LegionsProGlobal!');
                    console.error('可能跨域，请检查模块间是否允许跨域');
                    console.groupEnd();
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

/** 主应用全局数据基类
 * 只在主应用调用
 */
var MasterGlobalStateStore = /** @class */ (function (_super) {
    __extends(MasterGlobalStateStore, _super);
    function MasterGlobalStateStore(context) {
        var _this = _super.call(this, context) || this;
        //@ts-ignor
        _this.onGlobalStateChange = null;
        _this.setGlobalState = null;
        _this.openTabPane = function () { };
        _this.removeTablePane = function () { };
        _this.menuList = [];
        /** 订阅子应用iframe挂载在全局的变量 */
        _this.iframePostMessage = IframePostMessage;
        //@ts-ignore
        _this.masterEventScopes = masterEventScopes;
        var _a = initGlobalState({
            user: null,
        }), onGlobalStateChange = _a.onGlobalStateChange, setGlobalState = _a.setGlobalState, offGlobalStateChange = _a.offGlobalStateChange;
        //@ts-ignore
        _this.onGlobalStateChange = onGlobalStateChange;
        _this.setGlobalState = setGlobalState;
        return _this;
    }
    /** 创建主应用事件 */
    MasterGlobalStateStore.createEventScopes = function (event_key) {
        return resource("master/resource/" + event_key);
    };
    MasterGlobalStateStore.prototype.listeningGlobalStateChange = function (options) {
        this.onGlobalStateChange(function (value, prev) {
            if (options.callback && typeof options.callback === 'function') {
                options.callback(value, prev);
            }
            if (process.env.NODE_ENV !== 'production') {
                console.log('[onGlobalStateChange - master]:', value, prev);
            }
        }, false);
    };
    MasterGlobalStateStore.prototype.setUserGlobalState = function (state) {
        this.setGlobalState({
            user: state,
        });
    };
    MasterGlobalStateStore.meta = __assign({}, LegionsStore.StoreBase.meta);
    MasterGlobalStateStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], MasterGlobalStateStore);
    return MasterGlobalStateStore;
}(LegionsStore.StoreBase));

/** 子应用全局数据基类 */
var WorkerGlobalStateStore = /** @class */ (function (_super) {
    __extends(WorkerGlobalStateStore, _super);
    function WorkerGlobalStateStore(context) {
        var _this = _super.call(this, context) || this;
        _this.menuList = [];
        /** 监听全局数据，发生改变时触发,最基础监听函数 */
        _this.onGlobalStateChange = null;
        /**订阅子应用iframe挂载在全局的变量 */
        _this.subscribeLegionsProGlobal = subscribeLegionsProGlobal;
        //@ts-ignore
        _this.masterEventScopes = masterEventScopes;
        /** 打开菜单页签方法 */
        _this.openTabPane = function () { };
        /** 移除菜单页签方法 */
        _this.removeTablePane = function () { };
        /** 更新全局数据方法
         * 此函数在执行时，微应用全局监听事件都会接收到数据变化通知。 譬如listeningSanboxGlobalStateChange
         */
        _this.setGlobalState = null;
        /** postmessage 通信 */
        _this.iframePostMessage = IframePostMessage;
        /** 微应用id */
        _this.appId = '';
        return _this;
    }
    /** 创建微应用事件 */
    WorkerGlobalStateStore.createEventScopes = function (event_key) {
        return resource("worker/resource/" + event_key);
    };
    Object.defineProperty(WorkerGlobalStateStore.prototype, "user", {
        get: function () {
            return this.userInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WorkerGlobalStateStore.prototype, "menu_data", {
        get: function () {
            return this.menuList;
        },
        enumerable: false,
        configurable: true
    });
    /** 全局数据变化监听函数，主要用于沙箱微应用环境 */
    WorkerGlobalStateStore.prototype.listeningSanboxGlobalStateChange = function (options) {
        var _this = this;
        //@ts-ignore
        this._syncUpdateGlobalState(options.props);
        this.onGlobalStateChange(function (value, prev) {
            if ((value.user || value.methods)) {
                _this._setLayoutData(value);
            }
            if (options.callback && typeof options.callback === 'function') {
                options.callback(value, prev);
            }
        }, true);
    };
    /** 监听广播数据(主要用于基座跟子应用不在同一个容器，比如iframe) */
    WorkerGlobalStateStore.prototype.listeningIframeGlobalStateChange = function (options) {
        var _this = this;
        this.subscribeLegionsProGlobal(function (values) {
            //@ts-ignore
            _this._syncUpdateGlobalState(values);
            _this.onGlobalStateChange(function (value, prev) {
                if ((value.user || value.methods)) {
                    _this._setLayoutData(value);
                }
                if (options.callback && typeof options.callback === 'function') {
                    options.callback(value, prev);
                }
                if (process.env.NODE_ENV !== 'production') {
                    console.log("[onGlobalStateChange - " + values.appId + "]:", value, prev);
                }
            }, false);
        });
    };
    WorkerGlobalStateStore.prototype._syncUpdateGlobalState = function (props) {
        if (!this.onGlobalStateChange) {
            this.onGlobalStateChange = function (callback, options) {
                props.onGlobalStateChange(callback, options);
            };
        }
        if (!this.setGlobalState) {
            this.setGlobalState = function (state) {
                props.setGlobalState(state);
            };
        }
        this.appId = props.name;
    };
    /** 写入用户数据 */
    WorkerGlobalStateStore.prototype._setUserInfo = function (user) {
        this.userInfo = user;
    };
    /** 写入基座系统相关方法及对象变量 */
    WorkerGlobalStateStore.prototype._setLayoutData = function (data) {
        if (data.user) {
            this.proTableStore.userInfo = data.user;
            this._setUserInfo(data.user);
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
    WorkerGlobalStateStore.meta = __assign({}, LegionsStore.StoreBase.meta);
    __decorate([
        inject(LegionsStoreTable),
        __metadata("design:type", void 0)
    ], WorkerGlobalStateStore.prototype, "proTableStore", void 0);
    WorkerGlobalStateStore = __decorate([
        StoreModules,
        __metadata("design:paramtypes", [Object])
    ], WorkerGlobalStateStore);
    return WorkerGlobalStateStore;
}(LegionsStore.StoreBase));

/*
 * @Author: duanguang
 * @Date: 2021-03-03 16:30:27
 * @LastEditTime: 2021-03-04 15:40:12
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCrossModule/index.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var LegionsCrossModule = {
    MasterGlobalStateStore: MasterGlobalStateStore,
    WorkerGlobalStateStore: WorkerGlobalStateStore,
    IframePostMessage: IframePostMessage,
    subscribeLegionsProGlobal: subscribeLegionsProGlobal
};

export default LegionsCrossModule;
