#!/bin/sh
# array_components=['LegionsProEcharts','LegionsProEchartsBox','LegionsProEchartsBoxList','LegionsProEchartsChartBar',
# 'LegionsProEchartsChartCard','LegionsProEchartsChartLine','LegionsProEchartsChartPie','LegionsProEchartsCol',
# 'LegionsProEchartsCore','LegionsProEchartsLayout','LegionsProEchartsLiquidFill','LegionsProEchartsMap','LegionsProEchartsRow']

# for component in ${array_components}

cp -r types/src/components/index.d.ts es/
cp -r types/src/components/index.d.ts lib/

cp -r -f types/src/components/LegionsCore/*.d.ts es/LegionsCore/
cp -r -f types/src/components/LegionsCore/*.d.ts lib/LegionsCore/

cp -r -f types/src/components/LegionsCrossModule/*.d.ts es/LegionsCrossModule/
cp -r -f types/src/components/LegionsCrossModule/*.d.ts lib/LegionsCrossModule/


cp -r -f types/src/components/LegionsModels/* es/LegionsModels/
cp -r -f types/src/components/LegionsModels/* lib/LegionsModels/

cp -r -f types/src/components/db/* es/db/
cp -r -f types/src/components/db/* lib/db/

cp -r -f types/src/components/services/* es/services/
cp -r -f types/src/components/services/* lib/services/

cp -r -f types/src/components/LegionsStore/* es/LegionsStore/
cp -r -f types/src/components/LegionsStore/* lib/LegionsStore/

cp -r -f types/src/components/LegionsStoreConditions/* es/LegionsStoreConditions/
cp -r -f types/src/components/LegionsStoreConditions/* lib/LegionsStoreConditions/

cp -r -f types/src/components/LegionsStoreForm/* es/LegionsStoreForm/
cp -r -f types/src/components/LegionsStoreForm/* lib/LegionsStoreForm/

cp -r -f types/src/components/LegionsStoreLayout/* es/LegionsStoreLayout/
cp -r -f types/src/components/LegionsStoreLayout/* lib/LegionsStoreLayout/

cp -r -f types/src/components/LegionsStoreModal/* es/LegionsStoreModal/
cp -r -f types/src/components/LegionsStoreModal/* lib/LegionsStoreModal/

cp -r -f types/src/components/LegionsStoreTable/* es/LegionsStoreTable/
cp -r -f types/src/components/LegionsStoreTable/* lib/LegionsStoreTable/

cp -r -f types/src/components/interface/* es/interface/
cp -r -f types/src/components/interface/* lib/interface/

cp -r -f types/src/components/LegionsProBaiduMap/* es/LegionsProBaiduMap/
cp -r -f types/src/components/LegionsProBaiduMap/* lib/LegionsProBaiduMap/

cp -r -f types/src/components/LegionsProBreadcrumb/* es/LegionsProBreadcrumb/
cp -r -f types/src/components/LegionsProBreadcrumb/* lib/LegionsProBreadcrumb/
cp -r -f src/components/LegionsProBreadcrumb/style/* lib/LegionsProBreadcrumb/style/
cp -r -f src/components/LegionsProBreadcrumb/style/* es/LegionsProBreadcrumb/style/

cp -r -f types/src/components/LegionsProDataImport/* es/LegionsProDataImport/
cp -r -f types/src/components/LegionsProDataImport/* lib/LegionsProDataImport/
cp -r -f src/components/LegionsProDataImport/style/* lib/LegionsProDataImport/style/
cp -r -f src/components/LegionsProDataImport/style/* es/LegionsProDataImport/style/

cp -r -f types/src/components/LegionsProDragger/* es/LegionsProDragger/
cp -r -f types/src/components/LegionsProDragger/* lib/LegionsProDragger/

cp -r -f types/src/components/LegionsProIframe/* es/LegionsProIframe/
cp -r -f types/src/components/LegionsProIframe/* lib/LegionsProIframe/

cp -r -f types/src/components/LegionsProInput/* es/LegionsProInput/
cp -r -f types/src/components/LegionsProInput/* lib/LegionsProInput/

cp -r -f types/src/components/LegionsProNumericInput/* es/LegionsProNumericInput/
cp -r -f types/src/components/LegionsProNumericInput/* lib/LegionsProNumericInput/

cp -r -f types/src/components/LegionsProPrint/* es/LegionsProPrint/
cp -r -f types/src/components/LegionsProPrint/* lib/LegionsProPrint/

cp -r -f types/src/components/LegionsProQrCode/* es/LegionsProQrCode/
cp -r -f types/src/components/LegionsProQrCode/* lib/LegionsProQrCode/

cp -r -f types/src/components/LegionsProTextArea/* es/LegionsProTextArea/
cp -r -f types/src/components/LegionsProTextArea/* lib/LegionsProTextArea/

cp -r -f types/src/components/LegionsProUEditor/* es/LegionsProUEditor/
cp -r -f types/src/components/LegionsProUEditor/* lib/LegionsProUEditor/

cp -r -f types/src/components/LegionsProVirtualTable/* es/LegionsProVirtualTable/
cp -r -f types/src/components/LegionsProVirtualTable/* lib/LegionsProVirtualTable/

cp -r -f types/src/components/LgeionsProVirtualList/* es/LgeionsProVirtualList/
cp -r -f types/src/components/LgeionsProVirtualList/* lib/LgeionsProVirtualList/

cp -r -f types/src/components/LegionsProTabsForm/* es/LegionsProTabsForm/
cp -r -f types/src/components/LegionsProTabsForm/* lib/LegionsProTabsForm/

cp -r -f types/src/components/LegionsProModalForm/* es/LegionsProModalForm/
cp -r -f types/src/components/LegionsProModalForm/* lib/LegionsProModalForm/

cp -r -f types/src/components/LegionsProErrorReportShow/* es/LegionsProErrorReportShow/
cp -r -f types/src/components/LegionsProErrorReportShow/* lib/LegionsProErrorReportShow/
cp -r -f src/components/LegionsProErrorReportShow/style/* lib/LegionsProErrorReportShow/style/
cp -r -f src/components/LegionsProErrorReportShow/style/* es/LegionsProErrorReportShow/style/

cp -r -f types/src/components/LegionsProException/* es/LegionsProException/
cp -r -f types/src/components/LegionsProException/* lib/LegionsProException/
cp -r -f src/components/LegionsProException/style/* lib/LegionsProException/style/
cp -r -f src/components/LegionsProException/style/* es/LegionsProException/style/

cp -r -f types/src/components/LegionsProForm/* es/LegionsProForm/
cp -r -f types/src/components/LegionsProForm/* lib/LegionsProForm/
cp -r -f src/components/LegionsProForm/style/* lib/LegionsProForm/style/
cp -r -f src/components/LegionsProForm/style/* es/LegionsProForm/style/

cp -r -f types/src/components/LegionsProLayout/* es/LegionsProLayout/
cp -r -f types/src/components/LegionsProLayout/* lib/LegionsProLayout/
cp -r -f src/components/LegionsProLayout/style/* lib/LegionsProLayout/style/
cp -r -f src/components/LegionsProLayout/style/* es/LegionsProLayout/style/

cp -r -f types/src/components/LegionsProLineOverflow/* es/LegionsProLineOverflow/
cp -r -f types/src/components/LegionsProLineOverflow/* lib/LegionsProLineOverflow/
cp -r -f src/components/LegionsProLineOverflow/style/* lib/LegionsProLineOverflow/style/
cp -r -f src/components/LegionsProLineOverflow/style/* es/LegionsProLineOverflow/style/

cp -r -f types/src/components/LegionsProModal/* es/LegionsProModal/
cp -r -f types/src/components/LegionsProModal/* lib/LegionsProModal/
cp -r -f src/components/LegionsProModal/style/* lib/LegionsProModal/style/
cp -r -f src/components/LegionsProModal/style/* es/LegionsProModal/style/

cp -r -f types/src/components/LegionsProPageContainer/* es/LegionsProPageContainer/
cp -r -f types/src/components/LegionsProPageContainer/* lib/LegionsProPageContainer/
cp -r -f src/components/LegionsProPageContainer/style/* lib/LegionsProPageContainer/style/
cp -r -f src/components/LegionsProPageContainer/style/* es/LegionsProPageContainer/style/

cp -r -f types/src/components/LegionsProConditions/* es/LegionsProConditions/
cp -r -f types/src/components/LegionsProConditions/* lib/LegionsProConditions/
cp -r -f src/components/LegionsProConditions/style/* lib/LegionsProConditions/style/
cp -r -f src/components/LegionsProConditions/style/* es/LegionsProConditions/style/

cp -r -f types/src/components/LegionsProScrawl/* es/LegionsProScrawl/
cp -r -f types/src/components/LegionsProScrawl/* lib/LegionsProScrawl/
cp -r -f src/components/LegionsProScrawl/style/* lib/LegionsProScrawl/style/
cp -r -f src/components/LegionsProScrawl/style/* es/LegionsProScrawl/style/

cp -r -f types/src/components/LegionsProSelect/* es/LegionsProSelect/
cp -r -f types/src/components/LegionsProSelect/* lib/LegionsProSelect/
cp -r -f src/components/LegionsProSelect/style/* lib/LegionsProSelect/style/
cp -r -f src/components/LegionsProSelect/style/* es/LegionsProSelect/style/

cp -r -f types/src/components/LegionsProTable/* es/LegionsProTable/
cp -r -f types/src/components/LegionsProTable/* lib/LegionsProTable/
cp -r -f src/components/LegionsProTable/style/* lib/LegionsProTable/style/
cp -r -f src/components/LegionsProTable/style/* es/LegionsProTable/style/

cp -r -f types/src/components/LegionsProTableCustomColumns/* es/LegionsProTableCustomColumns/
cp -r -f types/src/components/LegionsProTableCustomColumns/* lib/LegionsProTableCustomColumns/
cp -r -f src/components/LegionsProTableCustomColumns/style/* lib/LegionsProTableCustomColumns/style/
cp -r -f src/components/LegionsProTableCustomColumns/style/* es/LegionsProTableCustomColumns/style/

cp -r -f types/src/components/LegionsProTableForm/* es/LegionsProTableForm/
cp -r -f types/src/components/LegionsProTableForm/* lib/LegionsProTableForm/
cp -r -f src/components/LegionsProTableForm/style/* lib/LegionsProTableForm/style/
cp -r -f src/components/LegionsProTableForm/style/* es/LegionsProTableForm/style/

cp -r -f types/src/components/LegionsProUpload/* es/LegionsProUpload/
cp -r -f types/src/components/LegionsProUpload/* lib/LegionsProUpload/
cp -r -f src/components/LegionsProUpload/style/* lib/LegionsProUpload/style/
cp -r -f src/components/LegionsProUpload/style/* es/LegionsProUpload/style/



