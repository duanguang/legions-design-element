"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const WebpackDllManifest_1 = require("../libs/settings/WebpackDllManifest");
const base_1 = require("./base");
const EConfig_1 = require("../libs/settings/EConfig");
const dllPlugins_1 = require("./dllPlugins");
const { webpack: { dllConfig } } = EConfig_1.default.getInstance();
const { vendors, customDll, compileOptions } = dllConfig;
const path = require('path');
// const webpack = require('webpack');
// const config = require('./base');
// const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
function getDevConfig(eConfig) {
    const config = base_1.default(eConfig);
    config.pendings = [
        () => {
            //TODO:暂时放在这里
            const filepath = WebpackDllManifest_1.default.getInstance().resolveManifestPath();
            let vencdn = '';
            if (Object.prototype.toString.call(vendors) === '[object Object]') {
                if (vendors['externalUrl']) {
                    vencdn = vendors['externalUrl'];
                }
            }
            if (!vencdn) {
                if (compileOptions && Object.prototype.toString.call(compileOptions) === '[object Object]') {
                    vencdn = compileOptions.externalUrl || process.env.cdnRelease;
                }
            }
            let venPublicPath = {};
            if (vencdn) {
                venPublicPath = { publicPath: vencdn };
            }
            if (filepath) {
                config.plugins.push(new AddAssetHtmlPlugin(Object.assign({ includeSourcemap: false, filepath }, venPublicPath)));
                const dllReferencePlugin = helpers_1.getDllReferencePlugin();
                if (dllReferencePlugin) {
                    config.plugins.push(dllReferencePlugin);
                }
            }
            Object.keys(dllPlugins_1.DllPlugins).forEach((keys) => {
                let vendorsDll = [];
                const item = customDll.find((i) => i.key === keys);
                let cdn = '';
                if (item) {
                    vendorsDll = item.value;
                    cdn = item.externalUrl || compileOptions.externalUrl || process.env.cdnRelease;
                }
                const filepathDll = WebpackDllManifest_1.default.getInstance().resolveManifestPath(keys, WebpackDllManifest_1.default.getInstance().getDllPluginsHash(vendorsDll));
                let publicPath = {};
                if (cdn) {
                    publicPath = { publicPath: cdn };
                }
                if (filepathDll) {
                    config.plugins.push(new AddAssetHtmlPlugin(Object.assign({ includeSourcemap: false, filepath: filepathDll }, publicPath)));
                    const dllReference = helpers_1.getDllReferencePlugin(keys);
                    if (dllReference) {
                        config.plugins.push(dllReference);
                    }
                }
            });
        }
    ];
    return config;
}
exports.default = getDevConfig;
