"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeModulesPath = exports.URL_PREFIX = exports.HISTORY_REWRITE_FALL_BACK_REGEX_FUNC = exports.WORKING_DIRECTORY = exports.WEBPACK_DLL_MANIFEST_DIST = exports.REPORT = exports.TEST = exports.PRODUCTION = exports.DEV = exports.DIST = exports.PROJECT_USER_CONFIG_IGNORE_FILE = exports.PROJECT_USER_CONFIG_FILE = void 0;
const path = require("path");
exports.PROJECT_USER_CONFIG_FILE = `.e-config.js`;
exports.PROJECT_USER_CONFIG_IGNORE_FILE = `.e-config-ignore.js`;
exports.DIST = `dist`;
exports.DEV = `dev`;
exports.PRODUCTION = `production`;
exports.TEST = 'test';
exports.REPORT = 'report';
// export const WEBPACK_DLL_MANIFEST_DIST = path.join(process.cwd(), 'node_modules/.cache', 'library-manifest');
exports.WEBPACK_DLL_MANIFEST_DIST = path.join(process.cwd(), '.cache', 'library-manifest');
const EConfig_1 = require("../settings/EConfig");
exports.WORKING_DIRECTORY = `src`;
const HISTORY_REWRITE_FALL_BACK_REGEX_FUNC = (name) => {
    const { name: projectName } = EConfig_1.default.getInstance();
    const path = `${exports.URL_PREFIX}/${projectName}/${name}`;
    return new RegExp(`^/((${path}(?=/)|(${path}$)))`);
};
exports.HISTORY_REWRITE_FALL_BACK_REGEX_FUNC = HISTORY_REWRITE_FALL_BACK_REGEX_FUNC;
exports.URL_PREFIX = `app`;
exports.nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
