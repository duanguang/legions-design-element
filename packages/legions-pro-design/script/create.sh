#!/bin/sh

# array_components=['LegionsProEcharts','LegionsProEchartsBox','LegionsProEchartsBoxList','LegionsProEchartsChartBar',
# 'LegionsProEchartsChartCard','LegionsProEchartsChartLine','LegionsProEchartsChartPie','LegionsProEchartsCol',
# 'LegionsProEchartsCore','LegionsProEchartsLayout','LegionsProEchartsLiquidFill','LegionsProEchartsMap','LegionsProEchartsRow']

# for component in ${array_components}

cp -r types/components/index.d.ts es/
cp -r types/components/index.d.ts lib/

cp -r -f types/components/core/*.d.ts es/core/
cp -r -f types/components/core/*.d.ts lib/core/

cp -r -f types/components/LegionsProEcharts/*.d.ts es/LegionsProEcharts/
cp -r -f types/components/LegionsProEcharts/*.d.ts lib/LegionsProEcharts/

cp -r -f types/components/LegionsProEchartsBox/*.d.ts es/LegionsProEchartsBox/
cp -r -f types/components/LegionsProEchartsBox/*.d.ts lib/LegionsProEchartsBox/


cp -r -f types/components/LegionsProEchartsBoxList/*.d.ts es/LegionsProEchartsBoxList/
cp -r -f types/components/LegionsProEchartsBoxList/*.d.ts lib/LegionsProEchartsBoxList/


cp -r -f types/components/LegionsProEchartsChartBar/*.d.ts es/LegionsProEchartsChartBar/
cp -r -f types/components/LegionsProEchartsChartBar/*.d.ts lib/LegionsProEchartsChartBar/


cp -r -f types/components/LegionsProEchartsChartCard/*.d.ts es/LegionsProEchartsChartCard/
cp -r -f types/components/LegionsProEchartsChartCard/*.d.ts lib/LegionsProEchartsChartCard/



cp -r -f types/components/LegionsProEchartsChartLine/*.d.ts es/LegionsProEchartsChartLine/
cp -r -f types/components/LegionsProEchartsChartLine/*.d.ts lib/LegionsProEchartsChartLine/

cp -r -f types/components/LegionsProEchartsChartPie/*.d.ts es/LegionsProEchartsChartPie/
cp -r -f types/components/LegionsProEchartsChartPie/*.d.ts lib/LegionsProEchartsChartPie/

cp -r -f types/components/LegionsProEchartsCol/*.d.ts es/LegionsProEchartsCol/
cp -r -f types/components/LegionsProEchartsCol/*.d.ts lib/LegionsProEchartsCol/

cp -r -f types/components/LegionsProEchartsCore/*.d.ts es/LegionsProEchartsCore/
cp -r -f types/components/LegionsProEchartsCore/*.d.ts lib/LegionsProEchartsCore/

cp -r -f types/components/LegionsProEchartsLayout/*.d.ts es/LegionsProEchartsLayout/
cp -r -f types/components/LegionsProEchartsLayout/*.d.ts lib/LegionsProEchartsLayout/

cp -r -f types/components/LegionsProEchartsLiquidFill/*.d.ts es/LegionsProEchartsLiquidFill/
cp -r -f types/components/LegionsProEchartsLiquidFill/*.d.ts lib/LegionsProEchartsLiquidFill/

cp -r -f types/components/LegionsProEchartsMap/*.d.ts es/LegionsProEchartsMap/
cp -r -f types/components/LegionsProEchartsMap/*.d.ts lib/LegionsProEchartsMap/

cp -r -f types/components/LegionsProEchartsRow/*.d.ts es/LegionsProEchartsRow/
cp -r -f types/components/LegionsProEchartsRow/*.d.ts lib/LegionsProEchartsRow/

cp -r -f types/components/LegionsProLineOverflow/*.d.ts es/LegionsProLineOverflow/
cp -r -f types/components/LegionsProLineOverflow/*.d.ts lib/LegionsProLineOverflow/
