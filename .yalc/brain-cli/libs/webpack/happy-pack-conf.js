"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.happyPackToTsPlugin = exports.happyPackToJsPlugin = void 0;
const EConfig_1 = require("../settings/EConfig");
const javaScriptLoader_1 = require("./javaScriptLoader");
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const { webpack: { happyPack }, babel, } = EConfig_1.default.getInstance();
/** JS编译线程插件 */
const happyPackToJsPlugin = () => {
    if (happyPack && happyPack.open) {
        const jsConfig = happyPack.procJs || {};
        return [
            new HappyPack(Object.assign(Object.assign({ threads: os.cpus().length - 1 }, jsConfig), { id: 'js', 
                /* threadPool: happyThreadPool, */
                use: [
                    {
                        loader: `babel-loader`,
                        query: babel.query,
                    },
                ] })),
        ];
    }
    return [];
};
exports.happyPackToJsPlugin = happyPackToJsPlugin;
const happyPackToTsPlugin = () => {
    if (happyPack && happyPack.open) {
        const jsConfig = happyPack.procTs || {};
        return [
            new HappyPack(Object.assign(Object.assign({ threads: os.cpus().length - 1 }, jsConfig), { 
                /* threadPool: happyThreadPool, */
                id: 'ts', use: [
                    {
                        loader: 'babel-loader',
                        query: babel.query,
                    },
                    javaScriptLoader_1.tsloaderPlugin(),
                ] })),
        ];
    }
    return [];
};
exports.happyPackToTsPlugin = happyPackToTsPlugin;
