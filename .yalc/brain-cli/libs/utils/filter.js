"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEmptySlots = void 0;
function filterEmptySlots(arr) {
    return arr.reduce((previousValue, currentValue) => {
        if (currentValue != null && currentValue != undefined) {
            previousValue.push(currentValue);
        }
        return previousValue;
    }, []);
}
exports.filterEmptySlots = filterEmptySlots;
