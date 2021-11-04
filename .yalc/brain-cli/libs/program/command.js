"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const index_1 = require("./index");
const constants_1 = require("../constants/constants");
const logs_1 = require("../utils/logs");
const webpackDllCompiler_1 = require("../webpack/webpackDllCompiler");
class Command {
    constructor() {
        this.commands = ['build', 'start', 'dev', 'dll'];
        this.env = {
            dev: '开发环境',
            dist: '预发布环境',
            prod: '生产环境',
            test: '测试环境'
        };
        this.program = program;
    }
    setProcessEnv(env) {
        if (env === 'dev') {
            process.env.environment = constants_1.DEV;
            process.env.NODE_ENV = constants_1.DEV;
        }
        else if (env === 'dist') {
            process.env.environment = constants_1.DIST;
            process.env.NODE_ENV = constants_1.PRODUCTION;
        }
        else if (env === 'prod') {
            process.env.environment = constants_1.PRODUCTION;
            process.env.NODE_ENV = constants_1.PRODUCTION;
        }
        else if (env === 'test') {
            process.env.environment = constants_1.TEST;
            process.env.NODE_ENV = constants_1.PRODUCTION;
        }
        else if (env === 'report') {
            process.env.environment = constants_1.REPORT;
            process.env.NODE_ENV = constants_1.PRODUCTION;
        }
        else {
            process.env.environment = env;
            process.env.NODE_ENV = constants_1.PRODUCTION;
        }
    }
    version() {
        const pkg = require(path.resolve(__dirname, '../../package.json'));
        this.program.version(pkg.version);
    }
    option() {
        this.program
            .option('-V,--version', 'output the version number')
            .description(`${chalk.green('webpack building tool')}`);
    }
    setApps(options) {
        process.env.apps = '';
        if (options && options['apps']) {
            if (typeof options['apps'] !== 'boolean') {
                // warning(`打包范围为[全部app]...`);
                process.env.apps = options['apps'];
            }
        }
    }
    dev() {
        this.program
            .command('dev')
            .option('--apps [value]', 'webpack Build a specified app name')
            .description('start webpack dev server for develoment mode')
            .action(options => {
            let env = 'dev';
            this.setProcessEnv(env);
            this.setApps(options);
            logs_1.log(`当前编译环境为: ${process.env.NODE_ENV} [${this.env[env]}]`);
            index_1.default(env);
        });
    }
    start() {
        this.program
            .command('start')
            .option('--apps [value]', 'webpack Build a specified app name')
            .description('start webpack dev server for develoment mode')
            .action(options => {
            let env = 'dev';
            this.setProcessEnv(env);
            this.setApps(options);
            logs_1.log(`当前编译环境为: ${process.env.NODE_ENV} [${this.env[env]}]`);
            index_1.default(env);
        });
    }
    dll() {
        this.program
            .command('dll')
            .description('webpack dll build')
            .action((env) => __awaiter(this, void 0, void 0, function* () {
            /**
             * 按需创建编译webpack dll manifest文件
             */
            yield webpackDllCompiler_1.default();
            yield webpackDllCompiler_1.webpackDllPluginsCompiler();
        }));
    }
    build() {
        this.program
            .command('build [env]')
            .option('-s', 'webpack build size analyzer tool, support size: default analyzer')
            .option('--apps [value]', 'webpack Build a specified app name')
            .option('--webpackJsonp [value]', 'webpack Generate a specified webpackJsonp name')
            .option('--cdn [value]', 'The resource distribution server')
            .description('webpack building')
            .action((env = 'prod', options) => {
            this.setProcessEnv(options.S ? 'report' : env);
            this.setApps(options);
            process.env.webpackJsonp = options['webpackJsonp']
                ? options['webpackJsonp']
                : 'webpackJsonpName';
            process.env.cdnRelease = options['cdn']
                ? options['cdn']
                : '';
            logs_1.log(`当前编译环境为: ${process.env.NODE_ENV} [${this.env[env] || env}]`);
            index_1.default(process.env.NODE_ENV, options);
        });
    }
    command() {
        this.commands.forEach(cmd => {
            if (this[cmd]) {
                this[cmd].apply(this);
            }
            else {
                console.log(chalk.red(`The command [${cmd}] is not implemented!`));
            }
        });
    }
    parse() {
        this.program.parse(process.argv);
    }
    run() {
        this.version();
        this.option();
        this.command();
        this.parse();
    }
}
exports.Command = Command;
