"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const EConfig_1 = require("../libs/settings/EConfig");
const constants_1 = require("../libs/constants/constants");
const webpack = require("webpack");
const htmlWebpackPlugin_1 = require("../libs/webpack/plugins/htmlWebpackPlugin");
const env_1 = require("../libs/utils/env");
const LegionExtractStaticFilePlugin_1 = require("../libs/webpack/plugins/LegionExtractStaticFilePlugin");
const getEntries_1 = require("../libs/webpack/entries/getEntries");
const objects_1 = require("../libs/utils/objects");
const happy_pack_conf_1 = require("../libs/webpack/happy-pack-conf");
const javaScriptLoader_1 = require("../libs/webpack/javaScriptLoader");
const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const SpritesmithPlugin = require('webpack-spritesmith');
const express = require('express');
const TerserPlugin = require('terser-webpack-plugin');
const Optimization = {
    runtimeChunk: false,
    splitChunks: {
        cacheGroups: {
            common: {
                test: /[\\/]node_modules[\\/]/,
                name: 'common',
                chunks: 'initial',
                minChunks: 1,
                priority: 6,
            },
        },
    },
};
const entries = getEntries_1.getApps();
function getBaseConfig({ name, devServer, imageInLineSize, defaultPort, publicPath, apps, server, babel, webpack: webpackConfig, htmlWebpackPlugin, projectType, isTslint, }) {
    const __DEV__ = env_1.isDev();
    publicPath += name + '/';
    const { disableReactHotLoader, commonsChunkPlugin, plugins, output, } = webpackConfig;
    const NewOptimization = objects_1.merge(Optimization, webpackConfig.optimization);
    const { noInfo, proxy, before, stats, contentBase, historyApiFallback, headers = {}, hot, port } = devServer, serverProps = __rest(devServer, ["noInfo", "proxy", "before", "stats", "contentBase", "historyApiFallback", "headers", "hot", "port"]);
    const webpackDevEntries = [
    /* 'react-hot-loader/patch',  */
    /*  `webpack-dev-server/client?http://localhost:${defaultPort}`,
    `webpack/hot/only-dev-server` */
    /* 'webpack/hot/dev-server' */
    ];
    function getEntries() {
        let entity = entries().reduce((prev, app) => {
            prev[app] = `./src/${app}/index`;
            return prev;
        }, {});
        let chunk = {};
        /* chunk[CommonsChunkPlugin.name] = CommonsChunkPlugin.value; */
        entity = Object.assign(entity, chunk);
        return entity;
    }
    function getCssLoaders() {
        const CSS_MODULE_QUERY = `?modules&importLoaders=1&localIdentName=[local]-[hash:base64:6]`;
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
            let style = [
                { loader: 'css-loader', options: { importLoaders: 1 } },
            ];
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
        if (!__DEV__) {
            config.plugins.push(new ExtractTextPlugin({
                filename: '[name]/styles/[name].[hash:8].bundle.css',
                allChunks: true,
            }));
            config.plugins.push(new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true,
            }));
        }
        const loaders = [
            {
                test: /\.less/,
                use: generateLoaders(null, {
                    loader: 'less-loader',
                    options: { javascriptEnabled: true },
                }),
                include: [path.resolve(nodeModulesPath, 'antd')],
            },
            {
                test: new RegExp(`^(?!.*\\.modules).*\\.css`),
                use: generateLoaders(null, null, postcss_loader),
                exclude: [nodeModulesPath],
                include: path.join(process.cwd(), './src'),
            },
            {
                /* test: /\.css$/, */
                test: new RegExp(`^(.*\\.modules).*\\.css`),
                use: generateLoaders(CSS_MODULE_OPTION, null, postcss_loader),
                exclude: [nodeModulesPath],
                include: path.join(process.cwd(), './src'),
            },
            {
                test: new RegExp(`^(?!.*\\.modules).*\\.less`),
                use: generateLoaders(null, postcss_loader, { loader: 'less-loader', options: { javascriptEnabled: true } }),
                exclude: [nodeModulesPath],
                include: path.join(process.cwd(), './src'),
            },
            {
                /* test: /\.less/, */
                test: new RegExp(`^(.*\\.modules).*\\.less`),
                use: generateLoaders(CSS_MODULE_OPTION, postcss_loader, { loader: 'less-loader', options: { javascriptEnabled: true } }),
                exclude: [nodeModulesPath],
                include: path.join(process.cwd(), './src'),
            },
        ];
        if (webpackConfig.extend && typeof webpackConfig.extend === 'function') {
            // @ts-ignore
            webpackConfig.extend &&
                webpackConfig.extend(loaders, {
                    // @ts-ignore
                    isDev: __DEV__,
                    loaderType: 'StyleLoader',
                    projectType,
                    transform: {
                        cssModule: CSS_MODULE_OPTION,
                        LoaderOptions: postcss_loader,
                        execution: generateLoaders,
                    },
                });
        }
        return loaders;
    }
    function getJsonLoaders() {
        return [
            {
                test: /\.json$/,
                type: 'javascript/auto',
                loader: 'json-loader',
            },
        ];
    }
    function getImageLoaders() {
        if (__DEV__) {
            return [
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loaders: [`file-loader?esModule=${false}`],
                },
            ];
        }
        return [
            {
                test: /\.(png|jpe?g|gif)$/,
                //loader: `url-loader?limit=${8192}&name=${path.posix.join('common', 'images/[hash:8].[name].[ext]')}`,
                loaders: [
                    `file-loader?limit=${imageInLineSize}&name=common/images/[hash:8].[name].[ext]&esModule=${false}`,
                    //optimizationLevel似乎没什么用
                    //`image-webpack?{optipng:{optimizationLevel:7}, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}`
                ],
            },
        ];
    }
    function getFontLoaders() {
        return [
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                loader: `url-loader?limit=${imageInLineSize}&name=fonts/[hash:8].[name].[ext]`,
            },
        ];
    }
    function getFileResourcesLoaders() {
        return [
            {
                test: /\.(mp4|ogg)$/,
                loader: 'file-loader?&name=others/[name].[ext]',
            },
        ];
    }
    function getTemplateJspLoaders() {
        return [
            {
                test: /\.jsp$/,
                use: 'raw-loader',
                exclude: [nodeModulesPath],
            },
        ];
    }
    function getTslintLoaders() {
        if (isTslint) {
            return [
                {
                    test: /\.ts|tsx$/,
                    exclude: /node_modules/,
                    enforce: 'pre',
                    /* loader: 'happypack/loader?id=tslint', */
                    loader: 'tslint-loader',
                },
            ];
        }
        return [];
    }
    function getHtmlWebpackPlugins() {
        if (__DEV__) {
            return htmlWebpackPlugin_1.default(null, entries);
        }
        else {
            // invariant(apps.length === 1, `在部署环境下仅支持单入口`);
            return htmlWebpackPlugin_1.default(null, entries);
        }
    }
    const templateFunction = function (data) {
        const shared = '.w-icon { background-image: url(I); }'.replace('I', data.sprites.length ? data.sprites[0].image : '');
        // 注意：此处默认图标使用的是二倍图
        const perSprite = data.sprites
            .map(function (sprite) {
            // background-size: SWpx SHpx;
            return '.w-icon-N { width: SWpx; height: SHpx; }\n.w-icon-N .w-icon, .w-icon-N.w-icon { width: Wpx; height: Hpx; background-position: Xpx Ypx; margin-top: -SHpx; margin-left: -SWpx; } '
                .replace(/N/g, sprite.name)
                //@ts-ignore
                .replace(/SW/g, sprite.width / 2)
                //@ts-ignore
                .replace(/SH/g, sprite.height / 2)
                .replace(/W/g, sprite.width)
                .replace(/H/g, sprite.height)
                .replace(/X/g, sprite.offset_x)
                .replace(/Y/g, sprite.offset_y);
        })
            .join('\n');
        return shared + '\n' + perSprite;
    };
    const SpritesmithPlugins = apps.map(item => {
        // 雪碧图设置
        return new SpritesmithPlugin({
            src: {
                cwd: path.resolve(process.cwd(), `./src/${item}/assets/images/icons/`),
                glob: '**/*.png', // 匹配任意 png 图标
            },
            target: {
                image: path.resolve(process.cwd(), `./src/${item}/assets/css/sprites-generated.png`),
                // 设置生成CSS背景及其定位的文件或方式
                css: [
                    [
                        path.resolve(process.cwd(), `./src/${item}/assets/css/sprites-generated.css`),
                        {
                            format: 'function_based_template',
                        },
                    ],
                ],
                // css: path.resolve(__dirname, '../src/assets/spritesmith-generated/sprite.less')
            },
            customTemplates: {
                function_based_template: templateFunction,
            },
            apiOptions: {
                cssImageRef: './sprites-generated.png', // css文件中引用雪碧图的相对位置路径配置
            },
            spritesmithOptions: {
                padding: 4,
            },
        });
    });
    const library = {};
    if (output && typeof output === 'object' && !Array.isArray(output)) {
        const libraryArrylist = ['library', 'libraryTarget'];
        libraryArrylist.map((item) => {
            if (output.hasOwnProperty(item)) {
                if (typeof output[item] === 'string') {
                    library[item] = output[item];
                }
                else if (typeof output[item] === 'function') {
                    library[item] = output[item](name);
                }
            }
        });
    }
    const config = {
        entry: getEntries(),
        //port: defaultPort,
        //additionalPaths: [],
        output: Object.assign(Object.assign({}, library), { 
            /**遇到问题： 对于同一个页面功能由不同的同事开发， 都用到了 webpack 以及 CommonsChunkPlugin，最后把打包出来的代码，整合到一起的时候，冲突了。
             * 问题表现：各自用 webpack 打包代码没有问题，但是加载到页面上时，代码报错且错误难以定位。
             * 解决方法：在 webpack 的配置选项里使用 output.jsonpFunction。
             * output.jsonpFunction string 仅用在输出目标为 web，且使用 jsonp 的方式按需加载代码块时。
      一个命名的 JSONP 函数用于异步加载代码块或者把多个初始化代码块合并到一起时使用（如 CommonsChunkPlugin, AggressiveSplittingPlugin）。
      当同一个页面上有多个 webpack 实例（源于不同的编译），需要修改这个函数名。
      如果使用了 output.library 选项，那么这个 library 的命名会自动附加上。
      事实上 webpack 并不在全局命名空间下运行，但是 CommonsChunkPlugin 这样的插件会使用异步 JSONP 的方法按需加载代码块。插件会注册一个全局的函数叫 window.webpackJsonp，所以同一个页面上运行多个源自不同 webpack 打包出来的代码时，可能会引起冲突。
             */
            jsonpFunction: process.env.webpackJsonp || `webpackJsonpName`, path: path.join(process.cwd(), `${constants_1.DIST}`), filename: __DEV__
                ? `[name]/js/[name].js`
                : `[name]/js/[name].[chunkhash:5].bundle.js`, chunkFilename: 'common/js/[name].[chunkhash:5].bundle.js', 
            //chunkFilename:path.posix.join('common', 'js/[name]-[id].[chunkhash:5].bundle.js'),
            publicPath: __DEV__ ? publicPath : process.env.cdnRelease || '../' }),
        devtool: __DEV__ && 'cheap-module-source-map',
        resolve: Object.assign(Object.assign({}, webpackConfig.resolve), { extensions: ['.web.js', '.js', '.json', '.ts', '.tsx', '.jsx'], modules: [
                'src',
                'node_modules',
                path.join(process.cwd(), `src`),
                path.join(process.cwd(), `node_modules`),
            ] }),
        module: {
            loaders: [],
        },
        mode: env_1.isDev() ? 'development' : 'production',
        optimization: NewOptimization,
        plugins: [
            ...getHtmlWebpackPlugins(),
            // 雪碧图设置
            ...SpritesmithPlugins,
            ...plugins,
            ...happy_pack_conf_1.happyPackToJsPlugin(),
            ...happy_pack_conf_1.happyPackToTsPlugin(),
            ...(env_1.isDev()
                ? []
                : [
                    new TerserPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: false,
                        extractComments: false,
                        terserOptions: {
                            compress: {
                                drop_debugger: true,
                                drop_console: true,
                            },
                        },
                    }),
                ]),
            /* new HtmlWebpackHarddiskPlugin(), */
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || constants_1.DEV),
                'process.env.environment': '"' + process.env.environment + '"',
                'process.env.apps': '"' + process.env.apps + '"',
                'process.env.webpackJsonp': '"' + process.env.webpackJsonp + '"',
                'process.env.cdnRelease': '"' + process.env.cdnRelease + '"',
            }),
        ],
    };
    if (__DEV__) {
        config.devServer = Object.assign(Object.assign({}, serverProps), { stats: 'errors-only', contentBase: [`./${constants_1.WORKING_DIRECTORY}/`], historyApiFallback: {
                rewrites: apps.map((app) => ({
                    from: constants_1.HISTORY_REWRITE_FALL_BACK_REGEX_FUNC(app),
                    to: `${publicPath}/${app}/index.html`,
                })),
            }, headers: Object.assign({ 'Access-Control-Allow-Origin': '*' }, headers), hot: true, port: defaultPort, publicPath: publicPath, noInfo: noInfo, proxy: proxy, before: function (app) {
                app.use(path.posix.join(`/static`), express.static('./static')); // 代理静态资源
                before && before(app);
            } });
    }
    else {
        if (process.env.environment === 'report') {
            config.plugins.push(new BundleAnalyzerPlugin());
        }
        config.plugins.push(new LegionExtractStaticFilePlugin_1.default());
        config.plugins.push(new CopyWebpackPlugin([
            {
                from: path.join(process.cwd(), `static`),
                to: 'common',
                ignore: ['.*'],
            },
        ]));
    }
    config.module = {
        rules: [
            ...javaScriptLoader_1.getJSXLoadersed(),
            ...javaScriptLoader_1.getTsLoadersed(),
            ...getCssLoaders(),
            ...getImageLoaders(),
            ...getJsonLoaders(),
            ...getFontLoaders(),
            ...getFileResourcesLoaders(),
            ...getTslintLoaders(),
            ...getTemplateJspLoaders(),
        ],
        //noParse: []
    };
    return config;
}
exports.default = getBaseConfig;
