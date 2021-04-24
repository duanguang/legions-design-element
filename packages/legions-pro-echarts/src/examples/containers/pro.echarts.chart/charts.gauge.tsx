import { LegionsProEchartsBox, LegionsProEchartsGauge } from 'components';
import React from 'react';

export class ChartsGaugeDemo1 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="仪表盘" height="350px">
                <LegionsProEchartsGauge
                    option={{
                        series: [{
                            data: [{
                                value: 50,
                                name: '速度'
                            }]
                        }]
                    }}
                ></LegionsProEchartsGauge>
            </LegionsProEchartsBox>
        )
    }
}
