/**
  *  legions-pro-design v0.0.4
  * (c) 2021 duanguang
  * @license MIT
  */
import { initGlobalState } from 'legions-micro-service';
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

/*
 * @Author: duanguang
 * @Date: 2021-01-04 11:17:55
 * @LastEditTime: 2021-03-03 16:34:46
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
        _this.onGlobalStateChange = null;
        _this.subscribeLegionsProGlobal = subscribeLegionsProGlobal;
        _this.menuList = [];
        //@ts-ignore
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
        var _this = this;
        //@ts-ignore
        this.syncUpdateGlobalState(options.props);
        this.onGlobalStateChange(function (value, prev, event) {
            if (!event && (value.user || value.methods)) {
                _this.setLayoutData(value);
            }
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
 * @LastEditTime: 2021-03-03 16:35:23
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
