"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableIPs = exports.displayAvailableIPs = void 0;
const os = require("os");
const chalk = require(`chalk`);
function displayAvailableIPs() {
    const availableIPs = getAvailableIPs();
    console.info(chalk.green(`available IP addresses:`));
    availableIPs.forEach(availableIP => console.log(chalk.gray(availableIP)));
}
exports.displayAvailableIPs = displayAvailableIPs;
function getAvailableIPs() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
            const address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}
exports.getAvailableIPs = getAvailableIPs;
