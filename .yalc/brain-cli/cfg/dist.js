"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const EConfig_1 = require("../libs/settings/EConfig");
// const getDistConfig = getBaseConfig;
const WebpackDllManifest_1 = require("../libs/settings/WebpackDllManifest");
const helpers_1 = require("./helpers");
const dllPlugins_1 = require("./dllPlugins");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { webpack: { dllConfig } } = EConfig_1.default.getInstance();
const { vendors, customDll } = dllConfig;
const path = require('path');
function getDistConfig(eConfig) {
    const config = base_1.default(eConfig);
    config.pendings = [
        () => {
            //TODO:暂时放在这里
            const filepath = WebpackDllManifest_1.default.getInstance().resolveManifestPath();
            const AssetHtmlPlugin = [];
            if (filepath) {
                let publicPath = path.posix.join('../', 'common/js');
                let cdn = '';
                if (typeof vendors === 'object') {
                    if (!Array.isArray(vendors)) {
                        if (vendors.externalUrl) {
                            cdn = vendors.externalUrl;
                        }
                    }
                }
                if (cdn) {
                    publicPath = `${cdn}/common/js`;
                }
                AssetHtmlPlugin.push({
                    includeSourcemap: false, filepath,
                    outputPath: 'common/js',
                    publicPath,
                });
                /* config.plugins.push(new AddAssetHtmlPlugin({
                    includeSourcemap: false, filepath,
                    outputPath: 'common/js',
                
                    publicPath,
                })); */
                const dllReferencePlugin = helpers_1.getDllReferencePlugin();
                if (dllReferencePlugin) {
                    config.plugins.push(dllReferencePlugin);
                }
            }
            Object.keys(dllPlugins_1.DllPlugins).forEach((key) => {
                let vendorsDll = [];
                let publicPath = path.posix.join('../', 'common/js');
                let cdn = '';
                const item = customDll.find((i) => i.key === key);
                if (item) {
                    vendorsDll = item.value;
                    cdn = item.externalUrl;
                }
                if (cdn || process.env.cdnRelease) {
                    publicPath = `${cdn || process.env.cdnRelease}/common/js`;
                }
                const filepath = WebpackDllManifest_1.default.getInstance().resolveManifestPath(key, WebpackDllManifest_1.default.getInstance().getDllPluginsHash(vendorsDll));
                if (filepath) {
                    /* config.plugins.push(new AddAssetHtmlPlugin({
                        includeSourcemap: false,filepath,
                        outputPath: 'common/js',
                        publicPath
                    })); */
                    AssetHtmlPlugin.push({
                        includeSourcemap: false, filepath,
                        outputPath: 'common/js',
                        publicPath,
                    });
                    const dllReference = helpers_1.getDllReferencePlugin(key);
                    if (dllReference) {
                        config.plugins.push(dllReference);
                    }
                }
            });
            config.plugins.push(new AddAssetHtmlPlugin(AssetHtmlPlugin));
        }
    ];
    return config;
}
exports.default = getDistConfig;
