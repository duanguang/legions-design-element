#!/bin/sh
# array_components=['LegionsProEcharts','LegionsProEchartsBox','LegionsProEchartsBoxList','LegionsProEchartsChartBar',
# 'LegionsProEchartsChartCard','LegionsProEchartsChartLine','LegionsProEchartsChartPie','LegionsProEchartsCol',
# 'LegionsProEchartsCore','LegionsProEchartsLayout','LegionsProEchartsLiquidFill','LegionsProEchartsMap','LegionsProEchartsRow']

# for component in ${array_components}

cp -r types/components/index.d.ts es/
cp -r types/components/index.d.ts lib/

cp -r -f types/components/core/*.d.ts es/core/
cp -r -f types/components/core/*.d.ts lib/core/

cp -r -f types/components/core/cross-module/*.d.ts es/core/cross-module/
cp -r -f types/components/core/cross-module/*.d.ts lib/core/cross-module/

cp -r -f types/components/models/* es/models/
cp -r -f types/components/models/* lib/models/

cp -r -f types/components/db/* es/db/
cp -r -f types/components/db/* lib/db/

cp -r -f types/components/services/* es/services/
cp -r -f types/components/services/* lib/services/

cp -r -f types/components/store/* es/store/
cp -r -f types/components/store/* lib/store/

cp -r -f types/components/interface/* es/interface/
cp -r -f types/components/interface/* lib/interface/

cp -r -f types/components/LegionsProBaiduMap/* es/LegionsProBaiduMap/
cp -r -f types/components/LegionsProBaiduMap/* lib/LegionsProBaiduMap/

cp -r -f types/components/LegionsProBreadcrumb/* es/LegionsProBreadcrumb/
cp -r -f types/components/LegionsProBreadcrumb/* lib/LegionsProBreadcrumb/
cp -r -f src/components/LegionsProBreadcrumb/style* lib/LegionsProBreadcrumb/style/
cp -r -f src/components/LegionsProBreadcrumb/style* es/LegionsProBreadcrumb/style/

cp -r -f types/components/LegionsProDataImport/* es/LegionsProDataImport/
cp -r -f types/components/LegionsProDataImport/* lib/LegionsProDataImport/
cp -r -f src/components/LegionsProDataImport/style* lib/LegionsProDataImport/style/
cp -r -f src/components/LegionsProDataImport/style* es/LegionsProDataImport/style/

cp -r -f types/components/LegionsProDragger/* es/LegionsProDragger/
cp -r -f types/components/LegionsProDragger/* lib/LegionsProDragger/

cp -r -f types/components/LegionsProIframe/* es/LegionsProIframe/
cp -r -f types/components/LegionsProIframe/* lib/LegionsProIframe/

cp -r -f types/components/LegionsProInput/* es/LegionsProInput/
cp -r -f types/components/LegionsProInput/* lib/LegionsProInput/

cp -r -f types/components/LegionsProNumericInput/* es/LegionsProNumericInput/
cp -r -f types/components/LegionsProNumericInput/* lib/LegionsProNumericInput/

cp -r -f types/components/LegionsProPrint/* es/LegionsProPrint/
cp -r -f types/components/LegionsProPrint/* lib/LegionsProPrint/

cp -r -f types/components/LegionsProQrCode/* es/LegionsProQrCode/
cp -r -f types/components/LegionsProQrCode/* lib/LegionsProQrCode/

cp -r -f types/components/LegionsProTextArea/* es/LegionsProTextArea/
cp -r -f types/components/LegionsProTextArea/* lib/LegionsProTextArea/

cp -r -f types/components/LegionsProUEditor/* es/LegionsProUEditor/
cp -r -f types/components/LegionsProUEditor/* lib/LegionsProUEditor/

cp -r -f types/components/LegionsProVirtualTable/* es/LegionsProVirtualTable/
cp -r -f types/components/LegionsProVirtualTable/* lib/LegionsProVirtualTable/

cp -r -f types/components/LgeionsProVirtualList/* es/LgeionsProVirtualList/
cp -r -f types/components/LgeionsProVirtualList/* lib/LgeionsProVirtualList/

cp -r -f types/components/LegionsProErrorReportShow/* es/LegionsProErrorReportShow/
cp -r -f types/components/LegionsProErrorReportShow/* lib/LegionsProErrorReportShow/
cp -r -f src/components/LegionsProErrorReportShow/style* lib/LegionsProErrorReportShow/style/
cp -r -f src/components/LegionsProErrorReportShow/style* es/LegionsProErrorReportShow/style/

cp -r -f types/components/LegionsProException/* es/LegionsProException/
cp -r -f types/components/LegionsProException/* lib/LegionsProException/
cp -r -f src/components/LegionsProException/style* lib/LegionsProException/style/
cp -r -f src/components/LegionsProException/style* es/LegionsProException/style/

cp -r -f types/components/LegionsProForm/* es/LegionsProForm/
cp -r -f types/components/LegionsProForm/* lib/LegionsProForm/
cp -r -f src/components/LegionsProForm/style* lib/LegionsProForm/style/
cp -r -f src/components/LegionsProForm/style* es/LegionsProForm/style/

cp -r -f types/components/LegionsProLayout/* es/LegionsProLayout/
cp -r -f types/components/LegionsProLayout/* lib/LegionsProLayout/
cp -r -f src/components/LegionsProLayout/style* lib/LegionsProLayout/style/
cp -r -f src/components/LegionsProLayout/style* es/LegionsProLayout/style/

cp -r -f types/components/LegionsProLineOverflow/* es/LegionsProLineOverflow/
cp -r -f types/components/LegionsProLineOverflow/* lib/LegionsProLineOverflow/
cp -r -f src/components/LegionsProLineOverflow/style* lib/LegionsProLineOverflow/style/
cp -r -f src/components/LegionsProLineOverflow/style* es/LegionsProLineOverflow/style/

cp -r -f types/components/LegionsProModal/* es/LegionsProModal/
cp -r -f types/components/LegionsProModal/* lib/LegionsProModal/
cp -r -f src/components/LegionsProModal/style* lib/LegionsProModal/style/
cp -r -f src/components/LegionsProModal/style* es/LegionsProModal/style/

cp -r -f types/components/LegionsProPageContainer/* es/LegionsProPageContainer/
cp -r -f types/components/LegionsProPageContainer/* lib/LegionsProPageContainer/
cp -r -f src/components/LegionsProPageContainer/style* lib/LegionsProPageContainer/style/
cp -r -f src/components/LegionsProPageContainer/style* es/LegionsProPageContainer/style/

cp -r -f types/components/LegionsProQueryConditions/* es/LegionsProQueryConditions/
cp -r -f types/components/LegionsProQueryConditions/* lib/LegionsProQueryConditions/
cp -r -f src/components/LegionsProQueryConditions/style* lib/LegionsProQueryConditions/style/
cp -r -f src/components/LegionsProQueryConditions/style* es/LegionsProQueryConditions/style/

cp -r -f types/components/LegionsProScrawl/* es/LegionsProScrawl/
cp -r -f types/components/LegionsProScrawl/* lib/LegionsProScrawl/
cp -r -f src/components/LegionsProScrawl/style* lib/LegionsProScrawl/style/
cp -r -f src/components/LegionsProScrawl/style* es/LegionsProScrawl/style/

cp -r -f types/components/LegionsProSelect/* es/LegionsProSelect/
cp -r -f types/components/LegionsProSelect/* lib/LegionsProSelect/
cp -r -f src/components/LegionsProSelect/style* lib/LegionsProSelect/style/
cp -r -f src/components/LegionsProSelect/style* es/LegionsProSelect/style/

cp -r -f types/components/LegionsProTable/* es/LegionsProTable/
cp -r -f types/components/LegionsProTable/* lib/LegionsProTable/
cp -r -f src/components/LegionsProTable/style* lib/LegionsProTable/style/
cp -r -f src/components/LegionsProTable/style* es/LegionsProTable/style/

cp -r -f types/components/LegionsProTableCustomColumns/* es/LegionsProTableCustomColumns/
cp -r -f types/components/LegionsProTableCustomColumns/* lib/LegionsProTableCustomColumns/
cp -r -f src/components/LegionsProTableCustomColumns/style* lib/LegionsProTableCustomColumns/style/
cp -r -f src/components/LegionsProTableCustomColumns/style* es/LegionsProTableCustomColumns/style/

cp -r -f types/components/LegionsProTableForm/* es/LegionsProTableForm/
cp -r -f types/components/LegionsProTableForm/* lib/LegionsProTableForm/
cp -r -f src/components/LegionsProTableForm/style* lib/LegionsProTableForm/style/
cp -r -f src/components/LegionsProTableForm/style* es/LegionsProTableForm/style/

cp -r -f types/components/LegionsProUpload/* es/LegionsProUpload/
cp -r -f types/components/LegionsProUpload/* lib/LegionsProUpload/
cp -r -f src/components/LegionsProUpload/style* lib/LegionsProUpload/style/
cp -r -f src/components/LegionsProUpload/style* es/LegionsProUpload/style/



