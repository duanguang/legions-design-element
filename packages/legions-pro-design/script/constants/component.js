/*
 * @Author: duanguang
 * @Date: 2021-09-28 23:07:31
 * @LastEditTime: 2021-12-07 23:07:04
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/script/constants/component.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const TableComponent = ['LegionsStoreTable','LegionsProTableCustomColumns',
'LegionsProTableForm','LegionsProTable','LegionsProVirtualTable']
const FormComponent = [
    // 'LegionsStoreForm','LegionsProModalForm','LegionsProTabsForm',
    'LegionsProForm',]
const ModalComponet = ['LegionsStoreModal','LegionsProModal']
const ConditionsComponent = ['LegionsStoreConditions','LegionsProConditions']
const GeneralComponent = ['LegionsProBreadcrumb','LegionsProInput',
    'LegionsProNumericInput','LegionsProTextArea','LegionsProSelect']
const DataEntryCompoent = ['LegionsProDataImport','LegionsProUpload','LgeionsProVirtualList']
const DataDisplayTypeComponent = [
    'LegionsProException','LegionsProLineOverflow','LegionsProDragger','LegionsProBaiduMap',
    'LegionsProQrCode','LegionsProPrint','LegionsProScrawl','LegionsProUEditor'
]
const StoreModules = ['LegionsStore']
const DataModules = ['db','LegionsModels','services']
const CommonModules = ['LegionsCore','LegionsCrossModule']
const EntityModules = ['index']
const LayoutComponent = ['LegionsProIframe','LegionsStoreLayout','LegionsProLayout','LegionsProPageContainer']

const BUILD_TYPE = {
    TableComponent,
    FormComponent,
    ModalComponet,
    ConditionsComponent,
    GeneralComponent,
    DataEntryCompoent,
    DataDisplayTypeComponent,
    LayoutComponent,
    StoreModules,
    DataModules,
    CommonModules,
    EntityModules,
}
module.exports = {
    BUILD_TYPE,
}