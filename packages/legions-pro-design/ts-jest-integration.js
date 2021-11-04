/*
 * @Author: duanguang
 * @Date: 2021-08-12 00:44:22
 * @LastEditTime: 2021-08-12 23:38:18
 * @LastEditors: duanguang
 * @Description:  https://github.com/formatjs/formatjs/blob/main/packages/ts-transformer/ts-jest-integration.ts
 * @FilePath: /legions-design-element/packages/legions-pro-design/ts-jest-integration.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」 https://formatjs.io/docs/tooling/ts-transformer/
 */
const {
    createTransformer,
    createTransformerReactJsxProps,
} = require('ts-plugin-legions');

function factory(cs) {
    return createTransformerReactJsxProps({
        components: [{
                name: 'LegionsProTable',
                props: 'uniqueUid',
                value: ''
            },
            {
                name: 'LegionsProForm',
                props: 'uniqueUid'
            },
            {
                name: 'LegionsProTabsForm',
                props: 'uniqueUid'
            },
            {
                name: 'LegionsProTabsForm',
                props: 'uniqueUid'
            },
            {
                name: 'LegionsProConditions',
                props: 'uniqueUid'
            },
        ],
    })
}
module.exports = {
    factory
}
