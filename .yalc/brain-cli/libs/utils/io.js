"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.isFile = void 0;
const fs = require("fs");
/**
 * 判断指定路径是否是文件
 */
function isFile(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    }
    catch (e) {
        return false;
    }
}
exports.isFile = isFile;
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}
exports.readFile = readFile;
