"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EConfig_1 = require("./EConfig");
const hash_1 = require("../utils/hash");
const fs = require("fs");
const constants_1 = require("../constants/constants");
const path = require("path");
const node_1 = require("../utils/node");
class WebpackDllManifest {
    constructor() {
        /*  this.vendors = EConfig.getInstance().webpack.dllConfig.vendors; */
        if (typeof EConfig_1.default.getInstance().webpack.dllConfig.vendors === 'object') {
            if (Array.isArray(EConfig_1.default.getInstance().webpack.dllConfig.vendors)) {
                this.vendors = EConfig_1.default.getInstance().webpack.dllConfig.vendors;
            }
            else {
                const vendors = EConfig_1.default.getInstance().webpack.dllConfig.vendors;
                this.vendors = vendors.value;
            }
        }
        this.distPath = constants_1.WEBPACK_DLL_MANIFEST_DIST;
    }
    static getInstance() {
        if (!WebpackDllManifest.instance) {
            WebpackDllManifest.instance = new WebpackDllManifest();
        }
        return WebpackDllManifest.instance;
    }
    getVendorsHash() {
        const isVendorsExist = this.vendors && this.vendors.length;
        if (!this.hashValue && isVendorsExist) {
            const identifier = this.vendors.reduce((prev, vendorName) => {
                const vendorVersion = WebpackDllManifest.getVendorVersion(vendorName);
                /**
                 * 这里采取拼接的方式是因为vendors的是一个array, 且顺序为dll编译顺序
                 * 拼接的结果作为唯一标识, hash base64后得到一个简短合法用于唯一标识的文件名
                 */
                return prev + vendorName + vendorVersion;
            }, ``);
            this.hashValue = hash_1.shortHashMd5(identifier);
        }
        return this.hashValue;
    }
    getDllPluginsHash(vendors) {
        const isVendorsExist = vendors && vendors.length;
        let hashValue = '';
        if (isVendorsExist) {
            const identifier = vendors.reduce((prev, vendorName) => {
                const vendorVersion = WebpackDllManifest.getVendorVersion(vendorName);
                /**
                 * 这里采取拼接的方式是因为vendors的是一个array, 且顺序为dll编译顺序
                 * 拼接的结果作为唯一标识, hash base64后得到一个简短合法用于唯一标识的文件名
                 */
                return prev + vendorName + vendorVersion;
            }, ``);
            hashValue = hash_1.shortHashMd5(identifier);
        }
        return hashValue;
    }
    static getVendorVersion(vendorName, baseDir = process.cwd()) {
        const packageJson = node_1.emulateNodeRecursiveLookup(baseDir, `node_modules/${vendorName}/package.json`);
        let vendorVersion = '';
        if (!packageJson) {
            console.warn(`vendor[${vendorName}] package not found`);
            // throw new Error(`vendor[${vendorName}] package not found`);
        }
        else {
            vendorVersion = packageJson.version;
        }
        if (!vendorVersion) {
            console.warn(`vendor[${vendorName}] version is empty`);
            //throw new Error(`vendor[${vendorName}] version is empty`);
        }
        return vendorVersion;
    }
    isCompileManifestDirty(entityName = 'vendor', vendorHash = this.getVendorsHash()) {
        try {
            return !fs.existsSync(this.resolveManifestPath(entityName, vendorHash));
        }
        catch (e) {
            return true;
        }
    }
    resolveManifestPath(entityName = 'vendor', vendorHash = this.getVendorsHash()) {
        /**
         * require.resolve为了提前判断是否存在该模块
         */
        try {
            // return require.resolve(path.resolve(this.distPath, this.getVendorsHash() + `.js`))
            return require.resolve(path.resolve(this.distPath, `${entityName}.dll.${vendorHash}` + `.js`));
        }
        catch (e) {
            return null;
        }
    }
}
exports.default = WebpackDllManifest;
