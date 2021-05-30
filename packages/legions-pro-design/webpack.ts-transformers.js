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
      { name: 'HLDataImport', props: 'uniqueUid' },
    ],
  }),] });

// 4. export getCustomTransformers
module.exports = getCustomTransformers;