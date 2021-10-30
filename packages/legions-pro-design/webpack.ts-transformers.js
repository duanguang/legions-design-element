/*
 * @Author: duanguang
 * @Date: 2021-05-30 21:04:12
 * @LastEditTime: 2021-08-09 22:44:50
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/webpack.ts-transformers.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const {
    createTransformer,
    createTransformerReactJsxProps,
  } = require('ts-plugin-legions');
// 2. create a transformer;
// the factory additionally accepts an options object which described below

// 3. create getCustomTransformer function
const getCustomTransformers = () => ({ before: [createTransformer([
    {
      libraryName: 'legions/store',
      bindings: ['StoreModules'],
    },
  ]),
  createTransformerReactJsxProps({
    components: [
      { name: 'LegionsProTable', props: 'uniqueUid', value: '' },
      { name: 'LegionsProForm', props: 'uniqueUid' },
      { name: 'LegionsProTabsForm', props: 'uniqueUid' },
      { name: 'LegionsProTabsForm', props: 'uniqueUid' },
      { name: 'LegionsProConditions', props: 'uniqueUid' },
    ],
  }),] });
// 4. export getCustomTransformers
module.exports = getCustomTransformers;