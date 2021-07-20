"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const EConfig_1 = require("../settings/EConfig");
const webpack_config_1 = require("../../webpack.config");
const webpack = require("webpack");
function programInit(env, options) {
    if (env === 'dev') {
        /**
         * 在开发环境中, 允许直接配置config和ignoreConfig并更新指定常量区域
         */
        // program.config && (configFileList[0] = program.config);
        // program.ignoreConfig && (configFileList[1] = program.ignoreConfig);
        //noinspection JSIgnoredPromiseFromCall
        server_1.default();
    }
    else if (env === 'production') {
        const eConfig = EConfig_1.default.getInstance();
        const webpackConfig = webpack_config_1.default(eConfig);
        if (Array.isArray(webpackConfig.pendings)) {
            webpackConfig.pendings.forEach(pending => pending());
        }
        delete webpackConfig.pendings;
        webpack(webpackConfig, function (err, stats) {
            if (err)
                throw err;
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            })
                + `\n`);
        });
        // function compile(webpackConfig) {
        //     return new Promise((resolve) => {
        //         webpack(webpackConfig, function (err, stats) {
        //             if (err) throw err;
        //             process.stdout.write(stats.toString({
        //                     colors: true,
        //                     modules: false,
        //                     children: false,
        //                     chunks: false,
        //                     chunkModules: false
        //                 })
        //                 + `\n`);
        //             resolve();
        //         });
        //     })
        // }
        //
        // const eConfig = EConfig.getInstance();
        // const results = [];
        // [...eConfig.apps].forEach(async(app) => {
        //     const newEConfig = Object.assign({}, eConfig, {apps: [app]});
        //     const webpackConfig = getConfig(newEConfig);
        //     const {name} = newEConfig;
        //     const {path:outputPath} = webpackConfig.output;
        //     const newOutPath = path.resolve(outputPath, app);
        //     const newPublicPath = `/public/${name}/${app}/`;
        //     const result = Object.assign({}, webpackConfig, {output: {...webpackConfig.output, path: newOutPath, publicPath: newPublicPath}});
        //     await compile(result);
        // });
    }
}
exports.default = programInit;
