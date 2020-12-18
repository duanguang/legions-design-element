/**
  *  legions-pro-echarts v0.0.7
  * (c) 2020 duanguang
  * @license MIT
  */
import { get, post } from 'legions/fetch';

/*
 * @Author: duanguang
 * @Date: 2020-12-16 09:37:30
 * @LastEditTime: 2020-12-16 10:05:35
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/core/constant.icon.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/**
 * icon
 *  更多 */
var MORE_IOCN = 'path://M298.666667 586.666667a74.666667 74.666667 0 1 1 0-149.333334 74.666667 74.666667 0 0 1 0 149.333334z m213.333333 0a74.666667 74.666667 0 1 1 0-149.333334 74.666667 74.666667 0 0 1 0 149.333334z m213.333333 0a74.666667 74.666667 0 1 1 0-149.333334 74.666667 74.666667 0 0 1 0 149.333334z';

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
        return get(options.url, options.parameter || null, headerOptions)
            .then(function (result) {
            // @ts-ignore
            return new options.model(result);
        })
            .catch(function (err) {
            options.catch && options.catch(err);
        });
    };
    LegionsFetch.prototype.post = function (options) {
        var headerOptions = this.setHeaders(options.url, options.headers);
        // @ts-ignore
        return post(options.url, options.parameter || null, headerOptions)
            .then(function (result) {
            // @ts-ignore
            return new options.model(result);
        })
            .catch(function (err) {
            options.catch && options.catch(err);
        });
    };
    return LegionsFetch;
}());

export { LegionsFetch, MORE_IOCN };
