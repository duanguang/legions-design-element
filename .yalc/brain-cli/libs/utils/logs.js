"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAppRunning = exports.log = exports.warning = void 0;
const chalk = require('chalk');
const ip_1 = require("./ip");
const importLazy = require('import-lazy')(require);
const boxen = importLazy('boxen');
const pupa = importLazy('pupa');
function warning(message) {
    console.warn(chalk.yellow(`[brain-cli]:${message}`));
}
exports.warning = warning;
function log(info, color = 'green') {
    /* istanbul ignore next */
    console.log(chalk.blue(`[brain-cli]:${chalk[color](info)}`));
}
exports.log = log;
const defaultTemplate = `
App running at:
- Local: ${chalk.hex('#88DFEF')(`{http}://localhost:{port}/{projectUrl}`)}
- Network: ${chalk.hex('#88DFEF')(`{http}://{ip}:{port}/{projectUrl}`)}
- Server: ${chalk.hex('#88DFEF')(`{http}://{server}:{port}/{projectUrl}`)}
- docs☆: ${chalk.hex('#FD8EC5')('https://www.npmjs.com/package/brain-cli')}
`;
function logAppRunning(options) {
    const template = options.message || defaultTemplate;
    //@ts-ignore
    options.boxenOptions = options.boxenOptions || {
        padding: { left: 1, right: 1 },
        align: 'left',
        //@ts-ignore
        float: 'left',
        borderColor: 'green',
        borderStyle: 'round',
    };
    const availableIP = ip_1.getAvailableIPs();
    const message = boxen()(pupa()(template, {
        port: options.port,
        ip: availableIP.length ? availableIP[0] : 'localhost',
        projectUrl: options.projectUrl,
        http: options.https ? 'https' : 'http',
        server: options.server || '0.0.0.0'
    }), options.boxenOptions);
    console.error(message);
}
exports.logAppRunning = logAppRunning;
