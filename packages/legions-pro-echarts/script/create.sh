#!/bin/sh

# array_components=['LegionsProEcharts','LegionsProEchartsBox','LegionsProEchartsBoxList','LegionsProEchartsBar',
# 'LegionsProEchartsCard','LegionsProEchartsLine','LegionsProEchartsPie','LegionsProEchartsCol',
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

cp -r -f ./types/components/LegionsProEchartsBar/*.d.ts ./es/LegionsProEchartsBar/
# cp -r -f ./types/components/LegionsProEchartsBar/*.d.ts ./lib/LegionsProEchartsBar/

cp -r -f ./types/components/LegionsProEchartsCard/*.d.ts ./es/LegionsProEchartsCard/
# cp -r -f ./types/components/LegionsProEchartsCard/*.d.ts ./lib/LegionsProEchartsCard/

cp -r -f ./types/components/LegionsProEchartsLine/*.d.ts ./es/LegionsProEchartsLine/
# cp -r -f ./types/components/LegionsProEchartsLine/*.d.ts ./lib/LegionsProEchartsLine/

cp -r -f ./types/components/LegionsProEchartsPie/*.d.ts ./es/LegionsProEchartsPie/
# cp -r -f ./types/components/LegionsProEchartsPie/*.d.ts ./lib/LegionsProEchartsPie/

cp -r -f ./types/components/LegionsProEchartsRadar/*.d.ts ./es/LegionsProEchartsRadar/
# cp -r -f ./types/components/LegionsProEchartsRadar/*.d.ts ./lib/LegionsProEchartsRadar/

cp -r -f ./types/components/LegionsProEchartsGauge/*.d.ts ./es/LegionsProEchartsGauge/
# cp -r -f ./types/components/LegionsProEchartsGauge/*.d.ts ./lib/LegionsProEchartsGauge/

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
