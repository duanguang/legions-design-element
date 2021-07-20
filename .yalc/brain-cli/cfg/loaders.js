"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loaders = void 0;
const env_1 = require("../libs/utils/env");
const constants_1 = require("../libs/constants/constants");
const path = require("path");
const EConfig_1 = require("../libs/settings/EConfig");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const __DEV__ = env_1.isDev();
const CSS_MODULE_OPTION = {
    modules: true,
    importLoaders: 1,
    localIdentName: `[local]-[hash:base64:6]`,
};
let browsers = EConfig_1.default.getInstance().postcss.autoprefixer.browsers;
let px2rem = EConfig_1.default.getInstance().postcss.px2rem;
const postcss_loader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [require('autoprefixer')({ browsers: browsers })],
    },
};
if (px2rem && Object.getOwnPropertyNames(px2rem).length) {
    postcss_loader.options.plugins.push(require('postcss-plugin-px2rem')(px2rem));
}
function generateLoaders(cssModule, loader, loaderOptions) {
    let style = [{ loader: 'css-loader', options: { importLoaders: 1 } }];
    if (cssModule) {
        style[0] = Object.assign(style[0], { options: cssModule });
    }
    if (loader) {
        style.push(loader);
    }
    if (loaderOptions) {
        style.push(loaderOptions);
    }
    if (__DEV__) {
        let styles = ['style-loader', ...style];
        return styles;
    }
    return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: style,
        /* publicPath: '/', */
    });
}
exports.loaders = [
    {
        test: /\.less/,
        use: generateLoaders(null, {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
        }),
        include: [path.resolve(constants_1.nodeModulesPath, 'antd')],
    },
    {
        test: new RegExp(`^(?!.*\\.modules).*\\.css`),
        use: generateLoaders(null, null, postcss_loader),
        exclude: [constants_1.nodeModulesPath],
        include: path.join(process.cwd(), './src'),
    },
    {
        /* test: /\.css$/, */
        test: new RegExp(`^(.*\\.modules).*\\.css`),
        use: generateLoaders(CSS_MODULE_OPTION, null, postcss_loader),
        exclude: [constants_1.nodeModulesPath],
        include: path.join(process.cwd(), './src'),
    },
    {
        test: new RegExp(`^(?!.*\\.modules).*\\.less`),
        use: generateLoaders(null, postcss_loader, {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
        }),
        exclude: [constants_1.nodeModulesPath],
        include: path.join(process.cwd(), './src'),
    },
    {
        /* test: /\.less/, */
        test: new RegExp(`^(.*\\.modules).*\\.less`),
        use: generateLoaders(CSS_MODULE_OPTION, postcss_loader, {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
        }),
        exclude: [constants_1.nodeModulesPath],
        include: path.join(process.cwd(), './src'),
    },
];
