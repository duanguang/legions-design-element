#!/bin/sh

# array_components=['LegionsProEcharts','LegionsProEchartsBox','LegionsProEchartsBoxList','LegionsProEchartsChartBar',
# 'LegionsProEchartsChartCard','LegionsProEchartsChartLine','LegionsProEchartsChartPie','LegionsProEchartsCol',
# 'LegionsProEchartsCore','LegionsProEchartsLayout','LegionsProEchartsLiquidFill','LegionsProEchartsMap','LegionsProEchartsRow']

# for component in ${array_components}

cp -r -f ./types/components/index.d.ts ./es/
# cp -r -f ./types/components/index.d.ts ./lib/

cp -r -f ./types/components/core/*.d.ts ./es/core/
# cp -r -f ./types/components/core/*.d.ts ./lib/core/

cp -r -f ./types/components/interface/*.d.ts ./es/interface/
# cp -r -f ./types/components/interface/*.d.ts ./lib/interface/

cp -r -f ./types/components/LegionsProEchartsBox/*.d.ts ./es/LegionsProEchartsBox/
# cp -r -f ./types/components/LegionsProEchartsBox/*.d.ts ./lib/LegionsProEchartsBox/
cp -r -f ./src/components/LegionsProEchartsBox/style/* ./es/LegionsProEchartsBox/style
# cp -r -f ./src/components/LegionsProEchartsBox/style/* ./lib/LegionsProEchartsBox/style

cp -r -f ./types/components/LegionsProEcharts/*.d.ts ./es/LegionsProEcharts/
# cp -r -f ./types/components/LegionsProEcharts/*.d.ts ./lib/LegionsProEcharts/

cp -r -f ./types/components/LegionsProEchartsCore/*.d.ts ./es/LegionsProEchartsCore/
# cp -r -f ./types/components/LegionsProEchartsCore/*.d.ts ./lib/LegionsProEchartsCore/

cp -r -f ./types/components/LegionsProEchartsChartBar/*.d.ts ./es/LegionsProEchartsChartBar/
# cp -r -f ./types/components/LegionsProEchartsChartBar/*.d.ts ./lib/LegionsProEchartsChartBar/

cp -r -f ./types/components/LegionsProEchartsChartCard/*.d.ts ./es/LegionsProEchartsChartCard/
# cp -r -f ./types/components/LegionsProEchartsChartCard/*.d.ts ./lib/LegionsProEchartsChartCard/

cp -r -f ./types/components/LegionsProEchartsChartLine/*.d.ts ./es/LegionsProEchartsChartLine/
# cp -r -f ./types/components/LegionsProEchartsChartLine/*.d.ts ./lib/LegionsProEchartsChartLine/

cp -r -f ./types/components/LegionsProEchartsChartPie/*.d.ts ./es/LegionsProEchartsChartPie/
# cp -r -f ./types/components/LegionsProEchartsChartPie/*.d.ts ./lib/LegionsProEchartsChartPie/

cp -r -f ./types/components/LegionsProEchartsChartRadar/*.d.ts ./es/LegionsProEchartsChartRadar/
# cp -r -f ./types/components/LegionsProEchartsChartRadar/*.d.ts ./lib/LegionsProEchartsChartRadar/

cp -r -f ./types/components/LegionsProEchartsChartGauge/*.d.ts ./es/LegionsProEchartsChartGauge/
# cp -r -f ./types/components/LegionsProEchartsChartGauge/*.d.ts ./lib/LegionsProEchartsChartGauge/

cp -r -f ./types/components/LegionsProEchartsLayout/*.d.ts ./es/LegionsProEchartsLayout/
# cp -r -f ./types/components/LegionsProEchartsLayout/*.d.ts ./lib/LegionsProEchartsLayout/
cp -r -f ./src/components/LegionsProEchartsLayout/style/* ./es/LegionsProEchartsLayout/style/
# cp -r -f ./src/components/LegionsProEchartsLayout/style/* ./lib/LegionsProEchartsLayout/style

cp -r -f ./types/components/LegionsProEchartsLiquidFill/*.d.ts ./es/LegionsProEchartsLiquidFill/
# cp -r -f ./types/components/LegionsProEchartsLiquidFill/*.d.ts ./lib/LegionsProEchartsLiquidFill/

cp -r -f ./types/components/LegionsProEchartsWordCloud/*.d.ts ./es/LegionsProEchartsWordCloud/
# cp -r -f ./types/components/LegionsProEchartsWordCloud/*.d.ts ./lib/LegionsProEchartsWordCloud/

cp -r -f ./types/components/LegionsProEchartsMap/*.d.ts ./es/LegionsProEchartsMap/
# cp -r -f ./types/components/LegionsProEchartsMap/*.d.ts ./lib/LegionsProEchartsMap/

cp -r -f ./types/components/LegionsProEchartsHeader/*.d.ts ./es/LegionsProEchartsHeader/
# cp -r -f ./types/components/LegionsProEchartsHeader/*.d.ts ./lib/LegionsProEchartsHeader/
cp -r -f ./src/components/LegionsProEchartsHeader/style/* ./es/LegionsProEchartsHeader/style
# cp -r -f ./src/components/LegionsProEchartsHeader/style/* ./lib/LegionsProEchartsHeader/style

cp -r -f ./types/components/LegionsProEchartsParts/* ./es/LegionsProEchartsParts/
# cp -r -f ./types/components/LegionsProEchartsParts/* ./lib/LegionsProEchartsParts/
cp -r -f ./src/components/LegionsProEchartsParts/style/* ./es/LegionsProEchartsParts/style/
# cp -r -f ./src/components/LegionsProEchartsParts/style/* ./lib/LegionsProEchartsParts/

cp -r -f ./src/components/locale/* ./es/locale/
cp -r -f ./src/components/style/* ./es/style/
