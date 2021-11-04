"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.forEach = void 0;
function isArray(val) {
    return toString.call(val) === '[object Array]';
}
function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }
    if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    }
    else {
        // Iterate over object keys
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
exports.forEach = forEach;
function merge(...obj) {
    var result = {};
    function assignValue(val, key) {
        if (isArray(val) && isArray(result[key])) {
            result[key] = [...result[key], ...val];
        }
        else if (typeof result[key] === 'object' &&
            typeof val === 'object' &&
            !isArray(val)) {
            //@ts-ignore
            result[key] = merge(result[key], val);
        }
        else {
            result[key] = val;
        }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}
exports.merge = merge;
