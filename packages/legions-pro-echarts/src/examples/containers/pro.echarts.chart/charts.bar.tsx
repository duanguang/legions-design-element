import { LegionsProEchartsBox, LegionsProEchartsChartBar, LegionsProEchartsChartLine } from 'components';
import { mockService } from 'examples/services/mockService';
import React from 'react';

export class ChartsBarDemo1 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="柱状图" height="240px">
                <LegionsProEchartsChartBar
                    option={{
                        xAxis: {
                            data: ['A','B','C','D'],
                        },
                        series: [{
                            name: '进口', stack: '总量',
                            data: [41.1,30.4,65.1,53.3]
                        }]
                    }}
                ></LegionsProEchartsChartBar>
            </LegionsProEchartsBox>
        )
    }
}

export class ChartsBarDemo2 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="柱状图数据自动托管" height="240px">
                <LegionsProEchartsChartBar request={mockService.barData}></LegionsProEchartsChartBar>
            </LegionsProEchartsBox>
        )
    }
}
