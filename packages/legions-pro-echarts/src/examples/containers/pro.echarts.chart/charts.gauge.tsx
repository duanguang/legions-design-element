import { LegionsProEchartsBox, LegionsProEchartsChartGauge } from 'components';
import React from 'react';

export class ChartsGaugeDemo1 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="仪表盘" height="350px">
                <LegionsProEchartsChartGauge
                    option={{
                        series: [{
                            data: [{
                                value: 50,
                                name: '速度'
                            }]
                        }]
                    }}
                ></LegionsProEchartsChartGauge>
            </LegionsProEchartsBox>
        )
    }
}
