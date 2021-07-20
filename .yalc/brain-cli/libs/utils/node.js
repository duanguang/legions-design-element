"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emulateNodeRecursiveLookup = void 0;
const path = require("path");
/**
 * 模拟Node的递归找查找文件
 * @param directory 指定递归开始的文件夹
 * @param relativeFilename 相对路径<文件名>
 * @param previousDirectory 外部不做设定, 这个参数记录上一次文件夹位置, 用于检查是否到达文件夹顶层
 * @returns {any}
 */
function emulateNodeRecursiveLookup(directory, relativeFilename, previousDirectory) {
    try {
        const loopUpTarget = path.resolve(directory, relativeFilename);
        return require(loopUpTarget);
    }
    catch (e) {
        directory = path.dirname(directory);
        if (previousDirectory != directory) {
            previousDirectory = directory;
            return emulateNodeRecursiveLookup(directory, relativeFilename, previousDirectory);
        }
        else {
            return null;
        }
    }
}
exports.emulateNodeRecursiveLookup = emulateNodeRecursiveLookup;
