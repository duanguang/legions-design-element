"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chkUpdateNotifier = void 0;
const UpdateNotifier = require("update-notifier");
const chalk = require('chalk');
const pkg = require('../../package.json');
/** 首次通知时间 */
let execTimeStamp = 0;
/**
 * 如果出现cli的新版本, 通过下面方面能够获得相关提示
 *
 */
const notifier = UpdateNotifier({
    pkg,
    updateCheckInterval: 40,
    // @ts-ignore
    shouldNotifyInNpmScript: true,
});
const execNotify = () => {
    if (notifier.update &&
        ['major', 'minor', 'patch'].indexOf(notifier.update.type) > -1) {
        const update = notifier.update;
        notifier.notify({
            message: `${chalk
                .hex('#24E488')
                .bold(`${update.name}: New version found`)} \n update available ${chalk.hex('#909196')(update.current)} → ${chalk.green(update.latest)} \n Run ${chalk.hex('#88DFEF')(`yarn add ${update.name}`)} to update
                `,
            defer: false,
            //@ts-ignore
            boxenOptions: {
                //@ts-ignore
                float: 'left',
                //@ts-ignore
                margin: {
                    top: 0,
                },
                borderColor: 'yellow',
                borderStyle: 'round',
                align: 'center',
                padding: 1,
            },
        });
        execTimeStamp = Date.now();
    }
};
const interval = 20 * 60000;
const chkUpdateNotifier = () => {
    let currTime = Date.now();
    if (execTimeStamp === 0) {
        execNotify();
        execTimeStamp = Date.now();
    }
    else if (currTime - execTimeStamp > interval) {
        execNotify();
        execTimeStamp = Date.now();
    }
};
exports.chkUpdateNotifier = chkUpdateNotifier;
