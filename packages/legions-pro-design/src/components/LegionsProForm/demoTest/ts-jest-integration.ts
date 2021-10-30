/*
 * @Author: duanguang
 * @Date: 2021-08-12 00:44:22
 * @LastEditTime: 2021-08-12 00:50:15
 * @LastEditors: duanguang
 * @Description:  https://github.com/formatjs/formatjs/blob/main/packages/ts-transformer/ts-jest-integration.ts
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProForm/demoTest/ts-jest-integration.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」 https://formatjs.io/docs/tooling/ts-transformer/
 */
import type { ConfigSet } from 'ts-jest/dist/config/config-set'
const {
    createTransformer,
    createTransformerReactJsxProps,
  } = require('ts-plugin-legions');
export function factory(cs: ConfigSet) {
   return createTransformerReactJsxProps(cs.compilerModule,{
        components: [
          { name: 'LegionsProTable', props: 'uniqueUid', value: '' },
          { name: 'LegionsProForm', props: 'uniqueUid' },
          { name: 'LegionsProTabsForm', props: 'uniqueUid' },
          { name: 'LegionsProTabsForm', props: 'uniqueUid' },
          { name: 'LegionsProConditions', props: 'uniqueUid' },
        ],
      })
  }