/**
  *  legions-pro-design v0.0.23
  * (c) 2022 duanguang
  * @license MIT
  */
import { legionFetch } from 'legions/fetch';

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

var legionFetchInstance = legionFetch.create();
legionFetchInstance.register({
    request: function (configs) {
        /* const credential:'same-origin'|'include'|'omit'='include' */
        var credentials = configs.credentials, props = __rest(configs, ["credentials"]);
        return __assign({}, props);
    }
});
var LegionsFetch = /** @class */ (function () {
    function LegionsFetch() {
    }
    LegionsFetch.prototype.setHeaders = function (url, option) {
        var options = {
            headers: {
                'api-target': url,
                'api-cookie': '',
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'Pragma': 'no-cache',
            },
        };
        if (option) {
            options.headers = __assign(__assign({}, options.headers), option);
        }
        return options;
    };
    LegionsFetch.prototype.get = function (options) {
        var headerOptions = this.setHeaders(options.url, options.headers);
        // @ts-ignore
        return legionFetchInstance.get(options.url, options.parameter || null, headerOptions)
            .then(function (result) {
            var newResult = result;
            if (typeof options.onBeforTranform === 'function') {
                newResult = options.onBeforTranform(result);
            }
            // @ts-ignore
            return new options.model(newResult);
        })
            .catch(function (err) {
            options.catch && options.catch(err);
        });
    };
    LegionsFetch.prototype.post = function (options) {
        var headerOptions = this.setHeaders(options.url, options.headers);
        // @ts-ignore
        return legionFetchInstance.post(options.url, options.parameter || null, headerOptions)
            .then(function (result) {
            var newResult = result;
            if (typeof options.onBeforTranform === 'function') {
                newResult = options.onBeforTranform(result);
            }
            // @ts-ignore
            return new options.model(newResult);
        })
            .catch(function (err) {
            options.catch && options.catch(err);
        });
    };
    return LegionsFetch;
}());

var project = {
    name: 'portal'
};

/*
 * @Author: duanguang
 * @Date: 2020-12-18 16:08:25
 * @LastEditTime: 2022-03-01 14:20:57
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCore/index.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
var LegionsCore = {
    LegionsFetch: LegionsFetch,
    project: project,
};

export default LegionsCore;
