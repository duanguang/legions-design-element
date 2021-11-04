"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortHashMd5 = exports.shortHash = void 0;
const rawObjectHash = require("object-hash");
function shortHash(val) {
    return rawObjectHash(val, { encoding: 'base64' });
}
exports.shortHash = shortHash;
function shortHashMd5(val) {
    // @ts-ignore
    return rawObjectHash.MD5(val, { algorithm: 'md5', encoding: 'base64' });
}
exports.shortHashMd5 = shortHashMd5;
