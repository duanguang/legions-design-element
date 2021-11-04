"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LegionExtractStaticFilePlugin(options) {
    this.options = options;
}
exports.default = LegionExtractStaticFilePlugin;
LegionExtractStaticFilePlugin.prototype.apply = function (compiler) {
    const extracts = [];
    // compilation（'编译器'对'编译ing'这个事件的监听）
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('before-chunk-assets', function () {
            compilation.mainTemplate.plugin('asset-path', function (path, data) {
                if (compilation.name &&
                    compilation.name.indexOf('extract-text-webpack-plugin') > -1 &&
                    path === compilation.outputOptions.publicPath) {
                    return '/';
                }
                return path;
            });
            if (compilation.chunks &&
                compilation.chunks.length > 0 &&
                compilation.chunks[0].name) {
                const mainTemplate = compilation.mainTemplate;
                // mainTemplate.plugin("require-extensions", function (source, chunk, hash) {
                //     if (chunk.name) {
                //         var buf = [source];
                //         buf.push("");
                //         buf.push("// __legion_app_name__");
                //         buf.push(this.requireFn + ".n = '" + chunk.name + "';");
                //         return this.asString(buf);
                //     }
                //     return source;
                // });
                compilation.children.forEach(c => {
                    if (c.name == 'extract-text-webpack-plugin') {
                        const files = Object.keys(c.assets);
                        if (files.length > 0) {
                            c.entries.forEach(e => {
                                extracts.push({
                                    resource: e.resource,
                                    files: files,
                                });
                            });
                        }
                    }
                });
                compilation.modules.forEach(module => {
                    extracts.forEach(extract => {
                        if (extract.resource == module.resource) {
                            extract.files.forEach(file => {
                                module.chunks.forEach(chunk => {
                                    if (chunk.name) {
                                        const path = `${chunk.name}/${file}`;
                                        if (!(path in compilation.assets)) {
                                            compilation.assets[path] = compilation.assets[file];
                                        }
                                    }
                                });
                            });
                        }
                    });
                    if (module.assets && module.chunks.length > 0) {
                        const keys = Object.keys(module.assets);
                        if (keys.length > 0) {
                            keys.forEach(key => {
                                module.chunks.forEach(chunk => {
                                    if (chunk.name) {
                                        module.assets[`${chunk.name}/${key}`] = module.assets[key];
                                    }
                                });
                                delete module.assets[key];
                            });
                            // module.dependencies[0].expression += '+ "/" +' + mainTemplate.requireFn + '.n + "/"';//解决资源路径require方式路径错误问题
                        }
                    }
                });
            }
        });
    });
    // emit（'编译器'对'生成最终资源'这个事件的监听）
    compiler.plugin('emit', function (compilation, callback) {
        extracts.forEach(extract => {
            extract.files.forEach(file => {
                delete compilation.assets[file];
            });
        });
        callback();
    });
};
