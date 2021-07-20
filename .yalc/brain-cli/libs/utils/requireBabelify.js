"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireBabelify = void 0;
const Module = require('module');
const rawModuleCompile = Module.prototype._compile;
function requireBabelify(filename, options = {}) {
    /* const presets = [options.version || 'es2015']; */
    /*  Module.prototype._compile = function (content, filename) {
         const result = babel.transform(content, {presets}).code;
         rawModuleCompile.apply(this, [result, filename]);
         Module.prototype._compile = rawModuleCompile;
     }; */
    return require(filename);
}
exports.requireBabelify = requireBabelify;
