/**
  *  legions-pro-design v0.0.3
  * (c) 2021 duanguang
  * @license MIT
  */
import Store, { resource, Lifecycle } from 'legions/store';
import { schedule } from 'legions-lunar/schedule';

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

/**  菜单折叠事件分发*/
//@ts-ignore
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
 * @LastEditTime: 2021-03-02 18:13:18
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStore/StoreBase.ts
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

/*
 * @Author: duanguang
 * @Date: 2021-01-07 16:20:33
 * @LastEditTime: 2021-03-02 18:14:24
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStore/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var LegionsStore = {
    StoreBase: StoreBase,
    UiStoreBase: UiStoreBase,
    CollapsedResource: CollapsedResource,
    MenuPanesStorageResource: MenuPanesStorageResource,
    BreadCrumbsResourceEven: BreadCrumbsResourceEven,
    project: project
};

export default LegionsStore;
