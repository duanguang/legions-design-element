"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../../utils/env");
const EConfig_1 = require("../../settings/EConfig");
const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const minify = require('html-minifier').minify;
const { apps, htmlWebpackPlugin: { title }, webpack: { commonsChunkPlugin } } = EConfig_1.default.getInstance();
function htmlWebpackPluginInstance(templatePath, filename, chunks) {
    return new HtmlWebpackPlugin({
        template: templatePath,
        filename: filename,
        //minify: isDev() ? false :minify,
        hash: !env_1.isDev(),
        inject: true,
        alwaysWriteToDisk: true,
        chunks: chunks,
        chunksSortMode: 'dependency',
        title: title || 'webApp'
    });
}
function getHtmlWebpackPlugins(htmlWebpackPlugin, entries) {
    return (entries() || apps).map((app) => {
        const workingDirectory = process.cwd();
        const chunk = [...new Set(commonsChunkPlugin.concat(['common']))];
        const relativeTargetDirectory = `${app}`;
        const relativeTargetHtml = path.join(relativeTargetDirectory, '/index.html');
        const projectTargetPath = path.resolve(workingDirectory, 'src/', relativeTargetHtml);
        const relativeTargetJSP = path.join(relativeTargetDirectory, '/index.jsp');
        const projectTargetPathJSP = path.resolve(workingDirectory, 'src/', relativeTargetJSP);
        if (fs.existsSync(projectTargetPath)) {
            return htmlWebpackPluginInstance(projectTargetPath, relativeTargetHtml, [app, ...chunk]);
        }
        else if (fs.existsSync(projectTargetPathJSP)) {
            return htmlWebpackPluginInstance(projectTargetPathJSP, relativeTargetJSP, [app, ...chunk]);
        }
        else {
            const baseTarget = path.resolve(__dirname, '../../../tpl/index.ejs');
            return htmlWebpackPluginInstance(baseTarget, relativeTargetHtml, [app, ...chunk]);
        }
    });
}
exports.default = getHtmlWebpackPlugins;
