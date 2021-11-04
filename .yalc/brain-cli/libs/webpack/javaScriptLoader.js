"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSXLoadersed = exports.getTsLoadersed = exports.tsloaderPlugin = void 0;
const EConfig_1 = require("../settings/EConfig");
const env_1 = require("../utils/env");
const path = require("path");
const { webpack: { happyPack, disableReactHotLoader, tsCompilePlugin, extend }, babel, projectType, } = EConfig_1.default.getInstance();
const __DEV__ = env_1.isDev();
const DisableReactHotLoader = disableReactHotLoader || false; //默认启用热加载
const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
function hasWebpackExtend() {
    if (extend && typeof extend === 'function') {
        return true;
    }
    return false;
}
const tsloaderPlugin = () => {
    let tsCompileOption = {};
    if (tsCompilePlugin && tsCompilePlugin.option) {
        tsCompileOption = tsCompilePlugin.option;
    }
    return {
        loader: require.resolve('ts-loader'),
        options: Object.assign({
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
            happyPackMode: true,
        }, (tsCompileOption || {})),
    };
};
exports.tsloaderPlugin = tsloaderPlugin;
const getTsLoadersed = () => {
    const loaders = [];
    if (happyPack && happyPack.open) {
        loaders.push({
            test: /\.(ts|tsx)$/,
            include: [path.join(process.cwd(), './src')],
            loader: 'happypack/loader?id=ts',
            exclude: [nodeModulesPath],
        });
    }
    else {
        // 解决多线程下ts-loader 编译插件无法被执行问题
        loaders.push({
            test: /\.(ts|tsx)$/,
            include: [path.join(process.cwd(), './src')],
            use: [
                {
                    loader: 'babel-loader',
                    query: babel.query,
                },
                exports.tsloaderPlugin(),
            ],
            exclude: [nodeModulesPath],
        });
    }
    if (hasWebpackExtend()) {
        extend(loaders, {
            isDev: __DEV__,
            loaderType: 'TsLoader',
            projectType,
        });
    }
    return loaders;
};
exports.getTsLoadersed = getTsLoadersed;
const getJSXLoadersed = () => {
    const loaders = [];
    const hotLoader = [];
    if (__DEV__) {
        if (!DisableReactHotLoader) {
            hotLoader.push({
                test: /\.(jsx|js)?$/,
                // loader: 'react-hot',
                loader: 'babel-loader',
                include: [path.join(process.cwd(), './src')],
                exclude: [nodeModulesPath],
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                },
            });
            if (hasWebpackExtend()) {
                extend(hotLoader, {
                    isDev: __DEV__,
                    loaderType: 'HotLoader',
                    projectType,
                });
            }
        }
    }
    if (happyPack && happyPack.open) {
        loaders.push({
            test: /\.(jsx|js)?$/,
            include: [path.join(process.cwd(), './src')],
            loader: 'happypack/loader?id=js',
            exclude: [nodeModulesPath],
        });
    }
    else {
        loaders.push({
            test: /\.(jsx|js)?$/,
            include: [path.join(process.cwd(), './src')],
            use: [
                {
                    loader: `babel-loader`,
                    query: babel.query,
                },
            ],
            exclude: [nodeModulesPath],
        });
    }
    if (hasWebpackExtend()) {
        extend(loaders, {
            isDev: __DEV__,
            loaderType: 'JsLoader',
            projectType,
        });
    }
    return [...hotLoader, ...loaders];
};
exports.getJSXLoadersed = getJSXLoadersed;
