"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EConfig_1 = require("./libs/settings/EConfig");
var browsers = EConfig_1.default.getInstance().postcss.autoprefixer.browsers;
module.exports = {
    plugins: [
        require('autoprefixer')({ browsers })
    ]
};
