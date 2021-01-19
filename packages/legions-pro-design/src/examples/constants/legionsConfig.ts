/*
 * @Author: linzeqin
 * @Date: 2020-09-25 12:00:57
 * @description: 第三方插件地址管理
 */

/** 第三方插件列表 */
export const legionsThirdpartyMap: {[x: string]: any}  = {
    excel: {
        name: 'excel',
        url: process.env.environment!=='production' ? 'https://qa-zy.hoolinks.com/static/plugin/excel.min.js' : 'https://hoolinks.com/static/common/plugins/excel.min.js',
    },
    clipboard: {
        name: 'clipboard',
        url: process.env.environment!=='production' ? 'https://qa-zy.hoolinks.com/static/plugin/clipboard.min.js' : 'https://hoolinks.com/static/common/plugins/clipboard.min.js',
    },
    html2canvas: {
        name: 'html2canvas',
        url: process.env.environment!=='production' ? 'https://qa-zy.hoolinks.com/static/plugin/html2canvas.min.js' : 'https://hoolinks.com/static/common/plugins/html2canvas.min.js',
    },
    jsBarcode: {
        name: 'jsBarcode',
        url: process.env.environment!=='production' ? 'https://qa-zy.hoolinks.com/static/plugin/jsbarcode.min.js' : 'https://hoolinks.com/static/common/plugins/jsbarcode.min.js',
    },
    dexie: {
        name: 'dexie',
        url: process.env.environment!=='production' ? 'https://qa-zy.hoolinks.com/static/plugin/dexie.min.js' : 'https://hoolinks.com/static/common/plugins/dexie.min.js',
    },
}
